import * as PlayerModel from 'game/player';
import * as EventBuilder from './event-builder';
import { ServerEvent, Command, CommandNames, ServerEventName } from './types';

function authConnection(connectionId: number) {
  const playerId = PlayerModel.getPlayerByConnection(connectionId);

  return playerId;
}

function enterRoom(incomingPayload: any, playerId: number) {
  // const { roomId } = incomingPayload;

  // if (typeof roomId !== 'string') {
  //   throw new Error('ENTER_ROOM_BAD_DATA');
  // }

  return EventBuilder.noOp();
}

function noOp(command: Command) {
  return EventBuilder.noOp();
}

const handlers: {[T in CommandNames]: (payload: object) => ServerEvent;} = {
  ENTER_ROOM: (payload, connId) => enterRoom(payload, authConnection(connId)),
  START_GAME: noOp,
  ANSWER: noOp,
  VOTE: noOp,
};

export function dispatchCommand(command: Command): ServerEvent {
  if (!command) {
    return EventBuilder.badSchemaEvent();
  }
  const handleCommand = handlers[command.name];
  
  if (typeof handleCommand !== 'function') {
    return EventBuilder.invalidEventNameEvent();
  }
  
  return handleCommand(command.payload);
}
