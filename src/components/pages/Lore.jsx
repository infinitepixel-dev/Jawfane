import { useState } from "react"
import { gsap } from "gsap"
import "../../css/lore.css"

const people = [
  {
    name: "Cory Pack",
    photo: "public/images/cory.jpg",
    bio: `It's like it's always been this way, since the breaking of the first string, I have sought the greatest riffs and nastiest tones. One amp and one guitar to rule them all.
    
    Formally trained classical composer, self-taught metal head, I found my safe place as a teenager and young adult in small DIY venues full of angry music and open-minded people. It was here the forge was first built...`,
  },
  {
    name: "Chase Schumann",
    photo: "public/images/chase.jpg",
    bio: `Chase Schumann: is a failed Eldrich Horror. He may look scary, he may even sound scary at times. but the only thing he's scaring is his bandmates when he can't find his vape.This Eldrich Horror hides deep in the catacombs of bass frequencies. He's the distortion in bass amps and he's the reason why Sailor Jerry's  rum tastes the way it does. 

    Zach and Cory found him one day whilst trying to create the brown note, instead of Sh***ing themselves he appeared and never left. Thus creating the chaos that loves gummy candy and filthy breakdowns, and has an unquenchable thirst for mosh pits. 
    
    With his talents and the help from his new friends jawfane would take over the static in every speaker in the known universe.`,
  },
  {
    name: "Austin Heipp",
    photo: "public/images/austin.jpg",
    bio: `It's without thought some things should be done. Defense of the our  youngest and smallest should be a reflex, not a debate. 

    I may be the loudest, but it's only through pain that you learn to be the softest. 

    Self-taught vocalist, I care not remember my younger years, only the songs that got me through them. It's with those feelings, i replace training, and invoke pure, unfiltered, emotion. It's with those feelings I replace doubt, with certainty, certain that the reflex to defend the indefensible the ones to yet have a voice, is the reflex that I so desired. 

    I am the reckoning. The shield against what was done to me. 

    I am someone who would have protected me when I was younger. 

    Across the distance Frodo and sam journeyed I have been, and same as them I saw many tragedies. But like Frodo carrying the burden of the age, I spoke to the ones hurt me like me and through them I was able to cast the nagging, unending voice of defeat into the fire. 

    “I carry my shield not for me alone, I carry it for the sake of everyone like me and those who not yet know the strength of their position” 

    -The Shield Sage Austin`,
  },
  {
    name: "Jesse Marquez",
    photo: "public/images/jesse.jpg",
    bio: `On a bleak, frozen morning, the wind twists and turns with a cruel sort of purpose. It’s carving someone out of the air, out of the frost. Jesse. He’s there. Or is he the wind itself? You can’t tell, can you? Maybe the world’s folding in on itself, shaping him from coincidence. Maybe synchronicity bends to him. Or perhaps it’s the world itself bending to his will, conforming to his quiet presence. He doesn’t know—no one ever really does.

    There's something deeper. He was born with it, wasn't he? That feeling. That strange, gnawing pull from the depths. But purpose? No. Never. While others are pulled toward something—an irresistible gravity—Jesse stands still. A murmur he couldn't understand at first. No grand meaning. No cause. No voice calling him to something larger, like it does for others. He's never had that. No inner drumbeat driving him forward. He just… is.

    Yet, time has a way of whispering truths. It carries meaning on icy gusts, whether you want to hear it or not. The wind, Jesse—it's the same. Shivers. They drive him, move him. Volition keeps him stitched together, a fragile thing standing tall against the gales.

    Purpose? It's a myth. Or maybe a lie, a cruel gift wrapped in ice and blown in on the same howling wind that brought him here.  He's always wondered where that lack of calling would take him. But look at him. Still standing. Still going. He may not know what he's after, but stopping isn't an option. 

    Obstacles rise, as they always do. Barriers, broken dreams, a thick fog of confusion and pain. Peace is a distant shore, but the idea of surrender? It's never crossed his mind. No, surrender is a luxury others can afford. Jesse? He can only move forward. Through the wreckage, through the cold, forward. Shivers. It pushes, nudges, chills him to the core. Deep in the marrow, they drive him. His body—this brittle temple—is held together by the unbreakable thread of Volition that pushes him to break through to the heavens. Holding him together, a fragile thing standing tall against the gales. 

    As the wind picks up, as the cold deepens…the question lingers, hangs heavy in the air, whispered in the rustling leaves:

    “In dark times, should the stars also go out?”`,
  },
  {
    name: "AJ",
    photo: "public/images/aj.jpg",
    bio: "Cathy is a musician and songwriter who enjoys experimenting with electronic sounds.",
  },
]

const Lore = () => {
  const [flipped, setFlipped] = useState(null)

  const handleFlip = (index) => {
    const isFlipped = flipped === index ? null : index
    setFlipped(isFlipped)

    const card = document.getElementById(`card-${index}`)
    if (card) {
      gsap.to(card, {
        rotationY: isFlipped === null ? 0 : 180,
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
            className="relative w-[400px] h-[600px] perspective cursor-pointer"
            onClick={() => handleFlip(index)}
          >
            <div
              className={`absolute inset-0 transform-style-3d ${
                flipped === index ? "flipped" : ""
              }`}
            >
              {/* Front Face */}
              <div className="absolute z-10 flex flex-col w-full h-full border-4 border-transparent border-custom backface-hidden rounded-xl">
                <div className="w-full h-[70%] bg-cover rounded-t-lg">
                  <img
                    src={person.photo}
                    alt={person.name}
                    className="object-cover w-full h-full rounded-t-lg"
                  />
                </div>
                <div className="py-4 text-2xl font-bold text-center text-black bg-gradient-to-b from-sky-500 to-sky-600">
                  {person.name}
                </div>
              </div>
              {/* Back Face */}
              <div className="absolute z-0 flex items-center justify-center w-full h-full p-6 text-lg text-gray-800 bg-gray-200 shadow-lg backface-hidden rounded-xl rotateY-180">
                <p className="text-base">{person.bio}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Lore
