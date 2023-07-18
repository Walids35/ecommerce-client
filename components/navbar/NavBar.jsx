"use client";
import PopoverButton from "./PopoverButton";
import Link from "next/link";
import {
  UserIcon,
  ShoppingCartIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import DialogMobile from "./DialogMobile";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function NavBar() {
  const [cart, setCart] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        <div className="relative rounded-full bg-white sm:col-span-3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="pl-10 pr-3 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue"
            placeholder="Search..."
          />
        </div>
        <div className="h-1/2 w-0.5 bg-black hidden lg:flex"></div>
        <div className="gap-10 hidden lg:flex">
          <Link href="/account">
            <UserIcon className="w-8" />
          </Link>
          <Link href="/cart" className="flex gap-2">
            <ShoppingCartIcon className="w-8" />
            <p className="mt-1 font-semibold text-lg">({cart})</p>
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
