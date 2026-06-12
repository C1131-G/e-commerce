"use server";

export const loginAction = (_data: { email: string; password: string }) => ({
  message: "Login successful",
  success: true,
});
