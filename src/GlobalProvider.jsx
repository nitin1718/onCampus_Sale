'use client';

import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { CartProvider } from "@/context/CartContext"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GlobalProvider=({children,session})=>{
    return(
        <SessionProvider session={session}>
    <NextUIProvider>
    <CartProvider>
        {children}
        </CartProvider>
        </NextUIProvider>
    </SessionProvider>
    )
}

export default GlobalProvider
