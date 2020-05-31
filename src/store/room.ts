export type Room = {
  playerIds: Set<number>,
  stage: string,
}

let rooms: { [key: string]: Room } = {};

export function upsertRoom(roomId: number, room: Room) {
  rooms[roomId] = room;
  return room;
}

export function findRoom(roomId: number) {
  return { ...rooms[roomId] };
}