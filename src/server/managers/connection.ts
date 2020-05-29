
import * as WebSocket from 'ws';
import * as EventHandler from './event';

// Connection store

let connectionCount = 0;
const connections: { [key: string]: WebSocket } = {};

function generateConnectionId() {
  return connectionCount++;
}

// Types

type ClientMessage = {
  requestId: number,
  event: EventHandler.ClientEvent,
}

type ServerMessage = {
  requestId: number,
  event: EventHandler.ServerEvent,
}

function isClientMessageValid(message: any): message is ClientMessage {
  return (
    message &&
    typeof message.requestId === "number" &&
    EventHandler.isClientEventValid(message.event)
  )
}

// Internal Handlers

function handleMessage(rawMessage: string) {
  let response: ServerMessage;

  try {
    const message = JSON.parse(rawMessage);

    if (!isClientMessageValid(message)) {
      response = {
        requestId: message.requestId || null,
        event: EventHandler.getBadSchemaEventPayload()
      }
    }

    response = {
      requestId: message.requestId,
      event: EventHandler.handleEvent(message.event),
    }
  } catch {
    response = {
      requestId: null,
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
  event: EventHandler.ServerEvent,
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