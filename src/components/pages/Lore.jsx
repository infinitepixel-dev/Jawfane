//Lore.jsx

/*
A component that displays information about the band members
*/

import { useRef, useState, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function Lore() {
  const panels = useRef([])
  const [activeIndex, setActiveIndex] = useState(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  // Listen for screen resize to determine mobile or desktop layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    panels.current.forEach((panel, index) => {
      const image = panel.querySelector(".bg-image")
      const position = isMobile
        ? bandData[index].position.mobile
        : bandData[index].position.desktop

      // Set the initial position using `x` and `y` for pixel-based movement
      gsap.set(image, {
        x: `${position.x}px`, // Use pixels instead of percentage
        y: `${position.y}px`, // Use pixels instead of percentage
        scale: 1.1, // Slightly scale the image to allow room for movement
        transformOrigin: "center top",
      })
    })
  }, [isMobile])

  const handleClick = (index) => {
    const panel = panels.current[index]
    const bio = panel.querySelector(".bio")
    const image = panel.querySelector(".bg-image")

    if (activeIndex === index) {
      setActiveIndex(null)
      // Keep the panel static, only animate the image
      gsap.to(image, {
        scale: 1,
        x: 0, // Reset x position
        y: 0, // Reset y position
        duration: 0.5,
        ease: "power2.inOut",
      })
      gsap.to(bio, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => (bio.style.display = "none"),
      })
    } else {
      if (activeIndex !== null) {
        const prevPanel = panels.current[activeIndex]
        const prevBio = prevPanel.querySelector(".bio")
        const prevImage = prevPanel.querySelector(".bg-image")
        gsap.to(prevImage, {
          scale: 1,
          x: 0, // Reset x position
          y: 0, // Reset y position
          duration: 0.5,
          ease: "power2.inOut",
        })
        gsap.to(prevBio, {
          height: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => (prevBio.style.display = "none"),
        })
      }

      setActiveIndex(index)
      const position = isMobile
        ? bandData[index].position.mobile
        : bandData[index].position.desktop

      // Animate the image within the panel using pixel-based movement
      gsap.to(image, {
        scale: 1.3,
        x: `${parseFloat(position.x)}px`, // Move using pixels
        y: `${parseFloat(position.y)}px`,
        transformOrigin: "center top",
        duration: 0.5,
        ease: "power2.inOut",
      })
      bio.style.display = "block"
      gsap.fromTo(
        bio,
        { height: 0, opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          duration: 0.5,
          ease: "power2.inOut",
        }
      )
    }
  }

  const handleMouseEnter = (index) => {
    if (activeIndex !== index) {
      gsap.to(panels.current[index].querySelector(".bg-image"), {
        scale: 1.1, // Keep hover scaling
        duration: 0.15,
        ease: "power2.inOut",
      })
    }
  }

  const handleMouseLeave = (index) => {
    if (activeIndex !== index) {
      // Return the image scale to normal
      gsap.to(panels.current[index].querySelector(".bg-image"), {
        scale: 1,
        duration: 0.15,
        ease: "power2.inOut",
      })
    }
  }

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
              objectFit: "cover", // Ensure the image covers the area without distortion
              width: "100%", // Ensure it fills the panel
              height: "100%", // Keep image within panel boundaries
              overflow: "hidden", // Prevent overflow
              backgroundPosition: isMobile
                ? "center"
                : band.position.flip
                ? "right"
                : "", // Adjust background position for mirroring
              // transform: band.position.flip ? "scaleX(-1)" : "none", // Conditionally mirror the image
              // If mobile bring the images down
            }}
          ></div>
          <div className="relative z-10 flex flex-col items-center justify-center w-full p-4 bg-black bg-opacity-50">
            <p className="text-lg font-light uppercase md:text-xl text-shadow-sm">
              {band.member}
            </p>
          </div>
          <div
            className="relative z-10 w-full p-6 text-lg text-center text-white bg-black bio bg-opacity-90 md:text-xl"
            style={{ display: "none" }}
          >
            <p>{band.bio}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

const bandData = [
  {
    member: "Cory Pack",
    imageUrl: "images/cory-pack.jpg",
    bio: "Cory Pack is the guitarist for Jawfane, bringing his dynamic energy and creativity to the band's powerful sound.",
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
]

export default Lore
