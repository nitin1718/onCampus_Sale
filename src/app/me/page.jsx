import Profile from "@/components/layouts/Profile";
import axios from "axios";
import React from "react";

const getAddresses = async () => {
  const { data } = await axios.get(`${process.env.API_URL}/api/address`);

  return data?.addresses;
};

export default async function Page(){
  const addresses = await getAddresses();

  return <Profile addresses={addresses} />;
};

