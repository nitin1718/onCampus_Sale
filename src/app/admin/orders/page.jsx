
import React from "react";
import Orders from "@/components/admin/Orders";
import { headers } from "next/headers";
import axios from "axios";
const getOrders = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/admin`, {
        method: "GET",
        headers: headers(), 
      });
      
      const data =  response.data
      
      return data;
    } catch (error) {
      console.error('Error during fetch:', error);
      throw error; 
    }
  };
  

const AdminOrdersPage = async ({ searchParams }) => {
  const orders = await getOrders(searchParams);

  return <Orders orders={orders} />;
};

export default AdminOrdersPage;