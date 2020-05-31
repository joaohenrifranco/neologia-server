import * as PlayerModel from '../game/player';

enum ServerErrorEventNames {
  badSchema = 'ERROR_BAD_SCHEMA',
  parseFailed = "ERROR_PARSE_FAILED",
  invalidEventName = 'ERROR_INVALID_EVENT_NAME',
  handlerError = "ERROR_HANDLER",
};

enum ServerGameEventNames {
  youAreHost = 'YOU_ARE_HOST',
  updateAllPlayers = 'UPDATE_ALL_PLAYERS',
  updateStage = 'UPDATE_STAGE',
  stageResults = 'STAGE_RESULTS',
  gameOver = 'GAME_OVER'
};

enum ClientEventNames {
  createPlayer = 'CREATE_PLAYER',
  logIn = 'LOG_IN',
  startGame = 'START_GAME',
  answer = 'ANSWER',
  vote = 'VOTE',
};

export type ClientEvent = {
  name: ClientEventNames,
  payload?: object,
}

type ServerEventName = (
  ServerErrorEventNames |
  ServerGameEventNames |
  ClientEventNames // Client event names are sent back in responses
);

export type ServerEvent = {
  name: ServerEventName,
  payload?: object,
}

export function isClientEventValid(event: any): event is ClientEvent {
  // TODO: this dynamic type checker
  return true;
}

export function getBadSchemaEvent(): ServerEvent {
  return { name: ServerErrorEventNames.badSchema };
}

export function getParseFailedEvent(): ServerEvent {
  return { name: ServerErrorEventNames.parseFailed };
}

function getInvalidEventNameEvent(): ServerEvent {
  return { name: ServerErrorEventNames.invalidEventName };
}

function getHandlerErrorEvent(error: Error): ServerEvent {
  return { name: ServerErrorEventNames.invalidEventName, payload: error };
}

function getResponseEvent(
  incomingEventName: ClientEventNames,
  responsePayload: object
  ): ServerEvent {
    return { name: incomingEventName, payload: responsePayload }
}

export function handleEvent(incomingEvent: ClientEvent, connectionId: number): ServerEvent {
  const incomingPayload = incomingEvent.payload

  let responsePayload;

  try {
    switch (incomingEvent.name) {
      case ClientEventNames.createPlayer:
        responsePayload = PlayerModel.createPlayer(incomingPayload, connectionId);
        break;

      case ClientEventNames.logIn:
        responsePayload = PlayerModel.logIn(incomingPayload, connectionId);
        break;

      case ClientEventNames.startGame:
        responsePayload = PlayerModel.startGame(connectionId);
        break;

      case ClientEventNames.answer:
        responsePayload = PlayerModel.answer(incomingPayload, connectionId);
        break;

      case ClientEventNames.vote:
        responsePayload = PlayerModel.answer(incomingPayload, connectionId);
        break;

      default:
        return getInvalidEventNameEvent();
    }
  } catch (error) {
    return getHandlerErrorEvent(error);
  }

  return getResponseEvent(incomingEvent.name, responsePayload);
}
