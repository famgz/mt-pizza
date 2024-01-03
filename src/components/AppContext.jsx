'use client';

import { SessionProvider } from 'next-auth/react';
import { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const CartContext = createContext({});

export function cartTotalPrice(cartProducts) {
  let total = 0
  for(const product of cartProducts) {
    total += cartProductTotalPrice(product)
  }
  return total
}

export function cartProductTotalPrice(cartProduct) {
  let totalPrice = cartProduct.basePrice;
  if (cartProduct.size) totalPrice += cartProduct.size.price;

  if (cartProduct.extras?.length > 0) {
    for (const extra of cartProduct.extras) {
      totalPrice += extra.price;
    }
  }
  return totalPrice;
}

export function AppProvider({ children }) {
  const [cartProducts, setCartProcuts] = useState([]);

  const ls = typeof window !== 'undefined' ? window.localStorage : null;

  // load cart from localStorage at loading
  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProcuts(JSON.parse(ls.getItem('cart')));
    }
  }, []);

  function saveCartProductsToLocalStorage(cartProducts) {
    if (ls) {
      ls.setItem('cart', JSON.stringify(cartProducts));
    }
  }

  function clearCart() {
    setCartProcuts([]);
    saveCartProductsToLocalStorage([]);
  }

  function removeCartProduct(indextoRemove) {
    setCartProcuts((prevCartProducts) => {
      const newCartProducts = prevCartProducts.filter(
        (_, index) => index !== indextoRemove
      );
      saveCartProductsToLocalStorage(newCartProducts);
      return newCartProducts;
    });
    toast.success('Product removed')
  }

  function addToCart(product, size = null, extras = []) {
    setCartProcuts((prevProducts) => {
      const cartProduct = { ...product, size, extras };
      const newProducts = [...prevProducts, cartProduct];
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
  }

  return (
    <SessionProvider>
      <CartContext.Provider
        value={{
          cartProducts,
          setCartProcuts,
          addToCart,
          clearCart,
          removeCartProduct,
        }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}
