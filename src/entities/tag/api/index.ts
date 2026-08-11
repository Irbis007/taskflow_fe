import { $api } from "@shared/api";
import { BodyRequestType } from "@shared/models";
import { setQueryDataWithPartialQueryKey } from "@shared/utils";
import { useQueryClient } from "@tanstack/react-query";

const useGetAll = () => {
  return $api.useQuery("get", "/api/tags");
};

const useCreateTag = () => {
  const queryClient = useQueryClient();
  const mutation = $api.useMutation("post", "/api/tags", {
    onSuccess(newTag) {
      setQueryDataWithPartialQueryKey({
        queryClient,
        method: "get",
        path: "/api/tags",
        updater(prev) {
          if (!prev) return [newTag];
          return [...prev, newTag];
        },
      });
    },
  });

  return {
    ...mutation,
    mutateAsync: (data: BodyRequestType<"post", "/api/tags">) =>
      mutation.mutateAsync({ body: data }),
  };
};

export const $tagHooks = {
  getAll: useGetAll,
  create: useCreateTag,
};
