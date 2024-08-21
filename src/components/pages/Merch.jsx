import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
gsap.registerPlugin(ScrollToPlugin)

import propTypes from "prop-types"

const merchProducts = [
  {
    id: 1,
    imgSrc: "public/sampleShirt.png",
    teaser: "$25",
    link: "",
  },
  {
    id: 2,
    imgSrc: "public/sampleShirt.png",
    teaser: "$25",
    link: "",
  },
  {
    id: 3,
    imgSrc: "public/sampleShirt.png",
    teaser: "$25",
    link: "",
  },
  {
    id: 4,
    imgSrc: "public/sampleShirt.png",
    teaser: "$25",
    link: "",
  },
  {
    id: 5,
    imgSrc: "public/sampleShirt.png",
    teaser: "$25",
    link: "",
  },
  {
    id: 6,
    imgSrc: "public/sampleShirt.png",
    teaser: "$25",
    link: "",
  },
  {
    id: 7,
    imgSrc: "public/sampleShirt.png",
    teaser: "$25",
    link: "",
  },
  {
    id: 8,
    imgSrc: "public/sampleShirt.png",
    teaser: "$25",
    link: "",
  },
]

const Merch = ({ theme }) => {
  const isUserInteracting = useRef(false)
  const debounceTimeout = useRef(null)

  useEffect(() => {
    const heroSection = document.getElementById("merch")

    const snapIntoView = (entries) => {
      if (isUserInteracting.current) return

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Don't force scroll; just adjust slightly
          gsap.to(window, {
            duration: 1,
            scrollTo: { y: heroSection.offsetTop, offsetY: 50 }, // Small offset to avoid snapping too close
            ease: "power2.inOut",
          })
        }
      })
    }

    const observer = new IntersectionObserver(snapIntoView, {
      threshold: 0.4,
    })

    observer.observe(heroSection)

    const handleUserInteractionStart = () => {
      isUserInteracting.current = true
      clearTimeout(debounceTimeout.current)
    }

    const handleUserInteractionEnd = () => {
      debounceTimeout.current = setTimeout(() => {
        isUserInteracting.current = false
      }, 100)
    }

    window.addEventListener("scroll", handleUserInteractionStart)
    window.addEventListener("mousedown", handleUserInteractionStart)
    window.addEventListener("mouseup", handleUserInteractionEnd)
    window.addEventListener("touchstart", handleUserInteractionStart)
    window.addEventListener("touchend", handleUserInteractionEnd)

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleUserInteractionStart)
      window.removeEventListener("mousedown", handleUserInteractionStart)
      window.removeEventListener("mouseup", handleUserInteractionEnd)
      window.removeEventListener("touchstart", handleUserInteractionStart)
      window.removeEventListener("touchend", handleUserInteractionEnd)
    }
  }, [])

  return (
    <section
      id="merch"
      className={`container w-full min-h-screen mx-auto px-4 pt-16 ${theme}`}
    >
      <h1 className="pb-8 text-5xl text-center">Merch Store</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {merchProducts.map((item) => (
          <div key={item.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <img
              src={item.imgSrc}
              alt={`Product ${item.id}`}
              className="object-cover w-full h-auto mb-2 rounded-md"
            />
            <p className="mb-2 font-semibold text-center text-md text-sky-800">
              {item.teaser}
            </p>
            <a
              href={item.link}
              className="block py-2 text-center text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Buy Now
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

Merch.propTypes = {
  theme: propTypes.string.isRequired,
}

export default Merch
