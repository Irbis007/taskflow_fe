import { $authHooks } from "@entities/auth";
import { URLS } from "@shared/consts";
import { useAuthStore } from "@shared/models";
import { AuthFormWrapper, Button, Input } from "@shared/ui";
import { useForm } from "@tanstack/react-form";
import { useId } from "react";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const { mutateAsync, isPending } = $authHooks.useLogin();
  const authStore = useAuthStore();
  const formId = useId();

  const form = useForm({
    defaultValues: {
      password: "",
      email: "",
    },
    onSubmit: ({ value }) => {
      mutateAsync(value).then((res) => {
        const {accessToken, user} = res
        // TODO: create another function for make auth by one call
        authStore.setAuth(true);
        authStore.setToken(accessToken);
        authStore.setUser(user);
      });
    },
  });

  return (
    <AuthFormWrapper formId={formId}>
      <div className="text-3xl text-primary text-center font-medium">Login</div>
      <form.Field
        name="email"
        children={(field) => (
          <Input
            value={field.state.value}
            onChange={field.handleChange}
            placeholder="Email"
            label="Email"
          />
        )}
      />
      <form.Field
        name="password"
        children={(field) => (
          <Input
            value={field.state.value}
            onChange={field.handleChange}
            placeholder="Password"
            label="Password"
          />
        )}
      />
      <Button
        className="mt-2"
        title="Login"
        onClick={() => form.handleSubmit()}
        isLoading={isPending}
      />
      <div className="text-primary text-center text-sm">
        <span>Don't have an account?</span>
        <Link to={URLS.registration} className="ml-1 link">
          Register
        </Link>
      </div>
    </AuthFormWrapper>
  );
};
