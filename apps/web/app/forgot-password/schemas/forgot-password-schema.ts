import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email").optional(),
  phone: z
    .string()
    .optional()
    .refine((value) => (value ? value.length >= 8 : true), {
      message: "Please enter a valid phone number",
    }),
});

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "Enter the 6-digit OTP")
    .regex(/^\d+$/u, "OTP must contain only numbers"),
});

export const resetPasswordSchema = z
  .object({
    confirmPassword: z.string().min(8, "Confirm your new password"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/u, "Password must include an uppercase letter")
      .regex(/[a-z]/u, "Password must include a lowercase letter")
      .regex(/[0-9]/u, "Password must include a number"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type OtpSchema = z.infer<typeof otpSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
