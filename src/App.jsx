// import { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Home from "./components/pages/Home";
// import Tour from "./components/pages/Tour";
// import Music from "./components/pages/MusicVideos";
// import Booking from "./components/pages/Booking";

// import Navigation from "./components/sub-components/Navigation";
// import BackToTop from "./components/sub-components/BackToTop";
// import CountdownTimer from "./components/sub-components/CountdownTimer";

// import "./App.css";

// const App = () => {
//   //string of mm/dd/yyyy and time format
//   // const date = "04/23/2025 00:00:00";
//   const date = "03/16/2025 00:00:00";

//   const [theme, setTheme] = useState("dark");
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   //disables the error for one-specific line.. ie. toggleNavbar is not used
//   // eslint-disable-next-line no-unused-vars
//   const [toggleNavbar, setToggleNavbar] = useState(false);
//   const [showWebsite, setShowWebsite] = useState(false);

//   const releaseDate = new Date(date.replace(/-/g, "/")).toISOString();

//   useEffect(() => {
//     const localTheme = localStorage.getItem("theme") || "dark";
//     setTheme(localTheme);
//     document.documentElement.classList.add(localTheme);

//     // Check if the release date has passed
//     const now = new Date();
//     const launchDate = new Date(releaseDate);
//     if (now >= launchDate) {
//       setShowWebsite(true);
//     }
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = theme === "light" ? "dark" : "light";
//     document.documentElement.classList.replace(theme, newTheme);
//     setTheme(newTheme);
//     localStorage.setItem("theme", newTheme);
//   };

//   if (!showWebsite) {
//     return (
//       <CountdownTimer
//         releaseDate={releaseDate}
//         onTimeUp={() => setShowWebsite(true)}
//       />
//     );
//   }

//   return (
//     <Router>
//       <div id="home" className={`app-container ${theme} overflow-hidden`}>
//         <Navigation
//           theme={theme}
//           toggleTheme={toggleTheme}
//           setToggleNavbar={setToggleNavbar}
//           isMobile={isMobile}
//           setIsMobile={setIsMobile}
//         />
//         <Routes>
//           <Route
//             path="/"
//             element={<Home theme={theme} isMobile={isMobile} />}
//           />
//           <Route
//             path="/home"
//             element={<Home theme={theme} isMobile={isMobile} />}
//           />
//           <Route path="/tour" element={<Tour theme={theme} />} />
//           <Route path="/music" element={<Music theme={theme} />} />
//           <Route path="/booking" element={<Booking theme={theme} />} />
//         </Routes>
//         <BackToTop />
//       </div>
//     </Router>
//   );
// };

// export default App;

// App.jsx
import { useEffect, useState, useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import CountdownTimer from "./components/sub-components/CountdownTimer";
import { createAppRouter } from "./router";

const App = () => {
  const date = "04/11/2025 17:11:00"; //Test release date
  // const date = "04/23/2025 00:00:00"; //Actual release date

  const [theme, setTheme] = useState("dark");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // eslint-disable-next-line no-unused-vars
  const [toggleNavbar, setToggleNavbar] = useState(false);
  const [showWebsite, setShowWebsite] = useState(false);

  const releaseDate = new Date(date.replace(/-/g, "/")).toISOString();

  useEffect(() => {
    const localTheme = localStorage.getItem("theme") || "dark";
    setTheme(localTheme);
    document.documentElement.classList.add(localTheme);

    const now = new Date();
    const launchDate = new Date(releaseDate);
    if (now >= launchDate) {
      setShowWebsite(true);
    }
  }, []);

  const router = useMemo(
    () =>
      createAppRouter({
        theme,
        isMobile,
        // toggleTheme,
        setToggleNavbar,
        setIsMobile,
      }),
    [theme, isMobile] // rebuild router if layout changes
  );

  // const toggleTheme = () => {
  //   const newTheme = theme === "light" ? "dark" : "light";
  //   document.documentElement.classList.replace(theme, newTheme);
  //   setTheme(newTheme);
  //   localStorage.setItem("theme", newTheme);
  // };

  if (!showWebsite) {
    return (
      <CountdownTimer
        releaseDate={releaseDate}
        onTimeUp={() => setShowWebsite(true)}
      />
    );
  }

  return <RouterProvider router={router} />;
};

export default App;
