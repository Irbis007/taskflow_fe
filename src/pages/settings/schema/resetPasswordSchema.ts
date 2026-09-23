import * as z from "zod";

export const resetPasswordSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: z.string(),
    confirmNewPassword: z.string(),
  })
  .superRefine((v, ctx) => {
    if (v.confirmNewPassword !== v.newPassword) {
      ctx.addIssue({
        path: ["newPassword"],
        message: "Passwords does not match",
        code: "custom",
      });
      ctx.addIssue({
        path: ["confirmNewPassword"],
        message: "Passwords does not match",
        code: "custom",
      });
    }
  })
  .transform((val) => {
    return {
      currentPassword: val.currentPassword,
      newPassword: val.newPassword,
    };
  });
