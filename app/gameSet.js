var Player = require('./player.js');
var GameStatus = require('./gameStatus.js');
/**
 * Game constructor
 * @param {type} id Game ID
 * @param {type} idPlayer1 Socket ID of player 1
 * @param {type} idPlayer2 Socket ID of player 2
 */
function Game(id, idPlayer1, idPlayer2) {
  this.id = id;
  this.currentPlayer = Math.floor(Math.random() * 2);
  this.winningPlayer = null;
  this.gameStatus = GameStatus.inProgress;

  this.players = [new Player(idPlayer1), new Player(idPlayer2)];
}

/**
 * Get socket ID of player
 * @param {type} player
 * @returns {undefined}
 */
Game.prototype.getPlayerId = function(player) {
  return this.players[player].id;
};

/**
 * Get socket ID of winning player
 * @returns {Game.prototype@arr;players@pro;id}
 */
Game.prototype.getWinnerId = function() {
  if(this.winningPlayer === null) {
    return null;
  }
  return this.players[this.winningPlayer].id;
};

/**
 * Get socket ID of losing player
 * @returns {Game.prototype@arr;players@pro;id}
 */
Game.prototype.getLoserId = function() {
  if(this.winningPlayer === null) {
    return null;
  }
  var loser = this.winningPlayer === 0 ? 1 : 0;
  return this.players[loser].id;
};

/**
 * Switch turns
 */

/**
 * Abort game
 * @param {Number} player Player who made the request
 */
Game.prototype.abortGame = function(player) {
  // give win to opponent
  this.gameStatus = GameStatus.gameOver;
  this.winningPlayer = player === 0 ? 1 : 0;
}

/**
 * Fire shot for current player
 * @returns {boolean} True if shot was valid
 * @param player
 * @param gridOwner
 */
Game.prototype.getGameState = function(player, gridOwner) {
  return {
    turn: this.currentPlayer === player,                 // is it this player's turn?
    gridIndex: player === gridOwner ? 0 : 1,             // which client grid to update (0 = own, 1 = opponent)
  };
};

    // Check if game

/**
 * Get game state update (for one grid).
 * @param {Number} player Player who is getting this update
 * @param {Number} gridOwner Player whose grid state to update
 * @returns {Game.prototype.getGameState.GameAnonym$0}
 */

module.exports = Game;



