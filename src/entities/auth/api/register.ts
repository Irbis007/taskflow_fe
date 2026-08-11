import { $api } from "@shared/api";
import type { BodyRequestType } from "@shared/models";

export const useRegister = () => {
  const mutation = $api.useMutation("post", "/api/auth/registration");

  return {
    ...mutation,
    mutateAsync: (data: BodyRequestType<"post", "/api/auth/registration">) => {
      return mutation.mutateAsync({ body: data });
    },
  };
};
