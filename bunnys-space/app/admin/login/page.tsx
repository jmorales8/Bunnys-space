"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        className="w-80 space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setError("");

          const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
            callbackUrl: "/admin",
          });

          if (!res) return setError("Login failed");
          if (res.error) return setError("Invalid credentials");

          window.location.href = res.url ?? "/admin";
        }}
      >
        <h1 className="text-xl font-bold">Admin Login</h1>

        <input
          className="border p-2 w-full"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-black text-white w-full p-2 rounded"
          type="submit"
        >
          Login
        </button>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}

