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
  patch,
  post,
  requestBody,
  response
} from '@loopback/rest';
import {Attacks} from '../models';
import {AttackRepository, PlayerRepository} from '../repositories';
import {ConstantsService} from '../services/constants.service';
import {TokenCheckerService} from '../services/token-checker.service';

export class AttacksController {
  constructor(
    @repository(AttackRepository)
    public attackRepository: AttackRepository,
    @repository(PlayerRepository)
    public playerRepository: PlayerRepository,
    @service(TokenCheckerService)
    private tokenChecker: TokenCheckerService,
    @inject(RestBindings.Http.RESPONSE) private response: Response,
    @service(ConstantsService)
    private constants: ConstantsService,
  ) { }



  @post('/shop/attacks', {
    summary: "Create attack",
    description: "The attack created will be redirected to your attacks. <br>The power of it will depend on you level.",
    responses: {
      '201': {
        description: 'Attack created.',
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
    @param.header.string('Bearer') authorizationHeader: string,
    @requestBody({
      content: {
        'application/json': {
          schema: {type: 'object', properties: {attack_ID: {type: 'string'}, positions: {type: 'string'}, img: {type: 'string'}}, title: 'create attack'}
        },
      },
    })
    attack: Attacks,
  ): Promise<Response> {
    //BODY______________________________________________________________________
    if (attack.attack_ID == undefined || attack.positions == undefined || attack.img == undefined) {
      throw new HttpErrors.PreconditionFailed(this.constants.bodyFormat);
    }
    if (attack.attack_ID == "" || attack.positions == "" || attack.img == "") {
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

    //Check if position has the correct format
    const regex = /^\([0-9],-?[0-9]\)$/;
    if (!regex.test(attack.positions)) {
      throw new HttpErrors.PreconditionFailed(this.constants.positionsFormatError);
    }

    //DATABASE_PETITION_________________________________________________________
    try {
      //Put necessary info to create the player (player_ID and power)
      attack.player_ID = tokenPlayer.player_ID;

      if (tokenPlayer.level == undefined) {throw new HttpErrors[500];}
      attack.level_needed = tokenPlayer.level;

      switch (tokenPlayer.level) { //the power is randomly generated considering the level
        case 0:
          attack.power = Math.floor(Math.random() * (this.constants.l0Max - this.constants.l0Min)) + this.constants.l0Min;
          break;
        case 1:
          attack.power = Math.floor(Math.random() * (this.constants.l1Max - this.constants.l1Min)) + this.constants.l1Min;
          break;
        case 2:
          attack.power = Math.floor(Math.random() * (this.constants.l2Max - this.constants.l2Min)) + this.constants.l2Min;
          break;
        case 3:
          attack.power = Math.floor(Math.random() * (this.constants.l3Max - this.constants.l3Min)) + this.constants.l3Min;
          break;
        case 4:
          attack.power = Math.floor(Math.random() * (this.constants.l4Max - this.constants.l4Min)) + this.constants.l4Min;
          break;
        default:
          attack.power = Math.floor(Math.random() * (this.constants.lxMax - this.constants.lxMin)) + this.constants.lxMin;
      }

      await this.attackRepository.create(attack);
      return this.response.status(201).send();

    } catch (error) {

      if (error.code == 'ER_DUP_ENTRY') {
        throw new HttpErrors.Forbidden(this.constants.attackNameNotValid);
      }

      return this.response.status(parseInt(error.statusCode)).send(this.constants.errorFormat(error.statusCode, error.statusName, error.statusMessage));
    }
  }




  @post('/shop/attacks/{id}/sell', {
    summary: "Sell attack",
    description: "Put to sell one of you attacks in the shop. ",
    responses: {
      '200': {
        description: 'Attack put to sell.',
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
  async sellAttack(
    @param.path.string('id') AttackID: string,
    @param.header.string('Bearer') authorizationHeader: string,
    @requestBody({
      content: {
        'application/json': {
          schema: {type: 'object', properties: {price: {type: 'number'}}, title: 'sell attack'}
        },
      },
    })
    attack: Attacks,
  ): Promise<Response> {
    //BODY______________________________________________________________________
    if (attack.price == undefined) {
      throw new HttpErrors.PreconditionFailed(this.constants.bodyFormat);
    }
    if (attack.price == null || attack.price.toString() == "") {
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
    let infoAttack = await this.attackRepository.find({where: {attack_ID: AttackID}});

    if (infoAttack.length != 1) {
      throw new HttpErrors.NotFound(this.constants.attackNotFound);
    }
    //check if the attack you want to sell, is yours
    if (infoAttack[0].player_ID != tokenPlayer.player_ID) {
      //console.log(this.constants.sellAttackNotYours);
      throw new HttpErrors.Forbidden(this.constants.sellAttackNotYours);

    }

    //check if is already on sale
    if (infoAttack[0].on_sale) {
      throw new HttpErrors.Forbidden(this.constants.alreadyOnSale);
    }


    //DATABASE_PETITION_________________________________________________________
    attack.equipped = false;
    attack.on_sale = true;

    try {
      await this.attackRepository.updateById(AttackID, attack);
      return this.response.status(200).send();

    } catch (error) {
      return this.response.status(parseInt(error.statusCode)).send(this.constants.errorFormat(error.statusCode, error.statusName, error.statusMessage));

    }

  }




  @post('/shop/attacks/{id}/buy', {
    summary: "Buy attack",
    description: "Buy an attack in the shop. <br>You won't be able to buy the attack if you don't have the necessary level",
    responses: {
      '200': {
        description: 'Attack bought',
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
  async buyAttack(
    @param.path.string('id') AttackID: string,
    @param.header.string('Bearer') authorizationHeader: string,
  ): Promise<Response> {

    //AUTH______________________________________________________________________
    if (authorizationHeader == undefined) {
      throw new HttpErrors.Unauthorized(this.constants.tokenRequired);
    }

    const tokenPlayer = await this.tokenChecker.checkTokenIsInDatabase(authorizationHeader);
    if (tokenPlayer == null) {
      throw new HttpErrors.Unauthorized(this.constants.tokenFailure);
    }

    //CHECKS____________________________________________________________________
    let attack = await this.attackRepository.find({where: {attack_ID: AttackID}});

    if (attack.length != 1) {
      throw new HttpErrors.NotFound(this.constants.attackNotFound);
    }

    //check if the attack is on sale
    if (!attack[0].on_sale) {
      throw new HttpErrors.Forbidden(this.constants.notInSell);
    }

    //check if you are the owner of the attack (Don't need coins to buy your own attacks)
    if (attack[0].player_ID != tokenPlayer.player_ID) {

      //check enough coins
      if (tokenPlayer.coins == undefined) {throw new HttpErrors[500];}
      if (tokenPlayer.coins < attack[0].price) {
        throw new HttpErrors.Forbidden(this.constants.notEnoughCoins);
      }

      //check if have enough level
      if (tokenPlayer.level == undefined) {throw new HttpErrors[500];}
      if (tokenPlayer.level < attack[0].level_needed) {
        throw new HttpErrors.Forbidden(this.constants.notEnoughLevel);
      }
    }

    //DATABASE_PETITION_________________________________________________________
    try {

      const playerSells = await this.playerRepository.findById(attack[0].player_ID);

      if (playerSells.player_ID != tokenPlayer.player_ID) {

        //Actualization of coins for the player who sells it.
        if (playerSells.coins == undefined) {throw new HttpErrors[500];}
        await this.playerRepository.updateById(attack[0].player_ID, {coins: playerSells.coins + attack[0].price})

        //actualization of coins for the player who buys it.
        if (tokenPlayer.coins == undefined) {throw new HttpErrors[500];}
        await this.playerRepository.updateById(tokenPlayer.player_ID, {coins: tokenPlayer.coins - attack[0].price});
      }

      //actualization of player's property
      await this.attackRepository.updateById(AttackID, {player_ID: tokenPlayer.player_ID, on_sale: false, price: 0});

      return this.response.status(200).send();

    } catch (error) {
      return this.response.status(parseInt(error.statusCode)).send(this.constants.errorFormat(error.statusCode, error.statusName, error.statusMessage));

    }

  }




  @get('/shop/attacks', {
    summary: "Get buyable attacks",
    description: "Get a list of all the attacks that are on sale.",
    responses: {
      '200': {
        description: 'Array of buyable Attacks',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: "object",
                properties: {
                  attack_ID: {type: "string"},
                  positions: {type: "string"},
                  power: {type: "number"},
                  price: {type: "number"},
                  level_needed: {type: "number"},
                  on_sale: {type: "boolean"},
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
  async findShopAttacks(
    @param.header.string('Bearer') authorizationHeader: string
  ): Promise<Attacks[]> {

    //AUTH______________________________________________________________________
    if (authorizationHeader == undefined) {
      throw new HttpErrors.Unauthorized(this.constants.tokenRequired);
    }

    const tokenPlayer = await this.tokenChecker.checkTokenIsInDatabase(authorizationHeader);
    if (tokenPlayer == null) {
      throw new HttpErrors.Unauthorized(this.constants.tokenFailure);
    }

    //DATABASE_PETITION_________________________________________________________
    const filter: Filter<Attacks> = {
      fields: {
        attack_ID: true,
        positions: true,
        power: true,
        price: true,
        level_needed: true,
        on_sale: true,
      },

      where: {on_sale: true}
    }

    return await this.attackRepository.find(filter);
  }




  @get('/players/{id}/attacks', {
    summary: "Get the attacks from a player",
    description: "Get a list of all the attacks that the player (in the path) has.",
    responses: {
      '200': {
        description: 'Array of a player Attacks',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: "object",
                properties: {
                  attack_ID: {type: "string"},
                  positions: {type: "string"},
                  power: {type: "number"},
                  equipped: {type: "boolean"},
                  on_sale: {type: "boolean"},
                }
              }
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
    }
  })
  async findPlayersAttacks(
    @param.header.string('Bearer') authorizationHeader: string,
    @param.path.string('id') playerID: string
  ): Promise<Attacks[]> {

    //AUTH______________________________________________________________________
    if (authorizationHeader == undefined) {
      throw new HttpErrors.Unauthorized(this.constants.tokenRequired);
    }

    const tokenPlayer = await this.tokenChecker.checkTokenIsInDatabase(authorizationHeader);
    if (tokenPlayer == null) {
      throw new HttpErrors.Unauthorized(this.constants.tokenFailure);
    }

    //DATABASE_PETITION_________________________________________________________
    const filter: Filter<Attacks> = {
      fields: {
        attack_ID: true,
        positions: true,
        power: true,
        equipped: true,
        on_sale: true,
      },

      where: {player_ID: playerID},
    }

    return await this.attackRepository.find(filter);
  }




  @get('/players/attacks', {
    summary: "Get the attacks from your player",
    description: "Get a list of all the attacks that your player has. (Indicated by the token)",
    responses: {
      '200': {
        description: 'Array of a player Attacks',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: "object",
                properties: {
                  attack_ID: {type: "string"},
                  positions: {type: "string"},
                  power: {type: "number"},
                  equipped: {type: "boolean"},
                  on_sale: {type: "boolean"},
                }
              }
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
    }
  })
  @response(200, {
    description: 'Array of Attack model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            type: "object",
            properties: {
              attack_ID: {type: "string"},
              positions: {type: "string"},
              power: {type: "number"},
              equipped: {type: "boolean"},
              on_sale: {type: "boolean"},
            }
          }
        },
      },
    },
  })
  async findPlayerAttacks(
    @param.header.string('Bearer') authorizationHeader: string
  ): Promise<Attacks[]> {

    //AUTH______________________________________________________________________
    if (authorizationHeader == undefined) {
      throw new HttpErrors.Unauthorized(this.constants.tokenRequired);
    }

    const tokenPlayer = await this.tokenChecker.checkTokenIsInDatabase(authorizationHeader);
    if (tokenPlayer == null) {
      throw new HttpErrors.Unauthorized(this.constants.tokenFailure);
    }

    //DATABASE_PETITION_________________________________________________________
    const filter: Filter<Attacks> = {
      fields: {
        attack_ID: true,
        positions: true,
        power: true,
        equipped: true,
        on_sale: true,
      },

      where: {player_ID: tokenPlayer.player_ID},
    }

    return await this.attackRepository.find(filter);
  }




  @patch('/players/attacks/{equip_id}/{unequip_id}', {
    summary: "Substitute equipation between attacks.",
    description: "Unequip an attack to equip another one.",
    responses: {
      '200': {
        description: 'Substitution succeded.',
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
  async equipUnequipAttacks(
    @param.path.string('equip_id') equipAttackID: string,
    @param.header.string('Bearer') authorizationHeader: string,
    @param.path.string('unequip_id', {required: false}) unequipAttackID: string,

  ): Promise<void> {

    //AUTH______________________________________________________________________
    if (authorizationHeader == undefined) {
      throw new HttpErrors.Unauthorized(this.constants.tokenRequired);
    }

    const tokenPlayer = await this.tokenChecker.checkTokenIsInDatabase(authorizationHeader);
    if (tokenPlayer == null) {
      throw new HttpErrors.Unauthorized(this.constants.tokenFailure);
    }

    //CHECKS____________________________________________________________________

    //check if redundant
    if (equipAttackID == unequipAttackID) {
      throw new HttpErrors.Forbidden(this.constants.redundantChange);
    }

    //Find both attacks to check the necessary
    const attacks = await this.attackRepository.find({where: {player_ID: tokenPlayer.player_ID, attack_ID: {inq: [equipAttackID, unequipAttackID]}}});

    //check if attacks are yours
    if (attacks.length != 2) {
      throw new HttpErrors.Forbidden(this.constants.equipUnequipNotYours);
    }

    //differentiation of attacks for better management
    let eAttack, ueAttack;
    if (attacks[0].attack_ID == equipAttackID) {
      eAttack = attacks[0];
      ueAttack = attacks[1];

    } else {
      eAttack = attacks[1];
      ueAttack = attacks[0];
    }

    //check if is already equipped the attack he wants to equip
    if (eAttack.equipped) {
      throw new HttpErrors.Forbidden(this.constants.alreadyEquipped);
    }

    //check if is on sale
    if (eAttack.on_sale) {
      throw new HttpErrors.Forbidden(this.constants.noEquipSale);
    }

    //check if is already unequipped the attack he wants to unequip
    if (!ueAttack.equipped) {
      throw new HttpErrors.Forbidden(this.constants.alreadyUnequipped);
    }

    //DATABASE_PETITION_________________________________________________________
    await this.attackRepository.updateById(unequipAttackID, {equipped: false});
    await this.attackRepository.updateById(equipAttackID, {equipped: true});

  }




  @post('/players/attacks/{equip_id}', {
    summary: "Equip an attack.",
    description: "Equip the attack indicated on the path. <br>You can have a maximum of 3 attacks equipped.",
    responses: {
      '200': {
        description: 'Equipation succeded.',
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
  async equipAttacks(
    @param.path.string('equip_id') equipAttackID: string,
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

    //CHECKS____________________________________________________________________

    //check how many attacks the player has equipped
    const numEquipped: number = (await this.attackRepository.count({player_ID: tokenPlayer.player_ID, equipped: true})).count;
    if (numEquipped >= 3) {
      throw new HttpErrors.Forbidden(this.constants.maxEquipation);
    }

    //Find attack to check
    const eAttack = await this.attackRepository.find({where: {attack_ID: equipAttackID}});

    //Not found
    if (eAttack.length != 1) {
      throw new HttpErrors.NotFound(this.constants.attackNotFound);
    }

    //Not yours
    if (eAttack[0].player_ID != tokenPlayer.player_ID) {
      throw new HttpErrors.Forbidden(this.constants.equipUnequipNotYours);
    }

    //Already equiped
    if (eAttack[0].equipped) {
      throw new HttpErrors.Forbidden(this.constants.alreadyEquipped);
    }

    //On sale
    if (eAttack[0].on_sale) {
      throw new HttpErrors.Forbidden(this.constants.noEquipSale);
    }


    //DATABASE_PETITION_________________________________________________________
    await this.attackRepository.updateById(equipAttackID, {equipped: true});

  }




  @del('/players/attacks/{equip_id}', {
    summary: "Unequip an attack.",
    description: "Unequip the attack indicated on the path",
    responses: {
      '204': {
        description: 'Unequipation succeded.',
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
  async unequipAttacks(
    @param.path.string('equip_id') unequipAttackID: string,
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

    //CHECKS____________________________________________________________________
    const ueAttack = await this.attackRepository.find({where: {attack_ID: unequipAttackID}});

    //Not found
    if (ueAttack.length != 1) {
      throw new HttpErrors.NotFound(this.constants.attackNotFound);
    }

    //Not yours
    if (ueAttack[0].player_ID != tokenPlayer.player_ID) {
      throw new HttpErrors.Forbidden(this.constants.equipUnequipNotYours);
    }

    //already unequipped
    if (!ueAttack[0].equipped) {
      throw new HttpErrors.Forbidden(this.constants.alreadyUnequipped);
    }

    //DATABASE_PETITION_________________________________________________________
    await this.attackRepository.updateById(unequipAttackID, {equipped: false});

  }

}
