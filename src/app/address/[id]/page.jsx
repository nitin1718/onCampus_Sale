import axios from "axios";
import React from "react";
import { cookies } from "next/headers";
import UpdateAddress from "@/components/user/updateAddress";
import { headers } from "next/headers";

const getAddress = async (id) => {
try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/address/${id}`, {
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

const UpdateAddressPage = async ({ params }) => {
  const address = await getAddress(params?.id);

  return <UpdateAddress id={params?.id} address={address} />;
};

export default UpdateAddressPage;