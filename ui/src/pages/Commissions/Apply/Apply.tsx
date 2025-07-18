import { useContext, useState } from "react";
import { PinkInput } from "../../../components/PinkInput/PinkInput";
import { ThemeContext } from "../../../context/ThemeContext";

export function Apply() {
  const [email, setEmail] = useState("");
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("DarkMode must be used within a ThemeProvider");
  }
  const { isDarkMode } = themeContext;

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  return (
    <>
      <form
        style={{
          display: " flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            How should we contact you?!
            <PinkInput
              state={isDarkMode}
              value={email}
              onChange={handleEmailChange}
              placeholder="Email"
            />
          </div>
        </div>
        <div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            Who is the OC?!
            <PinkInput
              state={isDarkMode}
              value={email}
              onChange={handleEmailChange}
              placeholder="Email"
            />
          </div>
        </div>
      </form>
    </>
  );
}
