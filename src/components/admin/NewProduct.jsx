"use client";

import ProductContext from "@/context/ProductContext";
import Image from "next/image";
import React, { useContext, useState } from "react";

const NewProduct = () => {

    const CLOUD_NAME = 'dxaes9us3'
    const UPLOAD_PRESET = 'campus_resale'

    const [pictures, setPictures] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const onChanges = (e) => {
        const files = Array.from(e.target.files);

        setPictures([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((oldArray) => [...oldArray, reader.result]);
                }
            };

            setPictures((oldArray) => [...oldArray, file]);
            reader.readAsDataURL(file);
        });
    };




    const uploadImage = async () => {
        if (!pictures) return

        const url = []
        for (const image of pictures) {
            const formData = new FormData()

            formData.append("file", image)
            formData.append("upload_preset", UPLOAD_PRESET)
            try {

                const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                    method: "POST",
                    body: formData
                })

                const data = await res.json()

                const imageUrl = data['secure_url']

                url.push(imageUrl)
            } catch (error) {
                console.log(error)
            }
        }

        return url
    }



    const { newProduct } = useContext(ProductContext);

    const [product, setProduct] = useState({
        name: "",
        description: "",
        seller: "",
        price: "",
        stock: "",
        category: "Electronics",
        images: []
    });

    const { name, description, seller, price, stock, category, images } = product;

    const onChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const categories = [
        "Electronics",
        "Cameras",
        "Laptops",
        "Accessories",
        "Headphones",
        "Sports",
    ];

    const submitHandler =async (e) => {
 

        e.preventDefault();

        const imageUrl =await uploadImage()

        console.log(imageUrl)

        product.images=imageUrl

        newProduct(product);
    };

    return (
        <section className="container max-w-3xl p-6 mx-auto">
            <h1 className="mb-3 text-xl md:text-3xl font-semibold text-black mb-8">
                Create New Product
            </h1>

            <form onSubmit={submitHandler}>
                <div className="mb-4">
                    <label className="block mb-1"> Name </label>
                    <input
                        type="text"
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        placeholder="Product name"
                        name="name"
                        value={name}
                        onChange={onChange}
                        required
                    />
                </div>

                <div className="mb-4 mt-5">
                    <label className="block mb-1"> Description </label>
                    <textarea
                        rows="4"
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        placeholder="Product description"
                        name="description"
                        value={description}
                        onChange={onChange}
                        required
                    ></textarea>
                </div>

                <div className="grid md:grid-cols-2 gap-x-2 mt-5">
                    <div className="mb-4">
                        <label className="block mb-1"> Price </label>
                        <div className="relative">
                            <div className="col-span-2">
                                <input
                                    type="text"
                                    className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                                    placeholder="0.00"
                                    name="price"
                                    value={price}
                                    onChange={onChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1"> Category </label>
                        <div className="relative">
                            <select
                                className="block appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                                name="category"
                                value={category}
                                onChange={onChange}
                                required
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                            <i className="absolute inset-y-0 right-0 p-2 text-gray-400">
                                <svg
                                    width="22"
                                    height="22"
                                    className="fill-current"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M7 10l5 5 5-5H7z"></path>
                                </svg>
                            </i>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-x-2 mt-5">
                    <div className="mb-4">
                        <label className="block mb-1"> Seller / Brand </label>
                        <input
                            type="text"
                            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                            placeholder="Seller or brand"
                            name="seller"
                            value={seller}
                            onChange={onChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1"> Stock </label>
                        <div className="relative">
                            <div className="col-span-2">
                                <input
                                    type="text"
                                    className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                                    placeholder="0"
                                    name="stock"
                                    value={stock}
                                    onChange={onChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-4 flex flex-col md:flex-row">

                    <div className="w-full">
                        <label className="block mb-1"> Upload Product Images </label>
                        <input
                            className="form-control block w-full px-2 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-8"
                            type="file"
                            id="formFile"
                            multiple
                            onChange={onChanges}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-6 gap-2 my-5">
                    {imagesPreview?.map((img) => (
                        <Image
                            src={img}
                            key={img}
                            alt="Preview"
                            className="col-span-1 object-contain shadow rounded border-2 border-gray p-2 h-full w-full"
                            width="50"
                            height="50"
                        />
                    ))}
                </div>

                <button
                    type="submit"
                    className="my-2 px-4 py-2 text-center inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 w-full"
                >
                    Create Product
                </button>
            </form>
        </section>
    );
};

export default NewProduct;