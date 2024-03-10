"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from 'next-auth/react'
import UserAddresses from "../user/UserAddresses";

const Profile = ({ addresses }) => {

  const { data: session } = useSession()

  return (
    <>
      <figure className="flex items-start sm:items-center">
        <div className="relative">
        <img
              className="w-10 h-10 rounded-full"
              src='https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg'
            />
        </div>
        <figcaption>
          <h5 className="font-semibold text-lg">{session?.user?.username}</h5>
          <p>
            <b>Email:</b> {session?.user?.email} | <b>Joined On: </b>
            {session?.user?.createdAt.substring(0,10)}
          </p>
        </figcaption>
      </figure>

      <hr className="my-4" />

      <UserAddresses addresses={addresses} />

      <Link href="/address/new">
        <button className="px-4 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100">
          <i className="mr-1 fa fa-plus"></i> Add new address
        </button>
      </Link>

      <hr className="my-4" />
    </>
  );
};

export default Profile;