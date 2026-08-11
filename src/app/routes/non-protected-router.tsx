import { useAuthStore } from "@shared/models";
import { AuthLayout } from "../layout";
import { Navigate } from "react-router-dom";
import { URLS } from "@shared/consts";

export const NonProtectedRouter = () => {
  const isAuth = useAuthStore((state) => state.isAuth);

  return !isAuth ? <AuthLayout /> : <Navigate to={URLS.home} />;
};
