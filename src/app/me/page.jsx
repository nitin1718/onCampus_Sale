import Profile from "@/components/layouts/Profile";
import axios from "axios";
import React from "react";
import { headers } from "next/headers";

const getAddresses = async () => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/address`, {
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


export default async function Page(){
  const addresses = await getAddresses();

  return <Profile addresses={addresses} />;
};

