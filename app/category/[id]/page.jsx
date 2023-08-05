"use client";
import { useParams } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import Footer from "@/components/footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

export default function page() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [properties, setProperties] = useState([])

  async function fetchCategory() {
    try {
      const response = await axios.get(`/api/category/${id}`);
      setCategory(response.data[0]);
    } catch {
      console.log(error);
    }
  }

  useEffect(
    () => (
      axios
        .get(`/api/product/${id}`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.log(error);
        }),
      fetchCategory()
    ),
    []
  );

  return (
    <>
      <div className="px-10 py-10 sm:px-10 md:px-32 lg:px-60">
        <h1 className="font-bold text-3xl">{category && category.name}</h1>
        <h2 className="font-semibold text-xl">Today's Best Deals For You !</h2>
        <div className="mt-5 flex gap-8">
          {category.parent?.properties.map((index, property) => {
            return(
              <select name={property}>
                {category.parent.properties[property].values.map((value) => {
                  return(<option value={value}>{value}</option>)
                })}
              </select>
            )
          })}
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
          {products.length > 0 ? (
            products.map((product, index) => {
              return <ProductCard product={product} />;
            })
          ) : (
            <div>Waiting ...</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
