import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import bandLabel from "/exsr.png"

gsap.registerPlugin(ScrollTrigger)

const AlbumArtCarousel = () => {
  const images = ["/art3.jpg", "/art1.jpg", "/art2.jpg", "/art4.jpg"]

  const [index, setIndex] = useState(0)
  const imageRef = useRef(null)
  const buttonRef = useRef(null)
  const labelRef = useRef(null)

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
            start: "top 80%", // Triggers when label is 80% in viewport
            toggleActions: "play none none reverse",
          },
        }
      )
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
    <div className="flex flex-col items-center" id="album">
      <div
        className="relative w-full max-w-lg mt-10 overflow-hidden"
        style={{ height: "600px" }}
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
        className="px-4 py-2 mt-4 text-white bg-gray-800 rounded-lg"
      >
        Next
      </button>
      <a
        href="https://www.exsrmusic.com/"
        target="_blank"
        rel="noopener noreferrer"
        ref={labelRef}
      >
        <img
          src={bandLabel}
          alt="Exitus Stratagem Records"
          className="w-6/12 mx-auto mt-20 h-25"
        />
      </a>
    </div>
  )
}

export default AlbumArtCarousel
