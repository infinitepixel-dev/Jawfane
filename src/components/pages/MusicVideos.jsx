//MusicVideos.jsx

/*
A component to manage the music videos section of the website
*/

//INFO React Libraries
import { useEffect, useRef } from "react";
import propTypes from "prop-types";

//INFO React Animation Libraries
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const MusicVideos = ({ theme }) => {
  const isUserInteracting = useRef(false);
  const debounceTimeout = useRef(null);

  useEffect(() => {
    const heroSection = document.getElementById("music");
    let lastScrollY = window.scrollY;

    const snapIntoView = (entries) => {
      if (isUserInteracting.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentScrollY = window.scrollY;
          if (currentScrollY > lastScrollY) {
            gsap.to(window, {
              duration: 1.5,
              scrollTo: { y: heroSection, offsetY: 0 },
              ease: "elastic.out(1, 1)",
            });
          }
          lastScrollY = currentScrollY;
        }
      });
    };

    const observer = new IntersectionObserver(snapIntoView, {
      threshold: 0.6, // Increase threshold to require more visibility
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
        id="music"
        className={`w-full h-screen bg-cover bg-center pt-16 ${theme} clear-both z-40 overflow-hidden`}
        style={{
          backgroundImage: `url({heroImage})`,
        }}
      >
        <h1
          id="music-video-title"
          className={`text-5xl text-center ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          Music Videos
        </h1>

        <div
          className={`flex items-center justify-center py-8 ${
            theme === "dark" ? "bg-black" : "bg-slate-300"
          }`}
        >
          <div className="grid w-full grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-2 max-w-7xl">
            {/* Responsive Video 1 */}
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full border border-gray-300 border-solid rounded-md"
                src="https://www.youtube.com/embed/rSdiBTpiFbY?si=PjIO9GIjFRnusqa0"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>

            {/* Responsive Video 2 */}
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full border border-gray-300 border-solid rounded-md"
                src="https://www.youtube.com/embed/hK7ekE0Sry4?si=nJ00ieaI8d6W9ixL"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

MusicVideos.propTypes = {
  theme: propTypes.string.isRequired,
};

export default MusicVideos;
