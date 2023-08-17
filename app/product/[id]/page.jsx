"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import ImageCarousel from "@/components/ImageCarousel";

const page = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

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

  return (
    <>
      <div className="px-10 py-10 md:px-28 lg:px-60">
        {product && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {product.images && (
            <div>
              <ImageCarousel images={product.images} />
            </div>
          )}
          <div className="py-10">
            <h1 className="font-bold text-black text-2xl">{product.title}</h1>
            <p className="text-sm mt-5">{product.description}</p>
          </div>
        </div>
        )}
      </div>
    </>
  );
};

export default page;
