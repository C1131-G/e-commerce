"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { loginSchema } from "./schemas/login-schema";
import type { LoginSchema } from "./schemas/login-schema";

import styles from "./login.module.css";

export default function LoginPage() {
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: LoginSchema) => {
    setMessage(`TODO: Integrate Better Auth for ${data.email}`);

    // eslint-disable-next-line no-warning-comments
    // TODO: Integrate Better Auth here. Example:
    // const res = await betterAuth.login({ email: data.email, password: data.password });
    // if (res.ok) { router.push('/Farmer-dashboard'); }
  };

  return (
    <main className={styles.loginPage}>
      <div className={styles.loginCard}>
        <h1>Login</h1>
        <p className={styles.subtitle}>
          Access your account with your email and password.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.loginForm}
          noValidate
        >
          <label className={styles.label}>
            Email
            <input
              {...register("email")}
              name="email"
              type="email"
              className={styles.input}
              placeholder="you@example.com"
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email ? (
              <p className={styles.fieldError}>{errors.email.message}</p>
            ) : null}
          </label>

          <label className={styles.label}>
            Password
            <input
              {...register("password")}
              name="password"
              type="password"
              className={styles.input}
              placeholder="Enter your password"
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password ? (
              <p className={styles.fieldError}>{errors.password.message}</p>
            ) : null}
          </label>

          <button
            type="submit"
            className={styles.button}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {message ? <p className={styles.message}>{message}</p> : null}

        <p className={styles.footerText}>
          <Link href="/register">Create an account</Link>
          <span className={styles.dot}> · </span>
          <Link href="/forgot-password">Forgot password?</Link>
        </p>
      </div>
    </main>
  );
}
