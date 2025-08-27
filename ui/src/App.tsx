import { Navigate, Route, Routes } from "react-router-dom";
import "../src/styles/styles.scss";
import { Home } from "./pages/Home/Home";
import { NavigationBar } from "./NavigationBar/NavigationBar";
import { Twitch } from "./pages/Twitch/Twitch";
import { Commissions } from "./pages/Commissions/Commissions";
import { Lore } from "./pages/Lore/Lore";
import { Discord } from "./pages/Discord/Discord";
import { Footer } from "./Footer/Footer";
import { LoginButton } from "./components/LoginButton/LoginButton";
import ThemeProvider from "./context/ThemeContext";
import { AppContent } from "./components/AppContent/AppContent";
import AudioPlayer from "./components/Sound/Player";
import FloatingDrawer from "./components/FloatingDrawer/FloatingDrawer";
import { Login } from "./pages/Login/Login";
import { QAndA } from "./pages/Q-and-A/Q-and-A";
import { Apply } from "./pages/Commissions/Apply/Apply";

function App() {
  return (
    <ThemeProvider>
      <AppContent>
        <div className="app__head">
          <LoginButton />
        </div>
        <NavigationBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/lore" element={<Lore />} />
          <Route path="/twitch" element={<Twitch />} />
          <Route path="/commissions" element={<Commissions />} />
          <Route path="/comission-apply" element={<Apply />} />
          <Route path="/discord" element={<Discord />} />
          <Route path="/Q-and-A" element={<QAndA />} />
        </Routes>
        <Footer />
      </AppContent>
    </ThemeProvider>
  );
}

export default App;
