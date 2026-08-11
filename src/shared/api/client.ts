import { BASE_URL } from "@shared/consts";
import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import type { paths } from "./openapi";
import { createAuthMiddleware } from "./middlewares/authMiddleware";
import { useAuthStore } from "@shared/models";

const fetchClient = createFetchClient<paths>({
  baseUrl: BASE_URL,
  credentials: "include",
});

const authMiddleware = createAuthMiddleware({
  getTokens: () => {
    useAuthStore.persist.rehydrate();
    const state = useAuthStore.getState();
    const accessToken = state.token;
    return accessToken ?? null;
  },
  setData: (newToken, user) => {
    useAuthStore.persist.rehydrate();
    const state = useAuthStore.getState();
    state.setUser(user);
    state.setToken(newToken);
    useAuthStore.setState({ token: newToken });
  },
  refreshUrl: `${BASE_URL}/api/auth/refetch`,
  onAuthFailure: () => {
    useAuthStore.persist.rehydrate();
    const state = useAuthStore.getState();
    state.clearAuth();
  },
});

fetchClient.use(authMiddleware);
export const $api = createClient(fetchClient);
