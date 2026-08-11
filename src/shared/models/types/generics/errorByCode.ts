// import type { components, paths } from '../../../api';

// type E401 = components['schemas']['ErrorResponse401'];
// type E403 = components['schemas']['ErrorResponse403'];
// type E404 = components['schemas']['ErrorResponse404'];
// type E405 = components['schemas']['ErrorResponse405'];
// type E406 = components['schemas']['ErrorResponse406'];
// type E415 = components['schemas']['ErrorResponse415'];
// type E500 = components['schemas']['ErrorResponse500'];

// type AllErrors = E401 | E403 | E404 | E405 | E406 | E415 | E500;

// export type ErrorCodes = Exclude<
//   NonNullable<
//     {
//       [P in keyof paths]: {
//         [M in keyof paths[P]]: paths[P][M] extends { responses: infer Responses }
//           ? keyof Responses
//           : never;
//       }[keyof paths[P]];
//     }[keyof paths]
//   >,
//   200 | 201 | 204
// >;

// export type ErrorByCode<E extends ErrorCodes | undefined = undefined> =
//   E extends undefined
//     ? AllErrors
//     : E extends 401
//       ? components['schemas']['ErrorResponse401']
//       : E extends 403
//         ? components['schemas']['ErrorResponse403']
//         : E extends 404
//           ? components['schemas']['ErrorResponse404']
//           : E extends 405
//             ? components['schemas']['ErrorResponse405']
//             : E extends 406
//               ? components['schemas']['ErrorResponse406']
//               : E extends 415
//                 ? components['schemas']['ErrorResponse415']
//                 : E extends 500
//                   ? components['schemas']['ErrorResponse500']
//                   : never;
