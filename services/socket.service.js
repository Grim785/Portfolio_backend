const WebSocket = require('ws');

const socketService = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', (message) => {
      console.log('received: %s', message);
    });
    ws.send('Welcome to the WebSocket server');
  });
};

module.exports = socketService;