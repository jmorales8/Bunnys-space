import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "../src/styles/styles.scss";
import { Home } from "./pages/Home/Home";
import { NavigationBar } from "./NavigationBar/NavigationBar";
import { Twitch } from "./pages/Twitch/Twitch";
import { Commissions } from "./pages/Commissions/Commissions";
import { Lore } from "./pages/Lore/Lore";
import { Discord } from "./pages/Discord/Discord";
import { Footer } from "./Footer/Footer";
import { LoginButton } from "./components/LoginButton/LoginButton";
import AudioPlayer from "./components/Sound/Player";

function App() {
  return (
    <div className="app">
      <div className="app__content">
        <Router basename={process.env.PUBLIC_URL}>
          <div className="app__head">
            <AudioPlayer />
            <LoginButton />
          </div>
          <NavigationBar />
          <Routes>
            <Route path="/login" element={<>I am the login page</>} />
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/lore" element={<Lore />} />
            <Route path="/twitch" element={<Twitch />} />
            <Route path="/commissions" element={<Commissions />} />
            <Route path="/discord" element={<Discord />} />
          </Routes>
        </Router>
        <Footer />
      </div>
    </div>
  );
}

export default App;
