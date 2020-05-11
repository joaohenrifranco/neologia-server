// Types
export type EventPayload = {
    name: EventName,
    data?: object,
}

export enum ErrorEvent {
  badSchema = 'ERROR_BAD_SCHEMA',
  parseFailed = "ERROR_PARSE_FAILED",
}

export type EventName = ErrorEvent;

// Pre-handled events 
export function getBadSchemaEventPayload(): EventPayload {
  return { name: ErrorEvent.badSchema}
}

export function getParseFailedEventPayload(): EventPayload {
  return { name: ErrorEvent.parseFailed }
}

// Handlers
export function handleEvent(event: EventPayload): EventPayload {
  return event;
}
