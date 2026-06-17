import { z } from "zod";

export const registerSchema = z
  .object({
    confirmPassword: z.string().min(8),
    email: z.string().email("Please enter a valid email address"),
    fullName: z.string().min(2, "Please enter your full name"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
