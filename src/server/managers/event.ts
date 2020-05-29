// Enums

enum ServerErrorEventNames {
  badSchema = 'ERROR_BAD_SCHEMA',
  parseFailed = "ERROR_PARSE_FAILED",
  invalidEventName = "ERROR_INVALID_EVENT_NAME"
};

enum ServerResponseEventNames {};

enum ServerMessageEventNames {};

enum ClientEventName {
  newUser = 'NEW_USER',
  parseFailed = "ERROR_PARSE_FAILED",
};

// Types

type ServerEventName = (
    ServerErrorEventNames | 
    ServerResponseEventNames | 
    ServerMessageEventNames
  );

export type ClientEvent = {
  name: ClientEventName,
  data?: object,
}

export type ServerEvent = {
  name: ServerEventName,
  data?: object,
}

export function isClientEventValid(event: any): event is ClientEvent {
  // TODO: this dynamic type checker
  return true;
}

// Connection error events

export function getBadSchemaEventPayload(): ServerEvent {
  return { name: ServerErrorEventNames.badSchema}
}

export function getParseFailedEventPayload(): ServerEvent {
  return { name: ServerErrorEventNames.parseFailed }
}

// Handler

export function handleEvent(event: ClientEvent): ServerEvent {
  // TODO: basic event handling
  switch(event.name) {
    case ClientEventName.newUser:
      return;
    default:
      return {name: ServerErrorEventNames.invalidEventName};
  }
}
