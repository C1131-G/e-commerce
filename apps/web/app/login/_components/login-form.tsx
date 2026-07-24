"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { authClient } from "@/lib/auth-client";

import { loginSchema } from "../_schemas/login.schema";
import type { LoginFormValues } from "../_schemas/login.schema";

const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const handleLoginSubmit = async (data: LoginFormValues) => {
    try {
      const { error } = await authClient.signIn.email({
        email: data.emailOrPhone,
        password: data.password,
      });

      if (error) {
        console.error(error);
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLoginSubmit)}>
      <div>
        <label htmlFor="emailOrPhone">Email or Phone</label>

        <input id="emailOrPhone" type="text" {...register("emailOrPhone")} />

        {errors.emailOrPhone && <p>{errors.emailOrPhone.message}</p>}
      </div>

      <div>
        <label htmlFor="password">Password</label>

        <input id="password" type="password" {...register("password")} />

        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit">Login</button>

      <Link href="/forgot-password">Forgot Password?</Link>
    </form>
  );
};

export default LoginForm;
