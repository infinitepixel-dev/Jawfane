import { useEffect, useRef } from "react"
import gsap from "gsap"

const products = [
  {
    title: "Jawfane - Standard Fit Shirt",
    link: "https://www.exsrmusic.com/store/p/jawfane-standard-fit-shirt",
    image:
      "https://images.squarespace-cdn.com/content/v1/63c5afbb6afe4457f0d64773/1745204015098-6IA6ZV67J1IQDN3BTOST/e666d80d78d8b0c7f783127ce746143e?format=1500w",
    hoverImage:
      "https://images.squarespace-cdn.com/content/v1/63c5afbb6afe4457f0d64773/1745204017638-S99CCIA2BIDK6WPAANM1/708649c5a534fa6e412907430443cc09?format=1000w",
  },
  {
    title: "Jawfane Pain - Standard Fit Shirt",
    link: "https://www.exsrmusic.com/store/p/jawfane-pain-standard-fit-shirt",
    image:
      "https://images.squarespace-cdn.com/content/v1/63c5afbb6afe4457f0d64773/1745204182774-206YE2UOECKGGCBD2OP1/8122d7c32236b02cdd1aaf4d8a1b8e67?format=1500w",
    hoverImage:
      "https://images.squarespace-cdn.com/content/v1/63c5afbb6afe4457f0d64773/1745204186016-P69XE2E9AP2TTQDNRKWE/b002ac625c0ea5da37c2f12b78e3809a?format=1000w",
  },
]

const MerchPage = () => {
  const itemRefs = useRef([])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2, // 20% in view
    }

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(entry.target, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          })
          observer.unobserve(entry.target) // Animate once
        }
      })
    }, observerOptions)

    itemRefs.current.forEach((el) => {
      if (el) {
        gsap.set(el, { opacity: 0, y: 20 }) // Initial state
        observer.observe(el)
      }
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="merch" className="bg-black p-8 min-h-screen text-white">
      <h1 className="mb-12 font-bold text-4xl text-center">
        Official Jawfane Merch
      </h1>
      <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product, index) => (
          <a
            key={index}
            href={product.link}
            className="group text-center"
            ref={(el) => (itemRefs.current[index] = el)}
          >
            <div className="relative w-full h-72 overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="group-hover:opacity-0 w-full h-full object-cover transition-opacity duration-300"
              />
              <img
                src={product.hoverImage}
                alt={`${product.title} alt`}
                className="top-0 left-0 absolute opacity-0 group-hover:opacity-100 w-full h-full object-cover transition-opacity duration-300"
              />
            </div>
            <h2 className="mt-4 font-medium text-lg">{product.title}</h2>
          </a>
        ))}
      </div>
    </section>
  )
}

export default MerchPage
