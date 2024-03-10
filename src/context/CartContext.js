"use client";

import { useRouter } from "next/navigation";
import React,{ createContext } from "react";
import axios from "axios";
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = React.useState([]);
  const [error, setError] = React.useState(null);

  const router = useRouter();

  React.useEffect(() => {
    setCartToState();
  }, []);

  const setCartToState = () => {
    setCart(
      localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : []
    );
  };

  const addItemToCart = async ({
    product,
    name,
    price,
    image,
    stock,
    seller,
    quantity = 1,
  }) => {
    const item = {
      product,
      name,
      price,
      image,
      stock,
      seller,
      quantity,
    };

    const isItemExist = cart?.cartItems?.find(
      (el) => el.product === item.product
    );

    let newCartItems;

    if (isItemExist) {
      newCartItems = cart?.cartItems?.map((el) =>
        el.product === isItemExist.product ? item : el
      );
    } else {
      newCartItems = [...(cart?.cartItems || []), item];
    }

    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  const deleteItemFromCart = (id) => {
    const newCartItems = cart?.cartItems?.filter((i) => i.product !== id);

    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };


  const addNewAddress = async (address) => {
    try {

      const { data } = await axios.post(
        `http://localhost:3000/api/address`,
        address
      );

      if (data) {
        router.push("/me");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
      console.log(error)
    }
  };

  const clearErrors = () => {
    setError(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        error,
        deleteItemFromCart,
        addNewAddress,
        clearErrors,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;