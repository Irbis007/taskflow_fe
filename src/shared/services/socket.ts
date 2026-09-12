// socket.ts
import { BASE_URL } from "@shared/consts";
import { useAuthStore } from "@shared/models";
import { io } from "socket.io-client";

export const socket = io(BASE_URL, {
  withCredentials: true,
  autoConnect: false,
});

function connectSocket(userId: string) {
  socket.auth = { userId };
  socket.connect();
}

function disconnectSocket() {
  socket.disconnect();
}

useAuthStore.subscribe((state, prevState) => {
  const userId = state.user?.id;
  const prevUserId = prevState.user?.id;

  if (userId && userId !== prevUserId) {
    connectSocket(userId);
  }

  if (!userId && prevUserId) {
    disconnectSocket();
  }
});

useAuthStore.persist.onFinishHydration((state) => {
  const userId = state.user?.id;
  if (userId) {
    connectSocket(userId);
  }
});
