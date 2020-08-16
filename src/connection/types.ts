import { Event, Command } from '../dispatcher/types';

export type ClientMessage = {
  requestId: number;
  command: Command;
};

export type ServerMessage = {
  requestId?: number;
  event: Event;
};
