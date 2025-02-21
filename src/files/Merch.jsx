import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
gsap.registerPlugin(ScrollToPlugin)

import propTypes from "prop-types"

const merchProducts = [
  {
    id: 1,
    imgSrc: "https://placehold.co/250x250",
    teaser: "This is an awesome product!",
    link: "",
  },
  {
    id: 2,
    imgSrc: "https://placehold.co/250x250",
    teaser: "Another great product!",
    link: "",
  },
  {
    id: 3,
    imgSrc: "https://placehold.co/250x250",
    teaser: "You need this product!",
    link: "",
  },
  {
    id: 4,
    imgSrc: "https://placehold.co/250x250",
    teaser: "Don't miss this one!",
    link: "",
  },
  {
    id: 5,
    imgSrc: "https://placehold.co/250x250",
    teaser: "This is an awesome product!",
    link: "",
  },
  {
    id: 6,
    imgSrc: "https://placehold.co/250x250",
    teaser: "This is an awesome product!",
    link: "",
  },
  {
    id: 7,
    imgSrc: "https://placehold.co/250x250",
    teaser: "This is an awesome product!",
    link: "",
  },
  {
    id: 8,
    imgSrc: "https://placehold.co/250x250",
    teaser: "This is an awesome product!",
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
          gsap.to(window, {
            duration: 1.5,
            scrollTo: { y: heroSection, offsetY: 0 },
            ease: "elastic.out(1, 1)",
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
    <>
      <section
        id="merch"
        className={`container w-full min-h-screen mx-auto ${theme}`}
      >
        <h1 className="text-5xl text-center p-14">Merch Store</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {merchProducts.map((item) => (
            <div key={item.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
              <img
                src={item.imgSrc}
                alt={`Product ${item.id}`}
                className="object-cover w-full h-auto mb-2 rounded-md"
              />
              <p className="mb-2 text-sm">{item.teaser}</p>
              <a
                href={item.link}
                className="block py-2 text-center text-white transition-colors rounded-md bg-lime-600 hover:bg-lime-500"
              >
                Buy Now
              </a>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

Merch.propTypes = {
  theme: propTypes.string.isRequired,
}

export default Merch
