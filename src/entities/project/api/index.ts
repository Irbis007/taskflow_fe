import { $api } from "@shared/api";
import type { BodyRequestType } from "@shared/models";
import { setQueryDataWithPartialQueryKey } from "@shared/utils";
import { useQueryClient } from "@tanstack/react-query";

const getAll = () => {
  return $api.useQuery("get", "/api/projects");
};

const getOne = (id: string) => {
  return $api.useQuery("get", `/api/projects/{id}`, {
    params: {
      path: {
        id,
      },
    },
  });
};

const useGetOverview = (id: string) => {
  return $api.useQuery("get", `/api/projects/{id}/overview`, {
    params: {
      path: {
        id,
      },
    },
  });
};

const useCreateProject = () => {
  const queryClient = useQueryClient();
  const mutation = $api.useMutation("post", "/api/projects", {
    onSuccess: (newProject) => {
      setQueryDataWithPartialQueryKey({
        queryClient,
        method: "get",
        path: "/api/projects",
        updater(prev) {
          if (!prev) return [newProject];
          return [...prev, newProject];
        },
      });
    },
  });

  return {
    ...mutation,
    mutateAsync: (data: BodyRequestType<"post", "/api/projects">) =>
      mutation.mutateAsync({ body: data }),
  };
};

const useEditProject = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = $api.useMutation("put", "/api/projects/{id}", {
    onSuccess: (editedProject) => {
      setQueryDataWithPartialQueryKey({
        queryClient,
        method: "get",
        path: "/api/projects/{id}",
        updater(prev) {
          if (!prev) return editedProject;
          return editedProject;
        },
      });
    },
  });

  return {
    ...mutation,
    mutateAsync: (data: BodyRequestType<"put", "/api/projects/{id}">) =>
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

const useDeleteProject = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = $api.useMutation("delete", "/api/projects/{id}", {
    onSuccess: () => {
      setQueryDataWithPartialQueryKey({
        queryClient,
        method: "get",
        path: "/api/projects",
        updater(prev) {
          if (!prev) return undefined;
          return prev.filter((p) => p.id !== id);
        },
      });
    },
  });

  return {
    ...mutation,
    mutateAsync: () =>
      mutation.mutateAsync({
        params: {
          path: {
            id,
          },
        },
      }),
  };
};

const useGetActivity = (id: string) => {
  return $api.useQuery("get", "/api/projects/{id}/activity", {
    params: {
      path: {
        id,
      },
    },
  });
};

const useGetMembers = (id: string) => {
  return $api.useQuery("get", "/api/projects/{id}/members", {
    params: {
      path: {
        id,
      },
    },
  });
};

export const $projectHooks = {
  getAll,
  createProject: useCreateProject,
  getOne,
  getOverview: useGetOverview,
  getActivity: useGetActivity,
  getMembers: useGetMembers,
  editProject: useEditProject,
  deleteProject: useDeleteProject,
};
