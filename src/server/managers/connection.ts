
import * as WebSocket from 'ws';
import * as MessageManager from './message';

// Store

let connectionCount = 0;
const connections: {[key: string]: WebSocket} = {};

function generateConnectionId() {
  return connectionCount++;
}

// Internal Handlers

function handleMessage(rawMessage: string) {
  const response = MessageManager.getResponseMessage(rawMessage);
  this.send(JSON.stringify(response));
}

function handleClose(id: number) {
  delete connections[id];
}

function handleError(id: number) {
  handleClose(id);
}

// Exports

export function sendMessage(id: number, message: string) {
  const ws = connections[id];

  if (!ws) {
    // TODO: Implement sendMessage and connect it to store and models
  }
}

export function handleConnection(ws: WebSocket) {
  const id = generateConnectionId();
  connections[id] = ws;

  ws.on('message', (message: string) => handleMessage(message));
  ws.on('close', (event: CloseEvent) => handleClose(id));
  ws.on('error', (event: ErrorEvent) => handleError(id));
}