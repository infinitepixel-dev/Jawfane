import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Lore() {
  const panels = useRef([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    panels.current.forEach((panel, index) => {
      ScrollTrigger.create({
        trigger: panel,
        start: "top top",
        end: "bottom bottom",
        onEnter: () => setActiveIndex(index),
        onLeaveBack: () => setActiveIndex(null),
        snap: {
          snapTo: 1, // Snap to the nearest panel
          duration: 0.5,
          ease: "power2.inOut",
        },
        markers: false,
      });
    });

    // Handle the last panel specifically
    ScrollTrigger.create({
      trigger: panels.current[panels.current.length - 1],
      start: "top top",
      end: "bottom+=100% bottom", // Extend the end value to prevent bouncing
      onEnter: () => setActiveIndex(panels.current.length - 1),
      onLeaveBack: () => setActiveIndex(null),
      snap: false, // Disable snapping for the last panel
    });
  }, []);

  const handleClick = (index) => {
    const panel = panels.current[index];
    const bio = panel.querySelector(".bio");
    const image = panel.querySelector(".bg-image");

    if (activeIndex === index) {
      setActiveIndex(null);
      gsap.to(panel, {
        flex: 1,
        ease: "power2.inOut",
        duration: 0.5,
      });
      gsap.to(image, {
        scale: 1,
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
      if (activeIndex !== null) {
        const prevPanel = panels.current[activeIndex];
        const prevBio = prevPanel.querySelector(".bio");
        const prevImage = prevPanel.querySelector(".bg-image");
        gsap.to(prevPanel, {
          flex: 1,
          ease: "power2.inOut",
          duration: 0.5,
        });
        gsap.to(prevImage, {
          scale: 1,
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
      gsap.to(panel, {
        flex: 5,
        ease: "power2.inOut",
        duration: 0.5,
      });
      gsap.to(image, {
        scale: 1.3,
        y: -50,
        transformOrigin: "center top",
        duration: 0.5,
        ease: "power2.inOut",
      });
      bio.style.display = "block";
      gsap.fromTo(
        bio,
        { height: 0, opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          duration: 0.5,
          ease: "power2.inOut",
        }
      );
    }
  };

  const handleMouseEnter = (index) => {
    if (activeIndex !== index) {
      gsap.to(panels.current[index].querySelector(".bg-image"), {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.inOut",
      });
      gsap.to(panels.current[index], {
        flex: 2,
        ease: "power2.inOut",
        duration: 0.3,
      });
    }
  };

  const handleMouseLeave = (index) => {
    if (activeIndex !== index) {
      gsap.to(panels.current[index].querySelector(".bg-image"), {
        scale: 1,
        duration: 0.3,
        ease: "power2.inOut",
      });
      gsap.to(panels.current[index], {
        flex: 1,
        ease: "power2.inOut",
        duration: 0.3,
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
          className="flex-1 flex flex-col justify-center items-center bg-center bg-cover text-center relative transition-all duration-500 ease-in-out w-full h-full cursor-pointer overflow-hidden"
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
            style={{ backgroundImage: `url(${band.imageUrl})` }}
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
  );
}

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
