import * as PlayerStore from '../store/player';
import { Player, Token } from './types';

function generateToken() {
  function random5charString() {
    return Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '');
  }
  return `${random5charString()}${random5charString()}${random5charString()}`;
}

function getPlayerByConnection(connectionId: number): { playerId?: number; error?: string } {
  const playerId = PlayerStore.findIdByConnectionId(connectionId);
  return { playerId };
}

function logIn(payload: any, connectionId: number): { token?: string; error?: string } {
  const { token } = payload;

  if (typeof token !== 'string') {
    return { error: 'INVALID_PAYLOAD_DATA' };
  }

  const player = PlayerStore.findByToken(token);

  if (!player) {
    return { error: 'PLAYER_NOT_FOUND' };
  }

  const updatedPlayer = {
    ...player,
    connectionId,
  };

  PlayerStore.upsert(updatedPlayer);

  return { token: player.token };
}

function register(payload: any, connectionId: number): { token?: string; error?: string } {
  const { playerName } = payload;

  if (typeof playerName !== 'string') {
    return null;
  }

  const player: Player = {
    name: playerName,
    token: generateToken(),
    connectionId,
  };

  PlayerStore.upsert(player);

  return { token: player.token };
}

export default {
  getPlayerByConnection,
  register,
  logIn,
};
