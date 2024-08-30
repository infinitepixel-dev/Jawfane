import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

function Lore() {
  // Create a reference to hold the panels (cards) elements
  const panels = useRef([]);
  // State to keep track of the currently active (expanded) panel
  const [activeIndex, setActiveIndex] = useState(null);

  // useEffect to animate panels when they enter the viewport
  useEffect(() => {
    panels.current.forEach((panel) => {
      gsap.fromTo(
        panel,
        { opacity: 0, scale: 0.9 }, // Initial state: slightly smaller and transparent
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: panel, // Trigger animation when this panel enters the viewport
            start: "top 80%",
            toggleActions: "play none none reverse", // Play the animation when in view, reverse when out
          },
        }
      );
    });
  }, []);

  // Function to handle clicks on a panel
  const handleClick = (index) => {
    const panel = panels.current[index]; // Get the clicked panel
    const bio = panel.querySelector(".bio"); // Get the bio section inside the panel
    const image = panel.querySelector(".bg-image"); // Get the background image element

    // If the clicked panel is already active, collapse it
    if (activeIndex === index) {
      setActiveIndex(null); // Reset the active index
      gsap.to(panel, {
        flex: 1, // Reduce the panel back to its original size
        ease: "power2.inOut",
        duration: 0.5,
      });
      gsap.to(image, {
        scale: 1, // Reset the zoom on the image
        y: 0, // Reset the vertical position
        duration: 0.5,
        ease: "power2.inOut",
      });
      gsap.to(bio, {
        height: 0, // Collapse the bio section
        opacity: 0, // Fade out the bio section
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => (bio.style.display = "none"), // Hide the bio after animation completes
      });
    } else {
      // If another panel is active, collapse it first
      if (activeIndex !== null) {
        const prevPanel = panels.current[activeIndex]; // Get the previously active panel
        const prevBio = prevPanel.querySelector(".bio"); // Get the bio section of the previous panel
        const prevImage = prevPanel.querySelector(".bg-image"); // Get the previous image element
        gsap.to(prevPanel, {
          flex: 1, // Reduce the previous panel back to its original size
          ease: "power2.inOut",
          duration: 0.5,
        });
        gsap.to(prevImage, {
          scale: 1, // Reset the zoom on the previous image
          y: 0, // Reset the vertical position
          duration: 0.5,
          ease: "power2.inOut",
        });
        gsap.to(prevBio, {
          height: 0, // Collapse the previous bio section
          opacity: 0, // Fade out the previous bio section
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => (prevBio.style.display = "none"), // Hide the previous bio after animation completes
        });
      }

      // Expand the clicked panel
      setActiveIndex(index); // Set the clicked panel as active
      gsap.to(panel, {
        flex: 5, // Expand the clicked panel
        ease: "power2.inOut",
        duration: 0.5,
      });
      gsap.to(image, {
        scale: 1.3, // Zoom in on the image more toward the face
        y: -50, // Smoothly move the image upward
        transformOrigin: "center top", // Adjust the zoom origin to focus more on the face
        duration: 0.5,
        ease: "power2.inOut",
      });
      bio.style.display = "block"; // Make the bio section visible
      gsap.fromTo(
        bio,
        { height: 0, opacity: 0 }, // Initial state: collapsed and transparent
        {
          height: "auto",
          opacity: 1,
          duration: 0.5,
          ease: "power2.inOut",
        }
      );
    }
  };

  // Function to handle hover effect
  const handleMouseEnter = (index) => {
    if (activeIndex !== index) {
      gsap.to(panels.current[index].querySelector(".bg-image"), {
        scale: 1.1, // Slightly zoom in on hover
        duration: 0.3,
        ease: "power2.inOut",
      });
      gsap.to(panels.current[index], {
        flex: 2, // Slightly expand the panel on hover
        ease: "power2.inOut",
        duration: 0.3,
      });
    }
  };

  const handleMouseLeave = (index) => {
    if (activeIndex !== index) {
      gsap.to(panels.current[index].querySelector(".bg-image"), {
        scale: 1, // Reset the zoom on hover out
        duration: 0.3,
        ease: "power2.inOut",
      });
      gsap.to(panels.current[index], {
        flex: 1, // Return to original size when not hovered
        ease: "power2.inOut",
        duration: 0.3,
      });
    }
  };

  return (
    <div
      id="lore"
      className="flex flex-wrap h-screen bg-gray-900 text-white overflow-hidden"
    >
      {bandData.map((band, index) => (
        <div
          key={index}
          ref={(el) => (panels.current[index] = el)} // Assign the panel element to the ref array
          onClick={() => handleClick(index)} // Attach click handler
          onMouseEnter={() => handleMouseEnter(index)} // Attach hover effect
          onMouseLeave={() => handleMouseLeave(index)} // Remove hover effect
          className={`flex-1 flex flex-col justify-center items-center bg-center bg-cover text-center relative transition-all duration-500 ease-in-out w-full md:w-1/5 h-80 md:h-full cursor-pointer`}
          role="button"
          tabIndex={0}
          aria-expanded={activeIndex === index} // ARIA attribute for accessibility
          aria-label={`Learn more about ${band.member}`} // ARIA label for screen readers
          style={{
            minWidth: 0, // Ensure the panels do not cause overflow
            padding: "0 2px", // Add some padding to prevent content from being cut off
          }}
        >
          <div
            className="bg-image absolute inset-0 bg-no-repeat bg-center bg-cover transition-transform duration-500 ease-in-out"
            style={{ backgroundImage: `url(${band.imageUrl})` }}
          ></div>
          {/* Overlay and Text Content */}
          <div className="relative z-10 w-full bg-black bg-opacity-50 p-4 flex flex-col justify-center items-center">
            <p className="uppercase font-light text-lg md:text-xl text-shadow-sm">
              {band.member}
            </p>
          </div>
          {/* Bio section that is initially hidden */}
          <div
            className="bio relative z-10 w-full bg-black bg-opacity-90 text-white p-6 text-center text-lg md:text-xl"
            style={{ display: "none" }}
          >
            <p>{band.bio}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Data for each band member
const bandData = [
  {
    member: "Cory Pack",
    imageUrl:
      "https://www.wallpaperflare.com/static/454/254/349/rock-stars-concerts-guitar-mark-tremonti-wallpaper.jpg",
    bio: "Mark Tremonti is the lead guitarist of Alterbridge.",
  },
  {
    member: "Chase Schumann",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/d/df/Dreamtheater_-_Wacken_Open_Air_2015-1619_%28cropped%29.jpg",
    bio: "John Petrucci is the guitarist and founding member of Dream Theater.",
  },
  {
    member: "Austin Heipp",
    imageUrl:
      "https://townsquare.media/site/366/files/2023/06/attachment-pantera_dimebag_darrell.jpg?w=1080&q=75",
    bio: "Dimebag Darrell was the iconic guitarist of Pantera.",
  },
  {
    member: "Zach Cenate",
    imageUrl:
      "https://cdn-p.smehost.net/sites/7f9737f2506941499994d771a29ad47a/wp-content/uploads/2020/02/JCB_Periphery_2757.jpg",
    bio: "Misha Mansoor is the lead guitarist of Periphery.",
  },
  {
    member: "Jesse Marquez",
    imageUrl:
      "https://townsquare.media/site/366/files/2017/02/Zakk-Wylde-Ozzy-Osbourne.jpg?w=1200&h=0&zc=1&s=0&a=t&q=89",
    bio: "Zakk Wylde is the guitarist and singer of Black Label Society.",
  },
];

export default Lore;
