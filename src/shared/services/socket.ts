import { BASE_URL } from "@shared/consts";
import { useAuthStore } from "@shared/models";
import { setQueryDataWithPartialQueryKey } from "@shared/utils";
import { io } from "socket.io-client";
import { queryClient } from "../../app/config";

useAuthStore.persist.rehydrate();
const state = useAuthStore.getState();
export const socket = io(BASE_URL, {
  auth: {
    user: state.user,
  },
});

socket.on("chat:new-message", ({ chatId, message }) => {
  console.log(chatId, message.id);
  setQueryDataWithPartialQueryKey({
    queryClient,
    path: "/api/chats/{id}",
    method: "get",
    updater(prev) {
      if (!prev) return prev;

      return {
        ...prev,
        messages: [...prev.messages, message],
      };
    },
  });
});

// socket.on("user:online", () => {
// setQueryDataWithPartialQueryKey({
//   queryClient,
//   path: "/api/chats/{id}",
//   method: "get",
//   updater(prev) {
//     if (!prev) return prev;
//     return {
//       ...prev,
//       messages: [...prev.messages, message],
//     };
//   },
// });
// });
