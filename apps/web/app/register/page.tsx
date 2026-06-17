"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useState } from "react";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setMessage("Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setMessage("Creating your account...");

    setTimeout(() => {
      setMessage(`Account created for ${name}. You can now log in.`);
    }, 800);
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Register</h1>
        <p className="subtitle">Create your account to access the portal.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Full Name
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              aria-label="Full name"
              placeholder="Your full name"
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-label="Email address"
              placeholder="you@example.com"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-label="Password"
              placeholder="Create a password"
            />
          </label>

          <label>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              aria-label="Confirm password"
              placeholder="Repeat your password"
            />
          </label>

          <button type="submit">Register</button>
        </form>

        {message ? <p className="message">{message}</p> : null}

        <p className="footer-text">
          Already have an account? <Link href="/">Login</Link>
        </p>
      </div>

      <style jsx>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: #f3fbf4;
          color: #0f172a;
        }

        .auth-card {
          width: min(460px, 100%);
          padding: 32px;
          border-radius: 24px;
          background: #ffffff;
          border: 1px solid #d8efd4;
          box-shadow: 0 24px 60px rgba(15, 23, 42, 0.12);
        }

        h1 {
          margin: 0 0 10px;
          font-size: 2rem;
          color: #064e3b;
        }

        .subtitle {
          margin: 0 0 24px;
          color: #14532d;
          line-height: 1.6;
        }

        .auth-form {
          display: grid;
          gap: 16px;
        }

        label {
          display: grid;
          gap: 8px;
          font-size: 0.95rem;
          color: #166534;
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
        }

        input::placeholder {
          color: #6b7280;
        }

        input:focus {
          border-color: #16a34a;
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.18);
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
          transition:
            transform 0.15s ease,
            background-color 0.15s ease;
        }

        button:hover {
          background: #15803d;
          transform: translateY(-1px);
        }

        .message {
          margin-top: 16px;
          color: #166534;
          background: #dcfce7;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid #86efac;
        }

        .footer-text {
          margin-top: 18px;
          color: #14532d;
          text-align: center;
        }

        .footer-text a {
          color: #166534;
          text-decoration: underline;
        }
      `}</style>
    </main>
  );
};

export default RegisterPage;
