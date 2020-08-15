import { Command } from './types';

export function isCommandValid(command: any): command is Command {
  // TODO: this dynamic type checker
  return true;
}
