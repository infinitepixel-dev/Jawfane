import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

const Variants = () => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);
  const sizeDropdownRef = useRef(null);
  const colorDropdownRef = useRef(null);
  const colorSelectRef = useRef(null);

  // Example size costs
  const sizeCosts = {
    S: 0,
    M: 0,
    L: 0.75,
    XL: 1.23, // Additional cost for XL
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setIsSizeDropdownOpen(false);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setIsColorDropdownOpen(false);
  };

  const toggleDropdown = (isOpen, dropdownRef) => {
    if (isOpen) {
      gsap.to(dropdownRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(dropdownRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  };

  useEffect(() => {
    toggleDropdown(isSizeDropdownOpen, sizeDropdownRef);
  }, [isSizeDropdownOpen]);

  useEffect(() => {
    toggleDropdown(isColorDropdownOpen, colorDropdownRef);
  }, [isColorDropdownOpen]);

  useEffect(() => {
    if (selectedSize && colorSelectRef.current) {
      gsap.fromTo(
        colorSelectRef.current,
        { opacity: 0, height: 0, overflow: "hidden" },
        { opacity: 1, height: "auto", duration: 0.5, ease: "power2.out" }
      );
    }
  }, [selectedSize]);

  return (
    <div className="mb-4">
      <div className="relative">
        <button
          onClick={() => setIsSizeDropdownOpen(!isSizeDropdownOpen)}
          className="border rounded text-slate-900 p-2 mt-2 bg-slate-400 w-full text-left"
        >
          {selectedSize ? (
            <>
              {selectedSize}
              {sizeCosts[selectedSize] > 0 && (
                <span className="text-green-600">
                  {" "}
                  +${sizeCosts[selectedSize].toFixed(2)}
                </span>
              )}
            </>
          ) : (
            "Select a size"
          )}
        </button>
        <div
          ref={sizeDropdownRef}
          className="overflow-hidden"
          style={{ height: 0, opacity: 0 }}
        >
          <div className="bg-slate-600 mt-2 w-full rounded shadow-lg">
            {["S", "M", "L", "XL"].map((productSize) => (
              <div
                key={productSize}
                onClick={() => handleSizeSelect(productSize)}
                className="p-2 cursor-pointer hover:bg-slate-500 text-white"
              >
                {productSize}
                {sizeCosts[productSize] > 0 && (
                  <span className="text-green-600">
                    {" "}
                    +${sizeCosts[productSize].toFixed(2)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedSize && (
        <div className="relative mt-4" ref={colorSelectRef}>
          <button
            onClick={() => setIsColorDropdownOpen(!isColorDropdownOpen)}
            className="border rounded p-2 text-slate-900 bg-slate-400 w-full text-left"
          >
            {selectedColor ? selectedColor : "Select a Color"}
          </button>
          <div
            ref={colorDropdownRef}
            className="overflow-hidden"
            style={{ height: 0, opacity: 0 }}
          >
            <div className="bg-slate-600 mt-2 w-full rounded shadow-lg">
              {["Red", "Blue", "Green", "Yellow"].map((productColor) => (
                <div
                  key={productColor}
                  onClick={() => handleColorSelect(productColor)}
                  className="p-2 cursor-pointer hover:bg-slate-500 text-white"
                >
                  {productColor}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Variants;
