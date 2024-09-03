import { useState } from "react"

const Variants = () => {
  const [sizes, setSizes] = useState([])
  const [colors, setColors] = useState([])

  const handleSizeChange = (e) => {
    const { value, checked } = e.target
    setSizes((prevSizes) =>
      checked
        ? [...prevSizes, value]
        : prevSizes.filter((size) => size !== value)
    )
  }

  const handleColorChange = (e) => {
    const { value, checked } = e.target
    setColors((prevColors) =>
      checked
        ? [...prevColors, value]
        : prevColors.filter((color) => color !== value)
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const productData = { sizes, colors }
    // Make API call to submit productData
    console.log("Selected Sizes:", sizes)
    console.log("Selected Colors:", colors)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h3>Select Sizes:</h3>
        {["S", "M", "L", "XL"].map((size) => (
          <label key={size}>
            <input type="checkbox" value={size} onChange={handleSizeChange} />
            {size}
          </label>
        ))}
      </div>

      <div>
        <h3>Select Colors:</h3>
        {["Red", "Blue", "Green"].map((color) => (
          <label key={color}>
            <input type="checkbox" value={color} onChange={handleColorChange} />
            {color}
          </label>
        ))}
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}

export default Variants
