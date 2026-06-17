"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { loginSchema } from "./schemas/login-schema";
import type { LoginSchema } from "./schemas/login-schema";

import styles from "./login.module.css";

const handleLogin = (_data: LoginSchema) => {
  throw new Error("Better Auth login integration is pending.");
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  return (
    <main className={styles.loginPage}>
      <div className={styles.loginCard}>
        <h1>Login</h1>
        <p className={styles.subtitle}>
          Access your account with your email and password.
        </p>

        <form
          className={styles.loginForm}
          noValidate
          onSubmit={handleSubmit(handleLogin)}
        >
          <label className={styles.label}>
            Email
            <input
              {...register("email")}
              aria-invalid={errors.email ? "true" : "false"}
              className={styles.input}
              name="email"
              placeholder="you@example.com"
              type="email"
            />
            {errors.email ? (
              <p className={styles.fieldError}>{errors.email.message}</p>
            ) : null}
          </label>

          <label className={styles.label}>
            Password
            <input
              {...register("password")}
              aria-invalid={errors.password ? "true" : "false"}
              className={styles.input}
              name="password"
              placeholder="Enter your password"
              type="password"
            />
            {errors.password ? (
              <p className={styles.fieldError}>{errors.password.message}</p>
            ) : null}
          </label>

          <button
            className={styles.button}
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className={styles.footerText}>
          <Link href="/register">Create an account</Link>
          <span className={styles.dot}> / </span>
          <Link href="/forgot-password">Forgot password?</Link>
        </p>
      </div>
    </main>
  );
}
