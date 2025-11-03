import React, { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [quickCheckoutProduct, setQuickCheckoutProduct] = useState({})
  const [store, setStore] = useState({})
  const [discountValue, setDiscountValue] = useState(0)
  const [loading, setLoading] = useState(true)

  const subdomain = window.location.hostname;

  useEffect(() => {
    try {
      setLoading(true)
        ; (async () => {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/store/data`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ subdomain })
          })
          const responseData = await response.json();
          if (responseData.data.store.status === true) {
            setStore(responseData.data.store)
          }


        })()

      setLoading(false)

    } catch (error) {
      console.log("Error", error)
      setLoading(false)
    }
  }, [])

  const addQuickCheckoutProduct = (product) => {
    setQuickCheckoutProduct(product)
  }

  const addToCart = (product) => {
    setCart([...cart, product]);
    toast.success("Product added in cart")
    window.Growo.addToCart({ id: product._id, name: product.name, price: product.price });
  };

  const removeFromCart = (productId) => {
    console.log(productId)
    setCart(cart.filter((item, index) => index !== productId));
  };

  const removeAllProductsFromCart = () => {
    setCart([])
  }

  const updateQuantity = (productId, quantity) => {
    setCart(
      cart.map((item, index) =>
        index === productId ? { ...item, quantity: quantity } : item
      )
    );
  };

  const calculateTotal = () => {
    const productTotals = cart.reduce((total, item) => total + item.salePrice * item.quantity, 0);

    if (!store?.deliveryChargesTiers || store.deliveryChargesTiers.length === 0) {
      return {
        productTotals,
        finalTotal: productTotals - discountValue,
        deliveryCharge: 0,
      };
    }

    for (const tier of store.deliveryChargesTiers) {
      const min = Number(tier.min);
      const max = tier.max !== null ? Number(tier.max) : null;
      const charge = Number(tier.charge);

      if (max === null && productTotals >= min) {
        return {
          productTotals,
          finalTotal: productTotals + charge - discountValue,
          deliveryCharge: charge,
        };
      }

      if (productTotals >= min && productTotals < max) {
        return {
          productTotals,
          finalTotal: productTotals + charge - discountValue,
          deliveryCharge: charge,
        };
      }
    }

    // If no tier matches, assume free or fallback to product total
    return {
      productTotals,
      finalTotal: productTotals - discountValue,
      deliveryCharge: 0,
    };
  };


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, discountValue, setDiscountValue, removeAllProductsFromCart, calculateTotal, addQuickCheckoutProduct, quickCheckoutProduct }}>
      {children}
    </CartContext.Provider>
  );
};
