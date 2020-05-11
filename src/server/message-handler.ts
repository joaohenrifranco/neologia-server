import * as WebSocket from 'ws';

import * as EventHandler from './event-handler';

export type Message = {
  requestId: number,
  isResponse: boolean,
  event: EventHandler.EventPayload,
}

function isMessageValid(message: object): message is Message {
  return true;
}

function getResponseMessage(rawMessage: string): Message {
  try {
    const message = JSON.parse(rawMessage);

    if (!isMessageValid(message)) {
      return {
        requestId: message.requestId || null,
        isResponse: true,
        event: EventHandler.getBadSchemaEventPayload()
      }
    }

    return {
      requestId: message.requestId,
      isResponse: true,
      event: EventHandler.handleEvent(message.event),
    }
  } catch {
    return {
      requestId: null,
      isResponse: true,
      event: EventHandler.getParseFailedEventPayload()
    }
  }
}

export function sendMessage(requestId: number, event: EventHandler.EventPayload, ws: WebSocket) {
  const message = {
    requestId,
    isResponse: false,
    event
  }

  const rawMessage = JSON.stringify(message)
  
  ws.send(rawMessage);
}

export function handleRawMessage(rawMessage: string, ws: WebSocket) {
  const response: Message = getResponseMessage(rawMessage);
  ws.send(JSON.stringify(response));
}