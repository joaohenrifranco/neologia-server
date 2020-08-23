import * as WebSocket from 'ws';

import * as ConnectionValidators from './validators';
import * as ConnectionStore from './store';
import { ServerMessage, ClientMessage } from './types';

import Dispatcher from '../dispatcher/dispatcher';
import { Event } from '../dispatcher/types';

function buildServerMessage(requestId: number, event: Event): ServerMessage {
  return { requestId, event };
}

function sendMessage(connectionId: number, message: ServerMessage) {
  const serializedMessage = JSON.stringify(message);
  const ws = ConnectionStore.getConnection(connectionId);
  if (!ws) {
    console.log('Connection not found!');
    return;
  }
  ws.send(serializedMessage);
}

function parseMessage(rawMessage: string): ClientMessage | undefined {
  try {
    const message = JSON.parse(rawMessage);
    if (!ConnectionValidators.isClientMessageValid(message)) {
      return undefined;
    }
    return message;
  } catch(e) {
    return undefined;
  }
}

function handleMessage(rawMessage: string, connectionId: number) {
  const clientMessage = parseMessage(rawMessage);
  const Event = Dispatcher.dispatchCommand(clientMessage?.command, connectionId);
  const responseMessage = buildServerMessage(clientMessage?.requestId, Event);

  sendMessage(connectionId, responseMessage);
}

function handleClose(id: number) {
  ConnectionStore.removeConnection(id);
}

function handleError(id: number) {
  handleClose(id);
}

function handleConnection(ws: WebSocket) {
  const connectionId = ConnectionStore.storeConnection(ws);
  ws.on('message', (message: string) => handleMessage(message, connectionId));
  ws.on('close', (event: CloseEvent) => handleClose(connectionId));
  ws.on('error', (event: ErrorEvent) => handleError(connectionId));
}

export { sendMessage, handleConnection };
