import type { paths } from '../../../api';

export type ParametersQueryType<
  Method extends keyof paths[Path],
  Path extends keyof paths,
> = paths[Path][Method] extends {
  parameters: {
    query?: infer QueryBody;
  };
}
  ? QueryBody extends never
    ? never
    : QueryBody
  : never;
