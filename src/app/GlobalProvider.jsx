
import { CartProvider } from "@/context/CartContext"

export default function GlobalProvider({children}){
    return(
        <CartProvider>
            {children}
           
        </CartProvider>
    )
}