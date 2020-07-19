import * as PlayerStore from 'store/player';
import * as RoomModel from './room';

// Types

type Player = PlayerStore.Player;

export type Payload = any;

// Internals

function generateToken() {
  function random5charString() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '')
  }
  return `${random5charString()}${random5charString()}${random5charString()}`
}

// Exports

export function getPlayerByConnection(connectionId: number) {
  const playerId = PlayerStore.findIdByConnectionId(connectionId);

  return playerId;
}

export function createPlayer(playerName: string, connectionId: number) {
  const player: Player = {
    name: playerName,
    token: generateToken(),
    connectionId
  }

  PlayerStore.upsert(player);

  return player.token;
}

export function logIn(token: string, connectionId: number) {
  const player = PlayerStore.findByToken(token);

  if (!player) {
    throw new Error("INVALID_LOG_IN_TOKEN");
  }

  const updatedPlayer = {
    ...player,
    connectionId
  }

  PlayerStore.upsert(updatedPlayer);

  return player.token;
}

// export function startGame() {

// }

// export function answer(payload: Payload) {
//   const { answer, stage } = incomingPayload;
//   if (typeof answer !== "string" || typeof stage !== "string") {
//     return getBadSchemaEvent();
//   }
// }

// export function vote(payload: Payload) {

//   const { orderedVotes, stage } = incomingPayload;
//   if (typeof orderedVotes !== "array" || typeof stage !== "string") {
//     return getBadSchemaEvent();
//   }

// }
