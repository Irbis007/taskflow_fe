import { broadcastQueryClient } from "@tanstack/query-broadcast-client-experimental";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: false,
      staleTime: 500,
    },
  },
});

broadcastQueryClient({
  queryClient,
  broadcastChannel: "my-app",
});

export { queryClient };
