/*
  A component that populates the cart item and handles quantity updates and removal
*/

//INFO React Libraries
import { useRef, useEffect } from "react";
import propTypes from "prop-types";

//INFO Animation Libraries
import { gsap } from "gsap";

//INFO Images
import noImage from "@assets/images/no-image.webp";

//INFO Icons
import { Trash } from "react-feather";

const CartItem = ({ item, index, updateQuantity, showDeleteModal }) => {
  const itemRef = useRef(null);

  // GSAP animation when cart item is added or updated
  useEffect(() => {
    if (itemRef.current) {
      gsap.fromTo(
        itemRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [item]);

  // Quantity handlers
  const handleIncrease = () =>
    updateQuantity(
      item.id,
      item.quantity + 1,
      item.selectedSize,
      item.selectedColor
    );
  const handleDecrease = () => {
    if (item.quantity > 1)
      updateQuantity(
        item.id,
        item.quantity - 1,
        item.selectedSize,
        item.selectedColor
      );
  };

  return (
    <div
      ref={itemRef}
      className="flex flex-col items-center justify-between rounded-lg bg-slate-600 p-6 shadow-lg md:flex-row transition-all duration-500 ease-in-out"
      role="group" /* Ensures accessibility for screen readers */
      aria-label={`Cart item for ${item.title}`}
    >
      {/* Product Image and Details */}
      <div className="flex w-full items-center space-x-4 md:w-auto">
        {/* Product Image */}
        <img
          className="mb-4 h-32 w-32 rounded-lg shadow-md object-cover md:mb-0 md:h-48 md:w-48"
          src={item.image_url || noImage}
          alt={`${item.title} product image`}
        />
        <div className="flex flex-col text-center md:text-left">
          <h2 className="text-lg font-semibold text-white">{item.title}</h2>
          <p className="text-sm text-gray-300">
            Category: <span className="font-medium">{item.category}</span>
          </p>
          <p className="text-sm text-gray-300">
            Size: <span className="font-medium">{item.selectedSize}</span>
          </p>
          <p className="text-sm text-gray-300">
            Color: <span className="font-medium">{item.selectedColor}</span>
          </p>
        </div>
      </div>

      {/* Quantity Controls and Delete */}
      <div className="mt-4 flex flex-col items-center space-x-0 space-y-2 md:mt-0 md:flex-row md:space-x-4 md:space-y-0">
        {/* Quantity Buttons */}
        <div className="flex items-center">
          <button
            onClick={handleDecrease}
            aria-label={`Decrease quantity of ${item.title}`}
            className="flex h-12 w-12 items-center justify-center rounded-l bg-gray-800 text-2xl text-white hover:bg-gray-500 duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            -
          </button>
          <input
            type="number"
            value={item.quantity}
            readOnly
            aria-label={`Quantity of ${item.title}`}
            className="h-12 w-16 border-0 bg-white text-center text-lg text-black focus:outline-none"
          />
          <button
            onClick={handleIncrease}
            aria-label={`Increase quantity of ${item.title}`}
            className="flex h-12 w-12 items-center justify-center rounded-r bg-gray-800 text-2xl text-white hover:bg-gray-500 duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            +
          </button>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => showDeleteModal(item, index)}
          aria-label={`Remove ${item.title} from cart`}
          className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <Trash className="h-8 w-8" />
        </button>
      </div>

      {/* Price and Total */}
      <div className="mt-4 text-center md:mt-0 md:text-right">
        <p className="text-gray-300">
          Price per item:{" "}
          <span className="font-medium">
            ${item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
        </p>
        <p className="text-gray-300">
          Total:{" "}
          <span className="font-medium">
            $
            {(item.price * item.quantity).toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </span>
        </p>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: propTypes.object.isRequired, // The item object with details of the product
  index: propTypes.number.isRequired, // The index of the item in the cart
  updateQuantity: propTypes.func.isRequired, // Function to update item quantity
  showDeleteModal: propTypes.func.isRequired, // Function to show delete modal
};

export default CartItem;
