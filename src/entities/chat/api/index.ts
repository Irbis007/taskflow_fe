import { $api } from "@shared/api";
import { BodyRequestType } from "@shared/models";
import {
  replaceItemInArray,
  setQueryDataWithPartialQueryKey,
} from "@shared/utils";
import { useQueryClient } from "@tanstack/react-query";
import { chatToChatItem } from "../lib";

const useGetChat = (id: string) => {
  return $api.useQuery(
    "get",
    "/api/chats/{id}",
    { params: { path: { id } } },
    { enabled: !!id.length },
  );
};

const useCreateChat = () => {
  const queryClient = useQueryClient();
  const mutation = $api.useMutation("post", "/api/chats", {
    onSuccess(newChat) {
      setQueryDataWithPartialQueryKey({
        queryClient,
        method: "get",
        path: "/api/chats",
        updater(prev) {
          if (!prev) return prev;
          const chatIdx = prev.chats.findIndex(
            (c) => c.companion.id === newChat.companion.id,
          );
          return {
            ...prev,
            chats: replaceItemInArray(prev.chats, newChat, chatIdx),
          };
        },
      });
    },
  });
  return {
    ...mutation,
    mutateAsync: (data: BodyRequestType<"post", "/api/chats">) =>
      mutation.mutateAsync({ body: data }),
  };
};

const useCreateMessage = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = $api.useMutation("post", "/api/chats/{id}/messages", {
    onSuccess(newMessage) {
      setQueryDataWithPartialQueryKey({
        queryClient,
        path: "/api/chats/{id}",
        method: "get",
        updater(prev) {
          if (!prev) return prev;

          return {
            ...prev,
            messages: [...prev.messages, newMessage],
          };
        },
      });
    },
  });

  return {
    ...mutation,
    mutateAsync: (data: BodyRequestType<"post", "/api/chats/{id}/messages">) =>
      mutation.mutateAsync({ body: data, params: { path: { id } } }),
  };
};

const useEditChat = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = $api.useMutation("patch", "/api/chats/{id}", {
    onSuccess(updatedChat) {
      setQueryDataWithPartialQueryKey({
        queryClient,
        path: "/api/chats/{id}",
        method: "get",
        updater(prev) {
          if (!prev) return prev;
          return updatedChat;
        },
      });
      setQueryDataWithPartialQueryKey({
        queryClient,
        path: "/api/chats",
        method: "get",
        updater(prev) {
          if (!prev) return prev;
          const updatedChatIdx = prev.chats.findIndex(
            (c) => c.id === updatedChat.id,
          );

          return {
            ...prev,
            chats: replaceItemInArray(
              prev.chats,
              chatToChatItem(updatedChat),
              updatedChatIdx,
            ).sort((a, b) => {
              const pinnedDiff = Number(b.pinned) - Number(a.pinned);

              if (pinnedDiff !== 0) {
                return pinnedDiff;
              }
              console.log(b?.lastMessage?.createdAt || 0);

              return (
                new Date(b?.lastMessage?.createdAt || 0).getTime() -
                new Date(a?.lastMessage?.createdAt || 0).getTime()
              );
            }),
          };
        },
      });
    },
  });

  return {
    ...mutation,
    mutateAsync: (data: BodyRequestType<"patch", "/api/chats/{id}">) =>
      mutation.mutateAsync({ body: data, params: { path: { id } } }),
  };
};

export const $chatHooks = {
  getChat: useGetChat,
  createChat: useCreateChat,
  editChat: useEditChat,
  createMessage: useCreateMessage,
};
