"use client";

import { useRouter } from "next/navigation";
import React,{ createContext } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";


const CartContext = createContext();




export const CartProvider = ({ children }) => {

  const { data: session } = useSession()
  
  const [cart, setCart] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [updated, setUpdated] = React.useState(false);
  const [loading, setLoading] = React.useState(null);
  const [dupUser, setDupUser] = React.useState(false);

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
        `${process.env.NEXT_PUBLIC_API_URL}/api/address`,
        address,
        {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${session?.user?.accessToken}`
          }
        }
      );

      if (data) {
        router.push("/me");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
      console.log(error)
    }
  };

  const updateAddress = async (id, address) => {
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/address/${id}`,
        address,
        {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${session?.user?.accessToken}`
          }
        }
      );

      if (data) {
        
        setUpdated(true);
        router.replace(`/address/${id}`);
        
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const deleteAddress = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/address/${id}`,
        {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${session?.user?.accessToken}`
          }
        }
      );

      if (data) {
        router.push("/me");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
      console.log(error)
    }
  };

  const updateProfile = async (id,formData) => {
    try {
      setLoading(true);

      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/register/${id}`,
        formData,
        {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${session?.user?.accessToken}`
          }
        }
      );

      if (data) {
        setDupUser(true)
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.message);
    }
  };



  const clearErrors = () => {
    setError(null);
  };


  const saveOnCheckout = ({ amount, tax, totalAmount }) => {
    const checkoutInfo = {
      amount,
      tax,
      totalAmount,
    };

    const newCart = { ...cart, checkoutInfo };

    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartToState();
    router.push("/shipping");
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
        updated,
        setUpdated,
        updateAddress,
        deleteAddress,
        updateProfile,
        loading,
        dupUser,
        setDupUser,
        saveOnCheckout
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;