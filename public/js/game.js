var GameStatus = {
  inProgress: 1,
  gameOver: 2
}

var Game = (function() {


  function initGame() {
    var i;
    gameStatus = GameStatus.inProgress;
  }
  function setGameOver(isWinner) {
    gameStatus = GameStatus.gameOver;
    turn = false;
    
    if(isWinner) {
      $('#turn-status').removeClass('alert-opponent-turn').removeClass('alert-your-turn')
              .addClass('alert-winner').html('You won! <a href="#" class="btn-leave-game">Play again</a>.');
    } else {
      $('#turn-status').removeClass('alert-opponent-turn').removeClass('alert-your-turn')
              .addClass('alert-loser').html('You lost. <a href="#" class="btn-leave-game">Play again</a>.');
    }
    $('.btn-leave-game').click(sendLeaveRequest);
  }

  /*
   * Draw a grid with squares, ships and shot marks
   */
  Game.prototype.getGameState = function(player, gridOwner) {
    return {
      turn: this.currentPlayer === player,                 // is it this player's turn?
      gridIndex: player === gridOwner ? 0 : 1,             // which client grid to update (0 = own, 1 = opponent)
    };
  };



  return {
    'initGame': initGame,
    'updateGrid': updateGrid,
    'setTurn': setTurn,
    'setGameOver': setGameOver
  };
})
