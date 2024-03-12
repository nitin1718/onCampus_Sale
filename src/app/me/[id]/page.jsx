import UpdateProfile from "@/components/user/UpdateProfile";
import React from "react";
import { headers } from "next/headers";

const getUser = async (id) => {
  try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register/${id}`, {
        method: "GET",
        headers: headers(), 
      });
  
      if (!response.ok) {
      
        return null; 
      }
      
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error during fetch:', error);
      throw error; 
    }
  };
  

const UpdateProfilePage = async ({params}) => {
  const user = await getUser(params?.id);

  return <UpdateProfile id={params?.id} user={user} />;
};

export default UpdateProfilePage;