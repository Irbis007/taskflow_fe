import type {
  // ZodDefault,
  // ZodNullable,
  // ZodOptional,
  // ZodPipe,
  // ZodTransform,
  ZodType,
} from 'zod/v4';

// // Helper type to determine if a type is nullable
// type IsNullable<T> = T extends null | undefined ? true : false;
// // Helper type to determine if a type is optional
// type IsOptional<T> = T extends undefined ? true : false;
// // Helper type to check if the type is a default type
// type IsDefault<T> = T extends ZodDefault<any> ? true : false;

// // Type to apply Zod effects to a schema
// type ZodWithEffects<T extends ZodType> =
//   | T
//   | ZodPipe<T, ZodTransform>
//   | ZodPipe<ZodTransform, T>
//   | ZodDefault<T>;

// // Main type that maps a record type to Zod schema types
// export type ToZodSchema_old<T extends Record<string, any>> = {
//   [K in keyof T]: IsNullable<T[K]> extends true
//     ? ZodWithEffects<ZodNullable<ZodType<T[K]>>> | ZodNullable<ZodType<T[K]>>
//     : IsOptional<T[K]> extends true
//       ? ZodWithEffects<ZodOptional<ZodType<T[K]>>>
//       : IsDefault<T[K]> extends true
//         ? ZodWithEffects<ZodDefault<ZodType<T[K]>>>
//         : ZodWithEffects<ZodType<T[K]>>;
// };

export type ToZodSchema<T extends object> = {
  [K in keyof T]: ZodType<T[K]>;
};
