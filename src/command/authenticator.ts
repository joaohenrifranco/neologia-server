function createPlayer(connectionId: number, incomingPayload: any) {
  const { playerName } = incomingPayload;

  if (typeof playerName !== 'string') {
    throw new Error('CREATE_PLAYER_BAD_DATA');
  }

  return {
    token: PlayerModel.createPlayer(playerName, connectionId),
  };
}

function logIn(connectionId: number, incomingPayload: any) {
  const { token } = incomingPayload;

  if (typeof token !== 'string') {
    throw new Error('LOG_IN_BAD_DATA');
  }

  return {
    token: PlayerModel.logIn(token, connectionId),
  };
}
