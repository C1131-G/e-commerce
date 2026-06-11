"use server";

export const loginAction = (data: { email: string; password: string }) => {
  console.log("Login Attempt:", data);

  return {
    message: "Login successful",
    success: true,
  };
};
