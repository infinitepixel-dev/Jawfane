import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import propTypes from 'prop-types'
// import heroImage from "@public/heroImage.jpg";
gsap.registerPlugin(ScrollToPlugin)

const MusicVideos = ({ theme }) => {
  const isUserInteracting = useRef(false)
  const debounceTimeout = useRef(null)

  useEffect(() => {
    const heroSection = document.getElementById('music')

    const snapIntoView = entries => {
      if (isUserInteracting.current) return

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.to(window, {
            duration: 1.5, // Increased duration for a more pronounced effect
            scrollTo: { y: heroSection, offsetY: 0 },
            ease: 'elastic.out(1, 1)' // Elastic easing for a bounce effect
          })
        }
      })
    }

    const observer = new IntersectionObserver(snapIntoView, {
      threshold: 0.4 // Adjust this value as needed
    })

    observer.observe(heroSection)

    const handleUserInteractionStart = () => {
      isUserInteracting.current = true
      clearTimeout(debounceTimeout.current)
    }

    const handleUserInteractionEnd = () => {
      debounceTimeout.current = setTimeout(() => {
        isUserInteracting.current = false
      }, 100) // Debounce timeout to prevent immediate re-triggering
    }

    window.addEventListener('scroll', handleUserInteractionStart)
    window.addEventListener('mousedown', handleUserInteractionStart)
    window.addEventListener('mouseup', handleUserInteractionEnd)
    window.addEventListener('touchstart', handleUserInteractionStart)
    window.addEventListener('touchend', handleUserInteractionEnd)

    return () => {
      observer.disconnect() // Ensure cleanup by disconnecting the observer
      window.removeEventListener('scroll', handleUserInteractionStart)
      window.removeEventListener('mousedown', handleUserInteractionStart)
      window.removeEventListener('mouseup', handleUserInteractionEnd)
      window.removeEventListener('touchstart', handleUserInteractionStart)
      window.removeEventListener('touchend', handleUserInteractionEnd)
    }
  }, [])

  return (
    <section
      id='music'
      className={`h-screen w-full bg-cover bg-center ${theme} z-40`}
      style={{
        backgroundImage: `url({heroImage})`
        // fit
      }}
    >
      <div
        className={`flex items-center justify-center h-full ${
          theme === 'dark' ? 'bg-black' : 'bg-slate-300'
        }`}
      >
        <h1
          id='music-video-title'
          className={`text-3xl text-center ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}
        >
          Music Video Page - Jawfane Band
        </h1>
      </div>
    </section>
  )
}

MusicVideos.propTypes = {
  theme: propTypes.string.isRequired
}

export default MusicVideos
