const io = require('socket.io')();
const event = require('../eventemitter/eventemitter');

const createSocketConnection = (httpServer) => {
  io.attach(httpServer, {
    cors: {
      origin: '*',
    }
  });
  console.log('socketIO attached');
  event.emit('socketServerStarted', io);
}

event.on('serverStarted', createSocketConnection);
