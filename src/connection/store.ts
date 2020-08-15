import * as WebSocket from 'ws';

// In memory store
let connectionCount = 0;
const connections: { [key: string]: WebSocket } = {};

function generateConnectionId() {
  return connectionCount++;
}

function storeConnection(ws: WebSocket) {
  const connectionId = generateConnectionId();
  connections[connectionId] = ws;
  return connectionId;
}

function removeConnection(connectionId: number) {
  delete connections[connectionId];
}

function getConnection(connectionId: number) {
  return connections[connectionId];
}

export { storeConnection, removeConnection, getConnection };
