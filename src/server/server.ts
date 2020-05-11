import * as WebSocket from 'ws';

import * as MessageHandler from './message-handler';

const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', (ws: WebSocket) => {
  ws.on('message', (message: string, ws: WebSocket) => MessageHandler.handleRawMessage(message, ws));
})