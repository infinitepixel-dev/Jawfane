import { useEffect, useState } from "react";
import Variants from "@apis_product_management/products/Variants";
import propTypes from "prop-types";

import noImage from "@assets/images/no-image.webp";

const ProductCard = ({
  product,
  index,
  handleAddToCart,
  handleImageClick,
  isAnimating,
  cardRefs,
  style,
  // finalPrice,
  // setFinalPrice,
}) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [finalPrice, setFinalPrice] = useState(
    parseFloat(product.price).toFixed(2)
  );

  const handleSizeChange = (size, extraCost) => {
    setSelectedSize(size);
    setFinalPrice((parseFloat(product.price) + extraCost).toFixed(2));
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  // if a variant isn't selected when adding to cart, display an error message
  useEffect(() => {
    if (!selectedSize || !selectedColor) {
      //prevent add to cart button
    }
  }, [selectedSize, selectedColor, setFinalPrice]);

  // useEffect(() => {
  //   setFinalPrice(parseFloat(product.price).toFixed(2));
  // }, [product.price, setFinalPrice]);

  return (
    <div
      ref={(el) => (cardRefs.current[index] = el)}
      className="group relative flex flex-col justify-between rounded-lg border bg-white p-4 shadow-lg hover:scale-105 "
      style={style}
    >
      <h2 className="text-2xl font-semibold text-gray-900">{product.title}</h2>
      <img
        className="object-cover w-full h-48"
        src={product.image_url ? product.image_url : noImage}
        alt={product.title}
        onClick={() => handleImageClick(product)}
      />
      <Variants
        product={product}
        onSizeChange={handleSizeChange}
        onColorChange={handleColorChange}
        finalPrice={finalPrice}
        setFinalPrice={setFinalPrice}
      />
      <button
        onClick={() =>
          handleAddToCart(
            { ...product, selectedSize, selectedColor, finalPrice },
            index
          )
        }
        className={`w-full py-2 bg-lime-600 hover:bg-lime-500 text-slate-200 font-bold rounded-lg duration-300 hover:text-black ${
          isAnimating[index] ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isAnimating[index]}
      >
        Add to Cart
      </button>
      <div className="text-lg font-bold mt-2">${finalPrice}</div>
    </div>
  );
};

ProductCard.propTypes = {
  product: propTypes.object.isRequired,
  index: propTypes.number.isRequired,
  handleAddToCart: propTypes.func.isRequired,
  handleImageClick: propTypes.func.isRequired,
  isAnimating: propTypes.array.isRequired,
  cardRefs: propTypes.object.isRequired,
  // finalPrice: propTypes.number.isRequired,
  // setFinalPrice: propTypes.func.isRequired,
  style: propTypes.object,
};

export default ProductCard;
