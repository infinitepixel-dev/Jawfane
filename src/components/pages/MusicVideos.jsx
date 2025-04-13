import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import propTypes from "prop-types"

gsap.registerPlugin(ScrollTrigger)

const videoList = [
  "https://www.youtube.com/embed/rSdiBTpiFbY?si=PjIO9GIjFRnusqa0", // First video
  "https://www.youtube.com/embed/hK7ekE0Sry4?si=nJ00ieaI8d6W9ixL", // Additional video
  // Add more URLs as needed
]

const MusicVideos = ({ theme }) => {
  const sectionRef = useRef(null)
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const videos = section.querySelectorAll(".more-videos")
    const title = section.querySelector("#music-video")

    gsap.fromTo(
      title,
      { opacity: 0, x: -200 },
      {
        opacity: 1,
        x: 0,
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
      { opacity: 0, x: 200 },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.in",
        scrollTrigger: {
          trigger: section,
          start: "right 80%",
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [showMore])

  return (
    <section
      id="music"
      ref={sectionRef}
      className={`w-full min-h-full mb-4 bg-cover bg-center flex flex-col items-center pt-16 ${theme} z-40`}
    >
      {/* First video taking 50% of viewport height */}
      <div className="w-full max-w-5xl px-4 mb-6">
        <div
          className="relative w-full video-item"
          id="music-video"
          style={{ paddingBottom: "50vh" }}
        >
          <iframe
            className="absolute top-0 left-0 w-full h-full border border-gray-300 rounded-md"
            src={videoList[0]}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* "More Videos" Button */}
      <button
        onClick={() => setShowMore(!showMore)}
        className={`mb-8 more-videos px-6 py-2 text-lg rounded shadow-md transition duration-300 ${
          theme === "dark"
            ? "bg-sky-600 hover:bg-sky-700 text-black font-bold"
            : "bg-black text-white hover:bg-gray-800"
        }`}
      >
        {showMore ? "Hide Videos" : "More Videos"}
      </button>

      {/* Additional videos grid */}
      {showMore && (
        <div
          className={`grid w-full more-videos max-w-5xl px-4 pb-12 gap-8 sm:grid-cols-2 ${
            theme === "dark" ? "bg-black" : "bg-slate-300"
          }`}
        >
          {videoList.slice(1).map((url, index) => (
            <div
              key={index}
              className="relative w-full video-item"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full border border-gray-300 rounded-md"
                src={url}
                title={`YouTube video ${index + 2}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

MusicVideos.propTypes = {
  theme: propTypes.string.isRequired,
}

export default MusicVideos
