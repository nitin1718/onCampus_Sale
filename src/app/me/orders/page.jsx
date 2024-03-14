
import axios from "axios";
import React from "react";
import { headers } from "next/headers";
import ListOrders from "@/components/orders/ListOrders";

const getOrders = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/me`, {
      method: "GET",
      headers: headers(), 
    });

    if (!response.ok) {
      console.error(`Failed to fetch data. Status: ${response.status}`);
      return null; 
    }
    
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error during fetch:', error);
    throw error; 
  }
};


export default async function Page(){
  const orders = await getOrders();

  return <ListOrders orders={orders} />;
};

