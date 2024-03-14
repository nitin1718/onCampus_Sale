'use client';

import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { CartProvider } from "@/context/CartContext"
import { ToastContainer } from "react-toastify";
import { ProductProvider } from "./context/ProductContext";
import "react-toastify/dist/ReactToastify.css";

const GlobalProvider = ({ children, session }) => {
    return (
        <>
            <ToastContainer position="bottom-right" />
            <SessionProvider session={session}>
                <NextUIProvider>
                    <CartProvider>
                        <ProductProvider>
                            {children}
                        </ProductProvider>
                    </CartProvider>

                </NextUIProvider>
            </SessionProvider>
        </>
    )
}

export default GlobalProvider
