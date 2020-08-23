import { Event, ExceptionEventNames, EventName, ResponseEventNames } from './types';

function badSchema(): Event {
  return { name: ExceptionEventNames.badSchema };
}

function parseFailed(): Event {
  return { name: ExceptionEventNames.parseFailed };
}

function invalidEventName(): Event {
  return { name: ExceptionEventNames.invalidEventName };
}

function loggedOut(): Event {
  return { name: ExceptionEventNames.loggedOut };
}

function internalError(error: string): Event {
  return {
    name: ExceptionEventNames.internalError,
    payload: { error },
  };
}

function success(payload: object): Event {
  return {
    name: ResponseEventNames.success,
    payload
  }
}

function fail(payload: object): Event {
  return {
    name: ResponseEventNames.fail,
    payload
  }
}

function createEvent(incomingEventName: EventName, responsePayload: object): Event {
  return { name: incomingEventName, payload: responsePayload };
}

export default {
  badSchema,
  parseFailed,
  invalidEventName,
  loggedOut,
  internalError,
  success,
  fail
}
