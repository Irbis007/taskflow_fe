import type { paths } from '../../../api';

export type BodyRequestType<
  Method extends keyof paths[Path],
  Path extends keyof paths,
  Format extends
    | 'application/json'
    | 'application/x-www-form-urlencoded'
    | 'multipart/form-data' = 'application/json',
> = paths[Path][Method] extends {
  requestBody?: {
    content: {
      [x in Format]: infer Body;
    };
  };
}
  ? Body
  : never;
