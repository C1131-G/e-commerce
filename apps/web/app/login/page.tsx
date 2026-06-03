"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-black text-center">
          Welcome Back
        </h1>

        <p className="text-center text-gray-600 mt-2 mb-6">
          Sign in to your account
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-black mb-2">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full border border-gray-300 rounded-lg p-3 text-black"
            />
          </div>

          <div>
            <label className="block text-black mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg p-3 text-black"
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="text-black">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>

            <Link href="/forgot-password" className="text-green-600">
              Forgot Password?
            </Link>
          </div>

          <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold">
            Sign In
          </button>
        </div>

        <p className="text-center mt-6 text-black">
          Don't have an account?{" "}
          <Link href="/signup" className="text-green-600 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
