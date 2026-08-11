import type { paths } from '../../../api';

export type ParametersPathType<
  Method extends keyof paths[Path],
  Path extends keyof paths,
> = paths[Path][Method] extends {
  parameters: {
    path?: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string | symbol | number]: any;
    };
  };
}
  ? paths[Path][Method]['parameters']['path']
  : never;
