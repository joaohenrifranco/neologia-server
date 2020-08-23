import EventBuilder from './event-builder';

import Authenticator from '../account/authenticator';
import { Event, Command, AccountCommandNames } from './types';

function isAuthCommand(commandName: string) {
  return Object.values(AccountCommandNames).includes(<AccountCommandNames>commandName);
}

function register(payload: any, connectionId: number): Event {
  const result = Authenticator.register(payload, connectionId);
  if (result.error) {
    return EventBuilder.fail(result);
  }
  return EventBuilder.success(result);
}

function logIn(payload: any, connectionId: number): Event {
  const result = Authenticator.logIn(payload, connectionId);
  if (result.error) {
    return EventBuilder.fail(result);
  }
  return EventBuilder.success(result);
}

function dispatchAuthCommand(command: Command, connectionId: number): Event {
  if (command.name === AccountCommandNames.logIn) {
    return logIn(command.payload, connectionId);
  }
  if (command.name === AccountCommandNames.createPlayer) {
    return register(command.payload, connectionId);
  }
}


export default { dispatchAuthCommand, isAuthCommand }
