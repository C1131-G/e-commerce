'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || !password) {
      setMessage('Please enter both email and password.');
      return;
    }

    setMessage('Logging in...');

    // Replace this with your real auth logic.
    setTimeout(() => {
      setMessage(`Welcome back, ${email}!`);
    }, 600);
  }

  return (
    <main className="login-page">
      <div className="login-card">
        <h1>Login</h1>
        <p className="subtitle">Access your account with your email and password.</p>

        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
            />
          </label>

          <button type="submit">Sign In</button>
        </form>

        {message ? <p className="message">{message}</p> : null}

        <p className="footer-text">
          <Link href="/register">Create an account</Link>
          <span> · </span>
          <Link href="/forgot-password">Forgot password?</Link>
        </p>
      </div>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: #f3fbf4;
          color: #0f172a;
        }

        .login-card {
          width: min(420px, 100%);
          padding: 32px;
          border-radius: 24px;
          background: #ffffff;
          border: 1px solid #d8efd4;
          box-shadow: 0 24px 60px rgba(15, 23, 42, 0.12);
        }

        h1 {
          margin: 0 0 12px;
          font-size: 2rem;
          letter-spacing: -0.04em;
          color: #064e3b;
        }

        .subtitle {
          margin: 0 0 24px;
          color: #14532d;
          line-height: 1.6;
        }

        .login-form {
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
          transition: transform 0.15s ease, background-color 0.15s ease;
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
          text-align: center;
          color: #14532d;
        }

        .footer-text a {
          color: #166534;
          text-decoration: underline;
        }

        .footer-text span {
          color: #4b5563;
        }
      `}</style>
    </main>
  );
}
