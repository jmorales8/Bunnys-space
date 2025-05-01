import { useContext, useState } from "react";
import { SignUp } from "./SignUp/SignUp";
import { SignIn } from "./SignIn/SignIn";
import { ThemeContext } from "../../context/ThemeContext";

export function Login() {
  const [form, setForm] = useState<boolean>(true);
  const handlePageChange = () => {
    setForm(!form);
  };

  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("DarkMode must be used within a ThemeProvider");
  }

  const { isDarkMode } = themeContext;
  return (
    <div className="login">
      {form ? (
        <>
          <SignUp isDarkmode={isDarkMode} />
          <div className="login__link__container">
            <span className={isDarkMode ? "login__link__night" : "login__link"} onClick={handlePageChange}>Already have an account?</span>
            <img
              src="/images/erwin_goober.gif"
              className="login__link__icons"
              alt="link_icon"
              onClick={handlePageChange}
            />
          </div>
        </>
      ) : (
        <>
          <SignIn isDarkmode={isDarkMode} />
          <div className="login__link__container" onClick={handlePageChange}>
            <span className={isDarkMode ? "login__link__night" : "login__link"} onClick={handlePageChange}>Dont have an account?</span>
            <img
              src="/images/happy_goober.gif"
              className="login__link__icons"
              alt="link_icon"
              onClick={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
}
