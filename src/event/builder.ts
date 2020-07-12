import { ServerEvent, ClientEventNames, ServerErrorEventNames } from './type';

export function badSchemaEvent(): ServerEvent {
  return { name: ServerErrorEventNames.badSchema };
}

export function parseFailedEvent(): ServerEvent {
  return { name: ServerErrorEventNames.parseFailed };
}

export function invalidEventNameEvent(): ServerEvent {
  return { name: ServerErrorEventNames.invalidEventName };
}

export function handlerErrorEvent(error: Error): ServerEvent {
  return { name: ServerErrorEventNames.internalError, payload: error };
}

export function responseEvent(
  incomingEventName: ClientEventNames,
  responsePayload: object
): ServerEvent {
  return { name: incomingEventName, payload: responsePayload };
}
