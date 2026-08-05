"use client";

import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import { loginSchema } from "../_schemas/login.schema";

const LoginForm = () => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      emailOrPhone: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const { error } = await authClient.signIn.email({
          email: value.emailOrPhone,
          password: value.password,
        });

        if (error) {
          console.error(error);
          return;
        }

        router.push("/dashboard");
      } catch (error) {
        console.error(error);
      }
    },
    validators: {
      onChange: loginSchema,
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <form.Field name="emailOrPhone">
        {(field) => (
          <div>
            <label htmlFor="emailOrPhone">Email or Phone</label>

            <input
              id="emailOrPhone"
              type="text"
              aria-label="Email or Phone"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
            />

            {field.state.meta.errors.length > 0 && (
              <p className="text-sm text-red-500">
                {field.state.meta.errors[0]?.message}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="password">
        {(field) => (
          <div>
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              aria-label="Password"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
            />

            {field.state.meta.errors.length > 0 && (
              <p className="text-sm text-red-500">
                {field.state.meta.errors[0]?.message}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <button
        type="submit"
        className="w-full rounded-md bg-black px-4 py-2 text-white"
      >
        Login
      </button>

      <Link href="/forgot-password">Forgot Password?</Link>
    </form>
  );
};

export default LoginForm;
