import BandsInTownEvents from "../sub-components/BandsInTownEvents";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

import propTypes from "prop-types";

const Tour = ({ theme }) => {
  const isUserInteracting = useRef(false);
  const debounceTimeout = useRef(null);

  useEffect(() => {
    const heroSection = document.getElementById("music");

    const snapIntoView = (entries) => {
      if (isUserInteracting.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(window, {
            duration: 1.5,
            scrollTo: { y: heroSection, offsetY: 0 },
            ease: "elastic.out(1, 1)",
          });
        }
      });
    };

    const observer = new IntersectionObserver(snapIntoView, {
      threshold: 0.4,
    });

    observer.observe(heroSection);

    const handleUserInteractionStart = () => {
      isUserInteracting.current = true;
      clearTimeout(debounceTimeout.current);
    };

    const handleUserInteractionEnd = () => {
      debounceTimeout.current = setTimeout(() => {
        isUserInteracting.current = false;
      }, 100);
    };

    window.addEventListener("scroll", handleUserInteractionStart);
    window.addEventListener("mousedown", handleUserInteractionStart);
    window.addEventListener("mouseup", handleUserInteractionEnd);
    window.addEventListener("touchstart", handleUserInteractionStart);
    window.addEventListener("touchend", handleUserInteractionEnd);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleUserInteractionStart);
      window.removeEventListener("mousedown", handleUserInteractionStart);
      window.removeEventListener("mouseup", handleUserInteractionEnd);
      window.removeEventListener("touchstart", handleUserInteractionStart);
      window.removeEventListener("touchend", handleUserInteractionEnd);
    };
  }, []);

  return (
    <>
      <section
        // id="tour"
        className={`w-full min-h-screen bg-cover bg-center pt-16 ${theme} clear-both z-40`}
      >
        <h1
          id="tour"
          className={`text-5xl text-center mb-4 ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          Tour Dates
        </h1>

        <BandsInTownEvents artistName="Metallica" />
      </section>
    </>
  );
};

Tour.propTypes = {
  theme: propTypes.string.isRequired,
};

export default Tour;
