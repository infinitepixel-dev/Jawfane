import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import "../../css/lore.css"
import cory from "/images/cory.jpg"
import chase from "/images/chase.jpg"
import aj from "/images/aj.jpg"
import jesse from "/images/jesse.jpg"

const people = [
  {
    name: "Cory Pack",
    photo: cory,
    bio: `It's like it's always been this way, since the breaking of the first string, I have sought the greatest riffs and nastiest tones. One amp and one guitar to rule them all. \n\nFormally trained classical composer, self taught metal head, I found my safe place as a teenager and young adult in small diy venues full of angry music and open minded people. It was here the forge was first built. It was here, the stories of betrayal, love, hurt, and forgiveness all ran together into a single note and since last I care remember, it is the only note I have ever needed. \n\nThe note of acceptance, the ring of chosen family, the fellowship of healing: I admire them all. \n\nTruly it would be easy to say that this is the only path I could have chosen, but there are many paths, and many forges, many rings, and many songs. I never considered the end of the path, there is no destination with which me and my fine fellows would be content. I search not for the gold at the end of the rainbow. \n\nIt is the journey and the people we choose to go with that is gold, it is the people in the audience who, have their own forge and light their fire with us. \n\nAnd together as the metal is made into priceless memories of triumph and defeat. I stand in awe of you and what we are when you burn for the things you love. \n\n“The fire doesn't surrender it only rests. Yet from the forge comes transformation. And no sword was ever made without getting the shit beat out of it.” \n\nThe Eternal Riffsmith- Cory`,
  },
  {
    name: "Chase Schumann",
    photo: chase,
    bio: `Chase Schumann: is a failed Eldrich Horror. He may look scary, he may even sound scary at times. but the only thing he's scaring is his bandmates when he can't find his vape.This Eldrich Horror hides deep in the catacombs of bass frequencies. He's the distortion in bass amps and he's the reason why Sailor Jerry's rum tastes the way it does. 

Cory found him one day whilst trying to create the brown note, instead of Sh***ing themselves he appeared and never left. Thus creating the chaos that loves gummy candy and filthy breakdowns, and has an unquenchable thirst for mosh pits. 

With his talents and the help from his new friends Jawfane would take over the static in every speaker in the known universe.`,
  },

  {
    name: "Jesse Marquez",
    photo: jesse,
    bio: `On a bleak, frozen morning, the wind twists and turns with a cruel sort of purpose. It’s carving someone out of the air, out of the frost. Jesse. He’s there. Or is he the wind itself? You can’t tell, can you? Maybe the world’s folding in on itself, shaping him from coincidence. Maybe synchronicity bends to him. Or perhaps it’s the world itself bending to his will, conforming to his quiet presence. He doesn’t know—no one ever really does.

There's something deeper. He was born with it, wasn't he? That feeling. That strange, gnawing pull from the depths. But purpose? No. Never. While others are pulled toward something—an irresistible gravity—Jesse stands still. A murmur he couldn't understand at first. No grand meaning. No cause. No voice calling him to something larger, like it does for others. He's never had that. No inner drumbeat driving him forward. He just… is.

Yet, time has a way of whispering truths. It carries meaning on icy gusts, whether you want to hear it or not. The wind, Jesse—it's the same. Shivers. They drive him, move him. Volition keeps him stitched together, a fragile thing standing tall against the gales.

Purpose? It's a myth. Or maybe a lie, a cruel gift wrapped in ice and blown in on the same howling wind that brought him here. He's always wondered where that lack of calling would take him. But look at him. Still standing. Still going. He may not know what he's after, but stopping isn't an option. 

Obstacles rise, as they always do. Barriers, broken dreams, a thick fog of confusion and pain. Peace is a distant shore, but the idea of surrender? It's never crossed his mind. No, surrender is a luxury others can afford. Jesse? He can only move forward. Through the wreckage, through the cold, forward. Shivers. It pushes, nudges, chills him to the core. Deep in the marrow, they drive him. His body—this brittle temple—is held together by the unbreakable thread of Volition that pushes him to break through to the heavens. Holding him together, a fragile thing standing tall against the gales. 

As the wind picks up, as the cold deepens…the question lingers, hangs heavy in the air, whispered in the rustling leaves:

“In dark times, should the stars also go out?”`,
  },
  {
    name: "AJ Chacon",
    photo: aj,
    bio: `We often live our lives wondering what if you stuck with that job, what if you ever moved to that new city, or the endless possibilities that weigh heavy on us at times. 

Mine is “what if you kept playing drums in a band no matter if it amounted to anything or not?”

Ever since I was really young, I've had the passion of playing music to some degree. Whether that be in a band, or just writing something that will never see the light of day in my bedroom. 

For most of my life, music has been my connection to the world and the people that I share my existence with. And for the longest time I've shared the stage with many musicians but the group that stayed through the toughest parts of my personal life is the brothers I have in Jawfane. 

With every step forward we make, more doors and more opportunities are brought to light and I cannot express enough how humbling and how grateful I am for every opportunity given in the vein of my music endeavors. 

Thank you for listening.`,
  },
]

const Lore = () => {
  const [flipped, setFlipped] = useState(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.dataset.index
            animateCardIn(index)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
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
      if (flipped !== null) {
        animateFlip(flipped, 0)
      }
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
    <div
      className="flex justify-center items-center bg-gradient-to-t from-black to-neutral-900 p-4 sm:px-6 md:px-6 w-full overflow-y-auto"
      id="lore"
    >
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-6 w-full">
        {people.map((person, index) => (
          <div
            key={index}
            id={`card-${index}`}
            data-index={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="relative flex flex-col m-2 mx-auto w-full sm:w-full md:max-w-[350px] h-[600px] overflow-y-auto cursor-pointer perspective"
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
              <div className="absolute flex flex-col border-4 border-transparent rounded-xl w-full h-full backface-hidden">
                <div className="bg-cover rounded-t-lg w-full h-[80%]">
                  <img
                    src={person.photo}
                    alt={`${person.name}'s photo`}
                    className="rounded-t-lg w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-center items-center bg-gradient-to-b from-sky-500 to-sky-600 rounded-b-lg h-[20%] font-bold text-black text-2xl text-center">
                  {person.name}
                </div>
              </div>
              {/* Back Face */}
              <div className="absolute flex justify-center items-center bg-gray-200 shadow-lg p-6 rounded-xl w-full h-full text-gray-800 text-lg backface-hidden rotateY-180">
                <div className="max-h-full back-content">
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
