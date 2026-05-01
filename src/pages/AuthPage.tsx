import { ArrowRight, Mail, UserRound } from "lucide-react";
import { type FormEvent, useState } from "react";
import type { AuthMode, AuthProfile } from "../types";

type AuthPageProps = {
  onSubmit: (profile: AuthProfile) => void;
};

function AuthPage({ onSubmit }: AuthPageProps) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [name, setName] = useState("Mika");
  const [email, setEmail] = useState("mika@kambio.demo");
  const [password, setPassword] = useState("demo1234");
  const [error, setError] = useState<string | null>(null);

  const isRegister = mode === "register";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if ((isRegister && !name.trim()) || !email.trim() || !password.trim()) {
      setError("Complete the required fields to enter the prototype.");
      return;
    }

    onSubmit({
      name: isRegister ? name.trim() : name.trim() || "Mika",
      email: email.trim(),
    });
  };

  return (
    <main className="min-h-screen bg-stone-100 px-5 text-slate-950">
      <section className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center py-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase text-emerald-700">
            Kambio
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight">
            {isRegister ? "Create your exchange profile." : "Welcome back."}
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-600">
            {isRegister
              ? "Register a demo account to start earning and spending skill credits."
              : "Sign in to continue the frontend-only presentation flow."}
          </p>
        </div>

        <div className="mb-4 grid grid-cols-2 rounded-lg bg-stone-200 p-1">
          <button
            type="button"
            className={`h-10 rounded-md text-sm font-semibold ${
              mode === "login" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"
            }`}
            onClick={() => {
              setMode("login");
              setError(null);
            }}
          >
            Login
          </button>
          <button
            type="button"
            className={`h-10 rounded-md text-sm font-semibold ${
              mode === "register"
                ? "bg-white text-slate-950 shadow-sm"
                : "text-slate-500"
            }`}
            onClick={() => {
              setMode("register");
              setError(null);
            }}
          >
            Register
          </button>
        </div>

        <form
          className="space-y-3 rounded-xl border border-stone-200 bg-white p-4 shadow-sm"
          onSubmit={handleSubmit}
        >
          {isRegister ? (
            <label className="block">
              <span className="text-xs font-semibold uppercase text-slate-500">
                Name
              </span>
              <div className="mt-2 flex h-11 items-center gap-3 rounded-lg border border-stone-200 px-3">
                <UserRound size={17} className="text-slate-400" aria-hidden="true" />
                <input
                  className="w-full bg-transparent text-sm outline-none"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
            </label>
          ) : null}

          <label className="block">
            <span className="text-xs font-semibold uppercase text-slate-500">
              Email
            </span>
            <div className="mt-2 flex h-11 items-center gap-3 rounded-lg border border-stone-200 px-3">
              <Mail size={17} className="text-slate-400" aria-hidden="true" />
              <input
                className="w-full bg-transparent text-sm outline-none"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase text-slate-500">
              Password
            </span>
            <input
              className="mt-2 h-11 w-full rounded-lg border border-stone-200 px-3 text-sm outline-none focus:border-emerald-600"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          {error ? (
            <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm font-medium text-rose-800">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white"
          >
            {isRegister ? "Create account" : "Login"}
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        </form>

        <button
          type="button"
          className="mt-4 w-full rounded-lg px-4 py-3 text-sm font-semibold text-slate-500"
          onClick={() => onSubmit({ name: "Mika", email: "demo@kambio.local" })}
        >
          Continue as demo user
        </button>
      </section>
    </main>
  );
}

export default AuthPage;
