"use client";

import { useActionState } from "react";
import { login } from "../actions";

export default function LoginPage() {
  const [error, action, pending] = useActionState(login, null);

  return (
    <div className="grid min-h-screen place-items-center bg-surface px-4">
      <form action={action} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm ring-1 ring-line">
        <h1 className="text-2xl font-medium tracking-[-0.03em]">Admin login</h1>
        <p className="mt-1 text-sm text-muted">Enter the dashboard password.</p>

        <label className="mt-6 block text-sm font-medium" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          className="mt-1.5 w-full rounded-lg border border-line px-3 py-2.5 outline-none focus:border-black"
        />

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <button
          disabled={pending}
          className="mt-6 w-full rounded-full bg-black py-3 font-semibold text-white disabled:opacity-60"
        >
          {pending ? "Checking…" : "Log in"}
        </button>
      </form>
    </div>
  );
}
