'use client';

import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { CartProvider } from "@/context/CartContext"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function GlobalProvider({children,session}){
    return(
        <>
        <ToastContainer position="bottom-right" />
        <SessionProvider session={session}>
    <NextUIProvider>
    <CartProvider>
        {children}
        </CartProvider>
        </NextUIProvider>
    </SessionProvider>
    </>
    )
}
