import { $api } from "@shared/api";
import { BodyRequestType, useAuthStore } from "@shared/models";
import { useQueryClient } from "@tanstack/react-query";
import {
  replaceItemInArray,
  setQueryDataWithPartialQueryKey,
} from "@shared/utils";
import { ParametersQueryType } from "@shared/models/types/generics";

const useGetUsers = () => {
  return $api.useQuery("get", "/api/users");
};

const useEditUser = (id: string) => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);
  const mutation = $api.useMutation("patch", "/api/users/{id}", {
    onSuccess(editedUser) {
      setUser(editedUser);
      setQueryDataWithPartialQueryKey({
        method: "get",
        path: "/api/users/{id}",
        queryClient,
        updater() {
          return editedUser;
        },
      });
      setQueryDataWithPartialQueryKey({
        method: "get",
        path: "/api/users",
        queryClient,
        updater(prev) {
          if (!prev) return [editedUser];
          const idx = prev.findIndex((u) => u.id === editedUser.id);
          return replaceItemInArray(prev, editedUser, idx);
        },
      });
    },
  });
  return {
    ...mutation,
    mutateAsync: (data: BodyRequestType<"patch", "/api/users/{id}">) =>
      mutation.mutateAsync({
        body: data,
        params: {
          path: {
            id,
          },
        },
      }),
  };
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

const useGetUsersAvailableForChat = (
  queryParams: ParametersQueryType<"get", "/api/chats">,
) => {
  return $api.useQuery("get", "/api/chats", { params: { query: queryParams } });
};

const useInviteUser = () => {
  const mutation = $api.useMutation("post", "/api/users/invite");
  return {
    ...mutation,
    mutateAsync: (data: BodyRequestType<"post", "/api/users/invite">) =>
      mutation.mutateAsync({ body: data }),
  };
};
export const $userHooks = {
  getAll: useGetUsers,
  getOne: useGetUser,
  getForChat: useGetUsersAvailableForChat,
  edit: useEditUser,
  invite: useInviteUser,
};
