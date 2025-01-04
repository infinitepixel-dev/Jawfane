import { useState } from "react"
import { gsap } from "gsap"
import "../../css/lore.css"

const people = [
  {
    name: "Cory Pack",
    photo: "public/images/cory.jpg",
    bio: `Since the breaking of the first string, I’ve sought the nastiest tones and the greatest riffs—one amp, one guitar to rule them all.

Trained as a classical composer but self-taught as a metalhead, I found my sanctuary in small DIY venues filled with angry music and open-hearted people. It was there the forge was built. Stories of betrayal, love, hurt, and forgiveness fused into a single note—the only note I’ve ever needed.

The note of acceptance, the ring of chosen family, the fellowship of healing—it’s never been about the end of the journey, but the people and moments along the way. The audience lights their own fires alongside us, transforming fleeting notes into priceless memories of triumph and defeat.

The fire never surrenders—it only rests. From the forge comes transformation, for no sword was ever made without taking a beating.

The Eternal Riffsmith
Cory`,
  },
  {
    name: "Chase Schumann",
    photo: "public/images/chase.jpg",
    bio: `Chase Schumann: is a failed Eldrich Horror. He may look scary, he may even sound scary at times. but the only thing he's scaring is his bandmates when he can't find his vape.This Eldrich Horror hides deep in the catacombs of bass frequencies. He's the distortion in bass amps and he's the reason why Sailor Jerry's  rum tastes the way it does. 

    Cory found him one day whilst trying to create the brown note, instead of Sh***ing themselves he appeared and never left. Thus creating the chaos that loves gummy candy and filthy breakdowns, and has an unquenchable thirst for mosh pits. 
    
    With his talents and the help from his new friends jawfane would take over the static in every speaker in the known universe.`,
  },
  {
    name: "Austin Heipp",
    photo: "public/images/austin.jpg",
    bio: `Defending the youngest and smallest isn’t a choice—it’s instinct.

I may be the loudest, but only pain teaches you to be the softest. A self-taught vocalist, I don’t dwell on my younger years; I remember only the songs that carried me through them. From those feelings, I summon raw emotion, replacing doubt with certainty—the reflex to protect those without a voice, the instinct I once wished for myself.

I am the reckoning. The shield I needed when I was younger.

Like Frodo’s journey, I’ve traveled far and witnessed tragedy. But through speaking to those like me, I’ve cast the voice of defeat into the fire.

"I carry my shield not for myself, but for everyone like me—and those who don’t yet know the strength they hold."

-The Shield Sage,
Austin`,
  },
  {
    name: "Jesse Marquez",
    photo: "public/images/jesse.jpg",
    bio: `On a frozen morning, the wind twists with cruel purpose, carving Jesse from the frost—or is he the wind itself? Maybe the world bends to him, shaping him from coincidence. He doesn't know—no one ever really does.

There's something deeper, though. A gnawing pull, but no clear purpose. While others move with gravity’s call, Jesse stands still, unmoved by a greater meaning. He just... is.

Time whispers its truths, carried on icy gusts. The wind, like Jesse, shivers and pushes forward, holding him together. Fragile, yet unyielding. Surrender has never crossed his mind; it’s not an option.

Obstacles rise—broken dreams and thick fog—but Jesse moves through them, driven by a quiet volition. The cold deepens, the wind howls, yet he endures. As the gale sharpens, one question lingers in the rustling leaves:

"In dark times, should the stars also go out?"`,
  },
  {
    name: "AJ",
    photo: "public/images/aj.jpg",
    bio: `Rhythm is life, and I’ve always been its pulse.

Before I could walk, I was drumming—hands on tables, feet on floors, finding the beat in the chaos. The world has always made sense to me in patterns: a crash here, a thud there, and the silence that lingers just long enough to give meaning to the next sound.

I don’t play to be heard; I play to connect. Drumming isn’t about showing off—it's about holding everything together when it feels like it might fall apart. It’s the steady march forward, the rallying cry, the heartbeat of something greater.

Every strike of the drum is a conversation—with the music, the audience, and the fire within. And when the rhythm locks in, when the energy flows through the room and everyone feels it—that’s when I know I’m exactly where I need to be.

"Some people hear the rhythm; others live it. I’m just here to remind you it’s been in you all along."

-The Beatkeeper,
AJ`,
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
        duration: 0.5,
        ease: "power1.inOut",
      })
    }
  }

  return (
    <div className="flex items-center justify-center w-full pt-8 overflow-hidden">
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
              <div className="absolute z-10 flex flex-col w-full h-full border-4 border-transparent bgCard cardBorder border-custom backface-hidden rounded-xl">
                <div className="w-full h-[33em] bg-cover rounded-t-xl">
                  <img
                    src={person.photo}
                    alt={person.name}
                    className="object-cover w-full h-full rounded-t-xl"
                  />
                </div>
                <div className="py-4 text-2xl font-bold text-center bg-center bg-cover text-slate-200 bg-gradient-to-b from-sky-500 to-sky-600">
                  {person.name}
                </div>
              </div>
              {/* Back Face */}
              <div className="absolute z-0 w-full h-full p-6 overflow-y-auto text-lg text-gray-800 bg-gray-200 shadow-lg backface-hidden rotateY-180 rounded-xl">
                <div className="back-content">
                  <p className="text-base">{person.bio}</p>
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
