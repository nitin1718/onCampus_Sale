import axios from "axios";
import React from "react";
import { headers } from "next/headers";
import Shipping from "@/components/cart/Shipping";

const getAddresses = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/address`, {
        method: "GET",
        headers: headers(), 
      });
  
      if (!response.ok) {
        console.error(`Failed to fetch data. Status: ${response.status}`);
        return null; 
      }
      
      const data = await response.json();
  
      return data.addresses;
    } catch (error) {
      console.error('Error during fetch:', error);
      throw error; 
    }
  };
  
const ShippingPage = async () => {
  const addresses = await getAddresses();

  return <Shipping addresses={addresses} />;
};

export default ShippingPage;