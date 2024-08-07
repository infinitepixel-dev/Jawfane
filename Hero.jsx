import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import propTypes from "prop-types";
import hero_bg from "@public/hero_bg.webp";

gsap.registerPlugin(ScrollToPlugin);

const Hero = ({ theme }) => {
  useEffect(() => {
    const heroSection = document.getElementById("tour");

    const snapIntoView = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(window, {
            duration: 1,
            scrollTo: { y: heroSection, offsetY: 0 },
            ease: "power2.out",
          });
        }
      });
    };

    const observer = new IntersectionObserver(snapIntoView, {
      threshold: 0.5, // Adjust this value as needed
    });

    observer.observe(heroSection);

    return () => {
      observer.unobserve(heroSection);
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
