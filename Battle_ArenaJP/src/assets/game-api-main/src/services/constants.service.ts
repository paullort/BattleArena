import { /* inject, */ BindingScope, injectable} from '@loopback/core';

@injectable({scope: BindingScope.TRANSIENT})
export class ConstantsService {

  //______________________VALUES________________________________________________
  //Attacks range power
  readonly l0Max = 5; readonly l0Min = 2;
  readonly l1Max = 8; readonly l1Min = 5;
  readonly l2Max = 11; readonly l2Min = 8;
  readonly l3Max = 14; readonly l3Min = 11;
  readonly l4Max = 17; readonly l4Min = 14;
  readonly lxMax = 30; readonly lxMin = 17;

  //game creation
  readonly minHpGame = 15;
  readonly maxArenaSize = 10;
  readonly minArenaSize = 2;

  //game win-loose
  readonly winXPExtra = 50;
  readonly winCoinsExtra = 20;



  //______________________ERROR___MESSAGES______________________________________
  readonly emptyForm = "Can't have empty information";
  readonly bodyFormat = "Body format incorrect"

  //AUTH________________________________________________________________________
  readonly tokenRequired = 'Authentication required: Invalid user';
  readonly tokenFailure = 'Authentication failed: Invalid user';

  //PLAYERS_____________________________________________________________________
  readonly joinFailure = "Incorrect username or password";
  readonly usernameNotValid = "This username is already in use";

  //ATTACKS_____________________________________________________________________
  readonly positionsFormatError = "positions must have this format: '(x,y)', being x (positive) and y a one digit integer.";
  readonly attackNameNotValid = "There is already an attack named like this";
  readonly attackNotFound = "There isn't an attack named like this.";

  //shop
  readonly sellAttackNotYours = "You can't sell attacks that aren't yours";
  readonly alreadyOnSale = "You can't sell what is already on sale";
  readonly notEnoughCoins = "Not enough coins to buy it";
  readonly notInSell = "You can't buy what is not on sale";
  readonly notEnoughLevel = "";

  //equip - unequip
  readonly redundantChange = "No sense to change as it is the same attack.";
  readonly alreadyEquipped = "You can't equip what you have already equipped";
  readonly alreadyUnequipped = "You can't unequip what you have already unequipped";
  readonly noEquipSale = "You can't equip what you have on sale";
  readonly equipUnequipNotYours = "You cant equip/unequip what is not yours";
  readonly maxEquipation = "You can't have more than 3 attacks equipped";

  //game
  readonly cantUseNotYours = "You can't use an attack that isn't yours";
  readonly cantUseNoEquipped = "You can't use an attack that you haven't equipped";

  //GAMES_______________________________________________________________________
  readonly gameNotFound = "There is no game with that name";

  //creation
  readonly minimumHP = "The minimum HP must be 15 points";
  readonly mazimumSize = "The maximum arena size is 10 cells";
  readonly minimumSize = "The minimum arena size is 2 cells";
  readonly alreadyInGameCreation = "You cannot create a game if you are already in a game";

  //enter-leave, move-direction, attack
  readonly alreadyInGameEnter = "You cannot enter a game if you are already in a game";
  readonly deleteInGame = "You cannot delete your profile while you are playing a game";
  readonly gamePlenty = "This game has already 2 players";
  readonly gameFinished = "The game has already finished";
  readonly beGamePlayer = "You must be player of the game";
  readonly notInGame = "You are not currently in a game";
  readonly notStarted = "The game hasn't started yet";
  readonly movementDirection = "You just can move/look at this directions: [up, down, left, right]";

  moveDescriptionLog(playerID: string, movement: string, oldX: number, oldY: number, x: number, y: number): string {
    return "'" + playerID + "' moves " + movement + " (" + oldX + "," + oldY + ") -> (" + x + "," + y + ")";
  }

  moveLimitDescriptionLog(playerID: string, movement: string, x: number, y: number): string {
    return "'" + playerID + "' tries to move " + movement + " but reaches the arena limit " + "(" + x + "," + y + ")";
  }

  //ERRORS______________________________________________________________________
  //500
  readonly notLevel = "No level assigned to the player";
  readonly notCoins = "No coins assigned to the player";
  readonly undefinedCoinsXP = "No coins or XP assigned to a player";
  errorFormat(statusCode: string, statusName: string, statusMessage: string): string {
    return '\{\n\t"error": \{\n\t\t"statusCode": ' + statusCode + '\,\n\t\t"name": "' + statusName + '"\,\n\t\t"message": "' + statusMessage + '"\n\t\}\n\}';
  }

  /*
   * Add service methods here
   */
}
