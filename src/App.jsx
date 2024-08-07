import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/sub-components/Navigation";
import Home from "./components/pages/Home";

import BackToTop from "./components/sub-components/BackToTop";

import "./App.css";

const App = () => {
  const [theme, setTheme] = useState("light");

  //INFO theme settings
  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      setTheme(localTheme);
      document.documentElement.classList.add(localTheme);
    } else {
      document.documentElement.classList.add(theme);
    }
  }, [theme]);

  //Obtains toggles the theme and locally stores it
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <Router>
      <div id="main-app" className={`app-container ${theme}`}>
        <Navigation theme={theme} toggleTheme={toggleTheme} />
        <div></div>
        <Routes>
          <Route path="/" element={<Home theme={theme} />} />
        </Routes>

        <BackToTop />
      </div>
    </Router>
  );
};

export default App;
