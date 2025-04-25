import React, { useState } from "react";
import LiquidButton from "../../../components/LiquidButton/LiquidButton";

export function SignIn() {
  const [userValue, setUserValue] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginMessage, setLoginMessage] = useState<string>("");
  const isDisabled = (userValue && password) == "";
  const handleUserValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserValue(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const fetchRegister = async () => {
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set Content-Type header
        },
        body: JSON.stringify({
          userValue: userValue,
          password: password,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result.token) {
        setLoginMessage(`You logged in as ${userValue}`);
      } else {
        setLoginMessage("Login successful, but no token received.");
      }

      console.log("Login successful:", result);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoginMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <>
      <h3 className="login__header">Have an Account alreadu?! Sign In!!!</h3>
        <img src="/images/terraria-bunny1.gif" className="login__bunnies" />
        <div className="col-3 input-effect">
          <input
            className={`effect-20 ${userValue ? "has-content" : ""}`}
            type="text"
            value={userValue}
            onChange={handleUserValueChange}
            placeholder="Username or Email"
          />
          <span className="focus-border">
            <i></i>
          </span>
        </div>
        <img
          src="/images/terreria-bunnyFLIPPEd.gif"
          className="login__bunnies"
        />
        <div className="col-3 input-effect">
          <input
            className={`effect-20 ${password ? "has-content" : ""}`}
            type="text"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
          />
          <span className="focus-border">
            <i></i>
          </span>
        </div>
      </>
       <LiquidButton
        text="Sign in!!!"
        onClick={fetchRegister}
        disabled={isDisabled}
      />
      {loginMessage && <div className="login__message">{loginMessage}</div>}
    </>
  );
}
