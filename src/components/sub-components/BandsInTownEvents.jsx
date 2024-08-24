import { useState, useEffect, useRef } from "react"
import propTypes from "prop-types"
import axios from "axios"
import { gsap } from "gsap"

const BandsInTownEvents = ({ artistName }) => {
  const [events, setEvents] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [eventDates, setEventDates] = useState([])
  const eventListRef = useRef(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const appId = "YOUR_APP_ID" // Replace with your Bandsintown App ID
        const response = await axios.get(
          `https://rest.bandsintown.com/artists/${artistName}/events?app_id=${appId}`
        )

        setEvents(response.data)
        const dates = response.data.map((event) => new Date(event.datetime))
        setEventDates(dates)
      } catch (error) {
        console.error("Error fetching events:", error)
      }
    }

    fetchEvents()
  }, [artistName])

  useEffect(() => {
    if (events.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              entry.target.children,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: 0.5, stagger: 0.2 }
            )
            observer.unobserve(entry.target)
          }
        })
      })

      if (eventListRef.current) {
        observer.observe(eventListRef.current)
      }

      return () => {
        if (eventListRef.current) observer.unobserve(eventListRef.current)
      }
    }
  }, [events])

  return (
    <div className="min-h-screen px-4 py-10 text-white bg-gray-900">
      <h1 className="mb-8 text-3xl font-bold text-center md:text-4xl">
        {artistName} Tour Dates
      </h1>
      <div className="max-w-4xl mx-auto">
        <ul ref={eventListRef}>
          {events.length > 0 ? (
            events.map((event) => (
              <li
                key={event.id}
                className="relative p-4 mb-6 bg-gray-800 rounded-lg shadow-lg md:p-6"
              >
                <div className="md:flex md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <p className="text-lg font-semibold md:text-xl">
                      {event.venue.name} -{" "}
                      {new Date(event.datetime).toLocaleDateString()}
                    </p>
                    <p className="text-base md:text-lg">
                      {event.venue.city}, {event.venue.country}
                    </p>
                  </div>
                  {/* RSVP Button */}
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-3 py-2 text-sm font-bold text-white transition duration-300 transform bg-green-500 rounded-lg rsvp-button hover:scale-105 hover:bg-green-600 md:px-4 md:py-2 md:text-base"
                  >
                    RSVP
                  </a>
                </div>
              </li>
            ))
          ) : (
            <p className="text-xl text-center">No upcoming events found.</p>
          )}
        </ul>

        {/* Example of Event Dates */}
        {/* <h2 className="mt-10 mb-4 text-2xl font-semibold text-center">
          Event Dates
        </h2>
        <ul className="flex flex-wrap justify-center gap-4">
          {eventDates.map((date, index) => (
            <li
              key={index}
              className="px-4 py-2 text-lg font-medium bg-indigo-500 rounded-lg"
            >
              {date.toLocaleDateString()}
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  )
}

BandsInTownEvents.propTypes = {
  artistName: propTypes.string.isRequired,
}

export default BandsInTownEvents
