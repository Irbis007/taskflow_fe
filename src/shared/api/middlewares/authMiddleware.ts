import { User } from "@shared/models";
import type { Middleware } from "openapi-fetch";

interface AuthMiddlewareOptions {
  /** Получить текущие токены (из памяти, store, localStorage и т.д.) */
  getTokens: () => string | null;
  /** Сохранить новые токены после успешного refresh */
  setData: (accessToken: string | null, user: User | null) => void;
  /** URL эндпоинта обновления токена */
  refreshUrl: string;
  /** Вызывается, если refresh не удался (например, разлогинить пользователя) */
  onAuthFailure?: () => void;
}

/**
 * Создаёт middleware для openapi-fetch:
 * - добавляет Authorization: Bearer <accessToken> к каждому запросу
 * - при ответе 401 пытается обновить токен через refreshUrl
 * - повторяет исходный запрос с новым токеном
 * - параллельные 401-запросы используют один и тот же refresh-промис,
 *   чтобы не дёргать refresh эндпоинт несколько раз одновременно
 */

const requestMap = new WeakMap<Request, Request>();

export function createAuthMiddleware(
  options: AuthMiddlewareOptions,
): Middleware {
  const { getTokens, setData, refreshUrl, onAuthFailure } = options;

  let refreshPromise: Promise<string | null> | null = null;

  async function refreshAccessToken(): Promise<string | null> {
    try {
      const res = await fetch(refreshUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`Refresh failed with status ${res.status}`);
      }

      const data = await res.json();
      setData(data.accessToken, data.user);
      return data.accessToken;
    } catch (err) {
      setData(null, null);
      onAuthFailure?.();
      console.log(err);
      return null;
    }
  }

  return {
    async onRequest({ request }) {
      requestMap.set(request, request.clone());

      const accessToken = getTokens();

      if (accessToken) {
        request.headers.set("Authorization", `Bearer ${accessToken}`);
      }

      return request;
    },
    async onResponse({ request, response }) {
      if (response.status !== 401) {
        return response;
      }

      const originalRequest = requestMap.get(request);

      if (!originalRequest) {
        return response;
      }
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
      }

      const newAccessToken = await refreshPromise;

      if (!newAccessToken) {
        return response;
      }

      const retryRequest = new Request(originalRequest, {
        headers: new Headers(originalRequest.headers),
      });

      retryRequest.headers.set("Authorization", `Bearer ${newAccessToken}`);

      return fetch(retryRequest);
    },
  };
}

/* ---------------------- Пример использования ---------------------- */
//
// import createClient from "openapi-fetch";
// import type { paths } from "./schema"; // сгенерированные типы из OpenAPI
// import { createAuthMiddleware } from "./authMiddleware";
//
// let tokens: Tokens = {
//   accessToken: localStorage.getItem("accessToken"),
//   refreshToken: localStorage.getItem("refreshToken"),
// };
//
// const authMiddleware = createAuthMiddleware({
//   getTokens: () => tokens,
//   setTokens: (newTokens) => {
//     tokens = newTokens;
//     localStorage.setItem("accessToken", newTokens.accessToken ?? "");
//     localStorage.setItem("refreshToken", newTokens.refreshToken ?? "");
//   },
//   refreshUrl: "https://api.example.com/auth/refresh",
//   onAuthFailure: () => {
//     window.location.href = "/login";
//   },
// });
//
// export const client = createClient<paths>({ baseUrl: "https://api.example.com" });
// client.use(authMiddleware);
