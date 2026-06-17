"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useState } from "react";

type Step = "method" | "verify" | "otp" | "reset";
type VerificationMethod = "email" | "phone" | null;

const MethodStep = ({
  onSelect,
}: {
  onSelect: (m: VerificationMethod) => void;
}) => (
  <>
    <h1>Reset Password</h1>
    <p className="subtitle">Choose how you want to verify your identity.</p>

    <div className="method-buttons">
      <button
        type="button"
        className="method-btn"
        onClick={() => onSelect("email")}
        aria-label="Verify via email"
      >
        <div className="method-icon">📧</div>
        <div className="method-title">Email</div>
        <div className="method-desc">Receive OTP via email</div>
      </button>

      <button
        type="button"
        className="method-btn"
        onClick={() => onSelect("phone")}
        aria-label="Verify via phone"
      >
        <div className="method-icon">📱</div>
        <div className="method-title">Phone</div>
        <div className="method-desc">Receive OTP via SMS</div>
      </button>
    </div>
  </>
);

const VerifyStep = ({
  method,
  email,
  setEmail,
  phone,
  setPhone,
  isLoading,
  onSubmit,
  onBack,
}: {
  method: VerificationMethod;
  email: string;
  setEmail: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  isLoading: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
}) => (
  <>
    <h1>Verify Your {method === "email" ? "Email" : "Phone"}</h1>
    <p className="subtitle">
      Enter your {method === "email" ? "email address" : "phone number"} to
      receive an OTP.
    </p>

    <form onSubmit={onSubmit} className="auth-form">
      {method === "email" ? (
        <label>
          Email Address
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            aria-label="Email address"
            disabled={isLoading}
          />
        </label>
      ) : (
        <label>
          Phone Number
          <input
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="+1 (555) 000-0000"
            aria-label="Phone number"
            disabled={isLoading}
          />
        </label>
      )}

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Sending..." : "Send OTP"}
      </button>
    </form>

    <button
      type="button"
      className="back-btn"
      onClick={onBack}
      disabled={isLoading}
    >
      ← Back
    </button>
  </>
);

const OtpStep = ({
  method,
  otp,
  setOtp,
  isLoading,
  onVerify,
  onResend,
  onBack,
}: {
  method: VerificationMethod;
  otp: string;
  setOtp: (v: string) => void;
  isLoading: boolean;
  onVerify: (e: FormEvent<HTMLFormElement>) => void;
  onResend: () => void;
  onBack: () => void;
}) => (
  <>
    <h1>Enter OTP</h1>
    <p className="subtitle">
      We've sent a 6-digit code to your {method === "email" ? "email" : "phone"}
      . Enter it below.
    </p>

    <form onSubmit={onVerify} className="auth-form">
      <label>
        One-Time Password
        <input
          type="text"
          value={otp}
          onChange={(event) =>
            setOtp(event.target.value.replaceAll(/\D/gu, "").slice(0, 6))
          }
          placeholder="000000"
          maxLength={6}
          disabled={isLoading}
          className="otp-input"
          aria-label="One-time password"
        />
      </label>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Verifying..." : "Verify OTP"}
      </button>
    </form>

    <p className="resend-text">
      Didn't receive the code?{" "}
      <button
        type="button"
        className="resend-btn"
        onClick={onResend}
        disabled={isLoading}
        aria-label="Resend OTP"
      >
        Resend OTP
      </button>
    </p>

    <button
      type="button"
      className="back-btn"
      onClick={onBack}
      disabled={isLoading}
      aria-label="Go back"
    >
      ← Back
    </button>
  </>
);

