"use client";

import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-2">Reset Password</h1>

        <p className="text-gray-500 text-center mb-6">
          Enter your email address
        </p>

        <input
          type="email"
          placeholder="name@example.com"
          className="w-full border rounded-lg px-4 py-2 mb-4"
        />

        <button className="w-full bg-green-600 text-white py-2 rounded-lg">
          Send Reset Link
        </button>

        <div className="text-center mt-4">
          <Link href="/login" className="text-green-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
