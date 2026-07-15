import { z } from "zod";

export const loginSchema = z.object({
  emailOrPhone: z.string().min(1, "Email or Phone is required"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
