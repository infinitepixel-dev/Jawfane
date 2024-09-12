import ProductCard from "@apis_product_management/products/ProductCard";
import propTypes from "prop-types";

const ProductGrid = ({
  products,
  handleAddToCart,
  handleImageClick,
  isAnimating,
  cardRefs,
  finalPrice,
  setFinalPrice,
}) => {
  return (
    <div className="grid auto-rows-min grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard
          style={{
            height: "auto",
            alignSelf: "start",
            overflow: "hidden",
          }}
          key={index}
          product={product}
          index={index}
          handleAddToCart={handleAddToCart}
          handleImageClick={handleImageClick}
          isAnimating={isAnimating}
          cardRefs={cardRefs}
          finalPrice={finalPrice}
          setFinalPrice={setFinalPrice}
        />
      ))}
    </div>
  );
};

ProductGrid.propTypes = {
  products: propTypes.array.isRequired,
  handleAddToCart: propTypes.func.isRequired,
  handleImageClick: propTypes.func.isRequired,
  isAnimating: propTypes.array.isRequired,
  cardRefs: propTypes.object.isRequired,
  finalPrice: propTypes.number.isRequired,
  setFinalPrice: propTypes.func.isRequired,
};

export default ProductGrid;
