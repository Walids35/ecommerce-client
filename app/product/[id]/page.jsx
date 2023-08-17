"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import ImageCarousel from "@/components/ImageCarousel";
import Footer from "@/components/footer/Footer";
import { useStore } from "@/store/store";
import { HeartIcon } from "@heroicons/react/20/solid";

const page = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const addToCart = useStore((store) => store.addToCart)

  //Verify if the object isEmpty
  function isEmpty(obj) {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }
  
    return true;
  }

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/cart/${id}`);
      console.log(response.data[0]);
      setProduct(response.data[0]);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    for(let i =0; i < quantity; i++){
      addToCart(product._id)
    }
    setQuantity(1)
  }
  return (
    <>
      <div className="px-10 py-10 md:px-28 lg:px-60">
        {!isEmpty(product) ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {product.images && (
            <div>
              <ImageCarousel images={product.images} />
            </div>
          )}
          <div className="py-10">
            <h1 className="font-bold text-black text-2xl">{product.title}<HeartIcon className="w-6"/></h1>  
            <p className="text-sm mt-5">{product.description}</p>
            <div className="flex flex-col">
            <label className="text-sm mt-5 font-medium">Quantity</label>
            <input 
            value={quantity}
            type="number"
            className="px-3 py-2 w-1/2 mt-1 focus:ring-blue"
            onChange={(e) => setQuantity(e.currentTarget.value)}
            />
            </div>
            <button type="button" onClick={handleAddToCart} disabled={quantity == 0 ? true : false} className="hover:bg-black disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500 hover:text-white transition-all duration-300 border border-black text-black px-3 py-2 mt-5 bg-white">Add to cart</button>
          </div>
        </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="w-full h-96 bg-slate-500 opacity-20"></div>
              <div>
                <div className="h-10 w-full bg-slate-500 opacity-20 mt-3"></div>
                <div className="h-10 w-1/2 bg-slate-500 opacity-20 mt-3"></div>
                <div className="h-10 w-1/3 bg-slate-500 opacity-20 mt-3"></div>
                <div className="h-5 w-full bg-slate-500 opacity-20 mt-8"></div>
                <div className="h-5 w-full bg-slate-500 opacity-20 mt-3"></div>
                <div className="h-5 w-full bg-slate-500 opacity-20 mt-3"></div>
                <div className="h-5 w-full bg-slate-500 opacity-20 mt-3"></div>
                <div className="h-10 w-1/3 bg-slate-500 opacity-20 mt-5"></div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default page;
