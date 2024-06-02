import React, { useContext, useRef, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import "../src/styles/styles.scss";
import { Home } from "./pages/Home/Home";
import { NavigationBar } from './NavigationBar/NavigationBar';
import { Twitch } from "./pages/Twitch/Twitch";
import { Commissions } from "./pages/Commissions/Commissions";
import { Lore } from "./pages/Lore/Lore";
import { Discord } from "./pages/Discord/Discord";
import AudioPlayer, { usePersistState } from './components/Sound/Player';
import { Footer } from './Footer/Footer';
function App() {
  return (
    <div className="app">
      <NavigationBar />
      <div className="app__content">
        <Router basename={process.env.PUBLIC_URL}>
        <AudioPlayer/> {/* Ensure Player key remains the same */}
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
      <Footer />
    </div>
  );
}

export default App;
