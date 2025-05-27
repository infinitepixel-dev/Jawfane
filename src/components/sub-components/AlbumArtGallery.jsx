/*component for art preview/label image, and presave button*/

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import bandLabel from "/exsr.png"
import { FiMusic } from "react-icons/fi"

gsap.registerPlugin(ScrollTrigger)

const AlbumArtCarousel = () => {
  const images = ["/art3.jpg", "/art1.jpg", "/art2.jpg", "/art4.jpg"]

  const [index, setIndex] = useState(0)
  const imageRef = useRef(null)
  const buttonRef = useRef(null)
  const labelRef = useRef(null)
  const presaveRef = useRef(null)

  useEffect(() => {
    const img = imageRef.current

    if (img) {
      gsap.fromTo(
        img,
        { opacity: 0, scale: 1 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
      )
    }

    return () => {
      if (img) gsap.killTweensOf(img)
    }
  }, [index])

  useEffect(() => {
    const label = labelRef.current
    const presave = presaveRef.current // Corrected this line!

    // Scroll-triggered animations for label and presave button
    if (label) {
      gsap.fromTo(
        label,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: label,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }

    if (presave) {
      gsap.fromTo(
        presave,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: presave,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }

    // Hover animations for label and presave button
    if (label) {
      label.addEventListener("mouseenter", () => {
        gsap.to(label, {
          scale: 1.1,
          duration: 0.3,
          ease: "power1.out",
        })
      })
      label.addEventListener("mouseleave", () => {
        gsap.to(label, {
          scale: 1,
          duration: 0.3,
          ease: "power1.in",
        })
      })
    }

    if (presave) {
      presave.addEventListener("mouseenter", () => {
        gsap.to(presave, {
          scale: 1.1,
          duration: 0.3,
          ease: "power1.out",
        })
      })
      presave.addEventListener("mouseleave", () => {
        gsap.to(presave, {
          scale: 1,
          duration: 0.3,
          ease: "power1.in",
        })
      })
    }
  }, [])

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length)

    const button = buttonRef.current
    if (button) {
      gsap.to(button, {
        scale: 1.2,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power1.out",
      })
    }
  }

  return (
    <div
      className="items-center gap-4 grid grid-cols-6 bg-gradient-to-b from-black via-gray-950 to-slate-900 p-6 min-h-screen"
      id="album"
    >
      {/* Left side: Image Gallery */}
      <div className="flex flex-col items-center col-span-6 md:col-span-3">
        <div
          className="relative p-2 w-full max-w-lg overflow-hidden"
          style={{ height: "auto" }}
        >
          <img
            ref={imageRef}
            key={images[index]}
            src={images[index]}
            alt="Album Art"
            className="shadow-lg rounded-lg w-full h-full object-contain transition-all"
            style={{ opacity: 0 }}
          />
        </div>
        <button
          ref={buttonRef}
          onClick={nextImage}
          className="bg-purple-800 hover:bg-purple-900 shadow-lg mt-6 px-6 py-3 rounded-lg text-white transition"
        >
          Next
        </button>
      </div>

      {/* Right side: Presave Button + Label */}
      <div className="flex flex-col justify-center items-center space-y-8 col-span-6 md:col-span-3">
        <a
          href="https://hypeddit.com/jawfane/meandallmydemons"
          target="_blank"
          rel="noopener noreferrer"
          ref={presaveRef}
          className="flex justify-center items-center gap-2 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 shadow-lg hover:shadow-lg hover:shadow-purple-800 px-8 py-4 rounded-full font-extrabold text-white text-sm md:text-xl transition-shadow transition-transform duration-300"
        >
          <FiMusic size={24} />
          Pre-Save Me And All My Demons!
        </a>
        <a
          href="https://www.exsrmusic.com/"
          target="_blank"
          rel="noopener noreferrer"
          ref={labelRef}
        >
          <img
            src={bandLabel}
            alt="Exitus Stratagem Records"
            className="mx-auto p-5 w-6/12 h-25"
          />
        </a>
      </div>
    </div>
  )
}

export default AlbumArtCarousel
