import { ClientMessage } from './types';
import * as CommandValidators from '../dispatcher/validators';

function isClientMessageValid(message: any): message is ClientMessage {
  return (
    message &&
    typeof message.requestId === 'number' &&
    CommandValidators.isCommandValid(message.command)
  );
}

export { isClientMessageValid };
