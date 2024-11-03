"use client";
import PopoverButton from "./PopoverButton";
import Link from "next/link";
import {
  ShoppingCartIcon,
  Bars3Icon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState, useRef } from "react";
import DialogMobile from "./DialogMobile";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useStore } from "../../store/store";
import axios from "axios";
import { useWishList } from "@/store/wishlist";

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
  const cart = useStore((store) => store.cartProducts);
  const getCartProducts = useStore((store) => store.getCartProducts);
  const getWishlistProducts = useWishList((store) => store.getWishListProducts);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchBarRef = useRef(null);
  const [displayEmptyResults, setDisplayEmptyResults] = useState(false);

  useEffect(() => {
    getCartProducts();
  }, [getCartProducts]);

  useEffect(() => {
    getWishlistProducts();
  }, [getWishlistProducts]);

  useClickOutside(searchBarRef, () => {
    setShowResults(false);
  });

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const fetchSearchResults = async () => {
        try {
          const response = await axios.get(
            `/api/search?searchQuery=${searchQuery}`
          );
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
    <div className="fixed z-10 w-full flex justify-center bg-white drop-shadow-md mx-auto">
      <div className="py-5 mt-10 flex  items-center md:gap-10 mx-auto max-w-5xl">
        <img src="/logo.png" className="hidden sm:flex w-32" alt="logo" />
        <Link
          className="hidden sm:block text-sm font-semibold leading-6 text-gray-900 hover:text-blue"
          href="/"
        >
          Home
        </Link>
        <PopoverButton />
        <div
          className="relative rounded-full bg-white sm:col-span-3"
          ref={searchBarRef}
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="pl-10 pr-3 py-2 w-80 lg:w-96 rounded-full focus:outline-none focus:ring-2 focus:ring-blue"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {showResults && (
            <div className="absolute top-full mt-2 bg-white w-full border border-gray-300 rounded-md shadow-lg z-10">
              <p className="px-4 py-2 text-sm">
                Search Results (Found out {searchResults.length} elements)
              </p>
              {searchResults?.length > 0 &&
                searchResults.slice(0, 6).map((product) => (
                  <div
                    key={product._id}
                    className=" hover:bg-full-white border border-b-2 "
                  >
                    <Link
                      href={`/product/${product._id}`}
                      onClick={() => setSearchQuery("")}
                      className="flex px-4 py-4 items-center"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-16 h-16 mr-4 rounded-md"
                      />
                      <div className="flex flex-row">
                        <h3 className="text-gray-900 font-medium text-sm">
                          {product.title}
                        </h3>
                        <h3 className="font-semibold text-blue">
                          {product.price}£
                        </h3>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          )}
        </div>
        <Link href="/cart" className="md:flex gap-2 hover:text-blue hidden sm:block ">
          <ShoppingCartIcon className="w-8" />
          <p className="mt-1 font-semibold text-lg">({cart.length})</p>
        </Link>
        <Link href="/wishlist" className="md:flex gap-3 hover:text-blue hidden sm:block ">
          <HeartIcon className="w-8" />
        </Link>
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
    </div>
  );
}
