// components/Hero.js
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import propTypes from "prop-types";
// import heroImage from "@public/heroImage.jpg";
gsap.registerPlugin(ScrollToPlugin);

const MusicVideos = ({ theme }) => {
  useEffect(() => {
    const heroSection = document.getElementById("music-video-title");

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
      "#music-video-title",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1 }
    );
  }, []);

  return (
    <section
      id="music-video"
      className={`h-screen bg-cover bg-center ${theme} z-40`}
      style={{
        backgroundImage: `url({heroImage})`,
        // fit
      }}
    >
      <div
        className={`flex items-center justify-center h-full ${
          theme === "dark" ? "bg-black" : "bg-slate-300"
        }`}
      >
        <h1
          id="music-video-title"
          className={`text-5xl ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          Music Video Page - Jawfane Band
        </h1>
      </div>
    </section>
  );
};

MusicVideos.propTypes = {
  theme: propTypes.string.isRequired,
};

export default MusicVideos;
