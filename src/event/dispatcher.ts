import * as PlayerModel from '../game/player';
import * as EventBuilder from './builder';
import { ServerEvent, ClientEvent, ClientEventNames } from './type';

export function handleEvent(incomingEvent: ClientEvent, connectionId: number): ServerEvent {
  const incomingPayload = incomingEvent.payload;

  let responsePayload;
  const playerId = PlayerModel.getPlayerByConnection(connectionId);

  try {
    switch (incomingEvent.name) {
      case ClientEventNames.createPlayer:
        const { playerName } = incomingPayload;

        if (typeof playerName !== 'string') {
          throw new Error('CREATE_PLAYER_BAD_DATA');
        }

        responsePayload = {
          token: PlayerModel.createPlayer(playerName, connectionId)
        }
        break;

      case ClientEventNames.logIn:
        const { token } = incomingPayload;
        
        if (typeof token !== 'string') {
          throw new Error('CREATE_PLAYER_BAD_DATA');
        }
        
        responsePayload = {
          token: PlayerModel.logIn(token, connectionId)
        }
        break;

      // case ClientEventNames.startGame:
      //   responsePayload = PlayerModel.startGame(connectionId);
      //   break;

      // case ClientEventNames.answer:
      //   responsePayload = PlayerModel.answer(incomingPayload, connectionId);
      //   break;

      // case ClientEventNames.vote:
      //   responsePayload = PlayerModel.answer(incomingPayload, connectionId);
      //   break;

      default:
        return EventBuilder.invalidEventNameEvent();
    }
  } catch (error) {
    return EventBuilder.handlerErrorEvent(error.message);
  }

  return EventBuilder.responseEvent(incomingEvent.name, responsePayload);
}
