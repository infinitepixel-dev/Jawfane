import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import "../../css/lore.css"
import cory from "/images/cory.jpg"
import austin from "/images/austin.jpg"
import chase from "/images/chase.jpg"
import aj from "/images/aj.jpg"
import jesse from "/images/jesse.jpg"

const people = [
  {
    name: "Cory Pack",
    photo: cory,
    bio: `It’s like it’s always been this way, since the breaking of the first string...`,
  },
  {
    name: "Chase Schumann",
    photo: chase,
    bio: `Chase Schumann: is a failed Eldrich Horror...`,
  },
  {
    name: "Austin Heipp",
    photo: austin,
    bio: `It's without thought some things should be done...`,
  },
  {
    name: "Jesse Marquez",
    photo: jesse,
    bio: `On a bleak, frozen morning, the wind twists and turns...`,
  },
  {
    name: "AJ",
    photo: aj,
    bio: `AJ’s world is rhythm, and rhythm is survival...`,
  },
]

const Lore = () => {
  const [flipped, setFlipped] = useState(null)
  const cardsRef = useRef([])

  useEffect(() => {
    // Intersection Observer to trigger animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.dataset.index
            animateCardIn(index)
            observer.unobserve(entry.target) // Stop observing after animation
          }
        })
      },
      { threshold: 0.2 } // Trigger when 20% of the card is visible
    )

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  const handleFlip = (index) => {
    if (flipped === index) {
      setFlipped(null)
      animateFlip(index, 0)
    } else {
      setFlipped(index)
      animateFlip(index, 180)
    }
  }

  const animateFlip = (index, rotationY) => {
    const card = document.getElementById(`card-${index}`)
    if (card) {
      gsap.to(card, {
        rotationY,
        duration: 0.6,
        ease: "power1.inOut",
      })
    }
  }

  const animateCardIn = (index) => {
    const card = document.getElementById(`card-${index}`)
    if (card) {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power1.out" }
      )
    }
  }

  return (
    <div className="flex items-center justify-center w-full px-4 overflow-hidden sm:px-6 md:px-8">
      <div className="flex flex-wrap justify-center w-full gap-4 sm:gap-6 md:gap-8">
        {people.map((person, index) => (
          <div
            key={index}
            id={`card-${index}`}
            data-index={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className={`relative w-full sm:w-[85%] md:w-[400px] max-w-[480px] h-[600px] perspective cursor-pointer`}
            onClick={() => handleFlip(index)}
            role="button"
            aria-pressed={flipped === index}
          >
            <div
              className={`absolute inset-0 transform-style-3d ${
                flipped === index ? "flipped" : ""
              }`}
            >
              {/* Front Face */}
              <div className="absolute z-10 flex flex-col w-full h-full border-4 border-transparent backface-hidden rounded-xl">
                <div className="w-full h-[80%] bg-cover rounded-t-lg">
                  <img
                    src={person.photo}
                    alt={`${person.name}'s photo`}
                    className="object-cover w-full h-full rounded-t-lg"
                  />
                </div>
                <div className="flex items-center justify-center h-[20%] text-2xl font-bold text-center text-black bg-gradient-to-b from-sky-500 to-sky-600 rounded-b-lg">
                  {person.name}
                </div>
              </div>
              {/* Back Face */}
              <div className="absolute z-0 flex items-center justify-center w-full h-full p-6 text-lg text-gray-800 bg-gray-200 shadow-lg backface-hidden rounded-xl rotateY-180">
                <div className="back-content">
                  <p className="text-base text-center">
                    {person.bio || "Bio unavailable."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Lore
