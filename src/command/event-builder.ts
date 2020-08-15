import { ServerEvent, ServerErrorEventNames, ServerEventName } from './types';

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

export function noOp(): ServerEvent {
  return { name: ServerErrorEventNames.notImplemented, payload: { warn: 'Not implemented' } };
}

export function responseEvent(
  incomingEventName: ServerEventName,
  responsePayload: object
): ServerEvent {
  return { name: incomingEventName, payload: responsePayload };
}
