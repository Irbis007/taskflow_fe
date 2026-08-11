import type { QueryClient } from "@tanstack/react-query";
import type { BodyResponseType } from "../models";
import type { paths } from "../api";
import { getQueryKey } from "./getQueryKey";

type Props<Method extends keyof paths[Path], Path extends keyof paths> = {
  queryClient: QueryClient;
  method: Method;
  path: Path;
  updater:
    | ((
        prev: BodyResponseType<Method, Path> | undefined,
      ) => BodyResponseType<Method, Path> | undefined)
    | BodyResponseType<Method, Path>
    | undefined;
};

export function setQueryDataWithPartialQueryKey<
  Method extends keyof paths[Path],
  Path extends keyof paths,
>({ queryClient, method, path, updater }: Props<Method, Path>): void {
  const partialQueryKey = getQueryKey(method, path);
  const queryCache = queryClient.getQueryCache();
  const matchingQueries = queryCache.findAll({
    queryKey: partialQueryKey,
    exact: false,
  });
  const allQueryKeys = matchingQueries.map((query) => query.queryKey);
  allQueryKeys.forEach((queryKey) => {
    queryClient.setQueryData(queryKey, updater);
  });
}
