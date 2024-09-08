//AnimatedCheckbox.jsx

/*
A component to manage the checkbox animation
*/

//INFO React Libraries
import { useEffect, useRef } from "react";
import propTypes from "prop-types";

//INFO Animation Libraries
import { gsap } from "gsap";

function AnimatedCheckbox({ isSelected, onSelect, className }) {
  const checkboxRef = useRef(null);

  // Handle the checkbox animation when it is selected
  useEffect(() => {
    if (isSelected) {
      gsap.to(checkboxRef.current, {
        backgroundColor: "#10b981", // Green background when selected
        duration: 0.3,
        minWidth: "1.5rem",
      });
    } else {
      gsap.to(checkboxRef.current, {
        backgroundColor: "#4b5563", // Gray background when not selected
        duration: 0.3,
        maxWidth: "1.5rem",
      });
    }
  }, [isSelected]);

  return (
    <div
      ref={checkboxRef}
      onClick={onSelect} // This will toggle the selection state
      className={`w-6 h-6 rounded-full flex justify-center items-center cursor-pointer transition-all duration-300 text-black ${className}`}
    >
      {isSelected ? (
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: isSelected ? 1 : 0 }} // Show when selected
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <svg
          className="w-4 h-4 text-slate-200 "
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </div>
  );
}

AnimatedCheckbox.propTypes = {
  isSelected: propTypes.bool.isRequired,
  onSelect: propTypes.func.isRequired,
  className: propTypes.string, // Allow custom classes for positioning
};

export default AnimatedCheckbox;
