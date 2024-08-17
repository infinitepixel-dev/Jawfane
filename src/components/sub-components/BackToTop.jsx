import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { gsap } from "gsap";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);
  const buttonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const scrollPageLocation = "home";

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      if (scrollPosition + windowHeight >= documentHeight) {
        setShowNextButton(false);
      } else {
        setShowNextButton(true);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      gsap.to(buttonRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: 0,
        duration: 0.6,
        display: "block",
        ease: "power2.out",
      });
    } else {
      gsap.to(buttonRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.8,
        rotate: 45,
        duration: 0.6,
        display: "none",
        ease: "power2.in",
      });
    }

    if (showNextButton) {
      gsap.to(nextButtonRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: 0,
        duration: 0.6,
        display: "block",
        ease: "power2.out",
      });
    } else {
      gsap.to(nextButtonRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.8,
        rotate: 45,
        duration: 0.6,
        display: "none",
        ease: "power2.in",
      });
    }
  }, [isVisible, showNextButton]);

  const scrollToTop = () => {
    const navigationElement = document.getElementById(scrollPageLocation);
    if (navigationElement) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: navigationElement, offsetY: 0 },
        ease: "power2.out",
      });
    }
  };

  const scrollToNextSection = () => {
    const sections = document.querySelectorAll("section");
    // console.log("Sections: ", sections);

    let nextSection = null;
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top > 0 && !nextSection) {
        console.log("Section: ", section);
        nextSection = section;
      }
    });

    if (nextSection) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: nextSection, offsetY: 0 },
        ease: "power2.out",
      });
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
