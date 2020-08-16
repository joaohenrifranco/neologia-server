import { Event, ExceptionEventNames, EventName, ResponseEventNames } from './types';

export function badSchema(): Event {
  return { name: ExceptionEventNames.badSchema };
}

export function parseFailed(): Event {
  return { name: ExceptionEventNames.parseFailed };
}

export function invalidEventName(): Event {
  return { name: ExceptionEventNames.invalidEventName };
}

export function loggedOut(): Event {
  return { name: ExceptionEventNames.loggedOut };
}

export function internalError(error: string): Event {
  return {
    name: ExceptionEventNames.internalError,
    payload: { error },
  };
}

export function success(payload: object): Event {
  return {
    name: ResponseEventNames.success,
    payload
  }
}

export function fail(payload: object): Event {
  return {
    name: ResponseEventNames.fail,
    payload
  }
}

export function createEvent(incomingEventName: EventName, responsePayload: object): Event {
  return { name: incomingEventName, payload: responsePayload };
}
