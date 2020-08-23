import * as EventBuilder from './event-builder';

import Authenticator from '../account/authenticator';
import { Event, Command, CommandName, AccountCommandNames } from './types';

// const handlers: { [T in CommandName]: (playerId: number, payload: object) => Event } = {
//   ENTER_ROOM: enterRoom,
// };

function logIn(payload: any, connectionId: number): Event {
  const result = Authenticator.logIn(payload, connectionId);
  if (result.error) {
    return EventBuilder.fail(result);
  }
  return EventBuilder.success(result);
}

function register(payload: any, connectionId: number): Event {
  const result = Authenticator.register(payload, connectionId);
  if (result.error) {
    return EventBuilder.fail(result);
  }
  return EventBuilder.success(result);
}

function isAuthCommand(commandName: string) {
  return (Object.values(AccountCommandNames)).includes(<AccountCommandNames>commandName);
}

function dispatchAuthCommand(command: Command, connectionId: number): Event {
  if (command.name === AccountCommandNames.logIn) {
    return logIn(command.payload, connectionId);
  }
  if (command.name === AccountCommandNames.createPlayer) {
    return register(command.payload, connectionId);
  }
}

function dispatchCommand(command: Command, connectionId: number): Event {
  if (!command) {
    return EventBuilder.badSchema();
  }

  if (isAuthCommand(command.name)) {
    console.log("auth")
    return dispatchAuthCommand(command, connectionId);
  }

  console.log("not auth")
  const result = Authenticator.getPlayerByConnection(connectionId);

  if (result.error || typeof result.playerId !== 'number') {
    return EventBuilder.loggedOut();
  }

  // const handleCommand = handlers[command.name];

//   if (typeof handleCommand !== 'function') {
//     return EventBuilder.invalidEventName();
//   }

//   return handleCommand(result.playerId, command.payload);
}

export default { dispatchCommand }
