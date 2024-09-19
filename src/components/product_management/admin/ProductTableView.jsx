import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import PropTypes from "prop-types"

const ProductTableView = ({ products, onEdit }) => {
  const tableRef = useRef(null)

  // GSAP animation to fade in and slide the table up on component mount
  useEffect(() => {
    gsap.from(tableRef.current, { opacity: 0, y: 50, duration: 0.5 })
  }, [])

  return (
    <div className="overflow-x-auto">
      {/* Table container with horizontal scroll if needed */}
      <table ref={tableRef} className="min-w-full text-left table-auto">
        {/* Table header with column titles */}
        <thead className="text-white bg-gray-800">
          <tr>
            <th className="px-4 py-2">Product Name</th>
            <th className="px-4 py-2">SKU</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Edit</th>
          </tr>
        </thead>
        <tbody>
          {/* Check if products is an array before mapping */}
          {Array.isArray(products) &&
            products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="px-4 py-2">
                  {/* Product name as a clickable link that triggers onEdit */}
                  <a
                    href="#"
                    className="text-blue-500 hover:underline"
                    onClick={() => onEdit(product.id)}
                  >
                    {product.name}
                  </a>
                </td>
                <td className="px-4 py-2">{product.sku}</td>
                <td className="px-4 py-2">${product.price}</td>
                <td className="px-4 py-2">
                  {/* Edit button with accessibility improvements */}
                  <button
                    aria-label={`Edit product ${product.name}`}
                    className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                    onClick={() => onEdit(product.id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

// PropTypes for type checking
ProductTableView.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      sku: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
}

export default ProductTableView
