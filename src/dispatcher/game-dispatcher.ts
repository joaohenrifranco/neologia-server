import EventBuilder from './event-builder';
import { Event } from './types';

function enterRoom(playerId: number, payload: object): Event {
  const result = { error: 1 };

  if (result.error) {
    return EventBuilder.fail(result);
  }
  return EventBuilder.success(result);
}

export default { enterRoom };
