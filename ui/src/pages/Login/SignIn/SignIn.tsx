import React, { useState } from "react";

export function SignIn() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const fetchRegister = async () => {
    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set Content-Type header
        },
        body: JSON.stringify({
          username: username,  // Use state values for the username and password
          email: email,
          password: password
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log("Username: ", username, "\nPassword: ", password, "\nResponse: ", result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <>
        <img src="/images/terraria-bunny1.gif" className="login__bunnies" />
        <input
          className="login__input"
          placeholder="Username or Email"
          value={username}
          onChange={handleUsernameChange}
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
      <button className="login__button" onClick={fetchRegister}>
        Sign in!!!
      </button>
    </>
  );
}