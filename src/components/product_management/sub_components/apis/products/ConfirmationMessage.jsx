import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import propTypes from "prop-types";

const ConfirmationMessage = ({ message, position, cardRef }) => {
  const confirmRef = useRef(null);

  useEffect(() => {
    if (message && cardRef) {
      const tl = gsap.timeline();
      tl.to(cardRef, { opacity: 0.1, duration: 0.3 });
      tl.fromTo(
        confirmRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6 }
      );
      tl.to(confirmRef.current, { opacity: 0, y: -20, delay: 1.5 });
      tl.to(cardRef, { opacity: 1, duration: 0.3 });
    }
  }, [message, cardRef]);

  if (!message) return null;

  return (
    <div
      ref={confirmRef}
      className="absolute bg-green-500 text-white p-2 rounded"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {message}
    </div>
  );
};

ConfirmationMessage.propTypes = {
  message: propTypes.string.isRequired,
  position: propTypes.object.isRequired,
  cardRef: propTypes.object, // Made optional to handle undefined case
};

export default ConfirmationMessage;
