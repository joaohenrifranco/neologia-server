import * as RoomStore from '../store/room';

type Room = RoomStore.Room;

const MAX_PLAYERS_PER_ROOM = 4;

export enum ReturnCodes {
  success = "SUCCESS",
  roomIsFull = "ROOM_IS_FULL",
}

function newRoom(name: string): Room {
  return {

    name,
    playerIds: new Set(),
    stage: 'LOBBY',
  }
}

export function addPlayerToRoom(playerId: number, roomName: string): ReturnCodes {
  let room: Room = RoomStore.findByName(roomName);

  if (!room) {
    room = newRoom(roomName);
    roomId = RoomStore.upsert(room);
  }

  if (room.playerIds.size >= MAX_PLAYERS_PER_ROOM) {
    return ReturnCodes.roomIsFull;
  }

  room.playerIds.add(playerId);

  return ReturnCodes.success;
}

