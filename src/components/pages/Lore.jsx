//Lore.jsx

/*
A component that displays information about the band members
*/

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Lore() {
  const panels = useRef([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle screen resizing and detect if the user is on mobile or desktop
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Set initial positions and image scaling for each panel based on device type (mobile/desktop)
  useEffect(() => {
    panels.current.forEach((panel, index) => {
      const image = panel.querySelector(".bg-image");
      const position = isMobile
        ? bandData[index].position.mobile
        : bandData[index].position.desktop;

      // Set the initial image properties such as scale and position
      gsap.set(image, {
        x: `${position.x}px`,
        y: `${position.y}px`,
        scale: 1.1,
        transformOrigin: "center top",
      });
    });
  }, [isMobile]);

  // Handle click event on a panel, expanding the bio and triggering scrolling
  const handleClick = (index) => {
    const panel = panels.current[index];
    const bio = panel.querySelector(".bio");
    const image = panel.querySelector(".bg-image");

    if (activeIndex === index) {
      // Close the active bio
      setActiveIndex(null);
      gsap.to(image, {
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.inOut",
      });
      gsap.to(bio, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => (bio.style.display = "none"),
      });
    } else {
      // Close any previously opened bio
      if (activeIndex !== null) {
        const prevPanel = panels.current[activeIndex];
        const prevBio = prevPanel.querySelector(".bio");
        const prevImage = prevPanel.querySelector(".bg-image");
        gsap.to(prevImage, {
          scale: 1,
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.inOut",
        });
        gsap.to(prevBio, {
          height: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => (prevBio.style.display = "none"),
        });
      }

      setActiveIndex(index);
      const position = isMobile
        ? bandData[index].position.mobile
        : bandData[index].position.desktop;

      // Animate the image within the panel using pixel-based movement
      gsap.to(image, {
        scale: 1.3,
        x: `${parseFloat(position.x)}px`,
        y: `${parseFloat(position.y)}px`,
        transformOrigin: "center top",
        duration: 0.5,
        ease: "power2.inOut",
      });
      bio.style.display = "block";
      gsap.fromTo(
        bio,
        { height: 0, opacity: 0 },
        {
          height: isMobile ? "20%" : "25%", // Responsive bio height for mobile and desktop
          opacity: 1,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            startScrolling(bio); // Trigger scrolling after the bio is expanded
          },
        }
      );
    }
  };

  // Start the scrolling effect on the bio section
  const startScrolling = (bio) => {
    const scrollHeight = bio.scrollHeight - bio.clientHeight; // Calculate scrollable height
    if (scrollHeight > 0) {
      gsap.to(bio, {
        scrollTo: { y: scrollHeight },
        duration: 60, // Adjust the duration for slower/faster scrolling
        ease: "none", // Linear scrolling
        delay: 1.5, // Delay before scrolling starts
        repeat: -1, // Infinite looping
        yoyo: true, // Scroll back and forth
      });
    }
  };

  // Handle image scaling on hover
  const handleMouseEnter = (index) => {
    if (activeIndex !== index) {
      gsap.to(panels.current[index].querySelector(".bg-image"), {
        scale: 1.1,
        duration: 0.15,
        ease: "power2.inOut",
      });
    }
  };

  // Reset image scaling when mouse leaves
  const handleMouseLeave = (index) => {
    if (activeIndex !== index) {
      gsap.to(panels.current[index].querySelector(".bg-image"), {
        scale: 1,
        duration: 0.15,
        ease: "power2.inOut",
      });
    }
  };

  return (
    <div
      id="lore"
      className="flex flex-col h-screen overflow-hidden text-white bg-gray-900 md:flex-row"
    >
      {bandData.map((band, index) => (
        <div
          key={index}
          ref={(el) => (panels.current[index] = el)}
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
          className="relative flex flex-col items-center justify-center flex-1 w-full h-full overflow-hidden text-center transition-all duration-500 ease-in-out bg-center bg-cover cursor-pointer"
          role="button"
          tabIndex={0}
          aria-expanded={activeIndex === index}
          aria-label={`Learn more about ${band.member}`}
          style={{
            minWidth: 0,
            padding: "0 2px",
          }}
        >
          <div
            className="absolute inset-0 transition-transform duration-500 ease-in-out bg-center bg-no-repeat bg-cover bg-image"
            style={{
              backgroundImage: `url(${band.imageUrl})`,
              objectFit: "cover",
              width: "100%",
              height: "100%",
              overflow: "hidden",
              backgroundPosition: isMobile
                ? "center"
                : band.position.flip
                ? "right"
                : "",
            }}
          ></div>
          <div className="relative z-10 flex flex-col items-center justify-center w-full p-4 bg-black bg-opacity-50 rounded-lg">
            <p className="text-lg font-light uppercase md:text-xl text-shadow-sm">
              {band.member}
            </p>
          </div>
          <div
            className="relative z-10 w-full p-6 rounded-lg text-lg text-center text-white bg-black bio bg-opacity-90 md:text-xl"
            style={{
              display: "none",
              overflow: "hidden", // Ensure scrolling happens inside
              position: "relative",
            }}
          >
            <p>{band.bio}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const bandData = [
  {
    member: "Cory Pack",
    imageUrl: "images/cory-pack.jpg",
    bio: "It’s like it’s always been this way, since the breaking of the first string, I have sought the greatest riffs and nastiest tones. One amp and one guitar to rule them all. \n\nFormally trained classical composer, self taught metal head, I found my safe place as a teenager and young adult in small diy venues full of angry music and open minded people. It was here the forge was first built. It was here, the stories of betrayal, love, hurt, and forgiveness all ran together into a single note and since last I care remember, it is the only note I have ever needed. \n\nThe note of acceptance, the ring of chosen family, the fellowship of healing: I admire them all. \n\nTruly it would be easy to say that this is the only path I could have chosen, but there are many paths, and many forges, many rings, and many songs. I never considered the end of the path, there is no destination with which me and my fine fellows would be content. I search not for the gold at the end of the rainbow. \n\nIt is the journey and the people we choose to go with that is gold, it is the people in the audience who, have their own forge and light their fire with us. \n\nAnd together as the metal is made into priceless memories of triumph and defeat. I stand in awe of you and what we are when you burn for the things you love. \n\n“The fire doesn’t surrender it only rests. Yet from the forge comes transformation. And no sword was ever made without getting the shit beat out of it.” \n\nThe Eternal Riffsmith- Cory",
    position: {
      flip: false,
      mobile: { x: "0", y: "0" },
      desktop: { x: "0", y: "0" },
    },
  },
  {
    member: "Chase Schumann",
    imageUrl: "images/chase-schumann.jpg",
    bio: "Chase Schumann lays down the heavy bass lines that drive Jawfane's music with deep, resonant rhythms.",
    position: {
      flip: false,
      mobile: { x: "0", y: "0" },
      desktop: { x: "0", y: "0" },
    },
  },
  {
    member: "Austin Heipp",
    imageUrl: "images/austin-heipp.jpg",
    bio: "Austin Heipp is the commanding voice of Jawfane, delivering powerful vocals that define the band's sound.",
    position: {
      flip: true,
      mobile: { x: "0", y: "0" },
      desktop: { x: "0", y: "0" },
    },
  },
  {
    member: "Zach Cenate",
    imageUrl: "images/zach-cenate.jpg",
    bio: "Zach Cenate anchors Jawfane's sound with his precise and thunderous drumming.",
    position: {
      flip: false,
      mobile: { x: "0", y: "0" },
      desktop: { x: "0", y: "0" },
    },
  },
  {
    member: "Jesse Marquez",
    imageUrl: "images/jesse-marquez.jpg",
    bio: "Jesse Marquez brings melodic depth to Jawfane's sound with his skillful work on the keys.",
    position: {
      flip: false,
      mobile: { x: "0", y: "0" },
      desktop: { x: "0", y: "0" },
    },
  },
];

export default Lore;
