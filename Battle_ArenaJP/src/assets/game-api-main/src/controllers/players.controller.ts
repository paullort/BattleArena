import {inject, service} from '@loopback/core';
import {
  repository
} from '@loopback/repository';
import {
  HttpErrors,
  Response,
  RestBindings,
  del,
  get,
  getModelSchemaRef,
  param,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {v4 as uuidv4} from 'uuid';
import {Players} from '../models';
import {AttackRepository, LogRepository, PlayerRepository, PlayersGamesRepository} from '../repositories';
import {ConstantsService} from '../services/constants.service';
import {TokenCheckerService} from '../services/token-checker.service';

export class PlayersController {
  constructor(
    @repository(PlayersGamesRepository)
    private playersGameRepository: PlayersGamesRepository,
    @repository(PlayerRepository)
    private playerRepository: PlayerRepository,
    @repository(LogRepository)
    private logRepository: LogRepository,
    @repository(AttackRepository)
    private attackRepository: AttackRepository,
    @service(TokenCheckerService)
    private tokenChecker: TokenCheckerService,
    @inject(RestBindings.Http.RESPONSE) private response: Response,
    @service(ConstantsService)
    private constants: ConstantsService,
  ) { }


  @post('/players', {
    summary: "Create a new player",
    description: "Create a new player",
    responses: {
      '201': {
        description: 'Player created.',
      },
      'family 400': {
        description: "Error instance",
        content: {
          'application/json': {
            schema: {
              type: 'object', properties: {
                error: {
                  type: 'object', properties: {
                    statusCode: {type: 'number'}, name: {type: 'string'}, message: {type: 'string'}
                  }
                }
              }
            }

          },
        },
      },

    }
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {type: 'object', properties: {player_ID: {type: 'string'}, password: {type: 'string'}, img: {type: 'string'}}, title: 'New player'}

        },
      },
    })
    player: Players,
  ): Promise<Response> {

    //CHECKS____________________________________________________________________
    //Check if player is correct (body)
    if (player.player_ID == undefined || player.password == undefined || player.img == undefined) {
      throw new HttpErrors.PreconditionFailed(this.constants.bodyFormat);
    }
    if (player.player_ID == "" || player.password == "" || player.img == "") {
      throw new HttpErrors.PreconditionFailed(this.constants.emptyForm);
    }

    //DATABASE_PETITIONS________________________________________________________
    do {
      //creation the token for the player
      player.token = uuidv4();//console.log(player);

      //We try to create the player
      try {
        await this.playerRepository.create(player);
        return this.response.status(201).send();

      } catch (error) {

        //check if there is a duplicate entry on username or token
        if (error.code == 'ER_DUP_ENTRY') {

          //if is the username, we don't continue
          if (error.sqlMessage.includes('PRIMARY')) {
            throw new HttpErrors.Forbidden(this.constants.usernameNotValid);
          }

          //if the token, we will reestart

        } else { //Other error
          return this.response.status(parseInt(error.statusCode)).send(this.constants.errorFormat(error.statusCode, error.statusName, error.statusMessage));
        }
      }

    } while (true);

  }




  @post('/players/join', {
    summary: "Login player",
    description: "Login to obtain the token of the player to be able to use the API.",
    responses: {
      '200': {
        description: 'Player instance',
        content: {'application/json': {schema: getModelSchemaRef(Players)}},
      },
      'family 400': {
        description: "Error instance",
        content: {
          'application/json': {
            schema: {
              type: 'object', properties: {
                error: {
                  type: 'object', properties: {
                    statusCode: {type: 'number'}, name: {type: 'string'}, message: {type: 'string'}
                  }
                }
              }
            }

          },
        },
      },


    }
  })
  async join(
    @requestBody({
      content: {
        'application/json': {
          schema: {type: 'object', properties: {player_ID: {type: 'string'}, password: {type: 'string'}}, title: 'authentication'}

        },
      },
    })
    player: Players,
  ): Promise<Players> {

    //CHECKS____________________________________________________________________
    //Check if player is correct (body)
    if (player.player_ID == undefined || player.password == undefined) {
      throw new HttpErrors.PreconditionFailed(this.constants.bodyFormat);
    }
    if (player.player_ID == "" || player.password == "") {
      throw new HttpErrors.PreconditionFailed(this.constants.emptyForm);
    }

    //DATABASE_PETITIONS________________________________________________________

    const playerInfo = await this.playerRepository.find({where: {player_ID: player.player_ID, password: player.password}});
    if (playerInfo.length == 0) {
      throw new HttpErrors.NotFound(this.constants.joinFailure);
    } else {
      return playerInfo[0];
    }
  }




  @get('/players', {
    summary: "Get all the players",
    description: "Get a list of all the players",
    responses: {
      '200': {
        description: 'Array of Player instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  player_ID: {type: 'string'}, img: {type: 'string'}, xp: {type: 'number'}, level: {type: 'number'}, coins: {type: 'number'},
                },
              },
            },
          },
        },

      },
      'family 400': {
        description: "Error instance",
        content: {
          'application/json': {
            schema: {
              type: 'object', properties: {
                error: {
                  type: 'object', properties: {
                    statusCode: {type: 'number'}, name: {type: 'string'}, message: {type: 'string'}
                  }
                }
              }
            }

          },
        },
      },

    }
  }) async find(
    @param.header.string('Bearer') authorizationHeader: string
  ): Promise<Players[]> {

    //AUTH______________________________________________________________________
    if (authorizationHeader == undefined) {
      throw new HttpErrors.Unauthorized(this.constants.tokenRequired);
    }

    const tokenPlayer = await this.tokenChecker.checkTokenIsInDatabase(authorizationHeader);
    if (tokenPlayer == null) {
      throw new HttpErrors.Unauthorized(this.constants.tokenFailure);
    }

    //DATABASE_PETITION_________________________________________________________
    return await this.playerRepository.find({fields: {player_ID: true, img: true, xp: true, level: true, coins: true, }});
  }




  @get('/players/{id}', {
    summary: "Get one player",
    description: "Get the player you've indicated in the path.",
    responses: {
      '200': {
        description: 'Player model instance',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                player_ID: {type: 'string'},
                img: {type: 'string'},
                xp: {type: 'number'},
                level: {type: 'number'},
                coins: {type: 'number'},
              },
            },
          },
        },

      },
      'family 400': {
        description: "Error instance",
        content: {
          'application/json': {
            schema: {
              type: 'object', properties: {
                error: {
                  type: 'object', properties: {
                    statusCode: {type: 'number'}, name: {type: 'string'}, message: {type: 'string'}
                  }
                }
              }
            }

          },
        },
      },

    }
  })
  async findById(
    @param.path.string('id') id: string,
    @param.header.string('Bearer') authorizationHeader: string
  ): Promise<Players> {

    //AUTH______________________________________________________________________
    if (authorizationHeader == undefined) {
      throw new HttpErrors.Unauthorized(this.constants.tokenRequired);
    }

    const tokenPlayer = await this.tokenChecker.checkTokenIsInDatabase(authorizationHeader);
    if (tokenPlayer == null) {
      throw new HttpErrors.Unauthorized(this.constants.tokenFailure);
    }

    //DATABASE_PETITION_________________________________________________________
    return await this.playerRepository.findById(id, {fields: {player_ID: true, img: true, xp: true, level: true, coins: true}});
  }




  @del('/players',{
    summary: "Delete player",
    description: "His attacks and player games will be deleted. However, the game Logs will remain with the player_ID in blanck",
    responses: {
      '204': {
        description: 'Player deleted.',
      },
      'family 400': {
        description: "Error instance",
        content: {
          'application/json': {
            schema: {
              type: 'object', properties: {
                error: {
                  type: 'object', properties: {
                    statusCode: {type: 'number'}, name: {type: 'string'}, message: {type: 'string'}
                  }
                }
              }
            }

          },
        },
      },

    }
  })
  async deleteById(@param.header.string('Bearer') authorizationHeader: string): Promise<void> {

    //AUTH______________________________________________________________________
    if (authorizationHeader == undefined) {
      throw new HttpErrors.Unauthorized(this.constants.tokenRequired);
    }

    const tokenPlayer = await this.tokenChecker.checkTokenIsInDatabase(authorizationHeader);
    if (tokenPlayer == null) {
      throw new HttpErrors.Unauthorized(this.constants.tokenFailure);
    }

    //DATABASE_PETITION_________________________________________________________
    const currentGame = await this.playersGameRepository.find({where: {player_ID: tokenPlayer.player_ID, winner: null}});

    if (currentGame.length > 0) {
      throw new HttpErrors.Forbidden(this.constants.deleteInGame);
    }

    await this.logRepository.updateAll({player_ID: ""}, {player_ID: tokenPlayer.player_ID});
    await this.playersGameRepository.deleteAll({player_ID: tokenPlayer.player_ID});
    await this.attackRepository.deleteAll({player_ID: tokenPlayer.player_ID});

    await this.playerRepository.deleteById(tokenPlayer.player_ID);

  }

}
