import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { useLocation } from "react-router-dom";
import propTypes from "prop-types";
import ThemeSwitch from "./ThemeSwitch";
import AudioPlayer from "./AudioPlayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ theme, toggleTheme }) => {
  const location = useLocation();
  const [selected, setSelected] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    const hash = location.hash.substring(1);
    setSelected(hash ? hash : "home");
  }, [location]);

  useEffect(() => {
    const navItems = document.querySelectorAll("nav ul li");
    gsap.fromTo(
      navItems,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.out" }
    );

    navItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        gsap.to(item, { scale: 1.1, duration: 0.3, ease: "power2.out" });
      });

      item.addEventListener("mouseleave", () => {
        gsap.to(item, { scale: 1, duration: 0.3, ease: "power2.out" });
      });
    });
  }, []);

  const handleItemClick = (item) => {
    setSelected(item);
  };

  const toggleNavbar = () => {
    const navMenu = document.querySelector("nav ul");
    const navigation = document.getElementById("navigation");

    if (isCollapsed) {
      gsap.set(navMenu, { height: "auto" });
      gsap.fromTo(
        navMenu,
        { height: 0 },
        { height: navMenu.scrollHeight, duration: 0.6, ease: "power2.out" }
      );
      gsap.fromTo(
        navMenu.children,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "power2.out" }
      );
      gsap.fromTo(
        navigation,
        { height: "auto" },
        { height: 400, duration: 0.6, ease: "power2.out" }
      );
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      gsap.to(navMenu, { height: 0, duration: 0.5, ease: "power2.inOut" });
      gsap.to(navigation, { height: 0, duration: 0.5, ease: "power2.inOut" });
      document.body.style.overflow = "auto"; // Allow scrolling
    }
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    //calculate if on mobile or not
    const isMobile = window.innerWidth < 768;

    const toggleButton = document.querySelector("button");
    const navigation = document.querySelector("#navigation");

    gsap.fromTo(
      toggleButton,
      { rotation: 0 },
      { rotation: 360, duration: 0.5, ease: "power2.inOut" }
    );

    gsap.to(navigation, {
      backgroundColor:
        theme === "dark"
          ? isCollapsed && isMobile
            ? "rgba(0, 0, 0, 0)"
            : "rgba(0, 0, 0, 0.9)"
          : isCollapsed && isMobile
          ? "rgba(255, 255, 255, 0)"
          : "rgba(255, 255, 255, 0.9)",
    });
  }, [theme, isCollapsed]);

  useEffect(() => {
    //calculate if on mobile or not
    const isMobile = window.innerWidth < 768;

    const navigation = document.querySelector("#navigation");
    gsap.to(navigation, {
      backgroundColor:
        theme === "dark"
          ? isCollapsed && isMobile
            ? "rgba(0, 0, 0, 0)"
            : "rgba(0, 0, 0, 0.9)"
          : isCollapsed && isMobile
          ? "rgba(255, 255, 255, 0.)"
          : "rgba(255, 255, 255, 0.9)",
      duration: 1,
      ease: "power2.inOut",
    });
  }, [theme, isCollapsed]);

  return (
    <nav
      id="navigation"
      className={`sticky top-0 w-full p-4  z-20 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div
        style={{
          position: "absolute",
          left: "1rem",
        }}
      >
        <button
          onClick={toggleNavbar}
          className="absolute md:hidden p-2 rounded-lg bg-blue-500 text-white"
        >
          {isCollapsed ? (
            <FontAwesomeIcon icon={faBars} />
          ) : (
            <FontAwesomeIcon icon={faArrowUp} />
          )}
        </button>
      </div>
      <div
        style={{
          position: "absolute",
          right: "1rem",
        }}
      >
        <ThemeSwitch theme={theme} toggleTheme={toggleTheme} />
      </div>

      {/* <div className="flex md:flex-row justify-between items-center"> */}
      <ul
        className={`flex flex-col md:flex-row justify-around items-center space-y-2 md:space-y-0 md:space-x-32 font-extrabold transition-all duration-300 ease-in-out ${
          isCollapsed ? "hidden md:flex" : "flex"
        }`}
      >
        {["home", "tour", "music-video", "merch", "booking"].map((item) => (
          <li
            key={item}
            className={`p-2 rounded transition-transform cursor-pointer ${
              selected === item
                ? `bg-blue-500 ${
                    theme === "dark" ? "text-black" : "text-white"
                  } rounded-full`
                : theme === "dark"
                ? "hover:bg-blue-800 text-white rounded-full"
                : "hover:bg-gray-500 text-black rounded-full"
            }`}
            onClick={() => handleItemClick(item)}
          >
            <a href={`#${item}`}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          </li>
        ))}

        <div
          style={{
            position: "relative",
            margin: isCollapsed ? "0" : "5px",
          }}
        >
          <AudioPlayer theme={theme} />
        </div>
      </ul>
      {/* </div> */}
    </nav>
  );
};

Navigation.propTypes = {
  theme: propTypes.string.isRequired,
  toggleTheme: propTypes.func.isRequired,
};

export default Navigation;
