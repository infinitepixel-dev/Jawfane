import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

import propTypes from "prop-types"

const MusicVideos = ({ theme }) => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const videos = section.querySelectorAll(".video-item")
    const title = section.querySelector("#music-video-title")

    // Animation for title and videos
    gsap.fromTo(
      title,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
        },
      }
    )

    gsap.fromTo(
      videos,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section
      id="music"
      ref={sectionRef}
      className={`w-full min-h-screen bg-cover bg-center flex flex-col items-center pt-16 ${theme} z-40`}
      style={{
        backgroundImage: `url({heroImage})`,
      }}
    >
      <h1
        id="music-video-title"
        className={`text-5xl text-center mb-8 ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        Music Videos
      </h1>

      <div
        className={`flex items-center justify-center w-full px-4 py-8 ${
          theme === "dark" ? "bg-black" : "bg-slate-300"
        }`}
      >
        <div className="grid w-full max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2">
          {/* Video 1 */}
          <div
            className="relative w-full video-item"
            style={{ paddingBottom: "56.25%" }}
          >
            <iframe
              className="absolute top-0 left-0 w-full h-full border border-gray-300 rounded-md"
              src="https://www.youtube.com/embed/rSdiBTpiFbY?si=PjIO9GIjFRnusqa0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>

          {/* Video 2 */}
          <div
            className="relative w-full video-item"
            style={{ paddingBottom: "56.25%" }}
          >
            <iframe
              className="absolute top-0 left-0 w-full h-full border border-gray-300 rounded-md"
              src="https://www.youtube.com/embed/hK7ekE0Sry4?si=nJ00ieaI8d6W9ixL"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}

MusicVideos.propTypes = {
  theme: propTypes.string.isRequired,
}

export default MusicVideos
