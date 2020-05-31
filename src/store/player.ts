export type Player = {
  playerIds: Set<number>,
  stage: string,
}

let players: { [key: string]: Player } = {};

export function upsertPlayer(playerId: number, player: Player) {
  players[playerId] = player;
  return player;
}

export function player(playerId: number) {
  return { ...players[playerId] };
}