import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { useLocation } from "react-router-dom";
import propTypes from "prop-types";
import ThemeSwitch from "./ThemeSwitch";
import AudioPlayer from "./AudioPlayer";

const Navigation = ({ theme, toggleTheme }) => {
  const location = useLocation();
  const [selected, setSelected] = useState("");

  useEffect(() => {
    // Extract the hash part of the URL and remove the leading '#'
    const hash = location.hash.substring(1);
    setSelected(hash ? hash : "home");
  }, [location]);

  useEffect(() => {
    const navItems = document.querySelectorAll("nav ul li");
    gsap.fromTo(
      navItems,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 2, ease: "bounce.out" }
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

  return (
    <nav
      id="navigation"
      className={`sticky top-0 w-auto m-4 p-4 shadow-lg rounded-xl z-20 bg-opacity-30 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="flex flex-col md:flex-row justify-between items-center">
        <ul className="flex flex-col md:flex-row justify-around items-center space-y-2 md:space-y-0 md:space-x-32 font-extrabold">
          {["home", "tour", "music-video", "merch", "booking"].map((item) => (
            <li
              key={item}
              className={`p-2 rounded transition-transform cursor-pointer ${
                selected === item
                  ? `bg-blue-500
                ${theme === "dark" ? "text-black" : "text-white"}
                rounded-full`
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
          <AudioPlayer theme={theme} />
        </ul>

        <div className="mt-2 md:mt-0">
          <ThemeSwitch theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>
    </nav>
  );
};

Navigation.propTypes = {
  theme: propTypes.string.isRequired,
  toggleTheme: propTypes.func.isRequired,
};

export default Navigation;
