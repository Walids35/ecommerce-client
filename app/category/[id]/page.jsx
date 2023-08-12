"use client";
import { useParams, useSearchParams } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import Footer from "@/components/footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import HeaderLoading from "@/components/loading/HeaderLoading";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function page() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});

  useEffect(() => {
    const filterProducts = async() => {
      const data = {}
      for (const [key, value] of searchParams.entries()) {
        data[key] = value
      }
      try{
        console.log("Sended Data to '/api/product': ", data)
        const response = await axios.post("/api/product", data);
        console.log(response.data)
      }catch(error){
        console.log(error)
      }
    }
    filterProducts()
  },[searchParams])

  const propertiesToFill = [];
  if (category) {
    let catInfo = category;
    if (catInfo.properties?.length > 0) {
      for (let i = 0; i < catInfo.properties?.length; i++) {
        propertiesToFill.push(catInfo.properties[i]);
      }
    }
    while (catInfo.parent?.properties.length > 0) {
      for (let i = 0; i < catInfo.parent?.properties.length; i++) {
        propertiesToFill.push(catInfo.parent?.properties[i]);
      }
      catInfo = catInfo.parent;
    }
  }

  const handleCheckboxChange = (event, property, value) => {
    const isChecked = event.target.checked;

    const params = new URLSearchParams(searchParams);
    const existingValue = params.get(property.name);

    if (isChecked) {
      params.set(property.name, existingValue ? `${existingValue}.${value}` : value);
    } else {
      if (existingValue) {
        const values = existingValue.split('.').filter(val => val !== value);
        
        if (values.length > 0) {
          params.set(property.name, values.join('.'));
        } else {
          params.delete(property.name); // Remove the key if no values are left
        }
      }
    }

    const newQueryString = params.toString();
    router.push(pathname + '?' + newQueryString);
  };

  async function fetchCategory() {
    try {
      const response = await axios.get(`/api/category/${id}`);
      setCategory(response.data[0]);
    } catch {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategory();
    fetchProducts();
  }, []);

  async function fetchProducts() {
    axios
      .get(`/api/product/${id}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className="px-10 py-10 sm:px-10 md:px-32 lg:px-60">
        {category && category.name ? (
          <>
            <h1 className="font-bold text-3xl">{category && category.name}</h1>
            <h2 className="font-semibold text-xl">
              Today's Best Deals For You !
            </h2>
            <div className="mt-5 flex gap-8">
              {propertiesToFill.map((property, index) => {
                return (
                  <div>
                    {property.values.map((value, index) => {
                      return (
                        <>
                          <div>
                            <input
                              type="checkbox"
                              id={property.name + "" + index.toString()}
                              name={property.name + "" + index.toString()}
                              value={value}
                              onChange={(event) => {handleCheckboxChange(event, property, value)}}
                            />
                            <label for={property.name + "" + index.toString()}>{value}</label>
                          </div>
                        </>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <HeaderLoading />
        )}

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
          {products.length > 0
            ? products.map((product, index) => {
                return <ProductCard product={product} />;
              })
            : Array.from({ length: 9 }, (_, index) => (
                <>
                  <div>
                    <div className="bg-slate-500 opacity-20 h-52"></div>
                    <div className="h-5 w-full bg-slate-500 opacity-20 mt-3"></div>
                    <div className="h-3 w-full bg-slate-500 opacity-20 mt-3"></div>
                    <div className="h-3 w-full bg-slate-500 opacity-20 mt-3"></div>
                    <div className="h-3 w-full bg-slate-500 opacity-20 mt-3"></div>
                    <div className="h-3 w-full bg-slate-500 opacity-20 mt-3"></div>
                    <div className="h-5 w-1/3 bg-slate-500 opacity-20 mt-3"></div>
                  </div>
                </>
              ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
