"use client"
import { useRouter } from "next/navigation";
import { createContext } from "react";
import React from "react";

const cartContext = createContext()

export const CartProvider=({children})=>{

    const [cart,setCart]= React.useState([])
    const router = useRouter;

    React.useEffect(()=>{
        setCartToState()
    },[])

    const setCartToState=()=>{
        setCart(
            localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')) :[]
        )
    }

    const addItemToCart=async({
        product,name,price,stock,seller,quantity=1
    })=>{
        const item ={
            product,name,price,stock,seller,quantity
        }

        const ifItemExists= cart?.cartItems?.find((el)=>{
            el.product===item.product
        })

        let newCartItems;

        if(ifItemExists){
           newCartItems= cart?.cartItems?.map((el)=>{
            ifItemExists.product===el.product?item:el
           })
        }
        else{
           newCartItems =[...(cart?.cartItems||[]),item]
        }
        localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
        setCartToState();
    }
    return(
        <cartContext.Provider value={{cart,addItemToCart}}>
        {children}
        </cartContext.Provider>
    )
}


export default cartContext;