// Variants.jsx

// INFO React Libraries
import { useState, useRef, useEffect } from "react"

// INFO Animation Libraries
import { gsap } from "gsap"

const Variants = ({ product, setProducts }) => {
  console.log("variant", product)

  // State for managing selected size and color
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")

  // State for managing open/closed state of dropdowns
  const [openDropdown, setOpenDropdown] = useState(null)

  // Refs for dropdown elements
  const sizeDropdownRef = useRef(null)
  const colorDropdownRef = useRef(null)
  const colorSelectRef = useRef(null)

  // Example size costs
  const sizeCosts = {
    S: 0,
    M: 0,
    L: 0,
    XL: 5,
    "2XL": 8,
    "3XL": 10,
  }

  // Lists of available sizes and colors
  const availableSizes = ["S", "M", "L", "XL", "2XL", "3XL"]
  const availableColors = ["Red", "Blue", "Green", "Yellow"]

  // Function to handle size selection
  const handleSizeSelect = (size) => {
    setSelectedSize(size)
    setOpenDropdown(null) // Close all dropdowns
  }

  // Function to handle color selection
  const handleColorSelect = (color) => {
    setSelectedColor(color)
    setOpenDropdown(null) // Close all dropdowns
  }

  // Function to toggle dropdown visibility
  const toggleDropdown = (dropdownType) => {
    setOpenDropdown(openDropdown === dropdownType ? null : dropdownType)
  }

  // Function to animate dropdowns
  const animateDropdown = (dropdownType, dropdownRef) => {
    if (dropdownRef.current) {
      gsap.to(dropdownRef.current, {
        height: dropdownType === openDropdown ? "auto" : 0,
        opacity: dropdownType === openDropdown ? 1 : 0,
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }

  // Animate size dropdown
  useEffect(() => {
    animateDropdown("size", sizeDropdownRef)
  }, [openDropdown])

  // Animate color dropdown
  useEffect(() => {
    animateDropdown("color", colorDropdownRef)
  }, [openDropdown])

  // Animate color select element when a size is selected
  useEffect(() => {
    if (selectedSize && colorSelectRef.current) {
      gsap.fromTo(
        colorSelectRef.current,
        { opacity: 0, height: 0, overflow: "hidden" },
        { opacity: 1, height: "auto", duration: 0.5, ease: "power2.out" }
      )
    }
  }, [selectedSize])

  // Calculate the final price
  const finalPrice = product.price + (sizeCosts[selectedSize] || 0).toFixed(2)
  console.log(product.price)
  console.log("size Cost / Selected Size", sizeCosts[selectedSize])

  return (
    <div className="mb-4">
      {/* Display Final Price */}
      <div className="mb-4 text-xl font-bold">${finalPrice}</div>

      {/* Size Dropdown */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown("size")}
          className={`w-full p-2 mt-2 font-medium text-left border rounded ${
            openDropdown === "size"
              ? "bg-slate-300 border-slate-600"
              : "bg-slate-200 text-slate-900"
          }`}
          aria-haspopup="true"
          aria-expanded={openDropdown === "size"}
          aria-controls="size-dropdown"
        >
          {selectedSize ? (
            <>
              {selectedSize}
              {sizeCosts[selectedSize] > 0 && (
                <span className="text-red-500">
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
          id="size-dropdown"
          ref={sizeDropdownRef}
          className={`overflow-hidden ${
            openDropdown === "size" ? "bg-slate-300 shadow-lg" : ""
          }`}
          style={{ height: 0, opacity: 0 }}
        >
          <div className="w-full mt-2 rounded shadow-lg bg-slate-200">
            {availableSizes
              .filter((size) => size !== selectedSize) // Exclude selected size from dropdown
              .map((productSize) => (
                <div
                  key={productSize}
                  onClick={() => handleSizeSelect(productSize)}
                  className="p-2 font-medium cursor-pointer text-slate-700 hover:bg-slate-400"
                  role="option"
                  aria-selected={selectedSize === productSize}
                >
                  {productSize}
                  {sizeCosts[productSize] > 0 && (
                    <span className="text-red-500">
                      {" "}
                      + ${sizeCosts[productSize].toFixed(2)}
                    </span>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Color Dropdown */}
      {selectedSize && (
        <div className="relative mt-4" ref={colorSelectRef}>
          <button
            onClick={() => toggleDropdown("color")}
            className={`w-full p-2 font-medium text-left border rounded ${
              openDropdown === "color"
                ? "bg-slate-300 border-slate-600"
                : "bg-slate-200 text-slate-600"
            }`}
            aria-haspopup="true"
            aria-expanded={openDropdown === "color"}
            aria-controls="color-dropdown"
          >
            {selectedColor ? selectedColor : "Select a Color"}
          </button>
          <div
            id="color-dropdown"
            ref={colorDropdownRef}
            className={`overflow-hidden ${
              openDropdown === "color" ? "bg-slate-300 shadow-lg" : ""
            }`}
            style={{ height: 0, opacity: 0 }}
          >
            <div className="w-full mt-2 rounded shadow-lg bg-slate-200">
              {availableColors
                .filter((color) => color !== selectedColor) // Exclude selected color from dropdown
                .map((productColor) => (
                  <div
                    key={productColor}
                    onClick={() => handleColorSelect(productColor)}
                    className="p-2 font-medium cursor-pointer text-slate-600 hover:bg-slate-400"
                    role="option"
                    aria-selected={selectedColor === productColor}
                  >
                    {productColor}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default Variants
