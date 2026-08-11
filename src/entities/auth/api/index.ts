import { $api } from "@shared/api";
import { useRegister } from "./register";
import type { BodyRequestType } from "@shared/models";

const useLogin = () => {
  const mutation = $api.useMutation("post", "/api/auth/login");

  return {
    ...mutation,
    mutateAsync: (data: BodyRequestType<"post", "/api/auth/login">) =>
      mutation.mutateAsync({ body: data }),
  };
};
const useRefetch = () => {
  return $api.useQuery("get", "/api/auth/refetch");
};

export const $authHooks = {
  useRegister,
  useLogin,
  useRefetch,
};
