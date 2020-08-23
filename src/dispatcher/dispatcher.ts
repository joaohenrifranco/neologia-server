import EventBuilder from './event-builder';

import Authenticator from '../account/authenticator';
import AuthDispatcher from './auth-dispatcher';
import GameDispatcher from './game-dispatcher';
import { Event, Command, CommandName, AccountCommandNames, GameCommandNames } from './types';

const gameHandlers: { [T in GameCommandNames]: (playerId: number, payload: object) => Event } = {
  ENTER_ROOM: GameDispatcher.enterRoom,
};

function dispatchCommand(command: Command, connectionId: number): Event {
  if (!command) {
    return EventBuilder.badSchema();
  }

  if (AuthDispatcher.isAuthCommand(command.name)) {
    return AuthDispatcher.dispatchAuthCommand(command, connectionId);
  }

  const result = Authenticator.getPlayerByConnection(connectionId);

  if (result.error || typeof result.playerId !== 'number') {
    return EventBuilder.loggedOut();
  }

  const handleGameCommand = gameHandlers[<GameCommandNames>command.name];

  if (typeof handleGameCommand !== 'function') {
    return EventBuilder.invalidEventName();
  }

  return handleGameCommand(result.playerId, command.payload);
}

export default { dispatchCommand }
