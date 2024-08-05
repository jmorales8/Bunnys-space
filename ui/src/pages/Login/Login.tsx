import React from "react";

export function Login() {
  return (
    <div className="login">
      <>
        <img src="/images/terraria-bunny1.gif" className="login__bunnies" />
        <input className="login__input" placeholder="Username" />
      </>
      <>
        <img
          src="/images/terreria-bunnyFLIPPEd.gif"
          className="login__bunnies"
        />
        <input className="login__input" placeholder="Password" />
      </>
      <button className="login__button">
        Login
      </button>
    </div>
  );
}
