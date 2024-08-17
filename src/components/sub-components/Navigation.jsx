import { useEffect, useState, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { useLocation } from "react-router-dom";
import propTypes from "prop-types";
import AudioPlayer from "./AudioPlayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ theme, setToggleNavbar }) => {
  const location = useLocation();
  const [selected, setSelected] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true); // Controls menu state and icon
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isUserClosed, setIsUserClosed] = useState(false); // Track if the user manually closed the menu
  const navBarRef = useRef(null); // Ref for the navbar (menu items)
  const navRef = useRef(null); // Ref for the entire nav element to animate bg color/opacity
  const timeoutRef = useRef(null); // Ref for the auto-close timeout

  // Handle resize to detect mobile vs desktop
  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth < 768;
      setIsMobile(isNowMobile);

      if (!isNowMobile && !isUserClosed) {
        // Hide the navbar on non-mobile by default, unless the user manually closed it
        gsap.set(navBarRef.current, { opacity: 0 });
      } else {
        // Always show the navbar on mobile
        gsap.set(navBarRef.current, { opacity: 1 });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check on load

    return () => window.removeEventListener("resize", handleResize);
  }, [isUserClosed]);

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

  // Show the navbar on scroll and hide after inactivity (only if user didn't manually close it)
  useEffect(() => {
    const resetFade = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current); // Clear the previous timer
      }

      if (!isMobile && !isUserClosed) {
        // Show the navbar on scroll only if the user didn't manually close it
        gsap.to(navBarRef.current, { opacity: 1, duration: 0.5 });
        gsap.to(navRef.current, {
          opacity: 1,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          duration: 0.5,
        }); // Show background and opacity
        setIsCollapsed(false); // Ensure the arrow icon is displayed when the menu fades in

        // Fade out the navbar after 5 seconds of no scrolling
        timeoutRef.current = setTimeout(() => {
          gsap.to(navBarRef.current, { opacity: 0, duration: 1 });
          gsap.to(navRef.current, {
            opacity: 0,
            backgroundColor: "transparent",
            duration: 1,
          }); // Hide background and opacity
          setIsCollapsed(true); // Collapse the menu and show hamburger icon
        }, 5000);
      }
    };

    window.addEventListener("scroll", resetFade);

    return () => {
      window.removeEventListener("scroll", resetFade);
    };
  }, [isMobile, isUserClosed]);

  // Toggle navbar with GSAP (for mobile and desktop) with auto-close after a few seconds
  const toggleNavbar = useCallback(() => {
    if (isCollapsed) {
      // Show the menu when collapsed is true (icon is hamburger)
      gsap.to(navBarRef.current, {
        opacity: 1,
        height: "auto",
        duration: 0.5,
        ease: "power2.out",
        display: "flex", // Ensure menu is displayed
      });
      gsap.to(navRef.current, {
        backgroundColor: "rgba(0, 0, 0, 0.6)", // Add background color
        opacity: 1,
        duration: 0.5,
      });
      setIsUserClosed(false); // Reset manual close state when menu is opened

      // Automatically close the menu after 1.5 seconds
      timeoutRef.current = setTimeout(() => {
        gsap.to(navBarRef.current, {
          opacity: isMobile ? 1 : 0, // Keep it visible on mobile
          duration: 0.25,
          ease: "power2.in",
          height: 0, // Collapse the menu
          display: "none", // Ensure it's hidden
        });
        gsap.to(navRef.current, {
          backgroundColor: "transparent", // Hide background color
          opacity: 0,
          duration: 0.25,
        });
        setIsCollapsed(true); // Close the menu and update icon after the timeout
      }, 250); // Adjust this time (3000ms = 3 seconds) as needed
    } else {
      // Hide the menu when it's expanded (icon is arrow up)
      gsap.to(navBarRef.current, {
        opacity: isMobile ? 1 : 0, // Keep it visible on mobile
        duration: 0.5,
        ease: "power2.in",
        height: 0, // Collapse the menu
        display: "none", // Ensure it's hidden
      });
      gsap.to(navRef.current, {
        backgroundColor: "transparent", // Hide background color
        opacity: 0,
        duration: 0.5,
      });
      setIsUserClosed(true); // Mark the menu as manually closed by the user
    }

    setIsCollapsed(!isCollapsed); // Toggle the collapsed state and icon
  }, [isCollapsed, isMobile]);

  // Pass the toggleNavbar function up to the parent component
  useEffect(() => {
    if (setToggleNavbar) {
      setToggleNavbar(() => toggleNavbar); // Pass the function up
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
      toggleNavbar(); // Collapse after clicking a link on mobile
    }
  };

  return (
    <nav
      ref={navRef} // Ref for the nav to handle background color and opacity
      id="navigation"
      className={`sticky top-0 w-full bg-black bg-opacity-60 z-50 transition-all duration-300 ease-in-out ${
        theme === "dark" ? " text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Hamburger button should always be visible */}
      <div className="absolute left-4 top-4">
        <button
          onClick={toggleNavbar}
          className="p-2 text-white bg-blue-500 rounded-lg"
        >
          {/* Icon dynamically changes based on isCollapsed */}
          {isCollapsed ? (
            <FontAwesomeIcon icon={faBars} />
          ) : (
            <FontAwesomeIcon icon={faArrowUp} />
          )}
        </button>
      </div>

      {/* Menu items that will fade based on scroll */}
      <ul
        ref={navBarRef} // Menu will fade in/out based on scroll
        className={`px-8 ${
          isCollapsed && isMobile ? "hidden" : "flex"
        } pt-4 flex-col md:flex-row justify-around items-center space-y-2 md:space-y-0 md:space-x-16 font-extrabold transition-all duration-300 ease-in-out`}
      >
        {["home", "merch", "music", "tour", "booking"].map((item) => (
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
            }
            ${
              item === "merch" || item === "tour" || item === "booking"
                ? "pointer-events-none line-through"
                : ""
            }`}
            onClick={() => handleItemClick(item)}
          >
            <a href={`#${item}`}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          </li>
        ))}

        <div className="relative top-[-1rem] mx-auto">
          <AudioPlayer theme={theme} />
        </div>
      </ul>
    </nav>
  );
};

Navigation.propTypes = {
  theme: propTypes.string.isRequired,
  setToggleNavbar: propTypes.func, // Add prop type
};

export default Navigation;
