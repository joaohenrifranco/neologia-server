import * as WebSocket from 'ws';

import * as ConnectionManager from './connection';

const port = 8080;

const wss = new WebSocket.Server({ port });

wss.on('connection', ConnectionManager.handleConnection);

console.log(`Listening at ${port}`)