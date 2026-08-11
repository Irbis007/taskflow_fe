import { URLS } from "@shared/consts";
import { AuthFormWrapper, Button, Input } from "@shared/ui";
import { useId, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@tanstack/react-form";
import { $authHooks } from "@entities/auth";
import { useAuthStore } from "@shared/models";

export function Registration() {
  const { mutateAsync, isPending } = $authHooks.useRegister();

  const setIsAuth = useAuthStore(state => state.setAuth)
  const setUser = useAuthStore(state => state.setUser)

  const [confirmPass, setConfirmPass] = useState("");

  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      if (value.password !== confirmPass) {
        console.log(
          "password does not match",
          `pass1: ${value.password} pass2: ${confirmPass}`,
        );
        return;
      }
      mutateAsync(value).then((res) => {
        setIsAuth(true)
        setUser(res.user)
        navigate(URLS.home)
      });
    },
  });

  const formId = useId();
  return (
    <AuthFormWrapper
      formId={formId}
      onSubmit={() => {
        form.handleSubmit();
      }}
    >
      <div className="text-3xl text-primary text-center font-medium">
        Registration
      </div>
      <form.Field
        name="name"
        children={(field) => (
          <Input
            value={field.state.value}
            onChange={field.handleChange}
            placeholder="Your name"
            label="Name"
          />
        )}
      />
      <form.Field
        name="surname"
        children={(field) => (
          <Input
            value={field.state.value}
            onChange={field.handleChange}
            placeholder="Your last name"
            label="Last name"
          />
        )}
      />
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

      <Input
        value={confirmPass}
        onChange={setConfirmPass}
        placeholder="Password"
        label="Confirm password"
      />
      <Button className="mt-2" title="Register" isLoading={isPending}/>
      <div className="text-primary text-center text-sm">
        <span>Already have an account?</span>
        <Link to={URLS.login} className="ml-1 link">
          Login
        </Link>
      </div>
    </AuthFormWrapper>
  );
}
