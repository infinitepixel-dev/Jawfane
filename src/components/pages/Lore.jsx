//Lore.jsx

/*
A component that displays information about the band members
*/

//INFO React Libraries
import { useRef, useState, useEffect } from "react"

//INFO Animation Libraries
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function Lore() {
  const panels = useRef([])
  const [activeIndex, setActiveIndex] = useState(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

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

      gsap.set(image, {
        x: `${position.x}px`,
        y: `${position.y}px`,
        scale: 1.1,
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
      gsap.to(image, {
        scale: 1,
        x: 0,
        y: 0,
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
          x: 0,
          y: 0,
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

      gsap.to(image, {
        scale: 1.3,
        x: `${parseFloat(position.x)}px`,
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
          height: isMobile ? "20%" : "35%",
          opacity: 1,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            startScrolling(bio)
          },
        }
      )
    }
  }

  const startScrolling = (bio) => {
    const scrollHeight = bio.scrollHeight - bio.clientHeight
    if (scrollHeight > 0) {
      gsap.to(bio, {
        scrollTo: { y: scrollHeight },
        //based duration on scrollHeight to make it consistent
        duration: scrollHeight * 0.05,
        ease: "none",
        delay: 2,
        repeat: -1,
        repeatDelay: 3,
      })

      //on repeat fade the text back to the beginning
      ScrollTrigger.create({
        trigger: bio,
        start: "top bottom",
        onEnter: () => {
          gsap.to(bio, {
            y: 0,
            duration: 0.5,
            ease: "power2.inOut",
          })
        },
      })
    }
  }

  const handleMouseEnter = (index) => {
    if (activeIndex !== index) {
      gsap.to(panels.current[index].querySelector(".bg-image"), {
        scale: 1.1,
        duration: 0.15,
        ease: "power2.inOut",
      })
    }
  }

  const handleMouseLeave = (index) => {
    if (activeIndex !== index) {
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
            flexGrow: activeIndex === index ? 2 : 0.5, // Shrinks inactive cards
            transition: "flex-grow 0.5s ease",
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
            className="relative z-10 w-full p-6 text-lg text-center text-white bg-black rounded-lg bio bg-opacity-90 md:text-xl"
            style={{
              display: "none",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* <p>{band.bio}</p> */}
            {band.bio.split("\n").map((paragraph, idx) => (
              <p key={idx} className="mb-4">
                {paragraph}
              </p>
            ))}
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
    bio: "It's like it's always been this way, since the breaking of the first string, I have sought the greatest riffs and nastiest tones. One amp and one guitar to rule them all. \n\nFormally trained classical composer, self taught metal head, I found my safe place as a teenager and young adult in small diy venues full of angry music and open minded people. It was here the forge was first built. It was here, the stories of betrayal, love, hurt, and forgiveness all ran together into a single note and since last I care remember, it is the only note I have ever needed. \n\nThe note of acceptance, the ring of chosen family, the fellowship of healing: I admire them all. \n\nTruly it would be easy to say that this is the only path I could have chosen, but there are many paths, and many forges, many rings, and many songs. I never considered the end of the path, there is no destination with which me and my fine fellows would be content. I search not for the gold at the end of the rainbow. \n\nIt is the journey and the people we choose to go with that is gold, it is the people in the audience who, have their own forge and light their fire with us. \n\nAnd together as the metal is made into priceless memories of triumph and defeat. I stand in awe of you and what we are when you burn for the things you love. \n\n“The fire doesn't surrender it only rests. Yet from the forge comes transformation. And no sword was ever made without getting the shit beat out of it.” \n\nThe Eternal Riffsmith- Cory",
    position: {
      flip: false,
      mobile: { x: "0", y: "0" },
      desktop: { x: "0", y: "0" },
    },
  },
  {
    member: "Chase Schumann",
    imageUrl: "images/chase-schumann.jpg",
    bio: `Chase Schumann: is a failed Eldrich Horror. He may look scary, he may even sound scary at times. but the only thing he's scaring is his bandmates when he can't find his vape.This Eldrich Horror hides deep in the catacombs of bass frequencies. He's the distortion in bass amps and he's the reason why Sailor Jerry's  rum tastes the way it does. 

Zach and Cory found him one day whilst trying to create the brown note, instead of Sh***ing themselves he appeared and never left. Thus creating the chaos that loves gummy candy and filthy breakdowns, and has an unquenchable thirst for mosh pits. 

With his talents and the help from his new friends jawfane would take over the static in every speaker in the known universe.`,
    position: {
      flip: false,
      mobile: { x: "0", y: "0" },
      desktop: { x: "0", y: "0" },
    },
  },
  {
    member: "Austin Heipp",
    imageUrl: "images/austin-heipp.jpg",
    bio: `It's without thought some things should be done. Defense of the our  youngest and smallest should be a reflex, not a debate. 

I may be the loudest, but it's only through pain that you learn to be the softest. 

Self-taught vocalist, I care not remember my younger years, only the songs that got me through them. It's with those feelings, i replace training, and invoke pure, unfiltered, emotion. It's with those feelings I replace doubt, with certainty, certain that the reflex to defend the indefensible the ones to yet have a voice, is the reflex that I so desired. 

I am the reckoning. The shield against what was done to me. 

I am someone who would have protected me when I was younger. 

Across the distance Frodo and sam journeyed I have been, and same as them I saw many tragedies. But like Frodo carrying the burden of the age, I spoke to the ones hurt me like me and through them I was able to cast the nagging, unending voice of defeat into the fire. 

“I carry my shield not for me alone, I carry it for the sake of everyone like me and those who not yet know the strength of their position” 

-The Shield Sage Austin`,
    position: {
      flip: true,
      mobile: { x: "0", y: "0" },
      desktop: { x: "0", y: "0" },
    },
  },
  {
    member: "AJ",
    imageUrl: "images/aj.jpg",
    bio: `We often live our lives wondering what if you stuck with that job, what if you ever moved to that new city, or the endless possibilities that weigh heavy on us at times. 

Mine is “what if you kept playing drums in a band no matter if it amounted to anything or not?”

Ever since I was really young, I've had the passion of playing music to some degree. Whether that be in a band, or just writing something that will never see the light of day in my bedroom. 

For most of my life, music has been my connection to the world and the people that I share my existence with. And for the longest time I've shared the stage with many musicians but the group that stayed through the toughest parts of my personal life is the brothers I have in Jawfane. 

With every step forward we make, more doors and more opportunities are brought to light and I cannot express enough how humbling and how grateful I am for every opportunity given in the vein of my music endeavors. 

Thank you for listening.`,
    position: {
      flip: false,
      mobile: { x: "0", y: "0" },
      desktop: { x: "0", y: "0" },
    },
  },
  {
    member: "Jesse Marquez",
    imageUrl: "images/jesse-marquez.jpg",
    bio: `On a bleak, frozen morning, the wind twists and turns with a cruel sort of purpose. It’s carving someone out of the air, out of the frost. Jesse. He’s there. Or is he the wind itself? You can’t tell, can you? Maybe the world’s folding in on itself, shaping him from coincidence. Maybe synchronicity bends to him. Or perhaps it’s the world itself bending to his will, conforming to his quiet presence. He doesn’t know—no one ever really does.

 There's something deeper. He was born with it, wasn't he? That feeling. That strange, gnawing pull from the depths. But purpose? No. Never. While others are pulled toward something—an irresistible gravity—Jesse stands still. A murmur he couldn't understand at first. No grand meaning. No cause. No voice calling him to something larger, like it does for others. He's never had that. No inner drumbeat driving him forward. He just… is.

Yet, time has a way of whispering truths. It carries meaning on icy gusts, whether you want to hear it or not. The wind, Jesse—it's the same. Shivers. They drive him, move him. Volition keeps him stitched together, a fragile thing standing tall against the gales.

Purpose? It's a myth. Or maybe a lie, a cruel gift wrapped in ice and blown in on the same howling wind that brought him here.  He's always wondered where that lack of calling would take him. But look at him. Still standing. Still going. He may not know what he's after, but stopping isn't an option. 

Obstacles rise, as they always do. Barriers, broken dreams, a thick fog of confusion and pain. Peace is a distant shore, but the idea of surrender? It's never crossed his mind. No, surrender is a luxury others can afford. Jesse? He can only move forward. Through the wreckage, through the cold, forward. Shivers. It pushes, nudges, chills him to the core. Deep in the marrow, they drive him. His body—this brittle temple—is held together by the unbreakable thread of Volition that pushes him to break through to the heavens. Holding him together, a fragile thing standing tall against the gales. 

As the wind picks up, as the cold deepens…the question lingers, hangs heavy in the air, whispered in the rustling leaves:

“In dark times, should the stars also go out?”`,
    position: {
      flip: false,
      mobile: { x: "0", y: "0" },
      desktop: { x: "0", y: "0" },
    },
  },
]

export default Lore
