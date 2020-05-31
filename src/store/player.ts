export type Player = {
  name: string,
  token: string,
  connectionId?: number,
}

let players: Array<Player> = [];

export function upsert(player: Player, existingId?: number): number {
  const playerCopy = {...player};

  if (typeof existingId === "number") {
    players[existingId] = playerCopy;
    return existingId;
  }
  
  players.push(playerCopy);

  return players.length - 1;
}

export function find(playerId: number) {
  return { ...players[playerId] };
}