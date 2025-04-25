import { useState } from "react";
import { SignUp } from "./SignUp/SignUp";
import { SignIn } from "./SignIn/SignIn";

export function Login() {
  const [form, setForm] = useState<boolean>(true);
  const handlePageChange = () => {
    setForm(!form);
  };
  return (
    <div className="login">
      {form ? (
        <>
          <SignUp />
          <div className="login__link" onClick={handlePageChange}>
            Already have an account?
            <img
              src="/images/erwin_goober.gif"
              className="login__link__icons"
              alt="link_icon"
            />
          </div>
        </>
      ) : (
        <>
          <SignIn />
          <div className="login__link" onClick={handlePageChange}>
            Dont have an account?
            <img
              src="/images/happy_goober.gif"
              className="login__link__icons"
              alt="link_icon"
            />
          </div>
        </>
      )}
    </div>
  );
}
