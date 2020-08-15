export enum ServerErrorEventNames {
  badSchema = 'ERROR_BAD_SCHEMA',
  parseFailed = 'ERROR_PARSE_FAILED',
  invalidEventName = 'ERROR_INVALID_EVENT_NAME',
  handlerError = 'ERROR_HANDLER',
  internalError = 'INTERNAL_ERROR',
  notImplemented = 'NOT_IMPLEMENTED',
}
export enum ServerGameEventNames {
  youAreHost = 'YOU_ARE_HOST',
  updateAllPlayers = 'UPDATE_ALL_PLAYERS',
  updateStage = 'UPDATE_STAGE',
  stageResults = 'STAGE_RESULTS',
  gameOver = 'GAME_OVER',
}

export enum CommandNames {
  createPlayer = 'CREATE_PLAYER',
  logIn = 'LOG_IN',
  enterRoom = 'ENTER_ROOM',
  startGame = 'START_GAME',
  answer = 'ANSWER',
  vote = 'VOTE',
}

export type Command = {
  name: CommandNames;
  payload?: object;
};

export type ServerEventName = ServerErrorEventNames | ServerGameEventNames;

export type ServerEvent = {
  name: ServerEventName;
  payload?: object;
};
