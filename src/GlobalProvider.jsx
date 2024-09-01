'use client';

import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { CartProvider } from "@/context/CartContext"
import { ToastContainer } from "react-toastify";
import { ProductProvider } from "./context/ProductContext";
import { OrderProvider } from "./context/OrderContext";
import "react-toastify/dist/ReactToastify.css";

const GlobalProvider = ({ children, session }) => {
    return (
        <>
            <ToastContainer position="bottom-right" />
            <SessionProvider session={session}>
                <NextUIProvider>
                    <CartProvider>
                    <OrderProvider>
                        <ProductProvider>
                            {children}
                        </ProductProvider>
                        </OrderProvider>
                    </CartProvider>

                </NextUIProvider>
            </SessionProvider>
        </>
    )
}

export default GlobalProvider
