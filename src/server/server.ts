import * as WebSocket from 'ws';

import * as MessageHandlers from './message-handlers';
 
const wss = new WebSocket.Server({ port: 8080 })
 
wss.on('connection', ws => {
  ws.on('message', (message) => MessageHandlers.handleMessage(message));
  
})