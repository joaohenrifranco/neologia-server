type Props = {
  id: number,
  name: string,
}

export class Player {
  constructor(props: Props) {
    for (let key in props) {
      this[key] = props[key];
    }
  }
}