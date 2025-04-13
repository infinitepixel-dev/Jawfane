import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { gsap } from "gsap";

const BandsInTownEvents = ({ artistName }) => {
  const widgetRef = useRef(null); // Ref for the BandsInTown widget

  // Load Bandsintown script
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

  // Wait for widget content to appear, then animate
  useEffect(() => {
    const widgetContainer = widgetRef.current;
    if (!widgetContainer) return;

    const observer = new MutationObserver(() => {
      const widgetContent = widgetContainer.querySelector("*");
      if (widgetContent) {
        gsap.fromTo(
          widgetContainer,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
        );
        observer.disconnect(); // Clean up after first render
      }
    });

    observer.observe(widgetContainer, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-gray-200 px-4 py-10 min-h-screen text-gray-600">
      <h1 className="mb-8 font-bold text-3xl md:text-4xl text-center">
        {artistName} Tour Dates
      </h1>
      <div className="mx-auto max-w-[62%]">
        {/* Bandsintown Widget Code */}
        <a
          ref={widgetRef}
          className="block mx-auto max-w-[62%] bit-widget-initializer"
          data-artist-name={artistName}
          data-background-color="rgba(230,230,230,1)"
          data-separator-color="rgba(76, 103, 99, 1)"
          data-text-color="#052139"
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
          data-event-ticket-text="TICKETS"
          data-event-ticket-cta-text-color="#FFFFFF"
          data-event-ticket-cta-bg-color="rgba(76, 95, 91, 1)"
          data-event-ticket-cta-border-color="#4A4A4A"
          data-event-ticket-cta-border-width="0px"
          data-event-ticket-cta-border-radius="4px"
          data-sold-out-button-text-color="#FFFFFF"
          data-sold-out-button-background-color="#4A4A4A"
          data-sold-out-button-border-color="#4A4A4A"
          data-sold-out-button-clickable="true"
          data-event-rsvp-position="left"
          data-event-rsvp-cta-size="medium"
          data-event-rsvp-text="REMIND ME"
          data-event-rsvp-cta-text-color="#052139"
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
          data-bit-logo-position="bottomRight"
          data-bit-logo-color="#CCCCCC"
        ></a>
      </div>
    </div>
  );
};

BandsInTownEvents.propTypes = {
  artistName: PropTypes.string.isRequired,
};

export default BandsInTownEvents;
