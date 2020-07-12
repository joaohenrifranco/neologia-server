export type Room = {
  id: number,
  name: string,
  playerIds: Set<number>,
  stage: string,
}

let rooms: Array<Room> = [];

export function upsert(room: Room, existingId?: number): Room {
  const roomCopy = {...room};

  if (typeof existingId === "number") {
    rooms[existingId] = roomCopy;
    return roomCopy;
  }

  rooms.push(roomCopy);

  return roomCopy;
}

export function findByName(name: string) {
  const room = rooms.find(room => room.name === name);
  return room ? {...room} : null;
}

export function find(roomId: number) {
  return { ...rooms[roomId] };
}
