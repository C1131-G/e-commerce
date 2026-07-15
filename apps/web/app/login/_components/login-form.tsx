"use client";

import { useForm } from "react-hook-form";

interface LoginFormValues {
  email: string;
  password: string;
}

const handleLoginSubmit = (data: LoginFormValues) => {
  console.log(data);
};

const LoginForm = () => {
  const { handleSubmit, register } = useForm<LoginFormValues>();

  return (
    <form onSubmit={handleSubmit(handleLoginSubmit)}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register("email")} />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" {...register("password")} />
      </div>

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
