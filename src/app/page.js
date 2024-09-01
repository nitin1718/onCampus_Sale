
import ListProducts from "@/components/products/ListProducts";
import axios from "axios";
import queryString from "query-string";


const getProducts=async(searchParams)=>{

  const urlParams={
    keyword:searchParams.keyword,
  }
  const searchQuery= queryString.stringify(urlParams)
  const {data}= await axios.get( `${process.env.NEXT_PUBLIC_API_URL}/api/products?${searchQuery}`);
  return data
}

export default async function Home({searchParams}) {

  const productsData = await getProducts(searchParams)

  return (
    <div>
     <ListProducts data={productsData} ></ListProducts>
     </div>
  )
}