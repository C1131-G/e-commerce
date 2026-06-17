"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  forgotPasswordSchema,
  otpSchema,
  resetPasswordSchema,
} from "./schemas/forgot-password-schema";
import type {
  ForgotPasswordSchema,
  OtpSchema,
  ResetPasswordSchema,
} from "./schemas/forgot-password-schema";

import styles from "./forgot-password.module.css";

type Step = "method" | "otp" | "reset" | "verify";
type VerificationMethod = "email" | "phone";

const requiresBackendIntegration = () => {
  throw new Error("Password reset backend integration is pending.");
};

const StepIndicator = ({ step }: { step: Step }) => {
  const isPastMethod = ["verify", "otp", "reset"].includes(step);
  const isPastVerify = ["otp", "reset"].includes(step);
  const isPastOtp = step === "reset";

  return (
    <div className={styles.stepIndicator}>
      <div
        className={`${styles.step} ${step === "method" ? styles.active : ""}`}
      >
        1
      </div>
      <div
        className={`${styles.stepLine} ${isPastMethod ? styles.completed : ""}`}
      />
      <div
        className={`${styles.step} ${step === "verify" ? styles.active : ""}`}
      >
        2
      </div>
      <div
        className={`${styles.stepLine} ${isPastVerify ? styles.completed : ""}`}
      />
      <div className={`${styles.step} ${step === "otp" ? styles.active : ""}`}>
        3
      </div>
      <div
        className={`${styles.stepLine} ${isPastOtp ? styles.completed : ""}`}
      />
      <div
        className={`${styles.step} ${step === "reset" ? styles.active : ""}`}
      >
        4
      </div>
    </div>
  );
};

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>("method");
  const [method, setMethod] = useState<VerificationMethod>("email");

  const verifyForm = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const otpForm = useForm<OtpSchema>({
    resolver: zodResolver(otpSchema),
  });
  const resetForm = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const newPassword = resetForm.watch("newPassword") ?? "";

  const handleMethodSelect = (selectedMethod: VerificationMethod) => {
    setMethod(selectedMethod);
    setStep("verify");
  };

  const handleSendVerify = (_data: ForgotPasswordSchema) => {
    requiresBackendIntegration();
  };

  const handleVerifyOtp = (_data: OtpSchema) => {
    requiresBackendIntegration();
  };

  const handleResetPassword = (_data: ResetPasswordSchema) => {
    requiresBackendIntegration();
  };

  const handleBack = () => {
    if (step === "verify") {
      setStep("method");
      return;
    }

    if (step === "otp") {
      setStep("verify");
      return;
    }

    if (step === "reset") {
      setStep("otp");
    }
  };

  return (
    <main className={styles.authPage}>
      <div className={styles.authCard}>
        <StepIndicator step={step} />

        {step === "method" ? (
          <section>
            <h1>Reset Password</h1>
            <p className={styles.subtitle}>
              Choose how you want to verify your identity.
            </p>

            <div className={styles.methodButtons}>
              <button
                aria-label="Verify via email"
                className={styles.methodBtn}
                onClick={() => handleMethodSelect("email")}
                type="button"
              >
                <span className={styles.methodTitle}>Email</span>
                <span className={styles.methodDesc}>Receive OTP via email</span>
              </button>

              <button
                aria-label="Verify via phone"
                className={styles.methodBtn}
                onClick={() => handleMethodSelect("phone")}
                type="button"
              >
                <span className={styles.methodTitle}>Phone</span>
                <span className={styles.methodDesc}>Receive OTP via SMS</span>
              </button>
            </div>
          </section>
        ) : null}

        {step === "verify" ? (
          <section>
            <h1>Verify</h1>
            <p className={styles.subtitle}>
              Enter your {method} to receive an OTP.
            </p>

            <form
              className={styles.authForm}
              noValidate
              onSubmit={verifyForm.handleSubmit(handleSendVerify)}
            >
              {method === "email" ? (
                <label className={styles.label}>
                  Email Address
                  <input
                    {...verifyForm.register("email")}
                    aria-label="Email address"
                    className={styles.input}
                    placeholder="you@example.com"
                    type="email"
                  />
                  {verifyForm.formState.errors.email ? (
                    <p className={styles.fieldError}>
                      {verifyForm.formState.errors.email.message}
                    </p>
                  ) : null}
                </label>
              ) : (
                <label className={styles.label}>
                  Phone Number
                  <input
                    {...verifyForm.register("phone")}
                    aria-label="Phone number"
                    className={styles.input}
                    placeholder="+1 (555) 000-0000"
                    type="tel"
                  />
                  {verifyForm.formState.errors.phone ? (
                    <p className={styles.fieldError}>
                      {verifyForm.formState.errors.phone.message}
                    </p>
                  ) : null}
                </label>
              )}

              <button className={styles.button} type="submit">
                Send OTP
              </button>
            </form>

            <button
              className={styles.backBtn}
              onClick={handleBack}
              type="button"
            >
              Back
            </button>
          </section>
        ) : null}

        {step === "otp" ? (
          <section>
            <h1>Enter OTP</h1>
            <p className={styles.subtitle}>
              Enter the 6-digit code from your verification message.
            </p>

            <form
              className={styles.authForm}
              noValidate
              onSubmit={otpForm.handleSubmit(handleVerifyOtp)}
            >
              <label className={styles.label}>
                One-Time Password
                <input
                  {...otpForm.register("otp")}
                  aria-label="One-time password"
                  className={`${styles.input} ${styles.otpInput}`}
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="000000"
                />
                {otpForm.formState.errors.otp ? (
                  <p className={styles.fieldError}>
                    {otpForm.formState.errors.otp.message}
                  </p>
                ) : null}
              </label>

              <button className={styles.button} type="submit">
                Verify OTP
              </button>
            </form>

            <button
              className={styles.backBtn}
              onClick={handleBack}
              type="button"
            >
              Back
            </button>
          </section>
        ) : null}

        {step === "reset" ? (
          <section>
            <h1>Create New Password</h1>
            <p className={styles.subtitle}>Enter your new password.</p>

            <form
              className={styles.authForm}
              noValidate
              onSubmit={resetForm.handleSubmit(handleResetPassword)}
            >
              <label className={styles.label}>
                New Password
                <input
                  {...resetForm.register("newPassword")}
                  aria-label="New password"
                  className={styles.input}
                  placeholder="Enter a new password"
                  type="password"
                />
                {resetForm.formState.errors.newPassword ? (
                  <p className={styles.fieldError}>
                    {resetForm.formState.errors.newPassword.message}
                  </p>
                ) : null}
              </label>

              <label className={styles.label}>
                Confirm Password
                <input
                  {...resetForm.register("confirmPassword")}
                  aria-label="Confirm password"
                  className={styles.input}
                  placeholder="Repeat your new password"
                  type="password"
                />
                {resetForm.formState.errors.confirmPassword ? (
                  <p className={styles.fieldError}>
                    {resetForm.formState.errors.confirmPassword.message}
                  </p>
                ) : null}
              </label>

              <div className={styles.passwordRequirements}>
                <p>Password must contain:</p>
                <ul>
                  <li className={newPassword.length >= 8 ? styles.met : ""}>
                    At least 8 characters
                  </li>
                  <li className={/[A-Z]/u.test(newPassword) ? styles.met : ""}>
                    One uppercase letter
                  </li>
                  <li className={/[a-z]/u.test(newPassword) ? styles.met : ""}>
                    One lowercase letter
                  </li>
                  <li className={/[0-9]/u.test(newPassword) ? styles.met : ""}>
                    One number
                  </li>
                </ul>
              </div>

              <button className={styles.button} type="submit">
                Reset Password
              </button>
            </form>

            <button
              className={styles.backBtn}
              onClick={handleBack}
              type="button"
            >
              Back
            </button>
          </section>
        ) : null}

        <p className={styles.footerText}>
          Remembered your password? <Link href="/login-page">Login</Link>
        </p>
      </div>
    </main>
  );
}
