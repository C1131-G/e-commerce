"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { registerSchema } from "./schemas/register-schema";
import type { RegisterSchema } from "./schemas/register-schema";

import styles from "./register.module.css";

const handleRegister = (_data: RegisterSchema) => {
  throw new Error("Better Auth registration integration is pending.");
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) });

  return (
    <main className={styles.authPage}>
      <div className={styles.authCard}>
        <h1>Register</h1>
        <p className={styles.subtitle}>
          Create your account to access the portal.
        </p>

        <form
          className={styles.authForm}
          noValidate
          onSubmit={handleSubmit(handleRegister)}
        >
          <label>
            Full Name
            <input
              {...register("fullName")}
              aria-label="Full name"
              placeholder="Your full name"
            />
            {errors.fullName ? (
              <p className={styles.fieldError}>{errors.fullName.message}</p>
            ) : null}
          </label>

          <label>
            Email
            <input
              {...register("email")}
              aria-label="Email address"
              placeholder="you@example.com"
              type="email"
            />
            {errors.email ? (
              <p className={styles.fieldError}>{errors.email.message}</p>
            ) : null}
          </label>

          <label>
            Password
            <input
              {...register("password")}
              aria-label="Password"
              placeholder="Create a password"
              type="password"
            />
            {errors.password ? (
              <p className={styles.fieldError}>{errors.password.message}</p>
            ) : null}
          </label>

          <label>
            Confirm Password
            <input
              {...register("confirmPassword")}
              aria-label="Confirm password"
              placeholder="Repeat your password"
              type="password"
            />
            {errors.confirmPassword ? (
              <p className={styles.fieldError}>
                {errors.confirmPassword.message}
              </p>
            ) : null}
          </label>

          <button
            className={styles.button}
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className={styles.footerText}>
          Already have an account? <Link href="/">Login</Link>
        </p>
      </div>
    </main>
  );
}
