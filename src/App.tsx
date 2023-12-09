import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import "../src/styles/styles.scss"
import { Home } from "./Home/Home";
import { NavigationBar } from './NavigationBar/NavigationBar';

function App() {
  return (
    <div className="app">
      <NavigationBar />
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="home" element={<Home />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
