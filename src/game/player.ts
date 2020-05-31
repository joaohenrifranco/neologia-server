import * as PlayerStore from '../store/player';
import * as RoomModel from './room';

// Types

export type Payload = any;

export type PlayerType = {
  // id: number,
  name: string,
  token: string,
  connectionId: number,
}

// Private methods

function generateToken() {
  function random5charString() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '')
  }
  return `${random5charString()}${random5charString()}`
}

// Public methods

export function createPlayer(payload: Payload, connectionId: number) {
  const { roomId, playerName } = payload;
  
  if (typeof roomId !== "number" || typeof playerName !== "string") {
    throw new Error("CREATE_PLAYER_BAD_DATA")
  }

  const token = generateToken();
  const playerId = PlayerStore.insert({name: playerName, token, connectionId});

  const 

  

}

export function logIn(payload: Payload) {
  const { token } = incomingData;
  if (typeof token !== "string") {
    return getBadSchemaEvent();
  }
}

export function startGame() {

}

export function answer(payload: Payload) {
  const { answer, stage } = incomingPayload;
  if (typeof answer !== "string" || typeof stage !== "string") {
    return getBadSchemaEvent();
  }
}

export function vote(payload: Payload) {

  const { orderedVotes, stage } = incomingPayload;
  if (typeof orderedVotes !== "array" || typeof stage !== "string") {
    return getBadSchemaEvent();
  }

}
