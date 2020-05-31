export type Room = {
  name: string,
  playerIds: Set<number>,
  stage: string,
}

let rooms: Array<Room> = [];

export function upsert(room: Room, existingId?: number): number {
  const roomCopy = {...room};

  if (typeof existingId === "number") {
    rooms[existingId] = roomCopy;
    return existingId;
  }
  
  rooms.push(roomCopy);

  return rooms.length - 1;
}

export function find(roomId: number) {
  return { ...rooms[roomId] };
}