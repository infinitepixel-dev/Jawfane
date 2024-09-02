import { useEffect, useState, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { useLocation, useNavigate } from "react-router-dom";
import propTypes from "prop-types";
import AudioPlayer from "@components/sub-components/AudioPlayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({
  DevMode,
  base,
  theme,
  setToggleNavbar,
  isMobile,
  setIsMobile,
}) => {
  console.log("Base: ", base);

  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isUserClosed, setIsUserClosed] = useState(false);
  const navBarRef = useRef(null);
  const navRef = useRef(null);
  // const timeoutRef = useRef(null);
  const lastScrollTopRef = useRef(0);
  const inactivityTimeoutRef = useRef(null);
  const hamburgerRef = useRef(null);

  // if mobile start the menu closed
  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
    }
  }, [isMobile]);

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
          backgroundColor: "rgba(0, 3, 4, 0.95)",
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
  }, [setIsMobile]); //REVIEW may cause an infinite loop - possibly solved??

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

  // Handle navbar visibility and fade on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Reset inactivity timeout
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }

      // Show menu when scrolling
      gsap.to(navBarRef.current, { opacity: 1, duration: 0.5 });
      gsap.to(navRef.current, {
        opacity: 1,
        backgroundColor: "rgba(0, 3, 4, 0.95)",
        duration: 0.5,
        backdropFilter: "blur(10px)",
      });
      // setIsCollapsed(false);

      // Set timeout to hide navigation if user is inactive for 2 seconds
      inactivityTimeoutRef.current = setTimeout(() => {
        if (!isMobile && !isUserClosed) {
          gsap.to(navBarRef.current, { opacity: 0, duration: 0.5 });
          gsap.to(navRef.current, {
            opacity: 0,
            backgroundColor: "transparent",
            duration: 0.5,
          });
          setIsCollapsed(true);
        }
      }, 5000); // 2-second delay

      lastScrollTopRef.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }
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
        backgroundColor: "rgba(0, 3, 4, 0.95)",
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

  //v1
  // const handleItemClick = (item) => {
  //   setSelected(item);
  //   const targetElement = document.getElementById(item);
  //   if (targetElement) {
  //     gsap.to(window, {
  //       scrollTo: { y: targetElement, offsetY: 0 },
  //       duration: 1,
  //       ease: "power2.inOut",
  //     });
  //   }
  //   if (isMobile) {
  //     toggleNavbar();
  //   }
  // };

  //v2
  // const handleItemClick = (item) => {
  //   setSelected(item);
  //   const targetElement = document.getElementById(item);

  //   // Check if the current path is not the root and navigate to root with hash
  //   if (location.pathname !== "/") {
  //     navigate(`/#${item}`, { replace: true });
  //   }

  //   if (targetElement) {
  //     gsap.to(window, {
  //       scrollTo: { y: targetElement, offsetY: 0 },
  //       duration: 1,
  //       ease: "power2.inOut",
  //     });
  //   }

  //   if (isMobile) {
  //     toggleNavbar();
  //   }
  // };

  //v3
  const handleItemClick = (item) => {
    setSelected(item);

    const targetElement = document.getElementById(item);

    if (targetElement) {
      // If already on the correct page, just scroll to the section
      gsap.to(window, {
        scrollTo: { y: targetElement, offsetY: 0 },
        duration: 1,
        ease: "power2.inOut",
      });
    } else {
      // Navigate to the root with the hash, but use the scroll behavior to avoid reloading
      navigate(`/#${item}`, { replace: true });
      setTimeout(() => {
        const target = document.getElementById(item);
        if (target) {
          gsap.to(window, {
            scrollTo: { y: target, offsetY: 0 },
            duration: 1,
            ease: "power2.inOut",
          });
        }
      }, 0);
    }

    // Collapse navbar on mobile after clicking a link
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
          className="fixed pl-4 top-4"
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
        className={`fixed top-0 w-full border-b-2 shadow-lg shadow-border-bottom border-lime-600 z-50 transition-all duration-300 ease-in-out ${
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
          {["home", "merch", "music", "tour", "lore", "booking"].map((item) => (
            <li
              key={item}
              className={`p-2 cursor-pointer relative ${
                selected === item
                  ? `${theme === "dark" ? "text-lime-500" : "text-black"}`
                  : `${theme === "dark" ? "text-white" : "text-black"}`
              } ${
                item === "booking" ? "pointer-events-none line-through" : ""
              }`}
              onClick={() => handleItemClick(item)}
            >
              <span className="no-underline">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </span>
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
          {/* If DevMode is enable display the Dashboard in the navigation */}
          {DevMode && (
            <li
              className={`p-2 cursor-pointer relative ${
                selected === "dev" ? "text-lime-500" : "text-white"
              }`}
              onClick={() => handleItemClick("dev")}
            >
              <a href={`${base}/dashboard`} className="no-underline">
                <span className="text-rose-700">(DevMode Enabled)</span>
                <br />
                Admin Dashboard
              </a>
              <span
                className={`absolute bottom-[-0.25em] left-0 w-full h-[0.25em] ${
                  selected === "dev" ? "bg-lime-500" : "bg-transparent"
                } transition-all duration-300 ease-in-out`}
              ></span>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

Navigation.propTypes = {
  DevMode: propTypes.bool,
  base: propTypes.string,
  theme: propTypes.string.isRequired,
  setToggleNavbar: propTypes.func,
  isMobile: propTypes.bool.isRequired,
  setIsMobile: propTypes.func.isRequired,
};

export default Navigation;
