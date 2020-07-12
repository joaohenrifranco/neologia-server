import * as PlayerModel from '../game/player';
import * as EventBuilder from './builder';
import { ServerEvent, ClientEvent, ClientEventNames } from './type';

export function handleEvent(incomingEvent: ClientEvent, connectionId: number): ServerEvent {
  const incomingPayload = incomingEvent.payload;

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
        return EventBuilder.invalidEventNameEvent();
    }
  } catch (error) {
    return EventBuilder.handlerErrorEvent(error);
  }

  return EventBuilder.responseEvent(incomingEvent.name, responsePayload);
}
