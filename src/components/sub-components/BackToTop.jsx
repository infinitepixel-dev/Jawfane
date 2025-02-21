import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { gsap } from "gsap";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);
  const buttonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const sections = ["home", "tour", "merch", "music", "footer"]; // List of sections

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

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2">
      <button
        ref={buttonRef}
        onClick={scrollToTop}
        className="p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
        style={{
          opacity: 0,
          transform: "translateY(20px) scale(0.8) rotate(45deg)",
        }}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>

      <button
        ref={nextButtonRef}
        onClick={scrollToNextSection}
        className="p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-700 transition"
        style={{
          opacity: 0,
          transform: "translateY(20px) scale(0.8) rotate(45deg)",
        }}
      >
        <FontAwesomeIcon icon={faArrowDown} />
      </button>
    </div>
  );
};

export default BackToTop;
