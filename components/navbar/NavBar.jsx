"use client";
import PopoverButton from "./PopoverButton";
import Link from "next/link";
import {
  UserIcon,
  ShoppingCartIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { useEffect, useState,useRef } from "react";
import DialogMobile from "./DialogMobile";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useStore } from "../../store/store";
import axios from "axios";

const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
};

export default function NavBar() {
  // const [cart, setCart] = useState(0);
  const cart = useStore((store) => store.cartProducts)
  const getCartProducts = useStore((store) => store.getCartProducts)
  const clearCart = useStore((store) => store.clearCart)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchBarRef = useRef(null);
  const [displayEmptyResults, setDisplayEmptyResults] = useState(false);
  
  useEffect(() => {
    getCartProducts()
  },[getCartProducts])

  useClickOutside(searchBarRef, () => {
    setShowResults(false);
  });

 useEffect(() => {
    if (searchQuery.trim() !== "") {
      const fetchSearchResults = async () => {
        try {
          const response = await axios.get(`/api/search?searchQuery=${searchQuery}`);
          const data = response.data;
          setSearchResults(data);
          setShowResults(true);
        } catch (error) {
          console.error(error);
        }
      };
      fetchSearchResults();
      setDisplayEmptyResults(false);
    } else {
      if (showResults) {
        setShowResults(false);
      }
      setSearchResults([]);
      setDisplayEmptyResults(true);
    }
  }, [searchQuery, showResults]);

  return (
    <>
      <div className="h-20 bg-white flex items-center justify-between px-6 lg:px-24 xl:px-60 drop-shadow-md">
        <img src="/logo.svg" className="hidden sm:flex w-32" alt="logo"/>
        <div className="gap-5 font-semibold items-baseline hidden lg:flex">
          <Link
            className="text-sm font-semibold leading-6 text-gray-900"
            href="/"
          >
            Home
          </Link>
          <PopoverButton />
          <Link
            className="text-sm font-semibold leading-6 text-gray-900 flex gap-1"
            href="/allproducts"
          >
            <p>All</p>
            <p> Products</p>
          </Link>
        </div>
        <div className="relative rounded-full bg-white sm:col-span-3" ref={searchBarRef}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="pl-10 pr-3 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {showResults && (
          <div className="absolute top-full mt-2 bg-white w-full border border-gray-300 rounded-md shadow-lg z-10">
            {searchResults.map((product) => (
              <div key={product._id} className="flex px-4 py-2">
                <img
                  src={product.images[0]} 
                  alt={product.title}
                  className="w-16 h-16 mr-4 rounded-md"
                />
                <div className="flex flex-col">
                  <h3 className="text-gray-900 font-medium">{product.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
        <div className="h-1/2 w-0.5 bg-black hidden lg:flex"></div>
        <div className="gap-10 hidden lg:flex">
          <Link href="/account">
            <UserIcon className="w-8" />
          </Link>
          <Link href="/cart" className="flex gap-2">
            <ShoppingCartIcon className="w-8" />
            <p className="mt-1 font-semibold text-lg">({cart.length})</p>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <DialogMobile
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      </div>
    </>
  );
}
