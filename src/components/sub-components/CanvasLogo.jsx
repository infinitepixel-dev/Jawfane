import { useEffect, useRef } from "react";
import jawFane_logo from "@public/jawfane_logo.webp";

const CanvasLogo = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F3FF33"];
    let currentColorIndex = 0;
    const interval = 2000;
    const duration = interval / 1.5;

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
      const nextColorIndex = (currentColorIndex + 1) % colors.length;

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
          canvasWidth / aspectRatio - (window.innerWidth < 768 ? 100 : 1000);

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
  }, []);

  return (
    <div
      className="flex justify-center items-center mt-8overflow-hidden relative"
      ref={containerRef}
      style={{ height: "40vh", zIndex: -1 }}
    >
      <canvas
        id="jawfane-bg-logo"
        style={{ width: "100%" }}
        ref={canvasRef}
        className="max-w-full"
      ></canvas>
    </div>
  );
};

export default CanvasLogo;
