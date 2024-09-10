//Hero.jsx

/*
A component to manage the hero section of the website
*/

//INFO React Libraries
import { useEffect, useRef } from "react";
import propTypes from "prop-types";

//INFO Animation Libraries
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

//INFO Images
import hero_bg from "/images/hero_bg.webp";

const Hero = ({ theme }) => {
  const isUserInteracting = useRef(false);
  const debounceTimeout = useRef(null);

  useEffect(() => {
    const heroSection = document.getElementById("tour");

    const snapIntoView = (entries) => {
      if (isUserInteracting.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(window, {
            duration: 1.5, // Increased duration for a more pronounced effect
            scrollTo: { y: heroSection, offsetY: 0 },
            ease: "elastic.out(1, 1)", // Elastic easing for a bounce effect
          });
        }
      });
    };

    const observer = new IntersectionObserver(snapIntoView, {
      threshold: 0.4, // Adjust this value as needed
    });

    observer.observe(heroSection);

    const handleUserInteractionStart = () => {
      isUserInteracting.current = true;
      clearTimeout(debounceTimeout.current);
    };

    const handleUserInteractionEnd = () => {
      debounceTimeout.current = setTimeout(() => {
        isUserInteracting.current = false;
      }, 100); // Debounce timeout to prevent immediate re-triggering
    };

    window.addEventListener("scroll", handleUserInteractionStart);
    window.addEventListener("mousedown", handleUserInteractionStart);
    window.addEventListener("mouseup", handleUserInteractionEnd);
    window.addEventListener("touchstart", handleUserInteractionStart);
    window.addEventListener("touchend", handleUserInteractionEnd);

    return () => {
      observer.disconnect(); // Ensure cleanup by disconnecting the observer
      window.removeEventListener("scroll", handleUserInteractionStart);
      window.removeEventListener("mousedown", handleUserInteractionStart);
      window.removeEventListener("mouseup", handleUserInteractionEnd);
      window.removeEventListener("touchstart", handleUserInteractionStart);
      window.removeEventListener("touchend", handleUserInteractionEnd);
    };
  }, []);

  useEffect(() => {
    gsap.fromTo(
      "#hero-title",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1 }
    );
  }, []);

  return (
    <section
      id="tour"
      className={`w-full h-screen bg-cover bg-center ${theme} z-40`}
    >
      <div
        style={{
          backgroundImage: `url(${hero_bg})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className={`flex items-center justify-center h-screen ${
          theme === "dark" ? "bg-slate-800" : "bg-white"
        }`}
      >
        <div>
          <h1
            id="hero-title"
            className={`text-5xl ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            Hero Page - Jawfane Band
          </h1>
          <div className="flex justify-center mt-4">
            {/* <img className="w-full" src={hero_bg} alt="hero" /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = {
  theme: propTypes.string.isRequired,
};

export default Hero;
