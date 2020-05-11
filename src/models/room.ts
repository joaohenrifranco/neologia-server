type Props = {
  id: number,
  playerIds: Array<number>,
  hostPlayerId: number,
  state: any,
}

export class Player {
  constructor(props: Props) {
    for (let key in props) {
      this[key] = props[key];
    }
  }
}