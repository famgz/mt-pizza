'use client';

import { SessionProvider } from 'next-auth/react';
import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext({});

export function AppProvider({ children }) {
  const [cartProducts, setCartProcuts] = useState([]);

  const ls = typeof window !== 'undefined' ? window.localStorage : null;

  // load cart from localStorage
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
