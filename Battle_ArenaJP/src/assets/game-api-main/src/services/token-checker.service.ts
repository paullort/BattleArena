import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {PlayerRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class TokenCheckerService {
  constructor(
    @repository(PlayerRepository) private playerRepository: PlayerRepository
  ) { }

  async checkTokenIsInDatabase(valor: string) {
    // Realiza una consulta a la base de datos para verificar si el valor existe
    //console.log('service', valor);
    const players = await this.playerRepository.find({
      where: {token: valor},
    });

    if(players.length == 1){
      return players[0];
    }

    return null;
  }
  /*
   * Add service methods here
   */
}
