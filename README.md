# Neologia Server

> WIP

## Directory structure

- `connection/`: handles websocket connections and raw messages, sends parsed messages to `dispatcher`
- `dispatcher`: receives parsed messsages and dispatches commands to entities in `game/` or `account/`
- `game/`: handles game logic
- `account/`: handles user authentication
- `store/`: handles persisted server data (currently is a in-memory mock db)

## API Protocol

Neologia uses Websockets as the underlying transfer protocol. 

On top of that we use our own micro-protocol.

### Client Messages

Client messages are JSONs conforming to the following schema (check `docs/mock-requests`):

```
{
  requestId: number,
  command: {
    name: string,
    payload: any
  }
}
```

### Server Messages

Now, for the server sent messages, we have:

```
{
  requestId: number, // When message is a response, same as client's requestId, otherwise null
  event: {
    name: string,
    payload: any
  }
}
```