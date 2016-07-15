'use strict';

import * as settings from './settings';
var io = require('socket.io')(settings.PORT);

var chat = io
  .of('/chat')
  .on('connection', socket => {
    console.log('connected');

    socket.emit('create a room');

    socket
      .on('a message', data => {
        var room = data.room;
        var message = data.message;
        socket.to(room).broadcast.emit('a message', message);
      })
      .on('join a room', data => {
        socket.join(data.room);
      })
      .on('disconnect', () => {
        console.log('disconnect');
      });
  })
;
