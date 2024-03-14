'use client'

import React, { createContext, useContext } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useSession } from "next-auth/react"

const ProductContext = createContext()

export const ProductProvider = ({ children }) => {

    const router = useRouter()

    const { data: session } = useSession()

    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(null);
    const [updated, setUpdated] = React.useState(false);

    const newProduct = async (product) => {

        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/products`,
                product,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${session?.user?.accessToken}`
                    }
                }
               
            )

            if (data) {
                router.replace("/admin/products")
            }
        } catch (error) {
            setError(error?.response?.data?.message)
        }
    }

    const clearErrors = () => {
        setError(null)
      }
      return (
        <ProductContext.Provider
          value={{
            error,
            loading,
            updated,
            setUpdated,
            newProduct,
            clearErrors,
          }}>{children}</ProductContext.Provider>
      )
}

export default ProductContext;