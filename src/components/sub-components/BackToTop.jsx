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

  const sections = [
    "home",
    "album",
    "tour",
    "lore",
    "music",
    "booking",
    "footer",
  ];

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      setIsVisible(scrollPosition > 300);
      setShowNextButton(scrollPosition + windowHeight < documentHeight);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
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
        onComplete: () => {
          if (visible) {
            pulseArrow(ref); // Start subtle animation when visible
          }
        },
      });
    };

    animateButton(buttonRef, isVisible);
    animateButton(nextButtonRef, showNextButton);
  }, [isVisible, showNextButton]);

  const pulseArrow = (ref) => {
    gsap.to(ref.current, {
      y: "-10px", // Slight float up
      duration: 2,
      repeat: -1, // Infinite loop
      yoyo: true,
      ease: "power1.inOut",
    });
  };

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: 0 },
      ease: "power2.out",
    });
    setCurrentSectionIndex(0);
  };

  const scrollToNextSection = () => {
    const nextSectionIndex = currentSectionIndex + 1;
    if (nextSectionIndex < sections.length) {
      const nextSectionElement = document.getElementById(
        sections[nextSectionIndex]
      );
      if (nextSectionElement) {
        window.scrollTo({
          top: nextSectionElement.offsetTop,
          behavior: "smooth",
        });
        setCurrentSectionIndex(nextSectionIndex);
      }
    }
  };

  return (
    <div className="right-4 bottom-4 z-10 fixed flex flex-col space-y-2">
      <button
        ref={buttonRef}
        onClick={scrollToTop}
        className="bg-blue-600 hover:bg-blue-700 shadow-lg p-4 rounded-full text-white transition"
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
        className="bg-neutral-900 hover:bg-neutral-950 shadow-lg p-4 rounded-full text-white transition"
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
