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

const useResetPassword = () => {
  const mutation = $api.useMutation("post", "/api/refresh-password");

  return {
    ...mutation,
    mutateAsync: (data: BodyRequestType<"post", "/api/refresh-password">) =>
      mutation.mutateAsync({
        body: data,
      }),
  };
};

const setup2fa = () => {
  const mutation = $api.useMutation("post", "/api/2fa/setup");

  return {
    ...mutation,
    mutateAsync: () => mutation.mutateAsync({}),
  };
};

const enable2fa = () => {
  const mutation = $api.useMutation("post", "/api/2fa/enable");

  return {
    ...mutation,
    mutateAsync: (data: BodyRequestType<"post", "/api/2fa/enable">) =>
      mutation.mutateAsync({ body: data }),
  };
};

export const $authHooks = {
  useRegister,
  useLogin,
  useRefetch,
  useResetPassword,
  setup2fa,
  enable2fa,
};
