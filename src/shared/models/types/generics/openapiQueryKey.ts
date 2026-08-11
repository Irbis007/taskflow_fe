import type { paths } from '../../../api';

// Если понадобится включить и params
type IsNotNullable<T, K> = T extends undefined ? never : K;
type NotNullableKeys<T> = { [K in keyof T]-?: IsNotNullable<T[K], K> }[keyof T];

type ExtractNotNever<
  TParams extends {
    query?: unknown;
    header?: unknown;
    path?: unknown;
    cookie?: unknown;
  },
> =
  NotNullableKeys<TParams> extends never
    ? never
    : { params: { [x in NotNullableKeys<TParams>]: TParams[x] } };

/**
 * Получение полного queryKey для изменения состояния Query.
 */
export type OpenapiQueryKeyFull<
  Method extends keyof paths[Path],
  Path extends keyof paths,
> = paths[Path][Method] extends { parameters: infer TParams }
  ? TParams extends {
      query?: unknown;
      header?: unknown;
      path?: unknown;
      cookie?: unknown;
    }
    ? ExtractNotNever<TParams> extends never
      ? readonly [method: Method, path: Path]
      : readonly [method: Method, path: Path, params: ExtractNotNever<TParams>]
    : readonly [method: Method, path: Path]
  : readonly [method: Method, path: Path];

/**
 * Используется только для инвалидации кеша для queries.
 * Для изменения состояния использовать полный query key
 * через OpenapiQueryKeyFull.
 */
export type OpenapiQueryKey<
  Method extends keyof paths[Path],
  Path extends keyof paths,
> = [method: Method, path: Path];
