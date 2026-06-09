'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email) {
      setMessage('Please enter your email address.');
      return;
    }

    setMessage('Sending password reset instructions...');

    setTimeout(() => {
      setMessage(`If an account exists for ${email}, you will receive reset instructions shortly.`);
    }, 800);
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Reset Password</h1>
        <p className="subtitle">Enter your email to receive reset instructions.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <button type="submit">Send Reset Link</button>
        </form>

        {message ? <p className="message">{message}</p> : null}

        <p className="footer-text">
          Remembered your password? <Link href="/">Login</Link>
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
}
