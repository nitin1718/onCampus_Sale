import React from "react";
import axios from "axios";
import Products from "@/components/admin/Products";

const getProducts = async () => {

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products`
  );
  return data;
};

const HomePage = async () => {
  const data = await getProducts();

  return <Products data={data} />;
};

export default HomePage;