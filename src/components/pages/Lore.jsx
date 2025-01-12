import { useState } from "react"
import { gsap } from "gsap"
import "../../css/lore.css"

const people = [
  {
    name: "Cory Pack",
    photo: "public/images/cory.jpg",
    bio: `It’s like it’s always been this way, since the breaking of the first string, I have sought the greatest riffs and nastiest tones. One amp and one guitar to rule them all.
    
    Formally trained classical composer, self taught metal head, I found my safe place as a teenager and young adult in small diy venues full of angry music and open minded people. It was here the forge was first built. 

    It was here, the stories of betrayal, love, hurt, and forgiveness all ran together into a single note and since last I care remember, it is the only note I have ever needed.

    The note of acceptance, the ring of chosen family, the fellowship of healing: I admire them all.

    Truly it would be easy to say that this is the only path I could have chosen, but there are many paths, and many forges, many rings, and many songs. I never considered the end of the path, there is no destination with which me and my fine fellows would be content. I search not for the gold at the end of the rainbow.

    It is the journey and the people we choose to go with that is gold, it is the people in the audience who, have their own forge and light their fire with us.

    And together as the metal is made into priceless memories of triumph and defeat. 

    I stand in awe of you and what we are when you burn for the things you love.

    “The fire doesn’t surrender it only rests. 
    Yet from the forge comes transformation.
    And no sword was ever made without getting the shit beat out it.”

    The Eternal Riffsmith- Cory`,
  },
  {
    name: "Chase Schumann",
    photo: "public/images/chase.jpg",
    bio: `Chase Schumann: is a failed Eldrich Horror. He may look scary, he may even sound scary at times, but the only thing he's scaring is his bandmates when he can't find his vape. This Eldrich Horror hides deep in the catacombs of bass frequencies. He's the distortion in bass amps and he's the reason why Sailor Jerry's rum tastes the way it does.

    Zach and Cory found him one day whilst trying to create the brown note. Instead of sh***ing themselves, he appeared and never left. Thus creating the chaos that loves gummy candy and filthy breakdowns, and has an unquenchable thirst for mosh pits.

    With his talents and the help from his new friends, Jawfane would take over the static in every speaker in the known universe.`,
  },
  {
    name: "Austin Heipp",
    photo: "public/images/austin.jpg",
    bio: `It's without thought some things should be done. Defense of the youngest and smallest should be a reflex, not a debate.

    I may be the loudest, but it's only through pain that you learn to be the softest.

    Self-taught vocalist, I care not to remember my younger years, only the songs that got me through them. It's with those feelings I replace training and invoke pure, unfiltered emotion. It's with those feelings I replace doubt with certainty—certain that the reflex to defend the indefensible, the ones who have yet to have a voice, is the reflex that I so desired.

    I am the reckoning. The shield against what was done to me.

    I am someone who would have protected me when I was younger.

    Across the distance Frodo and Sam journeyed, I have been, and same as them I saw many tragedies. But like Frodo carrying the burden of the age, I spoke to the ones who hurt me like me and through them, I was able to cast the nagging, unending voice of defeat into the fire.

    “I carry my shield not for me alone; I carry it for the sake of everyone like me and those who do not yet know the strength of their position.”

    - The Shield Sage Austin`,
  },
  {
    name: "Jesse Marquez",
    photo: "public/images/jesse.jpg",
    bio: `On a bleak, frozen morning, the wind twists and turns with a cruel sort of purpose. It’s carving someone out of the air, out of the frost. Jesse. He’s there. Or is he the wind itself? You can’t tell, can you? Maybe the world’s folding in on itself, shaping him from coincidence. Maybe synchronicity bends to him. Or perhaps it’s the world itself bending to his will, conforming to his quiet presence. He doesn’t know—no one ever really does.

    There's something deeper. He was born with it, wasn't he? That feeling. That strange, gnawing pull from the depths. But purpose? No. Never. While others are pulled toward something—an irresistible gravity—Jesse stands still. A murmur he couldn't understand at first. No grand meaning. No cause. No voice calling him to something larger, like it does for others. He's never had that. No inner drumbeat driving him forward. He just… is.

    Yet, time has a way of whispering truths. It carries meaning on icy gusts, whether you want to hear it or not. The wind, Jesse—it's the same. Shivers. They drive him, move him. Volition keeps him stitched together, a fragile thing standing tall against the gales.

    Purpose? It's a myth. Or maybe a lie, a cruel gift wrapped in ice and blown in on the same howling wind that brought him here. He's always wondered where that lack of calling would take him. But look at him. Still standing. Still going. He may not know what he's after, but stopping isn't an option.

    Obstacles rise, as they always do. Barriers, broken dreams, a thick fog of confusion and pain. Peace is a distant shore, but the idea of surrender? It's never crossed his mind. No, surrender is a luxury others can afford. Jesse? He can only move forward. Through the wreckage, through the cold, forward. Shivers. It pushes, nudges, chills him to the core. Deep in the marrow, they drive him. His body—this brittle temple—is held together by the unbreakable thread of Volition that pushes him to break through to the heavens. Holding him together, a fragile thing standing tall against the gales.

    As the wind picks up, as the cold deepens…the question lingers, hangs heavy in the air, whispered in the rustling leaves:

    “In dark times, should the stars also go out?”`,
  },
  {
    name: "AJ",
    photo: "public/images/aj.jpg",
    bio: `AJ’s world is rhythm, and rhythm is survival. From the first time he picked up a pair of sticks, it wasn’t about music—it was about channeling energy, emotion, and chaos into something tangible. To the band the drums became anchor, their weapon, their voice when words wouldn’t come.

    AJ doesn’t just play; he commands. Each beat is an assertion, a declaration of existence. Drumming isn’t just keeping time, It’s carving out space where there wasn’t any, staking a claim in the silence and refusing to back down.

    To AJ, the kit is a battlefield. The snare cracks like defiance; the kick drum resonates like a heartbeat. Every strike is deliberate, every pattern a message. He’s not here to impress anyone—He's here to make you feel. Onstage, the drums are a relentless pulse, a force of nature that refuses to let the crowd sit still. The drums aren’t just an instrument; they’re a lifeline, a declaration that even in chaos, there is order to be found.

    'For me, every beat is a reckoning, A chance to turn raw emotion into something powerful. I’m not just playing for myself—I’m playing for anyone who’s ever felt like their voice wasn’t loud enough. Because trust me, it can be.'`,
  },
]

const Lore = () => {
  const [flipped, setFlipped] = useState(null)

  const handleFlip = (index) => {
    if (flipped === index) {
      // Flip back
      setFlipped(null)
      animateFlip(index, 0)
    } else {
      // Flip new card
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

  return (
    <div className="flex items-center justify-center w-full p-6 overflow-hidden">
      <div className="flex flex-wrap justify-center w-full gap-8">
        {people.map((person, index) => (
          <div
            key={index}
            id={`card-${index}`}
            className={`relative w-[400px] h-[600px] perspective cursor-pointer`}
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
