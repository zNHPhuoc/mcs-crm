import { onMounted, onBeforeUnmount, ref } from 'vue';
import { useSocket as getSocket } from '@/plugins/socket.plugin.ts';
import type { Socket } from 'socket.io-client';
import { getToken } from '@/helpers/authHelper.ts';

export function useSocket(event?: string, callback?: (...args: any[]) => void) {
  const socket: Socket = getSocket();
  const isConnected = ref<boolean>(socket.connected);
  const emit = socket.emit.bind(socket);

  const connect = () => {
    if (!socket.connected) {
      (socket.auth as { token: string }).token = getToken();
      socket.connect();
    }
  };

  const disconnect = () => {
    if (socket.connected) {
      socket.disconnect();
    }
  };

  onMounted(() => {
    // status connect
    socket.on('connect', () => {
      isConnected.value = true;
      console.log('[socket] connected');
    });

    socket.on('disconnect', () => {
      isConnected.value = false;
      console.warn('[socket] disconnected');
    });

    socket.on('connect_error', (err: Error) => {
      console.error('[socket] connection error:', err);
    });

    // has event and callback
    if (event && callback) {
      socket.on(event, callback);
    }

    connect();
  });

  onBeforeUnmount(() => {
    if (event && callback) {
      socket.off(event, callback);
    }

    socket.off('connect');
    socket.off('disconnect');
    socket.off('connect_error');
  });

  return {
    socket,
    isConnected,
    emit,
    connect,
    disconnect,
  };
}
