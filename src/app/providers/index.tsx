import { ThemeProvider } from "./ThemeProvider";
import { RouterProvider } from "react-router-dom";
import { router } from "../routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../config";

export const Providers = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};
