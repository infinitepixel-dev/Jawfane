import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

const AlbumArtCarousel = () => {
  const images = [
    "/Jawfane/art1.jpg",
    "/Jawfane/art2.jpg",
    "/Jawfane/art3.jpg",
    "/Jawfane/art4.jpg",
  ]

  const [index, setIndex] = useState(0)
  const imageRef = useRef(null)
  const buttonRef = useRef(null)

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
      if (img) gsap.killTweensOf(img) // Cleanup GSAP animations
    }
  }, [index])

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length)

    // Animate the button when clicked
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
    <div className="flex flex-col items-center">
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
          onLoad={() =>
            gsap.to(imageRef.current, { opacity: 1, scale: 1, duration: 0.3 })
          }
          style={{ opacity: 0 }} // Ensure it starts fully hidden before animation
        />
      </div>
      <button
        ref={buttonRef}
        onClick={nextImage}
        className="px-4 py-2 mt-4 text-white bg-gray-800 rounded-lg"
      >
        Next
      </button>
    </div>
  )
}

export default AlbumArtCarousel
