import { useEffect, useState, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { useLocation } from "react-router-dom";
import propTypes from "prop-types";
import AudioPlayer from "@components/sub-components/AudioPlayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ theme, setToggleNavbar, isMobile, setIsMobile }) => {
  const location = useLocation();
  const [selected, setSelected] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true);

  const [isUserClosed, setIsUserClosed] = useState(false);
  const navBarRef = useRef(null);
  const navRef = useRef(null);
  const timeoutRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Handle resize to detect mobile vs desktop
  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth < 768;
      setIsMobile(isNowMobile);

      if (!isNowMobile) {
        // Ensure the menu is always visible on desktop
        gsap.set(navBarRef.current, { opacity: 1 });
        gsap.set(navRef.current, {
          opacity: 1,
          backgroundColor: "rgba(0, 3, 4, 0.98)",
          backdropFilter: "blur(10px)",
        });
      } else {
        // Ensure the menu is always visible on mobile
        gsap.set(navBarRef.current, { opacity: 1 });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check on load

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle URL hash scrolling on initial load
  useEffect(() => {
    const hash = location.hash.substring(1);
    setSelected(hash ? hash : "home");

    if (hash) {
      const targetElement = document.getElementById(hash);
      if (targetElement) {
        gsap.to(window, {
          scrollTo: { y: targetElement, offsetY: 0 },
          duration: 1,
          ease: "power2.inOut",
        });
      }
    }
  }, [location]);

  // Handle navbar visibility and fade on scroll (for desktop)
  useEffect(() => {
    const resetFade = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (!isMobile && !isUserClosed) {
        // Keep the menu visible and handle fade-out after 5 seconds
        gsap.to(navBarRef.current, { opacity: 1, duration: 0.5 });
        gsap.to(navRef.current, {
          opacity: 1,
          backgroundColor: "rgba(0, 3, 4, 0.98)",
          duration: 0.5,
          backdropFilter: "blur(10px)",
        });

        setIsCollapsed(false);

        timeoutRef.current = setTimeout(() => {
          gsap.to(navBarRef.current, { opacity: 0, duration: 1 });
          gsap.to(navRef.current, {
            opacity: 0,
            backgroundColor: "transparent",
            duration: 1,
          });
          setIsCollapsed(true);
        }, 5000);
      }
    };

    window.addEventListener("scroll", resetFade);

    return () => {
      window.removeEventListener("scroll", resetFade);
    };
  }, [isMobile, isUserClosed]);

  // Toggle navbar with GSAP (for mobile and desktop)
  const toggleNavbar = useCallback(() => {
    if (isCollapsed) {
      gsap.to(navBarRef.current, {
        opacity: 1,
        height: "auto",
        duration: 0.5,
        ease: "power2.out",
        display: "flex",
      });
      gsap.to(navRef.current, {
        backgroundColor: "rgba(0, 3, 4, 0.98)",
        opacity: 1,
        duration: 0.5,
        backdropFilter: "blur(10px)",
      });
      setIsUserClosed(false);
    } else {
      gsap.to(navBarRef.current, {
        opacity: isMobile ? 1 : 0,
        duration: 0.5,
        ease: "power2.in",
        height: 0,
        display: "none",
      });
      gsap.to(navRef.current, {
        backgroundColor: "transparent",
        opacity: isMobile ? 1 : 0,
        duration: 0.5,
      });
      setIsUserClosed(true);
    }

    setIsCollapsed(!isCollapsed);
  }, [isCollapsed, isMobile]);

  useEffect(() => {
    if (setToggleNavbar) {
      setToggleNavbar(() => toggleNavbar);
    }
  }, [setToggleNavbar, toggleNavbar]);

  const handleItemClick = (item) => {
    setSelected(item);
    const targetElement = document.getElementById(item);
    if (targetElement) {
      gsap.to(window, {
        scrollTo: { y: targetElement, offsetY: 0 },
        duration: 1,
        ease: "power2.inOut",
      });
    }
    if (isMobile) {
      toggleNavbar();
    }
  };

  return (
    <>
      {/* Hamburger button: Only visible on mobile */}
      {isMobile && (
        <div
          ref={hamburgerRef}
          className="sticky pl-4 top-4"
          style={{
            zIndex: 1000,
          }}
        >
          <button
            onClick={toggleNavbar}
            className="p-2 text-white rounded-lg bg-lime-600"
          >
            {isCollapsed ? (
              <FontAwesomeIcon icon={faBars} />
            ) : (
              <FontAwesomeIcon icon={faArrowUp} />
            )}
          </button>
        </div>
      )}

      {/* Navigation Bar */}
      <nav
        ref={navRef}
        id="navigation"
        className={`sticky top-0 w-full z-50 transition-all duration-300 ease-in-out ${
          !isCollapsed && !isMobile
            ? "bg-black bg-opacity-60"
            : "bg-transparent"
        } ${theme === "dark" ? " text-white" : "bg-gray-100 text-black"}`}
        style={{ opacity: 1 }} // Ensure initial opacity is set to 1
      >
        <ul
          ref={navBarRef}
          className={`px-8 ${
            isCollapsed && isMobile ? "hidden" : "flex"
          } pt-4 flex-col md:flex-row justify-around items-center space-y-2 md:space-y-0 md:space-x-16 font-extrabold transition-all duration-300 ease-in-out`}
        >
          {["home", "merch", "music", "tour", "booking"].map((item) => (
            <li
              key={item}
              className={`p-2 cursor-pointer relative ${
                selected === item
                  ? `${theme === "dark" ? "text-lime-600" : "text-black"}`
                  : `${theme === "dark" ? "text-white" : "text-black"}`
              } ${
                item === "merch" || item === "booking"
                  ? "pointer-events-none line-through"
                  : ""
              }`}
              onClick={() => handleItemClick(item)}
            >
              <a href={`#${item}`} className="no-underline">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
              <span
                className={`absolute bottom-[-0.25em] left-0 w-full h-[0.25em] ${
                  selected === item ? "bg-lime-500" : "bg-transparent"
                } transition-all duration-300 ease-in-out`}
              ></span>
            </li>
          ))}

          <div className="relative top-[-1rem] mx-auto">
            <AudioPlayer theme={theme} />
          </div>
        </ul>
      </nav>
    </>
  );
};

Navigation.propTypes = {
  theme: propTypes.string.isRequired,
  setToggleNavbar: propTypes.func,
  isMobile: propTypes.bool.isRequired,
  setIsMobile: propTypes.func.isRequired,
};

export default Navigation;
