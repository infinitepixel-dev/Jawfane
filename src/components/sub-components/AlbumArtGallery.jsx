import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import bandLabel from "/exsr.png"

const AlbumArtCarousel = () => {
  const images = ["/album1.jpg"]
  const [index, setIndex] = useState(0)
  const imageRef = useRef(null)
  const buttonRef = useRef(null)

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length)

    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1.2,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power1.out",
      })
    }
  }

  useEffect(() => {
    const img = imageRef.current
    if (img) {
      gsap.fromTo(
        img,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" },
      )
    }
  }, [index])

  return (
    <div className="flex flex-col justify-center items-center gap-8 bg-black p-8 min-h-screen text-white">
      {/* Album Art */}
      <div className="relative w-full max-w-lg">
        <img
          ref={imageRef}
          key={images[index]}
          src={images[index]}
          alt={`Album Art ${index + 1}`}
          className="shadow-lg rounded-lg w-full object-contain"
        />
      </div>

      {/* Next Image Button */}
      {/* <button
        ref={buttonRef}
        onClick={nextImage}
        className="bg-purple-700 hover:bg-purple-800 shadow-md px-6 py-3 rounded-lg text-white transition"
      >
        Next Image
      </button> */}

      {/* Platform Availability Text */}
      <p className="mt-2 font-medium text-lg text-center">
        <strong className="text-red-600">NOW Available</strong> on all streaming
        platforms
      </p>
    </div>
  )
}

export default AlbumArtCarousel
