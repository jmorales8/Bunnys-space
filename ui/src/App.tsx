import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import "../src/styles/styles.scss"
import { Home } from "./pages/Home/Home";
import { NavigationBar } from './NavigationBar/NavigationBar';
import { Twitch } from "./pages/Twitch/Twitch";
import { Commissions } from "./pages/Commissions/Commissions";
import { Lore } from "./pages/Lore/Lore";
import { Discord } from "./pages/Discord/Discord";

function App() {
  return (
    <div className="app">
      <NavigationBar />
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/lore" element={<Lore />} />
          <Route path="/twitch" element={<Twitch />}/>
          <Route path="/commissions" element={<Commissions />}/>
          <Route path="/discord" element={<Discord />}/>
        </Routes>
      </Router>
    </div>
  );
}
/*
cd ui && yarn start
*/
export default App;
