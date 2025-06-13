import { io, Socket } from 'socket.io-client';
import type { App } from 'vue';
import { getToken } from '@/helpers/authHelper.ts';
import type {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketAuth,
} from '@/@types/socket';
import { WEBSOCKET_URL } from '@/common/constants.ts';

const SOCKET_KEY = Symbol('socket');

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  WEBSOCKET_URL,
  {
    autoConnect: false,
    transports: ['websocket'],
    auth: {
      token: getToken(),
    } as SocketAuth,
  }
);

export default {
  install(app: App) {
    app.provide(SOCKET_KEY, socket);
  },
};

export const useSocket = (): Socket => {
  const socket = inject<Socket>(SOCKET_KEY);

  if (!socket) throw new Error('Socket not provided!');

  return socket;
};
