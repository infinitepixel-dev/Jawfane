import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import propTypes from "prop-types";

import hero_bg from "@public/hero_bg.webp";
import hero_bg_mobile from "@public/hero_bg_mobile.webp";

import "./AnimatedLogo.css";

const AnimatedLogo = ({ theme, isMobile }) => {
  const logoRef = useRef(null);

  const colorChangeSpeed = 2000; // Duration in milliseconds for the color change
  const interval = colorChangeSpeed; // Interval between color changes

  useEffect(() => {
    const newColor = theme === "dark" ? "#000000" : "#FFFFFF";
    gsap.to(document.body, { backgroundColor: newColor, duration: 1 });

    //TODO adjust colors and set theme of the site
    const colors = [
      "#1d7d7b",
      "#4caf50 ",
      "#fdd835",
      "#e53935",
      "#81c784 ",
      "#fff176 ",
      "#ff7043 ",
      "#ff8a80 ",
      "#f06292",
      "#ab47bc ",
    ];

    let currentColorIndex = 0;

    const changeColor = () => {
      const nextColorIndex = (currentColorIndex + 1) % colors.length;
      const nextColor = colors[nextColorIndex];

      gsap.to(logoRef.current.querySelectorAll("path"), {
        duration: colorChangeSpeed / 1000,
        fill: nextColor,
        onComplete: () => {
          currentColorIndex = nextColorIndex;
          setTimeout(changeColor, interval);
        },
      });
    };

    changeColor();

    return () => {
      window.removeEventListener("resize", changeColor);
    };
  }, [colorChangeSpeed, interval, theme]);

  return (
    <div
      id="animatedLogo"
      className="relative flex items-center justify-center w-full min-h-screen"
    >
      {isMobile === true ? (
        <img
          src={hero_bg_mobile}
          alt="Hero Background"
          className="absolute min-h-screen w-full "
          style={{
            margin: "0 auto",
            top: -50,
            // image constrast and brightness
            filter: "contrast(1.2) brightness(0.27)",
          }}
        />
      ) : (
        <img
          src={hero_bg}
          alt="Hero Background"
          className="block w-full"
          style={{ display: "block", margin: "0 auto" }}
        />
      )}

      <svg
        ref={logoRef}
        version="1.1"
        viewBox="0 0 2048 2048"
        width={isMobile ? "100%" : "50%"}
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 transform -translate-x-1/2 left-1/2"
      >
        <path
          transform="translate(708,794)"
          d="m0 0h70v8h-13l19 121 17 110 1 5 18-139 11-85 1-11-15-1v-8h69v8h-15l18 117 18 114 1 3 21-161 9-68v-4l-13-1v-8h48l1 8-18 1-10 66-12 89-9 67-12 93-2 7h-32l-1-1-30-211-7-49-4 26-8 57-5 40-8 61-9 72-2 5h-32l-2-9-44-308-1-5-18-1z"
          fill="#00000D"
        />
        <path
          transform="translate(1362,792)"
          d="m0 0h8l17 52 18 57 23 71 9 29v-185l-3-7-6-5-10-3v-9h55v9l-12 1-4 2-3 10-1 308-5 3-8-1-6-7-16-50-28-85-29-89-1 222h18v10h-53l-1-1v-8l1-1h19l-1-297-2-9-4-3-12-2-1-1v-9l1-1z"
          fill="#00000D"
        />
        <path
          transform="translate(1208,793)"
          d="m0 0h19l14 1 4 4 20 122 16 97 16 98 10 1v9h-62l-1-2v-6l1-1h11l-5-31-10-64-4-7-14-11-17-8-15-4-14-1-3 1-19 88-8 37h12v9h-37v-9h11l1-8 11-48 14-67-12 6-15 12v-7l7-8 14-8 9-3 1-10 19-90 16-70v-8l-7-10-1-3zm3 30-3 9-14 63-14 64-4 21 18-3h21l15 3 6 1-2-20-13-101-4-26-5-11z"
          fill="#00000D"
        />
        <path
          transform="translate(627,793)"
          d="m0 0h19l13 1 4 2 2 8 12 73 14 86 24 147 1 5 10 1v8l-1 1h-61v-9h11l-3-17-12-77-2-5-9-9-13-8-14-6-20-4-9 1-12 55-14 64-1 6h12v8l-1 1h-36v-9l10-1 8-33 15-70 4-19-14 7-12 11h-1v-7l7-8 14-8 8-4 23-109 13-55 1-13-7-10-1-3zm2 30-23 103-11 51v3l18-3h21l15 3 6 1-3-27-14-108-3-14-4-8z"
          fill="#00000D"
        />
        <path
          transform="translate(1492,792)"
          d="m0 0h124l1 1v83l-6 2h-7l-3-35-5-18-7-13-7-6-8-3-12-2-11-1v147h26l1 1 1 11h-28v156l24-2 10-3 6-4 8-16 5-16 3-23 1-13h12l1 1v84h-129v-7l2-1h11l5-2 1-1v-309l-4-2-15-1z"
          fill="#00000D"
        />
        <path
          transform="translate(460,794)"
          d="m0 0h69v8l-16 1-1 238-2 36-5 39-4 24-5 16-7 17-8 14-10 14-11 12-13 10-16 5h-2l2-4 11-18 10-21 8-24 6-26 4-26 3-37 1-270h-14z"
          fill="#00000D"
        />
        <path
          transform="translate(995,793)"
          d="m0 0h125v85h-13l-3-30-3-14-6-15-7-10-7-4-15-3-13-1v148h27l1 1 1 11h-29v154h14l1 1v8h-69v-8l1-1h15l-1-310-2-3-17-1-1-1v-6z"
          fill="#00000D"
        />
        <path
          transform="translate(969,1193)"
          d="m0 0h49v62h-6v-4h-46v-6h46v-21h-42v-5h42v-20h-43z"
          fill="#00000D"
        />
        <path
          transform="translate(1224,1186)"
          d="m0 0 7 4-6 12-9 12-10 11-13 10-15 9-19 8h-4l-3-5v-2l19-7 16-9 13-10 9-9 9-13z"
          fill="#01010E"
        />
        <path
          transform="translate(943,1187)"
          d="m0 0 6 4-2 6-8 13-8 10-9 9-15 11-16 8-10 4-2 2-5-6v-2l21-9 13-8 10-8 10-10 7-10z"
          fill="#01010E"
        />
        <path
          transform="translate(1063,1180)"
          d="m0 0 10 2-1 2h-2l-1 10-5 19-7 19-6 11-4 6-5-1-3-3 6-9 6-12 6-18z"
          fill="#00000D"
        />
        <path
          transform="translate(1103,1180)"
          d="m0 0 4 4 13 27 10 26 2 9-7 3-4-10-8-22-9-20-6-12 1-3z"
          fill="#01010E"
        />
        <path
          transform="translate(1152,1175)"
          d="m0 0 10 3 17 8 3 2-2 6h-4l-16-8-11-5 2-5z"
          fill="#01010E"
        />
        <path
          transform="translate(867,1197)"
          d="m0 0 9 1 19 7-3 7-27-9 1-5z"
          fill="#00000D"
        />
        <path
          transform="translate(878,1171)"
          d="m0 0 9 2 16 6 3 3-3 5-6-2-21-8z"
          fill="#00000D"
        />
        <path
          transform="translate(940,1161)"
          d="m0 0 7 6 7 8-4 4-11-12-2-3z"
          fill="#00000D"
        />
        <path
          transform="translate(925,1168)"
          d="m0 0 4 1 9 10 1 4-4 2-12-15z"
          fill="#00000D"
        />
        <path
          transform="translate(1123,1161)"
          d="m0 0 5 5 8 9v2l-5 2-8-11-3-3v-2z"
          fill="#02020F"
        />
        <path
          transform="translate(1109,1167)"
          d="m0 0 4 2 9 11-2 4-4-2-7-9-3-4z"
          fill="#02020F"
        />
        <path transform="translate(428,1228)" d="m0 0" fill="#00000D" />
      </svg>
    </div>
  );
};

AnimatedLogo.propTypes = {
  theme: propTypes.string.isRequired,
  isMobile: propTypes.bool.isRequired,
};

export default AnimatedLogo;
