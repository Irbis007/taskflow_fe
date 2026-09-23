export const extractZodErrorMessage = (err: unknown): string => {
  if (Array.isArray(err)) {
    return err.map(extractZodErrorMessage).join("; ");
  }
  if (typeof err === "string") return err;
  if (err && typeof err === "object") {
    if ("error" in err && typeof err.error === "string") return err.error;
    if ("message" in err && typeof err.message === "string") return err.message;
  }
  return String(err);
};
