import * as WebSocket from 'ws';

import * as ConnectionManager from './connection';

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ConnectionManager.handleConnection);