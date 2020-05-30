import * as PlayerModel from '../../models/player';

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

type EventData = any; // TODO: specify that

export type ClientEvent = {
  name: ClientEventNames,
  data?: EventData,
}

type ServerEventName = (
  ServerErrorEventNames |
  ServerGameEventNames |
  ClientEventNames // Client event names are sent back in responses
);

export type ServerEvent = {
  name: ServerEventName,
  data?: object,
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
  return { name: ServerErrorEventNames.invalidEventName, data: error };
}

function getResponseEvent(incomingEventName: ClientEventNames, responseData: EventData) {
  return { name: incomingEventName, data: responseData }
}

export function handleEvent(incomingEvent: ClientEvent): ServerEvent {
  const incomingData = incomingEvent.data
  let responseData: EventData;

  try {
    switch (incomingEvent.name) {

      case ClientEventNames.createPlayer:
        const { roomId, playerName } = incomingData;
        if (typeof roomId !== "number" || typeof playerName !== "string") {
          return getBadSchemaEvent();
        }
        responseData = PlayerModel.createPlayer(roomId, playerName);
        break;

      case ClientEventNames.logIn:
        const { token } = incomingData;
        if (typeof token !== "string") {
          return getBadSchemaEvent();
        }
        responseData = PlayerModel.logIn(token);
        break;

      case ClientEventNames.startGame:
        responseData = PlayerModel.startGame();
        break;

      case ClientEventNames.answer:
        const { answer, stage } = incomingData;
        if (typeof answer !== "string" || typeof stage !== "string") {
          return getBadSchemaEvent();
        }
        responseData = PlayerModel.answer(answer, stage);
        break;

      case ClientEventNames.vote:
        const { orderedVotes, stage } = incomingData;
        if (typeof orderedVotes !== "array" || typeof stage !== "string") {
          return getBadSchemaEvent();
        }
        responseData = PlayerModel.answer(orderedVotes, stage);
        break;

      default:
        return getInvalidEventNameEvent();
    }
  } catch (e) {
    return getHandlerErrorEvent(e);
  }

  return getResponseEvent(incomingEvent.name, responseData);
}
