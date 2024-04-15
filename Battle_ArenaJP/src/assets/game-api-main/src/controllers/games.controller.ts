import {inject, service} from '@loopback/core';
import {
  Filter,
  repository
} from '@loopback/repository';
import {
  HttpErrors,
  Response,
  RestBindings,
  del,
  get,
  param,
  post,
  requestBody,
  response
} from '@loopback/rest';
import {Games, Players_Games} from '../models';
import {AttackRepository, GamesRepository, LogRepository, PlayerRepository, PlayersGamesRepository} from '../repositories';
import {ConstantsService} from '../services/constants.service';
import {TokenCheckerService} from '../services/token-checker.service';

export class GamesController {
  constructor(
    @repository(GamesRepository)
    private gamesRepository: GamesRepository,
    @repository(PlayersGamesRepository)
    private playersGameRepository: PlayersGamesRepository,
    @repository(PlayerRepository)
    private playersRepository: PlayerRepository,
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


  @get('/players/{id}/statistics', {
    summary: "Get the statistics of a player",
    description: "Get the number of games played and won of the player indicated in the path.",
    responses: {
      '200': {
        description: 'Statistic instance',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: "object",
                properties: {
                  games_played: {type: "number"},
                  games_won: {type: "number"},
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
  })
  async playerGamesStatistics(
    @param.header.string('Bearer') authorizationHeader: string,
    @param.path.string('id') playerID: string
  ): Promise<Object> {

    //AUTH______________________________________________________________________
    if (authorizationHeader == undefined) {
      throw new HttpErrors.Unauthorized(this.constants.tokenRequired);
    }

    const tokenPlayer = await this.tokenChecker.checkTokenIsInDatabase(authorizationHeader);
    if (tokenPlayer == null) {
      throw new HttpErrors.Unauthorized(this.constants.tokenFailure);
    }

    //DATABASE_PETITION_________________________________________________________
    try {
      const games_played: number = (await this.playersGameRepository.count({player_ID: playerID})).count;
      const games_won: number = (await this.playersGameRepository.count({player_ID: playerID, winner: true})).count;

      return {games_played: games_played, games_won: games_won}

    } catch (error) {
      return this.response.status(parseInt(error.statusCode)).send(this.constants.errorFormat(error.statusCode, error.statusName, error.statusMessage));
    }

  }




  @get('/players/statistics', {
    summary: "Get the statistics of your player",
    description: "Get the number of games played and won of your player. (Indicated by the token)",
    responses: {
      '200': {
        description: 'Statistic instance',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: "object",
                properties: {
                  games_played: {type: "number"},
                  games_won: {type: "number"},
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
  })
  async ownGamesStatistics(
    @param.header.string('Bearer') authorizationHeader: string,
  ): Promise<any> {

    //AUTH______________________________________________________________________
    if (authorizationHeader == undefined) {
      throw new HttpErrors.Unauthorized(this.constants.tokenRequired);
    }

    const tokenPlayer = await this.tokenChecker.checkTokenIsInDatabase(authorizationHeader);
    if (tokenPlayer == null) {
      throw new HttpErrors.Unauthorized(this.constants.tokenFailure);
    }

    //DATABASE_PETITION_________________________________________________________
    try {
      const games_played: number = (await this.playersGameRepository.count({player_ID: tokenPlayer.player_ID})).count;
      const games_won: number = (await this.playersGameRepository.count({player_ID: tokenPlayer.player_ID, winner: true})).count;

      return {games_played: games_played, games_won: games_won}

    } catch (error) {
      return this.response.status(parseInt(error.statusCode)).send(this.constants.errorFormat(error.statusCode, error.statusName, error.statusMessage));
    }

  }




  @get('/players/games/finished', {
    summary: "Get the finished games of your player",
    description: "Get a list of all the finished games from your player. (Indicated by the token)",
    responses: {
      '200': {
        description: 'Array of finished games',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  game_ID: {type: 'string'},
                  size: {type: 'number'},
                  creation_date: {type: 'date'},
                  HP_max: {type: 'number'},
                  players_games: {
                    type: "array",
                    items: {
                      type: 'object',
                      properties: {
                        game_ID: {type: 'string'},
                        player_ID: {type: 'string'},
                        winner: {type: 'string'},
                        xp_win: {type: 'number'},
                        coins_win: {type: 'number'},
                      },
                    },
                  },
                },
              },
            },
          },
        }
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
  async findGamesFinished(
    @param.header.string('Bearer') authorizationHeader: string
  ): Promise<any> {

    //AUTH______________________________________________________________________
    if (authorizationHeader == undefined) {
      throw new HttpErrors.Unauthorized(this.constants.tokenRequired);
    }

    const tokenPlayer = await this.tokenChecker.checkTokenIsInDatabase(authorizationHeader);
    if (tokenPlayer == null) {
      throw new HttpErrors.Unauthorized(this.constants.tokenFailure);
    }

    //DATABASE_PETITION_________________________________________________________
    try {
      //Obtain de games ID from a player
      const playerGames = await this.playersGameRepository.find({fields: {game_ID: true}, where: {player_ID: tokenPlayer.player_ID}});

      if (playerGames.length == 0) {return [];}

      const playerGamesArray = playerGames.map(game => game.game_ID);
      const filter: Filter<Games> = {
        include: [
          {
            relation: 'players_games',
            scope: {
              fields: {game_ID: true, player_ID: true, xp_win: true, coins_win: true, winner: true},
            },
          },
        ],
        fields: {
          game_ID: true,
          size: true,
          creation_date: true,
          HP_max: true,
        },
        where: {
          finished: true,
          game_ID: {inq: playerGamesArray}
        }
      };

      return await this.gamesRepository.find(filter);

    } catch (error) {
      return this.response.status(parseInt(error.statusCode)).send(this.constants.errorFormat(error.statusCode, error.statusName, error.statusMessage));
    }
  }




  @get('/players/{id}/games/finished', {
    summary: "Get the finished games of a player",
    description: "Get a list of all the finished games from the player indicated in the path.",
    responses: {
      '200': {
        description: 'Array of finished games',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  game_ID: {type: 'string'},
                  size: {type: 'number'},
                  creation_date: {type: 'date'},
                  HP_max: {type: 'number'},
                  players_games: {
                    type: "array",
                    items: {
                      type: 'object',
                      properties: {
                        game_ID: {type: 'string'},
                        player_ID: {type: 'string'},
                        winner: {type: 'string'},
                        xp_win: {type: 'number'},
                        coins_win: {type: 'number'},
                      },
                    },
                  },
                },
              },
            },
          },
        }
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
  async findPlayersGamesFInished(
    @param.header.string('Bearer') authorizationHeader: string,
    @param.path.string('id') playerID: string
  ): Promise<any> {

    //AUTH______________________________________________________________________
    if (authorizationHeader == undefined) {
      throw new HttpErrors.Unauthorized(this.constants.tokenRequired);
    }

    const tokenPlayer = await this.tokenChecker.checkTokenIsInDatabase(authorizationHeader);
    if (tokenPlayer == null) {
      throw new HttpErrors.Unauthorized(this.constants.tokenFailure);
    }

    //DATABASE_PETITION_________________________________________________________
    try {
      const playerGames = await this.playersGameRepository.find({fields: {game_ID: true}, where: {player_ID: playerID}});

      if (playerGames.length == 0) {return [];}

      const playerGamesArray = playerGames.map(game => game.game_ID);
      const filter: Filter<Games> = {
        include: [
          {
            relation: 'players_games', // Nombre de la relación
            scope: {
              fields: {game_ID: true, player_ID: true, xp_win: true, coins_win: true, winner: true},
            },
          },
        ],
        fields: {
          game_ID: true,
          size: true,
          creation_date: true,
          HP_max: true,
        },
        where: {
          finished: true,
          game_ID: {inq: playerGamesArray}
        }
      };

      return await this.gamesRepository.find(filter);

    } catch (error) {
      return this.response.status(parseInt(error.statusCode)).send(this.constants.errorFormat(error.statusCode, error.statusName, error.statusMessage));
    }
  }




  @get('/players/arenas/current', {
    summary: "Get the current game of a player",
    description: "Get the game that your player is currently playing.",
    responses: {
      '200': {
        description: 'Game instance',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  game_ID: {type: 'string'},
                  size: {type: 'number'},
                  creation_date: {type: 'date'},
                  finished: {type: 'boolean'},
                  HP_max: {type: 'number'},
                  start: {type: 'boolean'},
                  players_games: {
                    type: "array",
                    items: {
                      type: 'object',
                      properties: {
                        game_ID: {type: 'string'},
                        player_ID: {type: 'string'},
                        x_game: {type: 'number'},
                        y_game: {type: 'number'},
                        direction: {type: 'string'},
                        hp: {type: 'number'},
                        xp_win: {type: 'number'},
                        coins_win: {type: 'number'},
                      },
                    },
                  },
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
  })
  async findCurrentGame(
    @param.header.string('Bearer') authorizationHeader: string
  ): Promise<any> {

    //AUTH______________________________________________________________________
    if (authorizationHeader == undefined) {
      throw new HttpErrors.Unauthorized(this.constants.tokenRequired);
    }

    const tokenPlayer = await this.tokenChecker.checkTokenIsInDatabase(authorizationHeader);
    if (tokenPlayer == null) {
      throw new HttpErrors.Unauthorized(this.constants.tokenFailure);
    }

    //DATABASE_PETITIONS________________________________________________________
    try {
      const playerGames = await this.playersGameRepository.find({fields: {game_ID: true}, where: {player_ID: tokenPlayer.player_ID}});
      const playerGamesArray = playerGames.map(game => game.game_ID);

      if (playerGamesArray.length == 0) {return [];}
      const filter: Filter<Games> = {
        include: [
          {
            relation: 'players_games',
            scope: {
              fields: {game_ID: true, player_ID: true, x_game: true, y_game: true, direction: true, hp: true, xp_win: true, coins_win: true},
            },
          },
        ],

        where: {
          finished: false,
          game_ID: {inq: playerGamesArray}
        }
      };

      return await this.gamesRepository.find(filter);

    } catch (error) {
      return this.response.status(parseInt(error.statusCode)).send(error.code);
    }
  }




  @get('/arenas', {
    summary: "Get all the games",
    description: "Get a list with all the games, including finished, available and currently playing.",
    responses: {
      '200': {
        description: 'Game instance',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  game_ID: {type: 'string'},
                  size: {type: 'number'},
                  creation_date: {type: 'date'},
                  finished: {type: 'boolean'},
                  HP_max: {type: 'number'},
                  start: {type: 'boolean'},
                  players_games: {
                    type: "array",
                    items: {
                      type: 'object',
                      properties: {
                        game_ID: {type: 'string'},
                        player_ID: {type: 'string'},
                      },
                    },
                  },
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
  })
  async find(
    @param.header.string('Bearer') authorizationHeader: string,
  ): Promise<Games[]> {

    //AUTH______________________________________________________________________
    if (authorizationHeader == undefined) {
      throw new HttpErrors.Unauthorized(this.constants.tokenRequired);
    }

    const tokenPlayer = await this.tokenChecker.checkTokenIsInDatabase(authorizationHeader);
    if (tokenPlayer == null) {
      throw new HttpErrors.Unauthorized(this.constants.tokenFailure);
    }

    //DATABASE_PETITIONS
    return await this.gamesRepository.find({
      include: [
        {
          relation: 'players_games',
          scope: {
            fields: {game_ID: true, player_ID: true},
          },
        },
      ],
    });

  }




  @get('/arenas/{id}', {
    summary: "Get a game",
    description: "Get the game indicated in the path.",
    responses: {
      '200': {
        description: 'Game instance',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  game_ID: {type: 'string'},
                  size: {type: 'number'},
                  creation_date: {type: 'date'},
                  finished: {type: 'boolean'},
                  HP_max: {type: 'number'},
                  start: {type: 'boolean'},
                  players_games: {
                    type: "array",
                    items: {
                      type: 'object',
                      properties: {
                        game_ID: {type: 'string'},
                        player_ID: {type: 'string'},
                        winner: {type: 'boolean'},
                        xp_win: {type: 'number'},
                        coins_win: {type: 'number'},
                      },
                    },
                  },
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
  })
  async findArena(
    @param.header.string('Bearer') authorizationHeader: string,
    @param.path.string('id') gameID: string,
  ): Promise<Games> {

    //AUTH______________________________________________________________________
    if (authorizationHeader == undefined) {
      throw new HttpErrors.Unauthorized(this.constants.tokenRequired);
    }

    const tokenPlayer = await this.tokenChecker.checkTokenIsInDatabase(authorizationHeader);
    if (tokenPlayer == null) {
      throw new HttpErrors.Unauthorized(this.constants.tokenFailure);
    }

    //DATABASE PETITIONS________________________________________________________
    const game = await this.gamesRepository.findById(gameID, {
      include: [
        {
          relation: 'players_games',
          scope: {
            fields: {game_ID: true, player_ID: true, winner: true, xp_win: true, coins_win: true},
          },
        },
      ],
    });

    if (!game.finished) {
      if (game.players_games == undefined) {
        return game;
      }

      game.players_games.forEach(player => {
        player.winner = false;
      });
    }

    return game;
  }




  @post('/arenas', {
    summary: "Create a game.",
    description: "You'll become the 1st player of the game created. <br>Your position will be randomly chosen in the left half part of the arena and your first direction will be right. <br><br>The logs will be automatically updated.",
    responses: {
      '201': {
        description: 'Game created.',
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
          schema: {type: 'object', properties: {game_ID: {type: 'string'}, size: {type: 'number'}, HP_max: {type: 'number'}}, title: 'New arena'}

        },
      },
    })
    game: Games,
    @param.header.string('Bearer') authorizationHeader: string,
  ): Promise<any> {
    //BODY______________________________________________________________________
    if (game.game_ID == undefined || game.size == undefined || game.HP_max == undefined) {
      throw new HttpErrors.PreconditionFailed(this.constants.bodyFormat);
    }
    if (game.game_ID == "" || game.size.toString() == "" || game.HP_max.toString() == "") {
      throw new HttpErrors.PreconditionFailed(this.constants.emptyForm);
    }

    //AUTH______________________________________________________________________
    if (authorizationHeader == undefined) {
      throw new HttpErrors.Unauthorized(this.constants.tokenRequired);
    }

    const tokenPlayer = await this.tokenChecker.checkTokenIsInDatabase(authorizationHeader);
    if (tokenPlayer == null) {
      throw new HttpErrors.Unauthorized(this.constants.tokenFailure);
    }

    //CHECKS____________________________________________________________________
    //check min HP
    if (game.HP_max < this.constants.minHpGame) {
      throw new HttpErrors.Forbidden(this.constants.minimumHP);
    }

    //check max arena size
    if (game.size > this.constants.maxArenaSize) {
      throw new HttpErrors.Forbidden(this.constants.mazimumSize);
    }

    //check min arena size
    if (game.size < this.constants.minArenaSize) {
      throw new HttpErrors.Forbidden(this.constants.minimumSize);
    }

    //Check if player is playing
    const inGame: boolean = ((await this.playersGameRepository.count({player_ID: tokenPlayer.player_ID, winner: null})).count) != 0;
    if (inGame) {
      throw new HttpErrors.Forbidden(this.constants.alreadyInGameCreation);
    }

    //DATABASE_PETITIONS________________________________________________________
    try {
      //creation of the game
      await this.gamesRepository.create(game);

      //Initialisation of the player's info in the game
      let y: number = Math.floor(Math.random() * (game.size / 2));
      let x: number = Math.floor(Math.random() * (game.size / 2));
      const playerGame = {
        game_ID: game.game_ID,
        player_ID: tokenPlayer.player_ID,
        x_game: x,
        y_game: y,
        direction: 'right',
        hp: game.HP_max,
      }

      //creation of the player game
      await this.playersGameRepository.create(playerGame);

      //creation of the logs
      this.logRepository.create({
        game_ID: playerGame.game_ID,
        description: "'" + tokenPlayer.player_ID + "' creates a game with " + game.HP_max + " of maximum HP and " + game.size + " of arena size",
        player_ID: tokenPlayer.player_ID
      });

      this.logRepository.create({
        game_ID: playerGame.game_ID,
        description: "'" + tokenPlayer.player_ID + "' enters as the first player with position (" + x + "," + y + ") and looking to the right",
        player_ID: tokenPlayer.player_ID
      });

      return this.response.status(201).send();

    } catch (error) {

      if (error.code == 'ER_DUP_ENTRY') {
        throw new HttpErrors.Forbidden(this.constants.attackNameNotValid);
      }

      return this.response.status(parseInt(error.statusCode)).send(this.constants.errorFormat(error.statusCode, error.statusName, error.statusMessage));

    }

  }




  @post('/arenas/{id}/play', {
    summary: "Enter a game",
    description: "You'll become the 2nd player of the game. <br>Your position will be randomly chosen in the right half part of the arena and your first direction will be left. <br><br>The logs will be automatically updated. <br><br>The start value will become 'true'",
    responses: {
      '200': {
        description: 'Enter successful.',
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
  async playGame(
    @param.path.string('id') gameID: string,
    @param.header.string('Bearer') authorizationHeader: string,

  ): Promise<any> {

    //AUTH______________________________________________________________________
    if (authorizationHeader == undefined) {
      throw new HttpErrors.Unauthorized(this.constants.tokenRequired);
    }

    const tokenPlayer = await this.tokenChecker.checkTokenIsInDatabase(authorizationHeader);
    if (tokenPlayer == null) {
      throw new HttpErrors.Unauthorized(this.constants.tokenFailure);
    }

    //CHECKS____________________________________________________________________
    //Check if he is already in a game
    const inGame: boolean = ((await this.playersGameRepository.count({player_ID: tokenPlayer.player_ID, winner: null})).count) != 0;
    if (inGame) {
      throw new HttpErrors.Forbidden(this.constants.alreadyInGameEnter);
    }

    const game = await this.gamesRepository.find({where: {game_ID: gameID}, include: [{relation: 'players_games'}]});

    //Check if the game exists
    if (game.length == 0) {
      throw new HttpErrors.NotFound(this.constants.gameNotFound);
    }

    //other problems
    if (game[0].players_games == undefined) {
      throw new HttpErrors[500];
    }

    //check if is plenty
    if (game[0].players_games.length == 2) {
      throw new HttpErrors.Forbidden(this.constants.gamePlenty);
    }


    //DATABASE_PETITIONS________________________________________________________
    let y: number = (game[0].size / 2 + Math.round(Math.random() * (game[0].size / 2))) - 1;
    let x: number = (game[0].size / 2 + Math.round(Math.random() * (game[0].size / 2))) - 1;

    //Initialization of player information in the game
    const playerGame = {
      game_ID: game[0].game_ID,
      player_ID: tokenPlayer.player_ID,
      x_game: x,
      y_game: y,
      direction: 'left',
      hp: game[0].HP_max,
    }

    //creation of player game and start game
    await this.playersGameRepository.create(playerGame);
    await this.gamesRepository.updateById(gameID, {start: true});

    //logs
    this.logRepository.create({
      game_ID: gameID,
      description: "'" + tokenPlayer.player_ID + "' enters to " + gameID + " with position (" + x + "," + y + ") and looking to the left",
      player_ID: tokenPlayer.player_ID
    });

    return this.response.status(200).send();
  }


  @del('/arenas/{id}/play', {
    summary: "Leave the game",
    description: "The game will finish and you'll loose. <br><br>The logs will be automatically updated.",
    responses: {
      '204': {
        description: 'Leave sucessfull.',
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
  async deletePlay(
    @param.path.string('id') gameID: string,
    @param.header.string('Bearer') authorizationHeader: string,

  ): Promise<void> {

    //AUTH______________________________________________________________________
    if (authorizationHeader == undefined) {
      throw new HttpErrors.Unauthorized(this.constants.tokenRequired);
    }

    const tokenPlayer = await this.tokenChecker.checkTokenIsInDatabase(authorizationHeader);
    if (tokenPlayer == null) {
      throw new HttpErrors.Unauthorized(this.constants.tokenFailure);
    }

    //CHECK_____________________________________________________________________

    //check if game exists
    const game = await this.gamesRepository.find({where: {game_ID: gameID}});
    if (game.length == 0) {
      throw new HttpErrors.NotFound(this.constants.gameNotFound);
    }

    const twoPlayers = ((await this.playersGameRepository.find({where: {game_ID: gameID}})));

    //game finished
    if (game[0].finished) {
      throw new HttpErrors.Forbidden(this.constants.gameFinished);
    }

    //DATABASE_PETITION_________________________________________________________
    if (twoPlayers.length == 2) {

      //check if user is one of the players in the game
      if (tokenPlayer.player_ID == twoPlayers[0].player_ID || tokenPlayer.player_ID == twoPlayers[1].player_ID) {

        //Differentiate both players
        let playerGameLeave, playerGameWin, playerWin, playerLeave;
        if (tokenPlayer.player_ID == twoPlayers[0].player_ID) {
          playerLeave = tokenPlayer;
          playerGameLeave = twoPlayers[0];
          playerGameWin = twoPlayers[1];
          playerWin = await this.playersRepository.findById(twoPlayers[1].player_ID);
        } else {
          playerLeave = tokenPlayer;
          playerGameLeave = twoPlayers[1];
          playerGameWin = twoPlayers[0];
          playerWin = await this.playersRepository.findById(twoPlayers[0].player_ID);
        }

        //If leaves, he looses and game finishes
        await this.playersGameRepository.updateAll({winner: false}, {game_ID: gameID, player_ID: tokenPlayer.player_ID});
        await this.playersGameRepository.updateAll({winner: true}, {game_ID: gameID, player_ID: {neq: tokenPlayer.player_ID}});
        await this.gamesRepository.updateById(gameID, {finished: true});

        //updating the logs
        this.logRepository.create({
          game_ID: gameID,
          description: "'" + tokenPlayer.player_ID + "' leaves and loose the game.",
          player_ID: tokenPlayer.player_ID
        });

        //updating coins and xp into players
        if (playerLeave.xp == undefined || playerLeave.coins == undefined || playerGameLeave.xp_win == undefined || playerGameLeave.coins_win == undefined ||
          playerWin.xp == undefined || playerWin.coins == undefined || playerGameWin.xp_win == undefined || playerGameWin.coins_win == undefined) {throw new HttpErrors[500];}

        await this.playersRepository.updateById(playerLeave.player_ID, {xp: playerLeave.xp + playerGameLeave.xp_win, coins: playerLeave.coins + playerGameLeave.coins_win});
        await this.playersRepository.updateById(playerWin.player_ID, {xp: playerWin.xp + playerGameWin.xp_win, coins: playerWin.coins + playerGameWin.coins_win});

      } else {
        throw new HttpErrors.Forbidden(this.constants.beGamePlayer);
      };

    } else if (twoPlayers.length == 1) {

      if (tokenPlayer.player_ID == twoPlayers[0].player_ID) {

        //If he leaves, the game will be deleted
        await this.playersGameRepository.deleteAll({game_ID: gameID, player_ID: tokenPlayer.player_ID});
        await this.logRepository.deleteAll({game_ID: gameID});
        await this.gamesRepository.deleteById(gameID);

      } else {
        throw new HttpErrors.Forbidden(this.constants.beGamePlayer);
      };
    }

  }




  @post('/arenas/move', {
    summary: "Move in the game",
    description: "You'll move your player to the direction you've indicated.<br>If you reach the border of the arena, the API won't let you go out of it.<br><br>The logs will be automatically updated.",
    responses: {
      '200': {
        description: 'Movement successful.',
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
  async move(
    @requestBody({
      content: {
        'application/json': {
          schema: {type: 'object', properties: {movement: {type: 'string'}}}

        },
      },
    })
    move: {movement: string},
    @param.header.string('Bearer') authorizationHeader: string,
  ): Promise<any> {
    //BODY______________________________________________________________________
    if (move.movement == undefined) {
      throw new HttpErrors.PreconditionFailed(this.constants.bodyFormat);
    }
    if (move.movement == "") {
      throw new HttpErrors.PreconditionFailed(this.constants.emptyForm);
    }

    //AUTH______________________________________________________________________
    if (authorizationHeader == undefined) {
      throw new HttpErrors.Unauthorized(this.constants.tokenRequired);
    }

    const tokenPlayer = await this.tokenChecker.checkTokenIsInDatabase(authorizationHeader);
    if (tokenPlayer == null) {
      throw new HttpErrors.Unauthorized(this.constants.tokenFailure);
    }

    //CHECKS____________________________________________________________________
    //valid movement

    const movements = ['up', 'down', 'left', 'right'];
    if (!movements.includes(move.movement)) {
      throw new HttpErrors.PreconditionFailed(this.constants.movementDirection);
    }

    //currently in a game
    const player_game = await this.playersGameRepository.find({where: {player_ID: tokenPlayer.player_ID, winner: null}});
    if (player_game.length == 0) {
      throw new HttpErrors.Forbidden(this.constants.notInGame);
    }

    //check game
    const game = await this.gamesRepository.findById(player_game[0].game_ID, {include: [{relation: 'players_games'}]});
    //not started
    if (!game.start) {
      throw new HttpErrors.Forbidden(this.constants.notStarted);
    }
    //finished
    if (game.finished) {
      throw new HttpErrors.Forbidden(this.constants.gameFinished);
    }

    //DATABASE_PETITIONS________________________________________________________
    if (game.players_games !== undefined) {

      if (game.players_games[0].player_ID == tokenPlayer.player_ID || game.players_games[1].player_ID == tokenPlayer.player_ID) {

        //Find your player
        let player;
        if (game.players_games[0].player_ID == tokenPlayer.player_ID) {
          player = game.players_games[0];
        } else {
          player = game.players_games[1];
        }

        //Update move and update info for logs
        let reachLimit = false;
        let x = 0, y = 0;

        switch (move.movement) {

          case 'up':
            if (player.y_game - 1 <= 0) {
              reachLimit = true;
              x = player.x_game;
              y = 0;

            } else {
              reachLimit = false;
              x = player.x_game;
              y = player.y_game - 1;

            }
            break;

          case 'down':
            if (game.size <= player.y_game + 1) {
              reachLimit = true;
              x = player.x_game;
              y = game.size - 1;

            } else {
              reachLimit = false;
              x = player.x_game;
              y = player.y_game + 1;

            }
            break;

          case 'left':
            if (player.x_game - 1 <= 0) {
              reachLimit = true;
              x = 0;
              y = player.y_game;

            } else {
              reachLimit = false;
              x = player.x_game - 1;
              y = player.y_game;

            }
            break;

          case 'right':
            if (game.size <= player.x_game + 1) {
              reachLimit = true;
              x = game.size - 1;
              y = player.y_game;

            } else {
              reachLimit = false;
              x = player.x_game + 1;
              y = player.y_game;

            }
            break;
        }

        await this.playersGameRepository.updateAll({x_game: x, y_game: y}, {game_ID: game.game_ID, player_ID: tokenPlayer.player_ID});

        //Logs
        let descript = "";
        if (reachLimit) {
          descript = this.constants.moveLimitDescriptionLog(tokenPlayer.player_ID, move.movement, x, y);
        } else {
          descript = this.constants.moveDescriptionLog(tokenPlayer.player_ID, move.movement, player.x_game, player.y_game, x, y);
        }

        this.logRepository.create({
          game_ID: game.game_ID,
          description: descript,
          player_ID: tokenPlayer.player_ID
        });

        return this.response.status(200).send();

      } else {
        throw new HttpErrors.Forbidden(this.constants.beGamePlayer);
      }
    }
  }



  @post('/arenas/direction', {
    summary: "Change direction in the game",
    description: "You'll change the direction your player is looking at.<br><br>The logs will be automatically updated.",
    responses: {
      '200': {
        description: 'Direction changed successfully.',
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
  async direction(
    @requestBody({
      content: {
        'application/json': {
          schema: {type: 'object', properties: {direction: {type: 'string'}}}

        },
      },
    })
    direction: {direction: string},
    @param.header.string('Bearer') authorizationHeader: string,
  ): Promise<any> {
    //BODY______________________________________________________________________
    if (direction.direction == undefined) {
      throw new HttpErrors.PreconditionFailed(this.constants.bodyFormat);
    }
    if (direction.direction == "") {
      throw new HttpErrors.PreconditionFailed(this.constants.emptyForm);
    }

    //AUTH______________________________________________________________________
    if (authorizationHeader == undefined) {
      throw new HttpErrors.Unauthorized(this.constants.tokenRequired);
    }

    const tokenPlayer = await this.tokenChecker.checkTokenIsInDatabase(authorizationHeader);
    if (tokenPlayer == null) {
      throw new HttpErrors.Unauthorized(this.constants.tokenFailure);
    }

    //CHECKS____________________________________________________________________
    //not currently in a game

    //directions
    const directions = ['up', 'down', 'left', 'right'];
    if (!directions.includes(direction.direction)) {
      throw new HttpErrors.PreconditionFailed(this.constants.movementDirection);
    }

    const player_game = await this.playersGameRepository.find({where: {player_ID: tokenPlayer.player_ID, winner: null}});
    if (player_game.length == 0) {
      throw new HttpErrors.Forbidden(this.constants.notInGame);
    }

    //check game
    const game = await this.gamesRepository.findById(player_game[0].game_ID, {include: [{relation: 'players_games'}]})
    //not started
    if (!game.start) {
      throw new HttpErrors.Forbidden(this.constants.notStarted);
    }
    //finished
    if (game.finished) {
      throw new HttpErrors.Forbidden(this.constants.gameFinished);
    }

    //others
    if (game.players_games == undefined) {
      throw new HttpErrors[500];
    }
    if (game.players_games.length != 2) {
      throw new HttpErrors[500];
    }

    //DATABASE_PETITIONS________________________________________________________

    //check if player is in that game
    if (game.players_games[0].player_ID == tokenPlayer.player_ID || game.players_games[1].player_ID == tokenPlayer.player_ID) {

      this.playersGameRepository.updateAll({direction: direction.direction}, {game_ID: game.game_ID, player_ID: tokenPlayer.player_ID});

      this.logRepository.create({
        game_ID: game.game_ID,
        description: "'" + tokenPlayer.player_ID + "' changes direction to " + direction.direction,
        player_ID: tokenPlayer.player_ID
      });

      return this.response.status(200).send();

    } else {
      //you must be player of the game
      throw new HttpErrors.Forbidden(this.constants.beGamePlayer);
    }
  }




  @post('/arenas/attack/{id}', {
    summary: "Attack in the game",
    description: "Attack with your equipped attack in the game.<br>The attack will hit to the position you've chosen considering your player (0,0) and the direction you are looking at.<br>For example: (1,0) always will hit one cell in front of you.<br><br>The logs will be automatically updated. <br><br>Once somebody reaches 0 HP, the game will automatically finish.",
    responses: {
      '200': {
        description: 'Attack made successfully.',
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
  async attack(
    @param.header.string('Bearer') authorizationHeader: string,
    @param.path.string("id") attackID: string,
  ): Promise<any> {

    //AUTH______________________________________________________________________
    if (authorizationHeader == undefined) {
      throw new HttpErrors.Unauthorized(this.constants.tokenRequired);
    }

    const tokenPlayer = await this.tokenChecker.checkTokenIsInDatabase(authorizationHeader);
    if (tokenPlayer == null) {
      throw new HttpErrors.Unauthorized(this.constants.tokenFailure);
    }

    //CHECKS____________________________________________________________________
    //Not in a game
    const player_game = await this.playersGameRepository.find({where: {player_ID: tokenPlayer.player_ID, winner: null}});
    if (player_game.length == 0) {
      throw new HttpErrors.Forbidden(this.constants.notInGame);
    }

    //check games_____________________
    const game = await this.gamesRepository.findById(player_game[0].game_ID, {include: [{relation: 'players_games'}]})

    //not started
    if (!game.start) {
      throw new HttpErrors.Forbidden(this.constants.notStarted);
    }

    //finished
    if (game.finished) {
      throw new HttpErrors.Forbidden(this.constants.gameFinished);
    }

    //check attack____________________
    let attack = await this.attackRepository.find({where: {attack_ID: attackID}});

    //not found
    if (attack.length != 1) {
      throw new HttpErrors.Forbidden(this.constants.attackNotFound);
    }

    //not yours
    if (attack[0].player_ID != tokenPlayer.player_ID) {
      throw new HttpErrors.Forbidden(this.constants.cantUseNotYours);
    }

    //not equipped
    if (!attack[0].equipped) {
      throw new HttpErrors.Forbidden(this.constants.cantUseNoEquipped);
    }

    //________________________________
    //others
    if (game.players_games == undefined) {
      throw new HttpErrors[500];
    }
    if (game.players_games.length != 2) {
      throw new HttpErrors[500];
    }


    //DATABASE PETITIONS________________________________________________________

    //Initialize both players
    let playerAttack: Players_Games;
    let player2: Players_Games;

    if (game.players_games[0].player_ID == tokenPlayer.player_ID) {
      playerAttack = game.players_games[0];
      player2 = game.players_games[1];
    } else {
      playerAttack = game.players_games[1];
      player2 = game.players_games[0];
    }

    //find X and Y relatively to the player
    const xy = attack[0].positions.slice(1, -1) //delete ()
      .split(",")
      .map(str => parseInt(str));


    //calculate X and Y in the arena considering the position and direction of the player
    let x_attack;
    let y_attack;

    switch (playerAttack.direction) {
      case 'left':
        x_attack = playerAttack.x_game - xy[0];
        y_attack = playerAttack.y_game + xy[1];
        break;

      case 'right':
        x_attack = playerAttack.x_game + xy[0];
        y_attack = playerAttack.y_game - xy[1];
        break;

      case 'up':
        x_attack = playerAttack.x_game - xy[1];
        y_attack = playerAttack.y_game - xy[0];
        break;

      case 'down':
        x_attack = playerAttack.x_game + xy[1];
        y_attack = playerAttack.y_game + xy[0];
        break;
    }

    //Write log that player attack to that position
    this.logRepository.create({
      game_ID: game.game_ID,
      description: "'" + tokenPlayer.player_ID + "' attacks with '" + attack[0].attack_ID + "' on (" + x_attack + "," + y_attack + ") position.",
      player_ID: tokenPlayer.player_ID
    });


    //check if attack hits the other player
    if (x_attack == player2.x_game && y_attack == player2.y_game) {

      //write log that hits the player
      this.logRepository.create({
        game_ID: game.game_ID,
        description: "The '" + tokenPlayer.player_ID + "' attack, hits the other player.",
        player_ID: tokenPlayer.player_ID
      });

      //calculate how much XP and coins we give to the attacker
      const xp_win = Math.round(Math.random() * (attack[0].power + 10));
      const coins_win = Math.round(xp_win / 2);

      //conditional to don't have undefined possible error
      let xpPlayerA = playerAttack.xp_win;
      if (xpPlayerA == undefined) {xpPlayerA = 0;}
      let coinsPlayerA = playerAttack.coins_win;
      if (coinsPlayerA == undefined) {coinsPlayerA = 0;}

      //Player 2 looses as he arrives to 0 HP
      if ((player2.hp - attack[0].power) <= 0) {

        //finish the game
        await this.playersGameRepository.updateAll({hp: 0, winner: false}, {player_ID: player2.player_ID, game_ID: game.game_ID});
        await this.playersGameRepository.updateAll({winner: true, xp_win: (xpPlayerA + xp_win) + 50, coins_win: coins_win + 20}, {player_ID: playerAttack.player_ID, game_ID: game.game_ID});
        this.gamesRepository.updateById(game.game_ID, {finished: true});

        //write log
        this.logRepository.create({
          game_ID: game.game_ID,
          description: "'" + tokenPlayer.player_ID + "' defeats player '" + player2.player_ID + "' , and wins",
          player_ID: tokenPlayer.player_ID
        });

        //update players (user)
        const playerLoose = await this.playersRepository.findById(player2.player_ID);

        if (tokenPlayer.coins == undefined || tokenPlayer.xp == undefined || playerLoose.coins == undefined || playerLoose.xp == undefined || player2.coins_win == undefined || player2.xp_win == undefined) {throw new HttpErrors[500];}

        this.playersRepository.updateById(tokenPlayer.player_ID, {xp: tokenPlayer.xp + xpPlayerA + xp_win + this.constants.winXPExtra, coins: tokenPlayer.coins + coins_win + this.constants.winCoinsExtra});
        this.playersRepository.updateById(player2.player_ID, {xp: playerLoose.xp + player2.xp_win, coins: playerLoose.coins + player2.coins_win});


      } else { //Player2 still alive

        //update players in the game
        await this.playersGameRepository.updateAll({hp: player2.hp - attack[0].power}, {player_ID: player2.player_ID, game_ID: game.game_ID});
        await this.playersGameRepository.updateAll({xp_win: xpPlayerA + xp_win, coins_win: coinsPlayerA + coins_win}, {player_ID: playerAttack.player_ID, game_ID: game.game_ID});

        //write log
        this.logRepository.create({
          game_ID: game.game_ID,
          description: "'" + player2.player_ID + "' loose " + attack[0].power + " HP, and '" + tokenPlayer.player_ID + "' wins " + xp_win + " more experience, and gains " + Math.round(xp_win / 2) + " more coins.",
          player_ID: tokenPlayer.player_ID
        });

      }

    } else {

      this.logRepository.create({
        game_ID: game.game_ID,
        description: "The '" + tokenPlayer.player_ID + "' attack, doesn't hit the other player.",
        player_ID: tokenPlayer.player_ID
      });
    }
  }




  @get('arenas/{id}/logs', {
    summary: "Get the game logs",
    description: "Get the logs of the game indicated in the path.",
    responses: {
      '200': {
        description: 'Array of Logs instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: "object",
                properties: {
                  description: {type: "string"},
                  date_time: {type: "string"},
                  playerID: {type: "string"},
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
  })
  async getLogs(
    @param.header.string('Bearer') authorizationHeader: string,
    @param.path.string('id') gameID: string
  ): Promise<Object> {

    //AUTH______________________________________________________________________
    if (authorizationHeader == undefined) {
      throw new HttpErrors.Unauthorized(this.constants.tokenRequired);
    }

    const tokenPlayer = await this.tokenChecker.checkTokenIsInDatabase(authorizationHeader);
    if (tokenPlayer == null) {
      throw new HttpErrors.Unauthorized(this.constants.tokenFailure);
    }

    //DATABASE_PETITIONS________________________________________________________
    const logs = await this.logRepository.find({where: {game_ID: gameID}, fields: {description: true, date_time: true, player_ID: true}});
    if (logs.length == 0) {
      throw new HttpErrors.NotFound(this.constants.gameNotFound);
    }

    return logs;

  }
}
