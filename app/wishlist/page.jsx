"use client"
import Footer from "@/components/footer/Footer";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { useStore } from "@/store/store";
import { useEffect,useState } from "react";
import { useWishList } from "@/store/wishlist";
import axios from "axios";

const WishlistComponent = () =>{
    const Wishlist = useWishList((state)=>state.wishlistProducts)
    const addToCart= useStore((store)=>store.addToCart)
    const getWishListProducts = useWishList((state) => state.getWishListProducts)
    const ClearWishlist= useWishList((state)=>state.clearWishList)
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
      getWishListProducts()
    },[getWishListProducts])

    useEffect(() => {
        const fetch = async () => {
          try {
            const response = await axios.post("/api/wishlist", Wishlist);
            setProducts(response.data);
            setLoading(false)
          } catch (error) {
            console.error("error:", error);
          }
        };

        fetch();
      }, [Wishlist]);

      return (
        <>
        <div className="px-10 py-10 sm:px-10 md:px-32 lg:px-60">
          <div>
            <h1 className="font-bold text-3xl">Your Wishlist</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-10">
              {loading ? (
                Array.from({ length: 9 }, (_, index) => (
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
                ))
              ) : (
                products.map((product, index) => (
                  <ProductCard key={index} product={product}>
                    <button onClick={() => addToCart(product._id)}>Add to Cart</button>
                  </ProductCard>
                ))
              )}
            </div>
            <button className="py-1 px-3 bg-white border border-black text-black mt-3" onClick={() =>  ClearWishlist()}>Clear Wishlist</button>
          </div>
        </div>
        <Footer />
        </>
      );
  
};
export default WishlistComponent;