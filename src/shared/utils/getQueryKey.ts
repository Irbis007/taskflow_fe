import type { paths } from "../api";
import type { OpenapiQueryKey } from "../models";

export function getQueryKey<
  Method extends keyof paths[Path],
  Path extends keyof paths,
>(method: Method, path: Path): OpenapiQueryKey<Method, Path> {
  return [method, path];
}
