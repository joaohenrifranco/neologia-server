

type PlayerProps = {
  id: number,
  name: string,
}

export class Player {
  constructor(props: PlayerProps) {
    for (let key in props) {
      this[key] = props[key];
    }
  }

  

}