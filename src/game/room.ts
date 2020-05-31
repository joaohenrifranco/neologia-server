import * as RoomStore from '../store/room';

type Room = RoomStore.Room;

const MAX_PLAYERS_PER_ROOM = 4;

export enum ReturnCodes {
  success = "SUCCESS",
  roomIsFull = "ROOM_IS_FULL",
}

function newRoom(): Room {
  return {
    playerIds: new Set(),
    stage: 'LOBBY',
  }
}

export function addPlayerToRoom(playerId: number, roomId: number): ReturnCodes {
  let room: Room = RoomStore.findRoom(roomId);

  if (!room) {
    room = RoomStore.upsertRoom(roomId, newRoom());
  }

  if (room.playerIds.size >= MAX_PLAYERS_PER_ROOM) {
    return ReturnCodes.roomIsFull;
  }

  room.playerIds.add(playerId);

  return ReturnCodes.success;
}

