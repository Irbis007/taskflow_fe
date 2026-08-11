import type { paths } from '../../../api';

export type BodyResponseType<
  Method extends keyof paths[Path],
  Path extends keyof paths,
> = paths[Path][Method] extends {
  responses: {
    200: {
      content: {
        'application/json': infer Body;
      };
    };
  };
}
  ? Body
  : paths[Path][Method] extends {
        responses: {
          201: {
            content: {
              'application/json': infer Body;
            };
          };
        };
      }
    ? Body
    : never;
