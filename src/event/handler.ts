import * as PlayerModel from 'game/player';
import * as EventBuilder from './builder';
import { ServerEvent, ClientEvent, ClientEventNames } from './type';

function authConnection(connectionId: number) {
  const playerId = PlayerModel.getPlayerByConnection(connectionId);

  return playerId;
}

function createPlayer(connectionId: number, incomingPayload: any) {
  const { playerName } = incomingPayload;

  if (typeof playerName !== 'string') {
    throw new Error('CREATE_PLAYER_BAD_DATA');
  }

  return {
    token: PlayerModel.createPlayer(playerName, connectionId),
  };
}

function logIn(connectionId: number, incomingPayload: any) {
  const { token } = incomingPayload;

  if (typeof token !== 'string') {
    throw new Error('LOG_IN_BAD_DATA');
  }

  return {
    token: PlayerModel.logIn(token, connectionId),
  };
}

function enterRoom(incomingPayload: any, playerId: number) {
  // const { roomId } = incomingPayload;

  // if (typeof roomId !== 'string') {
  //   throw new Error('ENTER_ROOM_BAD_DATA');
  // }

  return {
  };
}

function noOp(incomingPayload: any, playerId: number) {
  return {};
}

const handlers: {
  [T in ClientEventNames]: (incomingPayload: any, connectionId: number) => object;
} = {
  CREATE_PLAYER: createPlayer,
  LOG_IN: logIn,
  ENTER_ROOM: (payload, connId) => enterRoom(payload, authConnection(connId)),
  START_GAME: noOp,
  ANSWER: noOp,
  VOTE: noOp,
};

export function handleEvent(incomingEvent: ClientEvent, connectionId: number): ServerEvent {
  const incomingPayload = incomingEvent.payload;
  const eventhandlers = handlers[incomingEvent.name];

  if (typeof eventhandlers !== 'function') {
    return EventBuilder.invalidEventNameEvent();
  }

  try {
    const responsePayload = eventhandlers(connectionId, incomingPayload);
    return EventBuilder.responseEvent(incomingEvent.name, responsePayload);
  } catch (error) {
    return EventBuilder.handlerErrorEvent(error.message);
  }
}
