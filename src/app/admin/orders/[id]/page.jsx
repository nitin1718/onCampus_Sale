import axios from "axios";
import React from "react";
import { cookies } from "next/headers";
import UpdateOrder from "@/components/admin/UpdateOrder";
import { headers } from "next/headers";

const getOrder = async (id) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${id}`, {
        method: "GET",
        headers: headers(), 
      });
   
        const data =response.data
      return data;
    } catch (error) {
      console.error('Error during fetch:', error);
      throw error; 
    }
  };
  

const AdminOrderDetailsPage = async ({ params }) => {
  const data = await getOrder(params.id);
  return <UpdateOrder order={data.orders} />;
};

export default AdminOrderDetailsPage;