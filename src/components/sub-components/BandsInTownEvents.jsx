import { useState, useEffect, useRef } from "react";
import propTypes from "prop-types";
import axios from "axios";
import { gsap } from "gsap";

const BandsInTownEvents = ({ artistName }) => {
  const [events, setEvents] = useState([]);
  const eventListRef = useRef(null);
  const widgetRef = useRef(null); // Ref for the BandsInTown widget

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const appId = "YOUR_APP_ID"; // Replace with your Bandsintown App ID
        const response = await axios.get(
          `https://rest.bandsintown.com/artists/${artistName}/events?app_id=${appId}`
        );

        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [artistName]);

  // Animation for the events list
  useEffect(() => {
    if (events.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              entry.target.children,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: 0.5, stagger: 0.2 }
            );
            observer.unobserve(entry.target);
          }
        });
      });

      const currentRef = eventListRef.current;

      if (currentRef) {
        observer.observe(currentRef);
      }

      return () => {
        if (currentRef) observer.unobserve(currentRef);
      };
    }
  }, [events]);

  // GSAP animation for the widget
  useEffect(() => {
    const widgetElement = widgetRef.current;

    if (widgetElement) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              entry.target,
              { opacity: 0, scale: 0.8 },
              { opacity: 1, scale: 1, duration: 1 }
            );
            observer.unobserve(entry.target);
          }
        });
      });

      observer.observe(widgetElement);

      return () => {
        if (widgetElement) observer.unobserve(widgetElement);
      };
    }
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widgetv3.bandsintown.com/main.min.js";
    script.charset = "utf-8";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen px-4 py-10 text-gray-600 bg-gray-200">
      <h1 className="mb-8 text-3xl font-bold text-center md:text-4xl">
        {artistName} Tour Dates
      </h1>
      {/* Bandsintown Widget Code */}
      <a
        ref={widgetRef}
        className="bit-widget-initializer"
        data-artist-name="id_15556436"
        data-background-color="rgba(230,230,230,1)"
        data-separator-color="rgba(171,71,188,1)"
        data-text-color="#424242"
        data-font="Helvetica"
        data-auto-style="true"
        data-button-label-capitalization="capitalize"
        data-header-capitalization="undefined"
        data-location-capitalization="capitalize"
        data-venue-capitalization="capitalize"
        data-display-local-dates="true"
        data-local-dates-position="tab"
        data-display-past-dates="true"
        data-display-details="false"
        data-display-lineup="true"
        data-display-start-time="true"
        data-social-share-icon="false"
        data-display-limit="all"
        data-date-format="MMM. D, YYYY"
        data-date-orientation="horizontal"
        data-date-border-color="#4A4A4A"
        data-date-border-width="1px"
        data-date-capitalization="undefined"
        data-date-border-radius="10px"
        data-event-ticket-cta-size="medium"
        data-event-custom-ticket-text="undefined"
        data-event-ticket-text="TICKETS"
        data-event-ticket-icon=""
        data-event-ticket-cta-text-color="#FFFFFF"
        data-event-ticket-cta-bg-color="rgba(171,71,188,1)"
        data-event-ticket-cta-border-color="#4A4A4A"
        data-event-ticket-cta-border-width="0px"
        data-event-ticket-cta-border-radius="4px"
        data-sold-out-button-text-color="#FFFFFF"
        data-sold-out-button-background-color="#4A4A4A"
        data-sold-out-button-border-color="#4A4A4A"
        data-sold-out-button-clickable="true"
        data-event-rsvp-position="left"
        data-event-rsvp-cta-size="medium"
        data-event-rsvp-only-show-icon="undefined"
        data-event-rsvp-text="REMIND ME"
        data-event-rsvp-icon=""
        data-event-rsvp-cta-text-color="#4A4A4A"
        data-event-rsvp-cta-bg-color="#FFFFFF"
        data-event-rsvp-cta-border-color="#4A4A4A"
        data-event-rsvp-cta-border-width="1px"
        data-event-rsvp-cta-border-radius="4px"
        data-follow-section-position="hidden"
        data-follow-section-alignment="center"
        data-follow-section-header-text="Get updates on new shows, new music, and more."
        data-follow-section-cta-size="medium"
        data-follow-section-cta-text="FOLLOW"
        data-follow-section-cta-icon="true"
        data-follow-section-cta-text-color="#FFFFFF"
        data-follow-section-cta-bg-color="#4A4A4A"
        data-follow-section-cta-border-color="#4A4A4A"
        data-follow-section-cta-border-width="0px"
        data-follow-section-cta-border-radius="4px"
        data-play-my-city-position="hidden"
        data-play-my-city-alignment="Center"
        data-play-my-city-header-text="Don’t see a show near you?"
        data-play-my-city-cta-size="medium"
        data-play-my-city-cta-text="REQUEST A SHOW"
        data-play-my-city-cta-icon="true"
        data-play-my-city-cta-text-color="#FFFFFF"
        data-play-my-city-cta-bg-color="#4A4A4A"
        data-play-my-city-cta-border-color="#4A4A4A"
        data-play-my-city-cta-border-width="0px"
        data-play-my-city-cta-border-radius="4px"
        data-language="en"
        data-layout-breakpoint="900"
        data-app-id=""
        data-affil-code=""
        data-bit-logo-position="bottomRight"
        data-bit-logo-color="#CCCCCC"
      ></a>
    </div>
  );
};

BandsInTownEvents.propTypes = {
  artistName: propTypes.string.isRequired,
};

export default BandsInTownEvents;

//INFO custom tour date object
//  <div className="max-w-4xl mx-auto">
//       <ul ref={eventListRef}>
//         {events.length > 0 ? (
//           events.map((event) => (
//             <li
//               key={event.id}
//               className="relative p-4 mb-6 bg-gray-400 rounded-lg shadow-lg md:p-6"
//             >
//               <div className="md:flex md:justify-between">
//                 <div className="mb-4 md:mb-0">
//                   <p className="text-lg font-semibold md:text-xl">
//                     {new Date(event.datetime).toLocaleDateString("en-US", {
//                       weekday: "short",
//                       month: "short",
//                       day: "numeric",
//                     })}{" "}
//                     @{" "}
//                     {new Date(event.datetime).toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                       timeZoneName: "short",
//                     })}{" "}
//                     - {event.venue.name}
//                   </p>
//                   <p className="text-base md:text-lg">
//                     {event.venue.country}: {event.venue.location},{" "}
//                     {event.venue.street_address}, {event.venue.postal_code}
//                   </p>
//                 </div>
//                 {/* RSVP Button */}
//                 <a
//                   href={event.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center justify-center px-3 py-2 text-sm font-bold text-black transition-colors duration-300 ease-in-out bg-transparent border border-black rounded-lg hover:bg-gray-500 md:px-4 md:py-2 md:text-base"
//                 >
//                   RSVP
//                 </a>
//               </div>
//             </li>
//           ))
//         ) : (
//           <p className="text-xl text-center">
//             No upcoming events found, please check back later.
//           </p>
//         )}
//       </ul>
//     </div>
