"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "@/components/product/ProductCard";
import HeaderLoading from "@/components/loading/HeaderLoading";
import { Toaster } from "sonner";

export default function SearchResultsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const [activeFilters, setActiveFilters] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const query = searchParams.get("query") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/api/search?searchQuery=${query}`);
        setProducts(response.data);
        setFilteredProducts(response.data);
        const categoryMap = {};
        response.data.forEach((product) => {
          const categoryId = product.category;
          if (!categoryMap[categoryId]) {
            categoryMap[categoryId] = { products: [], properties: {} };
          }
          categoryMap[categoryId].products.push(product);

          Object.entries(product.properties).forEach(([key, value]) => {
            if (!categoryMap[categoryId].properties[key]) {
              categoryMap[categoryId].properties[key] = new Set();
            }
            categoryMap[categoryId].properties[key].add(value);
          });
        });

        Object.keys(categoryMap).forEach((categoryId) => {
          Object.keys(categoryMap[categoryId].properties).forEach((propKey) => {
            categoryMap[categoryId].properties[propKey] = Array.from(
              categoryMap[categoryId].properties[propKey]
            );
          });
        });

        setCategories(categoryMap);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (query) fetchProducts();
  }, [query]);

  const handleCheckboxChange = (categoryId, propertyKey, value) => {
    setActiveFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      
      if (!updatedFilters[categoryId]) {
        updatedFilters[categoryId] = {};
      }
      
      if (!updatedFilters[categoryId][propertyKey]) {
        updatedFilters[categoryId][propertyKey] = new Set();
      }

      const valuesSet = new Set(updatedFilters[categoryId][propertyKey]);
      if (valuesSet.has(value)) {
        valuesSet.delete(value);
      } else {
        valuesSet.add(value);
      }
      
      updatedFilters[categoryId][propertyKey] = valuesSet;

      applyFilters(updatedFilters);
      return updatedFilters;
    });
  };

  const applyFilters = (filters) => {
    let newFilteredProducts = products;
    Object.entries(filters).forEach(([categoryId, properties]) => {
      Object.entries(properties).forEach(([propertyKey, values]) => {
        if (values.size > 0) {
          newFilteredProducts = newFilteredProducts.filter((product) => {
            return values.has(product.properties[propertyKey]);
          });
        }
      });
    });

    setFilteredProducts(newFilteredProducts);
  };

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setPageNumber(1);
  };

  const handleSortOrderChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
    setPageNumber(1);
  };

  return (
    <div className="flex gap-10 pt-10 w-full p-5 max-w-7xl mx-auto">
      <div className="w-full">
        <Toaster richColors position="bottom-right" />
        {query ? (
          <>
            <h1 className="font-bold text-3xl">Search Results for "{query}"</h1>
            <h2 className="font-semibold text-xl">Showing results for "{query}"</h2>

            <div className="flex gap-4 mb-4">
              <select value={sortBy} onChange={(e) => handleSortChange(e.target.value)}>
                <option value="title">Title</option>
                <option value="price">Price</option>
              </select>

              <select value={sortOrder} onChange={(e) => handleSortOrderChange(e.target.value)}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-blue">Filter</h3>
              {Object.entries(categories).map(([categoryId, categoryData]) =>
                Object.entries(categoryData.properties).map(([propertyKey, values]) => (
                  <div key={`${categoryId}-${propertyKey}`} className="flex flex-col mb-4">
                    <div className="h-0.5 bg-gray-300 w-full mb-2"></div>
                    <div className="font-medium text-gray-700">{propertyKey}</div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {values.map((value, idx) => (
                        <div key={`${propertyKey}-${value}-${idx}`} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={`${propertyKey}-${value}-${idx}`}
                            name={propertyKey}
                            value={value}
                            onChange={() => handleCheckboxChange(categoryId, propertyKey, value)}
                            checked={activeFilters[categoryId]?.[propertyKey]?.has(value) || false}
                          />
                          <label htmlFor={`${propertyKey}-${value}-${idx}`} className="text-sm ml-2">
                            {value}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => <ProductCard key={product._id} product={product} />)
              ) : (
                <p>No products found.</p>
              )}
            </div>

            <div className="mt-6 flex gap-4">
              <button onClick={() => handlePageChange(pageNumber - 1)} disabled={pageNumber === 1}>
                Previous
              </button>
              <button onClick={() => handlePageChange(pageNumber + 1)}>Next</button>
            </div>
          </>
        ) : (
          <HeaderLoading />
        )}
      </div>
    </div>
  );
}
