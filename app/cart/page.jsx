"use client";
import ProductCart from "@/components/product/ProductCart";
import Link from "next/link";
import { TruckIcon, GiftIcon } from "@heroicons/react/24/outline";
import { useStore } from "@/store/store";
import CartForm from "@/components/Forms/CartForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";


const CartComponent = () => {
  const cart = useStore((state) => state.cartProducts);
  const clearCart = useStore((state) => state.clearCart);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()

  const delivery = 7;
  const discount = 0;
  let articles_price = 0;

  const calculateTTC = () => {
    products.forEach((product) => {
      const productPrice = product.price;
      const quantity = cart.filter((id) => product._id === id).length;
      articles_price += productPrice * quantity;
    });
    const total_price = articles_price + delivery - discount;
    return total_price;
  };

  const total_price = calculateTTC();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.post("/api/cart", cart);
        setProducts(response.data);
        setLoading(false)
      } catch (error) {
        console.error("error:", error);
      }
    };

    fetch();
  }, [cart]);

  if(searchParams.toString().includes("success")){
    useEffect(() => {
      clearCart()
      setProducts([])
    },[])
    return(
      <>
        <div className=" font-semibold w-full flex flex-col items-center justify-center" style={{height: "80vh"}}>
          <img src="/Illustrations/successful-purchase.svg" alt="" className="w-80" />
          <h1 className="mt-5">Thanks for the order !</h1>
          <p>We will email you when the order will be sent.</p>
          <Link href="/" className="font-normal bg-blue text-white px-3 py-2 mt-5  hover:bg-white hover:text-blue transition-all duration-300 hover:border-blue hover:border">	&lt; Go Back Home</Link>
        </div>
      </>
    )
  }

  if(searchParams.toString().includes("canceled")){
    return(
      <>
        <div className=" font-semibold w-full flex flex-col items-center justify-center" style={{height: "80vh"}}>
          <img src="/Illustrations/cancel.svg" alt="" className="w-80" />
          <h1 className="mt-5">An error has occured !</h1>
          <p>You have canceled your order. Please try again !</p>
          <Link href="/" className="font-normal bg-blue text-white px-3 py-2 mt-5  hover:bg-white hover:text-blue transition-all duration-300 hover:border-blue hover:border">	&lt; Go Back Home</Link>
        </div>
      </>
    )
  }


  return (
    <>
      <div className="px-10 py-10 sm:px-10 md:px-32 lg:px-60">
        <h1 className="font-bold text-3xl">Cart</h1>
        <div className="mt-8">
          <Link href="/" className="bg-blue text-white mt-10 px-6 py-3">
            &lt; Continue Shopping
          </Link>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <div className="mt-5 border w-full border-gray-300">
              <div>
                <div className="p-2 text-start text-xl">Cart</div>
              </div>
              <hr></hr>
              <div>
                {cart.length > 0 ?
                  products.map((product, index) => {
                    return <ProductCart key={index} product={product} loading={loading} />;
                  }) : (
                    <>
                    <div className="w-full flex flex-col items-center py-10">
                      <img src="/Illustrations/warning.svg" alt="" className="w-52" />
                      <p className="mt-3 font-medium text-blue">Your Cart is Empty !</p>
                    </div>
                    </>
                  )}
              </div>
              <hr></hr>
              {cart && cart.length > 0 && (
                <div className="p-3">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="border border-black px-3 py-2 hover:bg-black hover:text-white transition-all duration-300"
                  >
                    Clear Cart
                  </button>
                </div>
              )}
            </div>
            <CartForm />
          </div>
          <div>
            {cart && cart.length > 0 &&
            <div className="mt-5 border w-full border-gray-300 ">
              <div>
                <div className="text-start font-normal p-5">
                  <div className="flex justify-between">
                    <p>Articles</p>
                    <p>{articles_price}£</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Discount</p>
                    <p>{discount}£</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Delivery</p>
                    <p>{delivery}£</p>
                  </div>
                  <hr className="my-5"></hr>
                  <div className="flex text-blue font-semibold justify-between">
                    <p>Total TTC</p>
                    <p>{total_price}£</p>
                  </div>
                </div>
              </div>
            </div>
            }
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
    </>
  );
};

export default CartComponent;
