import React, { useState } from "react";
import LiquidButton from "../../../components/LiquidButton/LiquidButton";
interface SignUpProps {
  isDarkmode: boolean;
}

export function SignUp({isDarkmode}: SignUpProps) {
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
      <h3 className={isDarkmode ? "login__header__night": "login__header"}>New to the website?! Sign Up!!!</h3>
      <img src="/images/aaaa-scream.gif" className="login__scream" />
      <div className="col-3 input-effect">
        <input
          className={`${isDarkmode ? "effect-20__night login__input__night": "effect-20"} ${username ? "has-content" : ""} login__input`}
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Username"
        />
        <span className="focus-border">
          <i></i>
        </span>
      </div>
      <div className="col-3 input-effect">
        <input
          className={`${isDarkmode ? "effect-20__night login__input__night": "effect-20"} ${email ? "has-content" : ""} login__input`}
          type="text"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
        />
        <span className="focus-border">
          <i></i>
        </span>
      </div>
      <div className="col-3 input-effect">
        <input
          className={`${isDarkmode ? "effect-20__night login__input__night" : "effect-20 login__input"} ${password ? "has-content" : ""}`}
          type="text"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
        />
        <span className="focus-border">
          <i></i>
        </span>
      </div>
      <LiquidButton
        text="Create An Account!!!"
        onClick={fetchRegister}
        disabled={isDisabled}
      />
    </>
  );
}
