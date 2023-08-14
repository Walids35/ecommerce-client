"use client"
import Footer from "@/components/footer/Footer";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { useStore } from "@/store/store";
import { useEffect,useState } from "react";
import { useWishList } from "@/store/wishlist";
import axios from "axios";

const WishlistComponent = () =>{
    const Wishlist = useWishList((state)=>state.cartProducts)
    const addToCart= useStore((store)=>store.addToCart)
    const ClearWishlist= useWishList((state)=>state.clearWishList)
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true)

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
        <div className="wishlist-page">
          <div className="wishlist-container">
            <h1>Your Wishlist</h1>
            <div className="wishlist-products">
              {loading ? (
                <p>Loading...</p>
              ) : (
                products.map((product, index) => (
                  <ProductCard key={index} product={product}>
                    {/** Render only the "Add to Cart" button */}
                    <button onClick={() => addToCart(product._id)}>Add to Cart</button>
                  </ProductCard>
                ))
              )}
            </div>
            <button onClick={() =>  ClearWishlist()}>Clear Wishlist</button>
          </div>
          <Footer />
        </div>
      );
  
};
export default WishlistComponent;