import ProductDetails from '@/components/products/ProductDetails'
import React from 'react'
import axios from "axios"

const getProducts=async(id)=>{
    const {data}= await axios.get(`${process.env.API_URL}/api/products/${id}`)

    return data
}

const page = async ({params}) => {
  const product = await getProducts(params.id)


  return (
    <div><ProductDetails product={product}/></div>
  )
}

export default page