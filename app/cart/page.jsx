"use client";
import Footer from "@/components/footer/Footer";
import ProductCart from "@/components/product/ProductCart";
import Link from "next/link";
import { TruckIcon, GiftIcon } from "@heroicons/react/24/outline";
import { useStore } from "@/store/store";

const CartComponent = () => {
  const cart = useStore((state) => state.cartProducts);
  console.log(cart);

  return (
    <>
      <div className="px-10 py-10 sm:px-10 md:px-32 lg:px-60">
        <h1 className="font-bold text-3xl">Cart</h1>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <table className="mt-5 border w-full border-gray-300">
              <tr>
                <th className="p-2 text-start text-xl">Cart</th>
              </tr>
              <hr></hr>
              <tr>
                {cart.map((product, index) => {
                  return (
                    <ProductCart product={product} />
                  )
                })}
              </tr>
            </table>
            <div className="mt-8">
              <Link href="/" className="bg-blue text-white mt-10 px-6 py-3">
                Continue Shopping
              </Link>
            </div>
          </div>
          <div>
            <div className="mt-5 border w-full border-gray-300 ">
              <div>
                <div className="text-start font-normal p-5">
                  <div className="flex justify-between">
                    <p>Articles</p>
                    <p>200.99£</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Discount</p>
                    <p>0</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Delivery</p>
                    <p>7.00£</p>
                  </div>
                  <hr className="my-5"></hr>
                  <div className="flex text-blue font-semibold justify-between">
                    <p>Total TTC</p>
                    <p>207.99£</p>
                  </div>
                  <hr className="my-5"></hr>
                  <Link
                    href="/"
                    className="bg-blue text-white mt-10 px-10 py-3"
                  >
                    Shop
                  </Link>
                </div>
              </div>
            </div>
            <div className="border border-gray-300 flex items-center gap-4 mt-5 rounded-md py-2 px-5 border-l-8 border-l-black">
              <TruckIcon className="text-black w-8" />
              <p className="font-medium text-sm">Delivery All Over Tunisia</p>
            </div>
            <div className="border border-gray-300 flex items-center gap-4 mt-5 rounded-md py-2 px-5 border-l-8 border-l-black">
              <GiftIcon className="text-black w-8" />
              <p className="font-medium text-sm">
                Free Delivery From 200£ Shopping Cart
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartComponent;
