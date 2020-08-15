import * as WebSocket from 'ws';
import * as ConnectionHandler from './connection/handler';

const port = 8080;
const wss = new WebSocket.Server({ port });

wss.on('connection', ConnectionHandler.handleConnection);

console.log(`Listening to websocket connections at ${port}...`)