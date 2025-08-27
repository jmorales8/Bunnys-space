// src/pages/SignIn/SignIn.tsx
import React, { useState } from "react";
import LiquidButton from "../../../components/LiquidButton/LiquidButton";
import { PinkInput } from "../../../components/PinkInput/PinkInput";
import { useAuth } from "../../../auth/AuthProvider";

interface SignInProps { isDarkmode: boolean; }

export function SignIn({ isDarkmode }: SignInProps) {
  const { login, state } = useAuth();
  const [userValue, setUserValue] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const disabled = !userValue || !password || state === "loading";

  const onSubmit = async () => {
    setMsg("");
    try {
      await login({ userValue, password }); // sets cookie server-side, updates context
      setMsg(`You logged in as ${userValue}`);
    } catch (e: any) {
      setMsg(e.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <h3 className={isDarkmode ? "login__header__night__1" : "login__header__1"}>
        Have An Account Already?! Sign In!!!
      </h3>
      <img src="/images/terraria-bunny1.gif" className="login__bunnies" />

      <PinkInput
        state={isDarkmode}
        value={userValue}
        onChange={(e) => setUserValue(e.target.value)}
        placeholder="Username or Email"
      />

      <img src="/images/terreria-bunnyFLIPPEd.gif" className="login__bunnies" />

      <PinkInput
        state={isDarkmode}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />

      <LiquidButton text="Sign in!!!" onClick={onSubmit} disabled={disabled} />
      {msg && <div className="login__message">{msg}</div>}
    </>
  );
}
