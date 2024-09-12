import { useState, useEffect, useRef, useMemo } from "react";
import propTypes from "prop-types";

import gsap from "gsap";

import ConfirmationMessage from "@apis_product_management/products/ConfirmationMessage";
import ProductModal from "@apis_product_management/products/ProductModal";
import ProductGrid from "@apis_product_management/products/ProductGrid";

function MerchPage({ addToCart, storeId }) {
  const apiUrl = `https://vps.infinitepixel.dev:3082/api/store/${storeId}/products`;

  const [products, setProducts] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [messagePosition, setMessagePosition] = useState({ top: 0, left: 0 });
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const [isAnimating, setIsAnimating] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let [finalPrice, setFinalPrice] = useState(0);

  const cardRefs = useRef([]);

  const handleImageClick = (product) => {
    if (product.image || product.image_url) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    const validRefs = cardRefs.current.filter((ref) => ref !== null);
    if (validRefs.length > 0) {
      gsap.fromTo(
        validRefs,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    }
  }, [products]);

  useEffect(() => {
    cardRefs.current.forEach((card) => {
      if (card) {
        gsap.set(card, { scale: 1 });

        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.05,
            duration: 0.1,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            duration: 0.1,
            ease: "power2.out",
          });
        });
      }
    });
  }, [products]);

  useEffect(() => {
    fetch(apiUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json", store_id: storeId },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setIsAnimating(new Array(data.length).fill(false));
        cardRefs.current = Array(data.length).fill(null);
      });
  }, [apiUrl, storeId]);

  const handleAddToCart = (product, index) => {
    if (isAnimating[index]) return;

    setIsAnimating((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });

    // Make sure to pass the finalPrice to your cart logic
    addToCart({
      ...product,
      price: product.finalPrice, // Ensure the cart uses the updated final price
    });

    setConfirmationMessage(`${product.title} added to cart!`);
    setActiveCardIndex(index);

    const card = cardRefs.current[index];
    if (card) {
      const rect = card.getBoundingClientRect();
      setMessagePosition({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }

    //reset ability to add to cart
    setTimeout(() => {
      setIsAnimating((prev) => {
        const updated = [...prev];
        updated[index] = false;
        return updated;
      });
    }, 1000);
  };

  return (
    <div id="merch" className="container z-10 mx-auto p-4">
      {/* Helmet for SEO */}

      {/* Cart Pop Out */}
      {/* <CartPopOut cartItems={cartItems} isSideBarOpen={isSideBarOpen} /> */}

      {/* Page Title */}
      <h1 className="mb-8 text-center text-4xl font-bold">Merch</h1>

      {/* Confirmation Message Popup */}
      <ConfirmationMessage
        message={confirmationMessage}
        position={messagePosition}
        cardRef={cardRefs.current[activeCardIndex] || null}
      />

      {/* Product Grid */}
      <ProductGrid
        products={useMemo(() => products, [products])}
        handleAddToCart={handleAddToCart}
        handleImageClick={handleImageClick}
        isAnimating={isAnimating}
        cardRefs={cardRefs}
        finalPrice={finalPrice}
        setFinalPrice={setFinalPrice}
      />

      {/* Modal for viewing product image */}
      {isModalOpen && selectedProduct && (
        <ProductModal
          isOpen={isModalOpen}
          product={selectedProduct}
          handleClose={handleCloseModal}
          convertBlobToBase64={() => {}}
        />
      )}
    </div>
  );
}

MerchPage.propTypes = {
  addToCart: propTypes.func.isRequired,
  storeId: propTypes.number.isRequired,
  isMobile: propTypes.bool.isRequired,
};

export default MerchPage;
