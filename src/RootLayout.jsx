// RootLayout.jsx
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "./components/sub-components/Navigation";
import BackToTop from "./components/sub-components/BackToTop";

const RootLayout = () => {
  const [theme, setTheme] = useState("dark");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  // eslint-disable-next-line no-unused-vars
  const [toggleNavbar, setToggleNavbar] = useState(false);

  useEffect(() => {
    const localTheme = localStorage.getItem("theme") || "dark";
    setTheme(localTheme);
    document.documentElement.classList.add(localTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.classList.replace(theme, newTheme);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div id="home" className={`app-container ${theme} overflow-hidden`}>
      <Navigation
        theme={theme}
        toggleTheme={toggleTheme}
        setToggleNavbar={setToggleNavbar}
        isMobile={isMobile}
        setIsMobile={setIsMobile}
      />
      <Outlet context={{ theme, isMobile }} />
      <BackToTop />
    </div>
  );
};

export default RootLayout;
