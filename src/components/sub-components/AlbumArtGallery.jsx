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
      className="grid items-center min-h-screen grid-cols-6 gap-4 p-6 bg-gradient-to-br from-black to-slate-900"
      id="album"
    >
      {/* Left side: Image Gallery */}
      <div className="flex flex-col items-center col-span-6 md:col-span-3">
        <div
          className="relative w-full max-w-lg p-2 overflow-hidden"
          style={{ height: "auto" }}
        >
          <img
            ref={imageRef}
            key={images[index]}
            src={images[index]}
            alt="Album Art"
            className="object-contain w-full h-full transition-all rounded-lg shadow-lg"
            style={{ opacity: 0 }}
          />
        </div>
        <button
          ref={buttonRef}
          onClick={nextImage}
          className="px-6 py-3 mt-6 text-white transition bg-purple-800 rounded-lg shadow-lg hover:bg-purple-900"
        >
          Next
        </button>
      </div>

      {/* Right side: Presave Button + Label */}
      <div className="flex flex-col items-center justify-center col-span-6 space-y-8 md:col-span-3">
        <a
          href="https://hypeddit.com/jawfane/timehuntsusall"
          target="_blank"
          rel="noopener noreferrer"
          ref={presaveRef}
          className="flex items-center justify-center gap-2 px-8 py-4 text-sm font-extrabold text-white transition-shadow transition-transform duration-300 rounded-full shadow-lg md:text-xl bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 hover:shadow-lg hover:shadow-purple-800"
        >
          <FiMusic size={24} />
          Pre-Save Time Hunts Us All Now!
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
            className="w-6/12 p-5 mx-auto h-25"
          />
        </a>
      </div>
    </div>
  )
}

export default AlbumArtCarousel
