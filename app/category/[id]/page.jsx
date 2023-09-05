"use client";
import { useParams, useSearchParams } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import Footer from "@/components/footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import HeaderLoading from "@/components/loading/HeaderLoading";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";

export default function page() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [toggle, setToggle] = useState(false);
  const [pages, setPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  //Pagination Settings
  const pageSize = 8;
  const actualPage = searchParams.get("pageNumber") || 1;
  const sortOrder = searchParams.get("sortOrder") || "asc";
  const sortBy = searchParams.get("sortBy") || "price";

  useEffect(() => {
    fetchCategory();
    filterProducts();
  }, [searchParams]);

  const filterProducts = async () => {
      setProducts([])
      const data = {
        properties: {}
      };
      data.parentCategoryId = id;
      data.pageSize = pageSize;
      data.sortOrder = sortOrder;
      data.sortBy = sortBy;
      data.pageNumber = parseInt(actualPage);
      for (const [key, value] of searchParams.entries()) {
        if(key == "pageNumber" || key == "sortBy" || key == "sortOrder"){
          continue;
        }
        if (value.includes(",")) {
          if(data.properties[key] == null){
            data.properties[key] = [];
          }
          value.split(",").map((v) => {
            v.trim()
            console.log(v)
            data.properties[key].push(v);
          })
        } else {
          if(data.properties[key] == null){
            data.properties[key] = [];
          }
          data.properties[key].push(value);
        }
      }

      try {
        console.log("Sended Data to '/api/product': ", data);
        const response = await axios.post(`/api/product`, data);
        console.log(response.data);
        setProducts(response.data.products);
        setPages(response.data.totalPages);
        setTotalProducts(response.data.totalProducts);
      } catch (error) {
        console.log(error);
      }
    };

    function isEmpty(obj) {
      for (const prop in obj) {
        if (Object.hasOwn(obj, prop)) {
          return false;
        }
      }
    
      return true;
    }

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
      params.set(
        property.name,
        existingValue ? `${existingValue},${value}` : value
      );
    } else {
      if (existingValue) {
        const values = existingValue.split(",").filter((val) => val !== value);

        if (values.length > 0) {
          params.set(property.name, values.join(","));
        } else {
          params.delete(property.name); // Remove the key if no values are left
        }
      }
    }

    const newQueryString = params.toString();
    router.push(pathname + "?" + newQueryString);
  };

  async function fetchCategory() {
    try {
      const response = await axios.get(`/api/category/${id}`);
      setCategory(response.data[0]);
    } catch {
      console.log(error);
    }
  }

  const handlePagination = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("pageNumber", page);
    const newQueryString = params.toString();
    router.push(pathname + "?" + newQueryString);
  };

  const handleSort = (e) => {
    e.preventDefault();
    const value = e.currentTarget.value
    const [key,val] = value.split(' ')
    const params = new URLSearchParams(searchParams);
    params.set("sortBy", key);
    params.set("sortOrder", val);
    const newQueryString = params.toString();
    router.push(pathname + "?" + newQueryString);
  }

  return (
    <>
      <div className="px-10 py-10 md:px-28 lg:px-60">
        <Toaster richColors position="bottom-right" />
        {!isEmpty(category) ? (
          <>
            <h1 className="font-bold text-3xl">{category && category.name}</h1>
            <h2 className="font-semibold text-xl">
              Today's Best Deals For You !
            </h2>
            <button
              onClick={() => setToggle(!toggle)}
              className="bg-blue mt-2 px-3 py-1 flex justify-between gap-2 hover:bg-white hover:text-blue transition-all duration-300 hover:border hover:border-blue text-white"
            >
              <p>Filtering</p>
              <p>&rsaquo;</p>
            </button>
            <div className={toggle ? "mt-5 gap-3 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6" : "mt-5 gap-8 hidden"}>
              {propertiesToFill.map((property, index) => {
                return (
                  <>
                    <div className="flex flex-col" key={index}>
                      <div className="font-semibold mb-3">{property.name}</div>
                      <div>
                        {property.values.map((value, index) => {
                          return (
                            <>
                              <div key={index}>
                                <input
                                  type="checkbox"
                                  id={property.name + "" + index.toString()}
                                  name={property.name + "" + index.toString()}
                                  value={value}
                                  onChange={(event) => {
                                    handleCheckboxChange(
                                      event,
                                      property,
                                      value
                                    );
                                  }}
                                />
                                <label
                                  for={property.name + "" + index.toString()}
                                >
                                  {value}
                                </label>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            <div className="border items-center border-black px-2 py-1 w-full mt-3 flex justify-between">
              <p>Display 1-8 of {totalProducts} products</p>
              <div className="flex gap-2">
                {Array.from({ length: pages }, (_, index) => (
                  <>
                    <button
                      type="button"
                      onClick={() => handlePagination(index + 1)}
                      key={index}
                      className={
                        actualPage == index + 1
                          ? "px-2 py-1 border text-white bg-blue hover:bg-ring-blue"
                          : "px-2 py-1 bg-white border hover:bg-blue hover:text-white {}"
                      }
                    >
                      {index + 1}
                    </button>
                  </>
                ))}
              </div>
              <div className="flex items-center">
                <p>Sort By:</p>
                <select onChange={(e) => handleSort(e)} className="bg-blue text-white px-2 rounded-full mx-2 py-1" name="sort" id="sort">
                  <option value="price asc">Ascending Price</option>
                  <option value="price desc">Desending Price</option>
                  <option value="name asc">Name, A to Z</option>
                  <option value="name desc">Name, Z to A</option>
                </select>
              </div>
            </div>
          </>
        ) : (
          <HeaderLoading />
        )}

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
          {products.length > 0
            ? products.map((product, index) => {
                return <ProductCard product={product} key={index} />;
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
