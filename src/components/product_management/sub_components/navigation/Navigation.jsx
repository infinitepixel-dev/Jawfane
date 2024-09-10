/*
A component to manage the navigation bar for the store
*/

//INFO React Libraries
import { useEffect, useState, useRef, useCallback } from "react";
import propTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";

//INFO Animation Libraries
import { gsap } from "gsap";

//INFO Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowUp } from "@fortawesome/free-solid-svg-icons";

//INFO Sub-components
import AudioPlayer from "@audio_product_management/AudioPlayer";
import CartPopOut from "@sub-menus_product_management/CartPopOut";

const Navigation = ({
  DevMode,
  base,
  theme,
  setToggleNavbar,
  isMobile,
  setIsMobile,
  cartItems,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selected, setSelected] = useState(""); // Tracks the currently selected menu item
  const [isCollapsed, setIsCollapsed] = useState(null); // Tracks the state of the navbar (collapsed/expanded)
  const [isUserClosed, setIsUserClosed] = useState(false); // Tracks if the user manually closed the navbar
  const navBarRef = useRef(null); // Ref for the navbar element
  const navRef = useRef(null); // Ref for the navigation container element
  const inactivityTimeoutRef = useRef(null); // Ref to manage the inactivity timeout
  const hamburgerRef = useRef(null); // Ref for the mobile hamburger button
  const toggleArrowRef = useRef(null); // Ref for the desktop toggle arrow
  const [navHeight, setNavHeight] = useState(0); // Track the height of the nav
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Track the state of the sidebar

  // Handle resize to detect mobile vs desktop
  useEffect(() => {
    const mobile_breakpoint = 768;
    const handleResize = () => {
      const isNowMobile = window.innerWidth < mobile_breakpoint;
      setIsMobile(isNowMobile);

      if (!isNowMobile) {
        if (navBarRef.current) {
          gsap.to(navBarRef.current, { opacity: 1 });
        }

        if (navRef.current) {
          gsap.to(navRef.current, {
            opacity: 1,
            backgroundColor: "rgba(0, 3, 4, 0.95)",
            backdropFilter: "blur(10px)",
          });
        }
      } else {
        if (navBarRef.current) {
          gsap.set(navBarRef.current, { opacity: 1 });
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check on load

    return () => window.removeEventListener("resize", handleResize);
  }, [setIsMobile]);

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

  // Handle navbar visibility and fade on scroll or inactivity
  useEffect(() => {
    const handleScroll = () => {
      if (isMobile) return;

      // Clear any existing timeout if the user is scrolling
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }

      // If the user hasn't manually closed the navbar, show it on scroll
      if (navBarRef.current && navRef.current && !isUserClosed) {
        gsap.to(navBarRef.current, { opacity: 1, duration: 0.5 });
        gsap.to(navRef.current, { opacity: 1, duration: 0.5 });
        setIsCollapsed(false);
      }

      // Set a timeout to automatically close the navbar after 5 seconds of inactivity
      inactivityTimeoutRef.current = setTimeout(() => {
        if (!isMobile && !isUserClosed && navBarRef.current && navRef.current) {
          gsap.to(navBarRef.current, { opacity: 0, duration: 0.8 });
          gsap.to(navRef.current, { opacity: 0, duration: 0.8 });
          setIsCollapsed(true);
        }
      }, 3000); // Auto-close after 5 seconds of inactivity
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(inactivityTimeoutRef.current);
    };
  }, [isMobile, isUserClosed]);

  /*
  Toggle navbar with GSAP (for mobile and desktop)
  Update toggleNavbar to close the sidebar if it's open
 */
  const toggleNavbar = useCallback(() => {
    if (isCollapsed) {
      // Open Navbar
      if (navBarRef.current) {
        gsap.to(navBarRef.current, {
          opacity: 1,
          height: "auto",
          duration: 0.5,
          ease: "power2.out",
          display: "flex",
          pointerEvents: "auto",
        });
      }
      if (navRef.current) {
        gsap.to(navRef.current, {
          backgroundColor: "rgba(0, 3, 4, 0.95)",
          opacity: 1,
          duration: 0.5,
          backdropFilter: "blur(10px)",
          pointerEvents: "auto",
        });
      }
      setIsUserClosed(false);
    } else {
      // Close Navbar
      if (navBarRef.current) {
        gsap.to(navBarRef.current, {
          opacity: isMobile ? 1 : 0,
          duration: 0.5,
          ease: "power2.in",
          height: 0,
          display: "none",
          pointerEvents: "none",
        });
      }
      if (navRef.current) {
        gsap.to(navRef.current, {
          backgroundColor: "transparent",
          opacity: isMobile ? 1 : 0,
          duration: 0.5,
          pointerEvents: "none",
        });
      }
      setIsUserClosed(true);
    }

    // Always close the sidebar when toggling the navbar
    if (isSidebarOpen) {
      setSidebarOpen(false);
    }

    setIsCollapsed(!isCollapsed); // Toggle the navbar state
  }, [isCollapsed, isMobile, isSidebarOpen]);

  // Pass the toggleNavbar function to the parent component if needed
  useEffect(() => {
    if (setToggleNavbar) {
      setToggleNavbar(() => toggleNavbar);
    }
  }, [setToggleNavbar, toggleNavbar]);

  useEffect(() => {
    if (setToggleNavbar) {
      setToggleNavbar(() => toggleNavbar); // Pass the toggleNavbar function to the parent component if needed
    }
  }, [setToggleNavbar, toggleNavbar]);

  // Handle item click for smooth scrolling and navigation
  const handleItemClick = (item) => {
    setSelected(item);

    const targetElement = document.getElementById(item);

    if (targetElement) {
      gsap.to(window, {
        scrollTo: { y: targetElement, offsetY: 0 },
        duration: 1,
        ease: "power2.inOut",
      });
    } else {
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

    if (isMobile) {
      toggleNavbar(); // Close the navbar after clicking an item on mobile
    }
  };

  // Update the height of the navigation bar dynamically
  useEffect(() => {
    const handleResizeAndNavHeight = () => {
      if (navRef.current) {
        setNavHeight(navRef.current.offsetHeight); // Update nav height dynamically on resize
      }
    };

    // Update nav height on resize
    window.addEventListener("resize", handleResizeAndNavHeight);

    // Ensure nav height is set properly on initial load
    handleResizeAndNavHeight();

    return () => {
      window.removeEventListener("resize", handleResizeAndNavHeight);
    };
  }, [isCollapsed, isMobile]);

  return (
    <>
      {/* Toggle Arrow: Always visible on desktop, positioned at the bottom center of the navbar */}
      {!isMobile && (
        <div
          ref={toggleArrowRef}
          aria-label="Open/Close Navigation Menu"
          role="button"
          tabIndex={0}
          className="fixed top-[0.5em] left-8 transform -translate-x-1/2 z-50 cursor-pointer border border-lime-700 rounded-full bg-lime-700 p-2 hover:bg-lime-600"
          onClick={toggleNavbar}
          onKeyDown={(e) => e.key === "Enter" && toggleNavbar()}
          style={{
            zIndex: 950,
          }}
        >
          <FontAwesomeIcon
            color="#E2E8F0"
            icon={isCollapsed ? faBars : faArrowUp}
            size="lg"
          />
        </div>
      )}

      {/* Hamburger button: Only visible on mobile */}
      {isMobile && (
        <div
          ref={hamburgerRef}
          aria-label="Open/Close Menu"
          className="fixed pl-4 top-4"
          style={{
            zIndex: 1000,
          }}
        >
          <button
            onClick={toggleNavbar}
            className="p-2 text-white rounded-lg bg-lime-600 hover:bg-lime-700"
            aria-expanded={!isCollapsed}
          >
            {isCollapsed ? (
              <FontAwesomeIcon color="#E2E8F0" icon={faBars} />
            ) : (
              <FontAwesomeIcon color="#E2E8F0" icon={faArrowUp} />
            )}
          </button>
        </div>
      )}

      {/* Navigation Bar */}
      <nav
        ref={navRef}
        id="navigation"
        role="navigation"
        aria-label="Main Navigation"
        className={`fixed top-0 w-full border-b-2 shadow-lg shadow-border-bottom border-lime-600 z-50 transition-all duration-300 ease-in-out ${
          !isCollapsed && !isMobile
            ? "bg-black bg-opacity-60"
            : "bg-transparent"
        } ${theme === "dark" ? " text-white" : "bg-gray-100"}`}
        style={{ opacity: 1, zIndex: 900 }}
      >
        <ul
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
              }`}
              onClick={() => handleItemClick(item)}
              role="menuitem"
              aria-label={`Navigate to ${item}`}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleItemClick(item)}
            >
              <span className="no-underline">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </span>
              <span
                className={`absolute bottom-[-0.25em] left-0 w-full h-[0.25em] ${
                  selected === item ? "bg-lime-500" : "bg-transparent"
                } transition-all duration-300 ease-in-out hover:bg-lime-600`}
              ></span>
            </li>
          ))}

          <div
            className={`relative top-[-1rem] ${isMobile ? "" : "right-12"}`}
            style={{
              minWidth: "5em",
            }}
          >
            <AudioPlayer theme={theme} />
          </div>

          {/* DevMode logic */}
          {DevMode && (
            <li
              className={`p-2 cursor-pointer relative ${
                selected === "dev" ? "text-lime-500" : "text-white"
              }`}
              onClick={() => handleItemClick("dev")}
              role="menuitem"
              aria-label="Navigate to Developer Mode"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleItemClick("dev")}
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

      <div
        className="fixed transition-all duration-300 ease-in-out"
        style={{
          top: isMobile
            ? isCollapsed
              ? "5rem"
              : `${navHeight + 76}px`
            : isCollapsed
            ? "5rem"
            : `${navHeight + 76}px`,
          zIndex: 1000,
        }}
      >
        <CartPopOut
          theme={theme}
          cartItems={cartItems}
          isMobile={isMobile}
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </div>
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
  cartItems: propTypes.array.isRequired,
  setSidebarOpen: propTypes.func,
};

export default Navigation;
