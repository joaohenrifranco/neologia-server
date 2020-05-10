import * as WebSocket from 'ws';

export function handleMessage(message: WebSocket.Data) {
    console.log(message);
}
