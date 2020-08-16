export enum ExceptionEventNames {
  badSchema = 'ERROR_BAD_SCHEMA',
  parseFailed = 'ERROR_PARSE_FAILED',
  invalidEventName = 'ERROR_INVALID_EVENT_NAME',
  internalError = 'INTERNAL_ERROR',
  loggedOut = 'LOGGED_OUT',
}

export enum ResponseEventNames {
  success = 'SUCCESS',
  fail = 'FAIL',
}

export enum GameEventNames {
  youAreHost = 'YOU_ARE_HOST',
  updateAllPlayers = 'UPDATE_ALL_PLAYERS',
  updateStage = 'UPDATE_STAGE',
  stageResults = 'STAGE_RESULTS',
  gameOver = 'GAME_OVER',
}

export type EventName = ResponseEventNames | ExceptionEventNames | GameEventNames;

export type Event = {
  name: EventName;
  payload?: object;
};

export enum AccountCommandNames {
  createPlayer = 'CREATE_PLAYER',
  logIn = 'LOG_IN',
}

export enum GameCommandNames {
  enterRoom = 'ENTER_ROOM',
  startGame = 'START_GAME',
  answer = 'ANSWER',
  vote = 'VOTE',
}

export type CommandName = GameCommandNames | AccountCommandNames;

export type Command = {
  name: CommandName;
  payload?: object;
};


