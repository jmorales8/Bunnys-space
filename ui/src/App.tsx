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
      <section>
        <div className="footer">
          <div>
            <h1>Contact us</h1>
            <div>We’d love to hear from you! Please contact us with any questions or concerns.</div>
            <button>CONTACT US</button>
          </div>
          <div className="footer__content">
            <div className="footer__content__address">
              <h3>ADDRESS</h3>
              <p>
                O Block Office<br />
                6440 S Martin Luther King Dr<br />
                Suite 6969<br />
                Chicago, IL 60637
              </p>
            </div>
            <div>
              <h3>EMAIL & NUMBER</h3>
              <p>
                pinhead@696969669.com<br />
                support@69696969.com<br />
                +1 (312) 000-6969
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
/*
cd ui && yarn start
*/
export default App;
