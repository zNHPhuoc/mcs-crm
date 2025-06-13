import { Socket } from 'socket.io-client';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $socket: Socket;
  }
}

export interface SocketAuth {
  token: string;
}

export interface ServerToClientEvents {
  'server-message': (data: string) => void;
  'user-joined': (username: string) => void;
  // add event server send to client
}

export interface ClientToServerEvents {
  'chat-message': (message: string) => void;
  'join-room': (roomId: string) => void;
  // add event client send to server
}
