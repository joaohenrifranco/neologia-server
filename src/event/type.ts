export enum ServerErrorEventNames {
  badSchema = 'ERROR_BAD_SCHEMA',
  parseFailed = 'ERROR_PARSE_FAILED',
  invalidEventName = 'ERROR_INVALID_EVENT_NAME',
  handlerError = 'ERROR_HANDLER',
}
export enum ServerGameEventNames {
  youAreHost = 'YOU_ARE_HOST',
  updateAllPlayers = 'UPDATE_ALL_PLAYERS',
  updateStage = 'UPDATE_STAGE',
  stageResults = 'STAGE_RESULTS',
  gameOver = 'GAME_OVER',
}

export enum ClientEventNames {
  createPlayer = 'CREATE_PLAYER',
  logIn = 'LOG_IN',
  startGame = 'START_GAME',
  answer = 'ANSWER',
  vote = 'VOTE',
}

export type ClientEvent = {
  name: ClientEventNames;
  payload?: object;
};

export type ServerEventName =
  | ServerErrorEventNames
  | ServerGameEventNames
  | ClientEventNames; // Client event names are sent back in responses

export type ServerEvent = {
  name: ServerEventName;
  payload?: object;
};
