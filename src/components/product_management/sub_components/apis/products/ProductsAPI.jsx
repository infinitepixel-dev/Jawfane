//ProductsAPI.jsx

/*
A custom hook that fetches products from the API and handles product deletion
*/
import { useCallback } from "react";

//INFO Animation Libraries
import { gsap } from "gsap";

function ProductsAPI(apiUrl, setProducts, storeId) {
  // console.log("Products API Initialized", storeId);

  // Fetch updated products list
  /*
    Using Memoization to prevent unnecessary re-renders
    
    Preventing Unnecessary Rerenders: In React, if a component re-renders, all the functions inside that component are recreated on each render. If those functions are passed down as props to child components or used as dependencies in useEffect or useMemo, it can cause the child components to rerender unnecessarily or cause the useEffect to run again. Memoization helps avoid this by ensuring the function retains its identity between renders unless its dependencies change.
    */
  const fetchProducts = useCallback(async () => {
    await fetch(`${apiUrl}/api/store/${storeId}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        store_id: storeId,
      },
      credentials: "include", // Include credentials (cookies, etc.) if needed
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Products fetched successfully", data);

        return setProducts(data);
      })
      .catch((err) =>
        console.error("Uh oh! There was an error getting products", err)
      );
  }, [apiUrl, setProducts, storeId]); // Memoize based on apiUrl and setProducts

  // Handle bulk deletion of selected products
  const deleteMultipleProducts = async (
    selectedProductIds,
    trashIconRefs,
    cardRefs
  ) => {
    const deletePromises = selectedProductIds.map((productId) => {
      const deleteProduct = async () => {
        const trashIconRef = trashIconRefs.current[productId];
        const cardRef = cardRefs.current[productId];

        if (!trashIconRef || !cardRef) return;

        // Animate the trash icon
        await gsap.to(trashIconRef, {
          rotate: 90,
          repeat: 3,
          yoyo: true,
          duration: 0.1,
        });

        const deleteUrl = `${apiUrl}/api/products/${productId}`;
        try {
          const response = await fetch(deleteUrl, {
            method: "DELETE",
            headers: {
              store_id: storeId,
              "Content-Type": "application/json",
            },
            credentials: "include",
          });

          if (!response.ok) {
            const errorData = await response.json();
            console.error("Error:", errorData);
          } else {
            // Animate the card itself before removing it
            await gsap.to(cardRef, {
              opacity: 0,
              y: -50,
              duration: 0.5,
              onComplete: () => {
                setProducts((prevProducts) =>
                  prevProducts.filter((product) => product.id !== productId)
                );
              },
            });
          }
        } catch (err) {
          console.error("Uh oh! There was an error deleting the product!", err);
        }
      };

      return deleteProduct();
    });

    // Wait for all delete operations to complete
    await Promise.all(deletePromises);
  };

  //returns functions to be used in other components
  return {
    fetchProducts,
    deleteMultipleProducts, // Renamed function
  };
}

export default ProductsAPI;
