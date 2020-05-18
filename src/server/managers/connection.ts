
import * as WebSocket from 'ws';
import * as EventHandler from './event';

// Memory store

let connectionCount = 0;
const connections: { [key: string]: WebSocket } = {};

function generateConnectionId() {
  return connectionCount++;
}

// Types

type GameMessage = {
  requestId: number,
  isResponse: boolean,
  event: EventHandler.EventPayload,
}

function isMessageValid(message: object): message is GameMessage {
  return true;
}

// Internal Handlers

function handleMessage(rawMessage: string) {
  let response: GameMessage;

  try {
    const message = JSON.parse(rawMessage);

    if (!isMessageValid(message)) {
      response = {
        requestId: message.requestId || null,
        isResponse: true,
        event: EventHandler.getBadSchemaEventPayload()
      }
    }

    response = {
      requestId: message.requestId,
      isResponse: true,
      event: EventHandler.handleEvent(message.event),
    }
  } catch {
    response = {
      requestId: null,
      isResponse: true,
      event: EventHandler.getParseFailedEventPayload()
    }
  }

  this.send(JSON.stringify(response));
}

function handleClose(id: number) {
  delete connections[id];
}

function handleError(id: number) {
  handleClose(id);
}

// Server interface

export function handleConnection(ws: WebSocket) {
  const id = generateConnectionId();
  connections[id] = ws;

  ws.on('message', (message: string) => handleMessage(message));
  ws.on('close', (event: CloseEvent) => handleClose(id));
  ws.on('error', (event: ErrorEvent) => handleError(id));
}

// Application interface

export function sendMessage(
  connectionId: number,
  event: EventHandler.EventPayload,
  requestId: number
) {
  const message = {
    requestId,
    isResponse: false,
    event
  }

  const serializedMessage = JSON.stringify(message);

  const ws = connections[connectionId];

  if (!ws) {
    throw new Error("ConnectionIdNotFound");
  }

  ws.send(serializedMessage);
}