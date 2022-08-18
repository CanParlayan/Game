var socket = io();

$(function() {
  var url = 'multiplayer.html';
  /**
   * Successfully connected to server event
   */
  socket.on('connect', function() {
    console.log('Connected to server.');
    $('#disconnected').hide();
    $('#waiting-room').show();
  });

  /**
   * Disconnected from server event
   */
  socket.on('disconnect', function() {
    console.log('Disconnected from server.');
    $('#waiting-room').hide();
    $('#game').hide();
    $('#disconnected').show();
  });

  /**
   * User has joined a game
   */
  socket.on('join', function(gameId) {
    $('#waiting-room').hide();
    window.location.href = 'multiplayer.html';
    Game.initGame();
    $('#messages').empty();
    $('#disconnected').hide();
    $('#game-number').html(gameId);
  });

  /**
   * Game chat message
   */
  socket.on('chat', function(msg) {
    $('#messages').append('<li><strong>' + msg.name + ':</strong> ' + msg.message + '</li>');
    $('#messages-list').scrollTop($('#messages-list')[0].scrollHeight);
  });

  /**
   * Game notification
   */
  socket.on('notification', function(msg) {
    $('#messages').append('<li>' + msg.message + '</li>');
    $('#messages-list').scrollTop($('#messages-list')[0].scrollHeight);
  });

  /**
   * Change game status to game over
   */
  socket.on('gameover', function(isWinner) {
    Game.setGameOver(isWinner);
  });
  
  /**
   * Leave game and join waiting room
   */
  socket.on('leave', function() {
    $('#game').hide();
    $('#waiting-room').show();
  });

  /**
   * Send chat message to server
   */
  $('#message-form').submit(function() {
    socket.emit('chat', $('#message').val());
    $('#message').val('');
    return false;
  });

});

/**
 * Send leave game request
 * @param {type} e Event
 */
function sendLeaveRequest(e) {
  e.preventDefault();
  socket.emit('leave');
}

/**
 * Send shot coordinates to server
 * @param {type} square
 */
function sendShot(square) {
  socket.emit('shot', square);
}