const ResetStep = ({
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  isLoading,
  onSubmit,
  onBack,
}: {
  newPassword: string;
  setNewPassword: (v: string) => void;
  confirmPassword: string;
  setConfirmPassword: (v: string) => void;
  isLoading: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
}) => (
  <>
    <h1>Create New Password</h1>
    <p className="subtitle">
      Enter your new password. Make sure it's secure and different from your
      previous password.
    </p>

    <form onSubmit={onSubmit} className="auth-form">
      <label>
        New Password
        <input
          type="password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          aria-label="New password"
          placeholder="••••••••"
          disabled={isLoading}
        />
      </label>

      <label>
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          aria-label="Confirm password"
          placeholder="••••••••"
          disabled={isLoading}
        />
      </label>

      <div className="password-requirements">
        <p>Password must contain:</p>
        <ul>
          <li className={newPassword.length >= 8 ? "met" : ""}>
            ✓ At least 8 characters
          </li>
          <li className={/[A-Z]/u.test(newPassword) ? "met" : ""}>
            ✓ One uppercase letter
          </li>
          <li className={/[a-z]/u.test(newPassword) ? "met" : ""}>
            ✓ One lowercase letter
          </li>
          <li className={/[0-9]/u.test(newPassword) ? "met" : ""}>
            ✓ One number
          </li>
        </ul>
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Resetting..." : "Reset Password"}
      </button>
    </form>

    <button
      type="button"
      className="back-btn"
      onClick={onBack}
      disabled={isLoading}
    >
      ← Back
    </button>
  </>
);

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>("method");
  const [method, setMethod] = useState<VerificationMethod>(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [_otpSent, setOtpSent] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const handleMethodSelect = (selectedMethod: VerificationMethod) => {
    setMethod(selectedMethod);
    setStep("verify");
    setMessage("");
  };

  const handleVerifySend = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (!method) {
      setMessage("Please select a verification method.");
      setIsLoading(false);
      return;
    }

    if (method === "email" && !email) {
      setMessage("Please enter your email address.");
      setIsLoading(false);
      return;
    }

    if (method === "phone" && !phone) {
      setMessage("Please enter your phone number.");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setOtpSent(true);
      setMessage(
        `OTP sent to ${method === "email" ? email : phone}. Please check your ${method}.`
      );
      setStep("otp");
      setIsLoading(false);
    }, 1000);
  };

  const handleOtpVerify = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (!otp || otp.length !== 6) {
      setMessage("Please enter a valid 6-digit OTP.");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setOtpVerified(true);
      setMessage("OTP verified successfully!");
      setStep("reset");
      setIsLoading(false);
    }, 1000);
  };

  const handleResetPassword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (!newPassword || !confirmPassword) {
      setMessage("Please fill in all password fields.");
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setMessage("Password must be at least 8 characters long.");
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setMessage("Password reset successfully! Redirecting to login...");
      setTimeout(() => {
        window.location.href = "/login-page";
      }, 2000);
      setIsLoading(false);
    }, 1000);
  };

  const handleBack = () => {
    if (step === "verify") {
      setStep("method");
      setMethod(null);
      setEmail("");
      setPhone("");
      setMessage("");
    } else if (step === "otp") {
      setStep("verify");
      setOtp("");
      setOtpSent(false);
      setMessage("");
    } else if (step === "reset") {
      setStep("otp");
      setNewPassword("");
      setConfirmPassword("");
      setOtpVerified(false);
      setMessage("");
    }
  };

  // compute step classes to avoid nested ternary expressions
  let step1Class = "";
  if (step === "method") {
    step1Class = "active";
  } else if (["verify", "otp", "reset"].includes(step)) {
    step1Class = "completed";
  }

  let step2Class = "";
  if (step === "verify") {
    step2Class = "active";
  } else if (["otp", "reset"].includes(step)) {
    step2Class = "completed";
  }

  let step3Class = "";
  if (step === "otp") {
    step3Class = "active";
  } else if (step === "reset") {
    step3Class = "completed";
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="step-indicator">
          <div className={`step ${step1Class}`}>1</div>
          <div
            className={`step-line ${["verify", "otp", "reset"].includes(step) ? "completed" : ""}`}
          />
          <div className={`step ${step2Class}`}>2</div>
          <div
            className={`step-line ${["otp", "reset"].includes(step) ? "completed" : ""}`}
          />
          <div className={`step ${step3Class}`}>3</div>
          <div className={`step-line ${step === "reset" ? "completed" : ""}`} />
          <div className={`step ${step === "reset" ? "active" : ""}`}>4</div>
        </div>

        {step === "method" && <MethodStep onSelect={handleMethodSelect} />}

        {step === "verify" && (
          <VerifyStep
            method={method}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            isLoading={isLoading}
            onSubmit={handleVerifySend}
            onBack={handleBack}
          />
        )}

        {step === "otp" && (
          <OtpStep
            method={method}
            otp={otp}
            setOtp={setOtp}
            isLoading={isLoading}
            onVerify={handleOtpVerify}
            onResend={() => {
              setOtp("");
              setMessage("OTP resent successfully!");
            }}
            onBack={handleBack}
          />
        )}

        {step === "reset" && (
          <ResetStep
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            isLoading={isLoading}
            onSubmit={handleResetPassword}
            onBack={handleBack}
          />
        )}

        {message ? (
          <p className={`message ${otpVerified ? "success" : ""}`}>{message}</p>
        ) : null}

        <p className="footer-text">
          Remembered your password? <Link href="/login-page">Login</Link>
        </p>
      </div>

      <style jsx>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: linear-gradient(135deg, #f3fbf4 0%, #ecf5ff 100%);
          color: #0f172a;
        }

        .auth-card {
          width: min(500px, 100%);
          padding: 40px;
          border-radius: 24px;
          background: #ffffff;
          border: 1px solid #d8efd4;
          box-shadow: 0 24px 60px rgba(15, 23, 42, 0.12);
        }

        .step-indicator {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .step {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid #d1e7d0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: #6b7280;
          background: #f7fdf8;
          transition: all 0.3s ease;
        }

        .step.active {
          background: #16a34a;
          border-color: #16a34a;
          color: white;
          box-shadow: 0 0 12px rgba(22, 163, 74, 0.3);
        }

        .step.completed {
          background: #dcfce7;
          border-color: #16a34a;
          color: #16a34a;
        }

        .step-line {
          flex: 1;
          height: 2px;
          background: #d1e7d0;
          margin: 0 8px;
          transition: background 0.3s ease;
        }

        .step-line.completed {
          background: #16a34a;
        }

        h1 {
          margin: 0 0 10px;
          font-size: 1.75rem;
          color: #064e3b;
          font-weight: 700;
        }

        .subtitle {
          margin: 0 0 28px;
          color: #14532d;
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .method-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }

        .method-btn {
          padding: 28px 16px;
          border: 2px solid #d1e7d0;
          border-radius: 16px;
          background: #f7fdf8;
          color: #0f172a;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          font-size: 1rem;
          font-weight: 600;
        }

        .method-btn:hover {
          border-color: #16a34a;
          background: #ecf5ff;
          transform: translateY(-2px);
        }

        .method-icon {
          font-size: 2.5rem;
        }

        .method-title {
          color: #064e3b;
          font-size: 1.1rem;
        }

        .method-desc {
          font-size: 0.8rem;
          color: #6b7280;
          font-weight: 400;
        }

        .auth-form {
          display: grid;
          gap: 16px;
          margin-bottom: 24px;
        }

        label {
          display: grid;
          gap: 8px;
          font-size: 0.95rem;
          color: #166534;
          font-weight: 500;
        }

        input {
          width: 100%;
          padding: 14px 16px;
          border-radius: 14px;
          border: 1px solid #d1e7d0;
          background: #f7fdf8;
          color: #0f172a;
          font-size: 1rem;
          outline: none;
          transition: all 0.2s ease;
        }

        input::placeholder {
          color: #9ca3af;
        }

        input:focus {
          border-color: #16a34a;
          box-shadow: 0 0 0 4px rgba(22, 163, 74, 0.1);
          background: #ffffff;
        }

        input:disabled {
          background: #f3f4f6;
          color: #9ca3af;
          cursor: not-allowed;
        }

        .otp-input {
          letter-spacing: 8px;
          text-align: center;
          font-size: 1.3rem;
          font-weight: 600;
          font-family: "Courier New", monospace;
        }

        button {
          width: 100%;
          padding: 14px 18px;
          border: none;
          border-radius: 14px;
          background: #16a34a;
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        button:hover:not(:disabled) {
          background: #15803d;
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(22, 163, 74, 0.2);
        }

        button:disabled {
          background: #a3e635;
          opacity: 0.6;
          cursor: not-allowed;
        }

        .back-btn {
          background: #f3f4f6;
          color: #6b7280;
          margin-top: 12px;
          font-weight: 500;
        }

        .back-btn:hover:not(:disabled) {
          background: #e5e7eb;
          color: #374151;
        }

        .resend-text {
          text-align: center;
          color: #6b7280;
          font-size: 0.9rem;
          margin-top: 16px;
        }

        .resend-btn {
          background: none;
          border: none;
          color: #16a34a;
          text-decoration: underline;
          padding: 0;
          font-weight: 600;
          cursor: pointer;
          font-size: 0.9rem;
          transition: color 0.2s ease;
        }

        .resend-btn:hover:not(:disabled) {
          color: #15803d;
        }

        .password-requirements {
          background: #f7fdf8;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid #d1e7d0;
          margin-top: -8px;
        }

        .password-requirements p {
          margin: 0 0 10px;
          font-size: 0.85rem;
          color: #14532d;
          font-weight: 600;
        }

        .password-requirements ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 6px;
        }

        .password-requirements li {
          font-size: 0.8rem;
          color: #6b7280;
          transition: color 0.2s ease;
        }

        .password-requirements li.met {
          color: #16a34a;
          font-weight: 600;
        }

        .message {
          margin-top: 16px;
          color: #166534;
          background: #dcfce7;
          padding: 14px 16px;
          border-radius: 12px;
          border: 1px solid #86efac;
          font-size: 0.9rem;
          animation: slideIn 0.3s ease;
        }

        .message.success {
          background: #d1fae5;
          color: #065f46;
          border-color: #6ee7b7;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .footer-text {
          margin-top: 20px;
          color: #14532d;
          text-align: center;
          font-size: 0.9rem;
        }

        .footer-text a {
          color: #166534;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s ease;
        }

        .footer-text a:hover {
          color: #15803d;
          text-decoration: underline;
        }

        @media (max-width: 600px) {
          .auth-card {
            padding: 28px 20px;
          }

          .method-buttons {
            grid-template-columns: 1fr;
          }

          .step-indicator {
            gap: 4px;
            margin-bottom: 24px;
          }

          .step {
            width: 32px;
            height: 32px;
            font-size: 0.8rem;
          }

          h1 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </main>
  );
}
