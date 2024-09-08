//BackToTop.jsx

/*
A component to manage the back-to-top button
*/

//INFO React Libraries
import { useState, useEffect, useRef } from "react";

//INFO Animation Libraries
import { gsap } from "gsap";

//INFO Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);
  const buttonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const sections = [
    "home",
    "merch",
    "music",
    "tour",
    "lore",
    "booking",
    "footer",
  ]; // List of sections

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      setIsVisible(scrollPosition > 300);

      // If at bottom of the page, hide the "next" button
      if (scrollPosition + windowHeight >= documentHeight) {
        setShowNextButton(false);
      } else {
        setShowNextButton(true);
      }

      // Collapse the navbar on manual scroll
      if (scrollPosition > 0) {
        // closeNavbar(); // Call the passed-in closeNavbar function
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  useEffect(() => {
    const animateButton = (ref, visible) => {
      gsap.to(ref.current, {
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 20,
        scale: visible ? 1 : 0.8,
        rotate: visible ? 0 : 45,
        duration: 0.6,
        display: visible ? "block" : "none",
        ease: visible ? "power2.out" : "power2.in",
      });
    };

    animateButton(buttonRef, isVisible);
    animateButton(nextButtonRef, showNextButton);
  }, [isVisible, showNextButton]);

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: 0 },
      ease: "power2.out",
    });
    setCurrentSectionIndex(0); // Reset to the first section
  };

  const scrollToNextSection = () => {
    const nextSectionIndex = currentSectionIndex + 1;

    if (nextSectionIndex < sections.length) {
      const nextSectionId = sections[nextSectionIndex];
      const nextSectionElement = document.getElementById(nextSectionId);

      if (nextSectionElement) {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: nextSectionElement.offsetTop },
          ease: "power2.out",
        });
        setCurrentSectionIndex(nextSectionIndex);
      }
    }
  };

  const upButtonColor = isVisible
    ? "border border-slate-500 bg-lime-700 hover:bg-lime-600"
    : "bg-lime-700";
  const downButtonColor = showNextButton
    ? "border border-slate-500 bg-lime-700 hover:bg-lime-600"
    : "bg-lime-700";

  return (
    <div className="fixed z-50 flex flex-col space-y-2 bottom-6 right-4">
      <button
        ref={buttonRef}
        onClick={scrollToTop}
        className={`p-4 rounded-full shadow-lg ${upButtonColor} transition`}
        style={{
          opacity: 0,
          transform: "translateY(20px) scale(0.8) rotate(45deg)",
        }}
      >
        <FontAwesomeIcon color="#E2E8F0" icon={faArrowUp} />
      </button>

      <button
        ref={nextButtonRef}
        onClick={scrollToNextSection}
        className={`p-4 ${downButtonColor} rounded-full shadow-lg  transition`}
        style={{
          opacity: 0,
          transform: "translateY(20px) scale(0.8) rotate(45deg)",
        }}
      >
        <FontAwesomeIcon color="#E2E8F0" icon={faArrowDown} />
      </button>
    </div>
  );
};

export default BackToTop;
