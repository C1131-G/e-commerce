import LoginForm from "./_components/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Authorizer Login
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Sign in with the credentials provided by the administrator.
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
