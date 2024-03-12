"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Checkbox } from "@nextui-org/react";


const Filters = () => {
  const [min, setMin] = React.useState("");
  const [max, setMax] = React.useState("");

  const router = useRouter();

  let queryParams;

  function handleClick(checkbox) {
    // if (typeof window !== "undefined") {
    //   queryParams = new URLSearchParams(window.location.search);
    // }

    // const checkboxes = document.getElementsByName(checkbox.name);

    // checkboxes.forEach((item) => {
    //   if (item !== checkbox) item.checked = false;
    // });

    // if (checkbox.checked === false) {

    //   queryParams.delete(checkbox.name);
    // } else {
    //   if (queryParams.has(checkbox.name)) {
    //     queryParams.set(checkbox.name, checkbox.value);
    //   } else {
    //     queryParams.append(checkbox.name, checkbox.value);
    //   }
    // }
    // const path = window.location.pathname + "?" + queryParams.toString();
    // // router.push(path);
  }


  function checkHandler(checkBoxType, checkBoxValue) {
    // if (typeof window !== "undefined") {
    //   queryParams = new URLSearchParams(window.location.search);

    //   const value = queryParams.get(checkBoxType);
    //   if (checkBoxValue === value) return true;
    //   return false;
    // }
  }
  return (
    <aside className="md:w-1/3 lg:w-1/4 px-4">
      <a
        className="md:hidden mb-5  w-full text-center px-4 py-2 inline-block text-lg text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
        href="#"
      >
        Filter by
      </a>
      <div className="hidden md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
        <h3 className="font-semibold mb-2">Price ($)</h3>
        <div className="grid md:grid-cols-3 gap-x-2">
          <div className="mb-4">
            <input
              name="min"
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="number"
              placeholder="Min"
            />
          </div>

          <div className="mb-4">
            <input
              name="max"
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="number"
              placeholder="Max"
            />
          </div>

          <div className="mb-4">
            <button className="px-1 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
              Go
            </button>
          </div>
        </div>
      </div>

      <div className="hidden md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">

      <h3 className="font-semibold mb-2">Category</h3>

<ul className="space-y-1">
  <li>
    <label className="flex items-center">
      <input
        name="category"
        type="checkbox"
        value="Electronics"
        className="h-4 w-4"
        defaultChecked={checkHandler("category", "Electronics")}
        onClick={(e) => handleClick(e.target)}
      />
      <span className="ml-2 text-gray-500"> Electronics </span>
    </label>
  </li>
  <li>
    <label className="flex items-center">
      <input
        name="category"
        type="checkbox"
        value="Laptops"
        className="h-4 w-4"
        defaultChecked={checkHandler("category", "Laptops")}
        onClick={(e) => handleClick(e.target)}
      />
      <span className="ml-2 text-gray-500"> Laptops </span>
    </label>
  </li>
  <li>
    <label className="flex items-center">
      <input
        name="category"
        type="checkbox"
        value="Headphones"
        className="h-4 w-4"
        defaultChecked={checkHandler("category", "Headphones")}
        onClick={(e) => handleClick(e.target)}
      />
      <span className="ml-2 text-gray-500"> Headphones </span>
    </label>
  </li>
  <li>
    <label className="flex items-center">
      <input
        name="category"
        type="checkbox"
        value="Cameras"
        className="h-4 w-4"
        defaultChecked={checkHandler("category", "Cameras")}
        onClick={(e) => handleClick(e.target)}
      />
      <span className="ml-2 text-gray-500"> Cameras </span>
    </label>
  </li>
  <li>
    <label className="flex items-center">
      <input
        name="category"
        type="checkbox"
        value="Sports"
        className="h-4 w-4"
        defaultChecked={checkHandler("category", "Sports")}
        onClick={(e) => handleClick(e.target)}
      />
      <span className="ml-2 text-gray-500"> Sports </span>
    </label>
  </li>
  <li>
    <label className="flex items-center">
      <input
        name="category"
        type="checkbox"
        value="Accessories"
        className="h-4 w-4"
        defaultChecked={checkHandler("category", "Accessories")}
        onClick={(e) => handleClick(e.target)}
      />
      <span className="ml-2 text-gray-500"> Accessories </span>
    </label>
  </li>
</ul>
      </div>
    </aside>
  );
};

export default Filters;