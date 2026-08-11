import { BodyResponseType } from "./../../../shared/models/types/generics/bodyResponseType";
import { $api } from "@shared/api";
import type { BodyRequestType } from "@shared/models";
import { ParametersQueryType } from "@shared/models/types/generics";
import { setQueryDataWithPartialQueryKey } from "@shared/utils";
import { useQueryClient } from "@tanstack/react-query";

function taskToListTask(
  task:
    | BodyResponseType<"get", "/api/tasks/{id}">
    | BodyResponseType<"post", "/api/tasks">,
): BodyResponseType<"get", "/api/tasks">[number] {
  let completedSubtasks = 0;

  if ("subtasks" in task) {
    completedSubtasks = task.subtasks?.filter((t) => t.isCompleted).length || 0;
  }

  return {
    id: task.id,
    tags: task.tags,
    title: task.title,
    totalSubtasks: task.status.length,
    status: task.status,
    priority: task.priority,
    author: task.author,
    completedSubtasks: completedSubtasks,
  };
}

const getTasks = (queryParams?: ParametersQueryType<"get", "/api/tasks">) => {
  return $api.useQuery("get", "/api/tasks", {
    params: {
      query: queryParams,
    },
  });
};

const useGetOne = (id: string) => {
  return $api.useQuery("get", `/api/tasks/{id}`, {
    params: {
      path: {
        id,
      },
    },
  });
};

const useCreateTask = () => {
  const queryClient = useQueryClient();
  const mutation = $api.useMutation("post", "/api/tasks", {
    onSuccess(newTask) {
      const formatNewTask = taskToListTask(newTask);
      setQueryDataWithPartialQueryKey({
        queryClient,
        method: "get",
        path: "/api/tasks",
        updater(prev) {
          if (!prev) return [formatNewTask];
          return [...prev, formatNewTask];
        },
      });
      setQueryDataWithPartialQueryKey({
        queryClient,
        method: "get",
        path: "/api/tasks/{id}",
        updater(prev) {
          if (!prev) return undefined;

          return {
            ...prev,
            subtasks: [...(prev.subtasks || []), newTask],
          };
        },
      });
      setQueryDataWithPartialQueryKey({
        queryClient,
        method: "get",
        path: `/api/projects/{id}`,
        updater(prev) {
          if (!prev) return undefined;
          return {
            ...prev,
            totalTasks: prev.totalTasks + 1,
          };
        },
      });
    },
  });
  return {
    ...mutation,
    mutateAsync: (data: BodyRequestType<"post", "/api/tasks">) =>
      mutation.mutateAsync({ body: data }),
  };
};

const usePartialUpdate = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = $api.useMutation("patch", `/api/tasks/{id}`, {
    onSuccess(updatedTask) {
      setQueryDataWithPartialQueryKey({
        queryClient,
        method: "get",
        path: `/api/tasks/{id}`,
        updater(prev) {
          if (!prev) return undefined;
          if (updatedTask.id !== prev.id) {
            const subtasks = prev.subtasks || [];
            const taskIdx = subtasks.findIndex((t) => t.id === updatedTask.id);
            return {
              ...prev,
              subtasks: [
                ...subtasks.slice(0, taskIdx),
                updatedTask,
                ...subtasks.slice(taskIdx + 1, subtasks.length - 1),
              ],
            };
          }
          return {
            ...prev,
            ...updatedTask,
          };
        },
      });
      setQueryDataWithPartialQueryKey({
        queryClient,
        method: "get",
        path: `/api/tasks`,
        updater(prev) {
          if (!prev) return undefined;

          const taskIdx = prev.findIndex((t) => t.id === updatedTask.id);
          if (taskIdx < 0) return prev;
          return [
            ...prev.slice(0, taskIdx),
            taskToListTask(updatedTask),
            ...prev.slice(taskIdx + 1, prev.length),
          ];
        },
      });
    },
  });
  return {
    ...mutation,
    updateIsComplete: (isCompleted: boolean) =>
      mutation.mutateAsync({ body: { isCompleted }, params: { path: { id } } }),
    updateDescription: (description: string) =>
      mutation.mutateAsync({ body: { description }, params: { path: { id } } }),
    updateAssignees: (assignees: string[]) =>
      mutation.mutateAsync({ body: { assignees }, params: { path: { id } } }),
    updateEstimate: (estimate: string) =>
      mutation.mutateAsync({ body: { estimate }, params: { path: { id } } }),
    updateTags: (tags: string[]) =>
      mutation.mutateAsync({ body: { tags }, params: { path: { id } } }),
    updateStatus: (
      status: Exclude<
        BodyRequestType<"patch", `/api/tasks/{id}`>["status"],
        undefined
      >,
    ) => mutation.mutateAsync({ body: { status }, params: { path: { id } } }),
    updatePriority: (
      priority: Exclude<
        BodyRequestType<"patch", `/api/tasks/{id}`>["priority"],
        "undefined"
      >,
    ) => mutation.mutateAsync({ body: { priority }, params: { path: { id } } }),
  };
};

const useGetComments = (id: string) => {
  return $api.useQuery("get", `/api/tasks/{id}/comments`, {
    params: { path: { id } },
  });
};
const useCreateComment = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = $api.useMutation("post", `/api/tasks/{id}/comments`, {
    onSuccess(newComment) {
      setQueryDataWithPartialQueryKey({
        queryClient,
        method: "get",
        path: "/api/tasks/{id}/comments",
        updater(comments) {
          if (!comments) return [newComment];

          return [...comments, newComment];
        },
      });
    },
  });

  return {
    ...mutation,
    mutateAsync: (data: BodyRequestType<"post", "/api/tasks/{id}/comments">) =>
      mutation.mutateAsync({ body: data, params: { path: { id } } }),
  };
};

const useGetActivity = (id: string) => {
  return $api.useQuery("get", "/api/tasks/{id}/activity", {
    params: {
      path: {
        id,
      },
    },
  });
};

export const $taskHooks = {
  getTasks,
  createTask: useCreateTask,
  getOne: useGetOne,
  partialUpdate: usePartialUpdate,
  getComments: useGetComments,
  createComment: useCreateComment,
  getActivity: useGetActivity,
};
