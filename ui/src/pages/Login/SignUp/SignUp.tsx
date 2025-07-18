import React, { useState } from "react";
import LiquidButton from "../../../components/LiquidButton/LiquidButton";
import { PinkInput } from "../../../components/PinkInput/PinkInput";
interface SignUpProps {
  isDarkmode: boolean;
}

export function SignUp({ isDarkmode }: SignUpProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const isDisabled = (username && email && password) == "";

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

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
          username: username, // Use state values for the username and password
          email: email,
          password: password,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log(
        "Username: ",
        username,
        "\nPassword: ",
        password,
        "\nResponse: ",
        result
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <h3 className={isDarkmode ? "login__header__night" : "login__header"}>
        New to the website?! Sign Up!!!
      </h3>
      <img src="/images/aaaa-scream.gif" className="login__scream" />
      <PinkInput
        state={isDarkmode}
        value={username}
        onChange={handleUsernameChange}
        placeholder="Username"
      />
      <PinkInput
        state={isDarkmode}
        value={email}
        onChange={handleEmailChange}
        placeholder="Email"
      />

      <PinkInput
        state={isDarkmode}
        value={password}
        onChange={handlePasswordChange}
        placeholder="Password"
      />

      <LiquidButton
        text="Create An Account!!!"
        onClick={fetchRegister}
        disabled={isDisabled}
      />
    </>
  );
}
