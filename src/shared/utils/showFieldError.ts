import { FieldApi } from "@tanstack/react-form";
import { extractZodErrorMessage } from "./extractZodErrorMessage";

type AnyFieldApi =
  | FieldApi<
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      never
    >
  | FieldApi<
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any
    >;

export function showFieldErrors(field: AnyFieldApi, isSubmitted: boolean) {
  const { isValid, isDirty, errors } = field.state.meta;
  const shouldShowError = !isValid && (isDirty || isSubmitted);

  if (!shouldShowError || !errors.length) {
    return undefined;
  }

  // Flatten and join error messages
  const messages = errors
    .map((e) =>
      Array.isArray(e)
        ? e.map(extractZodErrorMessage).join("; ")
        : extractZodErrorMessage(e),
    )
    .join("; ");

  return messages;
}

// function hasFieldErrors(field: AnyFieldApi, isSubmitted: boolean) {
//   const showError =
//     !field.state.meta.isValid && (field.state.meta.isDirty || isSubmitted);

//   return showError;
// }
