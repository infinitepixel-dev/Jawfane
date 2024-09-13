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
import { faBars, faBarsStaggered } from "@fortawesome/free-solid-svg-icons";

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
  const [isCollapsed, setIsCollapsed] = useState(true); // Tracks the state of the navbar (collapsed/expanded)
  const [isUserClosed, setIsUserClosed] = useState(false); // Tracks if the user manually closed the navbar
  const navBarRef = useRef(null); // Ref for the navbar element
  const navRef = useRef(null); // Ref for the navigation container element
  const inactivityTimeoutRef = useRef(null); // Ref to manage the inactivity timeout
  const hamburgerRef = useRef(null); // Ref for the mobile hamburger button
  const toggleArrowRef = useRef(null); // Ref for the desktop toggle arrow
  const [navHeight, setNavHeight] = useState(0); // Track the height of the nav
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Track the state of the sidebar

  const handleResize = useCallback(() => {
    const mobile_breakpoint = 768;
    const isNowMobile = window.innerWidth < mobile_breakpoint;
    setIsMobile(isNowMobile);

    const opacityVal = isNowMobile ? 1 : 0.9;
    const backgroundColor = isNowMobile ? null : "rgba(0, 3, 4, 1)";
    const backdropFilter = isNowMobile ? null : "blur(30px)";

    if (navBarRef.current) {
      gsap.to(navBarRef.current, { opacity: 1 });
    }
    if (navRef.current) {
      gsap.to(navRef.current, {
        opacity: opacityVal,
        backgroundColor,
        backdropFilter,
      });
    }
  }, [setIsMobile]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check on load
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    const hash = location.hash.substring(1);
    setSelected(hash || "home");

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

  useEffect(() => {
    const handleScroll = () => {
      if (isMobile) return;

      if (inactivityTimeoutRef.current)
        clearTimeout(inactivityTimeoutRef.current);

      if (!isUserClosed) {
        if (navBarRef.current && navRef.current) {
          gsap.to(navBarRef.current, { opacity: 1, duration: 0.3 });
          gsap.to(navRef.current, { opacity: 1, duration: 0.3 });
          setIsCollapsed(false);
        }
      }

      inactivityTimeoutRef.current = setTimeout(() => {
        if (!isMobile && !isUserClosed && navBarRef.current && navRef.current) {
          gsap.to(navBarRef.current, { opacity: 0, duration: 0.5 });
          gsap.to(navRef.current, { opacity: 0, duration: 0.5 });
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

  const toggleNavbar = useCallback(() => {
    if (navBarRef.current && navRef.current) {
      const collapsedState = isCollapsed
        ? { opacity: 1, display: "flex", pointerEvents: "auto" }
        : {
            opacity: isMobile ? 0.5 : 0,
            display: "none",
            pointerEvents: "none",
          };
      gsap.to(navBarRef.current, {
        ...collapsedState,
        height: isCollapsed ? "auto" : 0,
        duration: 0.5,
        ease: "power2.out",
      });

      if (isCollapsed) {
        // Add blur class on expand
        navRef.current.classList.add("backdrop-blur");
      } else {
        // Remove blur class on collapse
        navRef.current.classList.remove("backdrop-blur");
      }

      gsap.to(navRef.current, {
        backgroundColor: isCollapsed ? "rgba(0, 3, 4, 1)" : "transparent",
        opacity: isCollapsed ? 0.95 : 0,
        duration: 0.5,
        pointerEvents: "none",
      });
    }

    if (isSidebarOpen) setSidebarOpen(false);
    setIsUserClosed(!isCollapsed);
    setIsCollapsed(!isCollapsed);
  }, [isCollapsed, isMobile, isSidebarOpen]);

  useEffect(() => {
    if (setToggleNavbar) setToggleNavbar(() => toggleNavbar);
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

    if (isMobile) toggleNavbar(); // Close the navbar after clicking an item on mobile
  };

  useEffect(() => {
    const handleResizeAndNavHeight = () => {
      if (navRef.current) setNavHeight(navRef.current.offsetHeight); // Update nav height dynamically on resize
    };

    window.addEventListener("resize", handleResizeAndNavHeight);
    handleResizeAndNavHeight();

    return () => window.removeEventListener("resize", handleResizeAndNavHeight);
  }, [isCollapsed, isMobile]);

  return (
    <>
      {!isMobile && (
        <div
          ref={toggleArrowRef}
          aria-label="Open/Close Navigation Menu"
          role="button"
          tabIndex={0}
          className="fixed top-[1em] left-8 transform -translate-x-1/2 z-50 cursor-pointer"
          onClick={toggleNavbar}
          onKeyDown={(e) => e.key === "Enter" && toggleNavbar()}
        >
          <FontAwesomeIcon
            color="#E2E8F0"
            icon={isCollapsed ? faBars : faBarsStaggered}
            size="lg"
          />
        </div>
      )}

      {isMobile && (
        <div
          ref={hamburgerRef}
          aria-label="Open/Close Menu"
          className="fixed pl-4 top-4"
          style={{ zIndex: 1000 }}
        >
          <button
            onClick={toggleNavbar}
            className="p-2 min-w-8 text-white rounded-lg bg-lime-600 hover:bg-lime-700"
            aria-expanded={!isCollapsed}
          >
            <FontAwesomeIcon
              color="#E2E8F0"
              icon={isCollapsed ? faBars : faBarsStaggered}
            />
          </button>
        </div>
      )}

      <nav
        ref={navRef}
        id="navigation"
        role="navigation"
        aria-label="Main Navigation"
        className={`fixed top-0 w-full border-b-2 shadow-lg shadow-border-bottom border-lime-600 z-50 transition-all duration-300 ease-in-out bg-black bg-opacity-90 ${
          theme === "dark" ? " text-white" : "bg-gray-100"
        } backdrop-blur-xl`} // Adding Tailwind's backdrop-blur-lg class
        style={{ opacity: 1, zIndex: 900 }}
      >
        <ul
          className={`px-8 ${
            isCollapsed && isMobile ? "hidden" : "flex"
          } pt-4 flex-col md:flex-row justify-around items-center space-y-2 md:space-y-0 md:space-x-8 font-extrabold transition-all duration-300 ease-in-out`}
        >
          {["home", "merch", "music", "tour", "lore", "booking"].map((item) => (
            <li
              key={item}
              className={`p-2 cursor-pointer relative ${
                selected === item
                  ? theme === "dark"
                    ? "text-lime-500"
                    : "text-black"
                  : theme === "dark"
                  ? "text-white"
                  : "text-black"
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
                  selected === item ? "bg-lime-500" : null
                } transition-all duration-300 ease-in-out hover:bg-lime-600`}
              ></span>
            </li>
          ))}

          <div
            className={`relative top-[-1rem] ${isMobile ? "" : "right-12"}`}
            style={{ minWidth: "5em" }}
          >
            <AudioPlayer theme={theme} />
          </div>
        </ul>
      </nav>

      {/*REVIEW Dev Mode Dashboard Button  */}
      {/* TODO Remove in Production!!!! */}
      {DevMode && (
        <div
          className={`fixed p-2 cursor-pointer  ${
            selected === "dev" ? "text-lime-500" : "text-white"
          }`}
          onClick={() => handleItemClick("dev")}
          role="menuitem"
          aria-label="Navigate to Developer Mode"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleItemClick("dev")}
          style={{ zIndex: 1000, bottom: 0 }}
        >
          <a href={`${base}/dashboard`} className="no-underline">
            <span className="text-rose-700">(DevMode Enabled)</span>
            <br />
            Admin Dashboard
          </a>
          <span
            className={`absolute bottom-[-0.25em] left-0 w-full h-[0.25em] ${
              selected === "dev" ? "bg-lime-500" : null
            } transition-all duration-300 ease-in-out`}
          ></span>
        </div>
      )}

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
