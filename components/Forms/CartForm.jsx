"use client";
import { useStore } from "@/store/store";
import { useState } from "react";

const CartForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const cartProducts = useStore((store) => store.cartProducts);

  const handleSubmit = () => {
    const data = {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
    };
    console.log(data);
  };

  return (
    <div className="w-full mt-5 border border-gray-300">
      <form onSubmit={handleSubmit}>
        <p className="p-3 font-medium">Personal Information</p>
        <hr></hr>
        <div className="px-8 py-5">
          <label htmlFor="name" className="text-xs">
            Full Name <span className="text-red font-bold">**</span>
          </label>
          <input
            required
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=" bg-white mb-3 block w-full md:w-1/2 xl:w-1/3 border-0 p-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <label htmlFor="email" className="text-xs">
            Email Address <span className="text-red font-bold">**</span>{" "}
          </label>
          <input
            required
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" bg-white block w-full md:w-1/2 xl:w-1/3 border-0 p-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <hr></hr>
        <p className="p-3 font-medium">Delivery Location</p>
        <hr></hr>
        <div className="px-8 py-5">
          <label htmlFor="country" className="text-xs">
            Country <span className="text-red font-bold">**</span>
          </label>
          <input
            required
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className=" bg-white mb-3 block w-full md:w-1/2 xl:w-1/3 border-0 p-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <label htmlFor="city" className="text-xs">
            City <span className="text-red font-bold">**</span>
          </label>
          <input
            required
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className=" bg-white mb-3 block w-full md:w-1/2 xl:w-1/3 border-0 p-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <label htmlFor="postalCode" className="text-xs">
            Postal Code <span className="text-red font-bold">**</span>
          </label>
          <input
            required
            type="text"
            id="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className=" bg-white mb-3 block w-full md:w-1/2 xl:w-1/3 border-0 p-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <label htmlFor="streetAddress" className="text-xs">
            Street Address <span className="text-red font-bold">**</span>
          </label>
          <input
            required
            type="text"
            id="streetAddress"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            className=" bg-white mb-3 block w-full md:w-1/2 xl:w-1/3 border-0 p-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <button type="submit" className="bg-blue text-white px-6 py-3">Order Now &#62;</button>
        </div>
      </form>
    </div>
  );
};

export default CartForm;