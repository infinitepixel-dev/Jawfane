import { useEffect, useRef } from "react";
import jawFane_logo from "@public/jawfane_logo.webp";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import propTypes from "prop-types";

gsap.registerPlugin(ScrollToPlugin);

const CanvasLogo = ({ theme }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const isUserInteracting = useRef(false);
  const debounceTimeout = useRef(null);

  const colorChangeSpeed = 2000; // Duration in milliseconds for the color change
  const interval = colorChangeSpeed; // Interval between color changes

  useEffect(() => {
    const heroSection = document.getElementById("canvasLogo");

    const snapIntoView = (entries) => {
      if (isUserInteracting.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(window, {
            duration: 1, // Increased duration for a more pronounced effect
            scrollTo: { y: heroSection, offsetY: 0 },
            ease: "power2.inOut(1, 1)", // Elastic easing for a bounce effect
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
    // Smoothly fade between background colors when the theme changes
    const newColor = theme === "dark" ? "#000000" : "#FFFFFF";
    gsap.to(document.body, { backgroundColor: newColor, duration: 1 });

    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F3FF33"];
    let currentColorIndex = 0;
    const duration = colorChangeSpeed;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { willReadFrequently: true });

    const interpolateColor = (color1, color2, factor) => {
      const result = color1
        .slice(1)
        .match(/.{2}/g)
        .map((hex, i) => {
          const value1 = parseInt(hex, 16);
          const value2 = parseInt(color2.slice(1).match(/.{2}/g)[i], 16);
          const value = Math.round(value1 + factor * (value2 - value1))
            .toString(16)
            .padStart(2, "0");
          return value;
        });
      return `#${result.join("")}`;
    };

    const changeColor = (startTime) => {
      const now = performance.now();
      const elapsed = now - startTime;
      const factor = Math.min(elapsed / duration, 1);
      let nextColorIndex = (currentColorIndex + 1) % colors.length;

      // Ensure the same color doesn't repeat
      while (nextColorIndex === currentColorIndex) {
        nextColorIndex = (nextColorIndex + 1) % colors.length;
      }

      const currentColor = colors[currentColorIndex];
      const nextColor = colors[nextColorIndex];
      const interpolatedColor = interpolateColor(
        currentColor,
        nextColor,
        factor
      );

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      const [r, g, b] = interpolatedColor
        .slice(1)
        .match(/.{2}/g)
        .map((hex) => parseInt(hex, 16));

      for (let i = 0; i < data.length; i += 4) {
        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
      }

      context.putImageData(imageData, 0, 0);

      if (factor < 1) {
        requestAnimationFrame(() => changeColor(startTime));
      } else {
        currentColorIndex = nextColorIndex;
        setTimeout(
          () => requestAnimationFrame(() => changeColor(performance.now())),
          interval
        );
      }
    };

    const loadImage = () => {
      const img = new Image();
      img.src = jawFane_logo;
      img.onload = () => {
        const imageWidth = img.width;
        const imageHeight = img.height;
        const aspectRatio = imageWidth / imageHeight;
        const canvasWidth = window.innerWidth;
        const newCanvasHeight =
          canvasWidth / aspectRatio - (window.innerWidth < 768 ? 200 : 400);

        canvas.width = canvasWidth;
        canvas.height = newCanvasHeight;

        const drawHeight = canvasWidth / aspectRatio;
        const yOffset = (newCanvasHeight - drawHeight) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, yOffset, canvas.width, drawHeight);

        requestAnimationFrame(() => changeColor(performance.now()));
      };
    };

    loadImage();

    const handleResize = () => {
      loadImage();
    };

    window.addEventListener("resize", handleResize);

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const canvasContainer = containerRef.current;
      canvasContainer.style.transform = `translateY(${scrollTop * 0.5}px)`;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      clearInterval(changeColor);
    };
  }, [colorChangeSpeed, interval, theme]);

  return (
    <div id="canvasLogo" className="h-screen flex justify-center items-center">
      <div
        className="flex justify-center items-center overflow-hidden relative"
        ref={containerRef}
        style={{ height: "40vh", zIndex: -1 }}
      >
        <canvas id="jawfane-bg-logo" ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

CanvasLogo.propTypes = {
  theme: propTypes.string.isRequired,
};

export default CanvasLogo;
