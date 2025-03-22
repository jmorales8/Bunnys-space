import React, { useState } from "react";

export function SignIn() {
  const [userValue, setUserValue] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginMessage, setLoginMessage] = useState<string>("");

  const handleUserValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
          username: userValue,
          password: password
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
        <img src="/images/terraria-bunny1.gif" className="login__bunnies" />
        <input
          className="login__input"
          placeholder="Username or Email"
          value={userValue}
          onChange={handleUserValueChange}
        />
        <img
          src="/images/terreria-bunnyFLIPPEd.gif"
          className="login__bunnies"
        />
        <input
          className="login__input"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </>
      <button className="login__button" onClick={fetchRegister} disabled={(userValue && password)== ""}>
        Sign in!!!
      </button>
      {loginMessage && <div className="login__message">{loginMessage}</div>}
    </>
  );
}
