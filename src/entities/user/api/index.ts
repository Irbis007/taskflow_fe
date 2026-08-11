import { $api } from "@shared/api";
import { BodyRequestType } from "@shared/models";
import { useQueryClient } from "@tanstack/react-query";
import { setQueryDataWithPartialQueryKey } from "@shared/utils";

const useGetUsers = () => {
  return $api.useQuery("get", "/api/users");
};

const useGetUser = (id: string) => {
  return $api.useQuery("get", "/api/users/{id}", {
    params: {
      path: {
        id,
      },
    },
  });
};

const useGetUsersAvailableForChat = () => {
  return $api.useQuery("get", "/api/chats");
};

const getChat = (id: string) => {
  return $api.useQuery(
    "get",
    "/api/chats/{id}",
    { params: { path: { id } } },
    { enabled: !!id.length },
  );
};

const createChat = () => {
  const mutation = $api.useMutation("post", "/api/chats");
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

export const $userHooks = {
  getAll: useGetUsers,
  getOne: useGetUser,
  getForChat: useGetUsersAvailableForChat,
  getChat,
  createChat,
  createMessage: useCreateMessage,
};
