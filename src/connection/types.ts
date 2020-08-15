import { ServerEvent, Command } from '../command/types';

export type ClientMessage = {
  requestId: number;
  command: Command;
};

export type ServerMessage = {
  requestId?: number;
  event: ServerEvent;
};
