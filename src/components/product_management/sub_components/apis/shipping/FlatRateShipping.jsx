import React, { useState } from "react"

const FlatRateShipping = () => {
  const [shippingType, setShippingType] = useState("")
  const [flatRate, setFlatRate] = useState("")
  const [quantityBased, setQuantityBased] = useState([{ range: "", cost: "" }])
  const [shippingMethodName, setShippingMethodName] = useState("")

  const handleShippingTypeChange = (e) => {
    setShippingType(e.target.value)
  }

  const handleAddRange = () => {
    setQuantityBased([...quantityBased, { range: "", cost: "" }])
  }

  const handleRangeChange = (index, e) => {
    const updatedRanges = [...quantityBased]
    updatedRanges[index][e.target.name] = e.target.value
    setQuantityBased(updatedRanges)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Process the data (save, send to API, etc.)
    console.log({
      shippingType,
      flatRate,
      quantityBased,
      shippingMethodName,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Shipping Type:</label>
        <select value={shippingType} onChange={handleShippingTypeChange}>
          <option value="">Select Shipping Type</option>
          <option value="flatRate">Flat Rate</option>
          <option value="quantityBased">Quantity Based</option>
        </select>
      </div>

      {shippingType === "flatRate" && (
        <div>
          <label>Flat Rate:</label>
          <input
            type="number"
            value={flatRate}
            onChange={(e) => setFlatRate(e.target.value)}
          />
        </div>
      )}

      {shippingType === "quantityBased" && (
        <div>
          <label>Quantity-Based Shipping:</label>
          {quantityBased.map((item, index) => (
            <div key={index}>
              <input
                type="text"
                name="range"
                placeholder="Range (e.g., 1-5)"
                value={item.range}
                onChange={(e) => handleRangeChange(index, e)}
              />
              <input
                type="number"
                name="cost"
                placeholder="Cost"
                value={item.cost}
                onChange={(e) => handleRangeChange(index, e)}
              />
            </div>
          ))}
          <button type="button" onClick={handleAddRange}>
            Add Range
          </button>
        </div>
      )}

      <div>
        <label>Shipping Method Name:</label>
        <input
          type="text"
          value={shippingMethodName}
          onChange={(e) => setShippingMethodName(e.target.value)}
        />
      </div>

      <button type="submit">Save Shipping Method</button>
    </form>
  )
}

export default FlatRateShipping
