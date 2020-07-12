// We don't need to persist data right now

export type Player = {
  name: string;
  token: string;
  connectionId?: number;
};

let players: Array<Player> = [];

export function upsert(player: Player, existingId?: number): number {
  const playerCopy = { ...player };

  if (typeof existingId === 'number') {
    players[existingId] = playerCopy;
    return existingId;
  }

  players.push(playerCopy);

  return players.length - 1;
}

export function findIdByConnectionId(connectionId: number) {
  const playerId = players.findIndex((player) => player.connectionId === connectionId);

  if (playerId < 0) {
    return null;
  }

  return playerId;
}

export function findByToken(token: string) {
  const player = players.find((player) => player.token === token);

  if (!player) {
    return null;
  }

  return { ...player };
}

export function find(playerId: number) {
  return { ...players[playerId] };
}
