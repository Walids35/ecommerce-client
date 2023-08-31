"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import ImageCarousel from "@/components/ImageCarousel";
import Footer from "@/components/footer/Footer";
import { useStore } from "@/store/store";
import { HeartIcon } from "@heroicons/react/20/solid";
import { useWishList } from "@/store/wishlist";
import { Toaster, toast } from "sonner";
import Link from "next/link";
import Star from "@/components/Star";

const page = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [activeFavorite, setActiveFavorite] = useState(false);
  const wishlistProducts = useWishList((store) => store.wishlistProducts);
  const addToWishList = useWishList((store) => store.addToWishList);
  const removeFromWishList = useWishList((store) => store.removeFromWishList);
  const addToCart = useStore((store) => store.addToCart);
  const router = useRouter();

  //Verify if the object isEmpty
  function isEmpty(obj) {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }

    return true;
  }

  const handleWishlist = () => {
    if (activeFavorite == false) {
      addToWishList(product._id);
      setActiveFavorite(true);
      toast("Successfully added to your wishlist !", {
        action: {
          label: "Go To Wishlist",
          onClick: () => router.push("/wishlist"),
        },
      });
    } else {
      removeFromWishList(product._id);
      setActiveFavorite(false);
      toast("Product deleted from your wishlist !");
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/cart/${id}`);
      if (response.data.error) {
        toast.error(response.data.error, {
          action: {
            label: "Undo",
            onClick: () => router.back(),
          },
        });
      } else {
        setProduct(response.data[0]);
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error(error.message + "--" + error.code);
    }
  };

  const VerifyWishlistProduct = () => {
    const filtered = wishlistProducts.filter((i) => i == id);
    if (filtered.length > 0) {
      setActiveFavorite(true);
    }
  };

  const fetchSimilarProducts = async () => {
    try {
      const data = {
        _id: id,
      };
      const response = await axios.post("/api/similar", data);
      if (response.status != 200) {
        toast.error("An error has occured fetching similar products !");
      } else {
        setSimilarProducts(response.data);
      }
    } catch (error) {
      toast.error("An error has occured fetching similar products !");
    }
  };

  useEffect(() => {
    fetchProduct();
    VerifyWishlistProduct();
    fetchSimilarProducts();
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product._id);
    }
    toast.success("Products successfully added !", {
      action: {
        label: "Go to Cart",
        onClick: () => router.push("/cart"),
      },
    });
    setQuantity(1);
  };
  return (
    <>
      <div className="px-10 py-10 md:px-28 lg:px-60">
        <Toaster position="bottom-right" richColors />
        {!isEmpty(product) ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {product.images && (
              <div>
                <ImageCarousel images={product.images} />
              </div>
            )}
            <div className="py-10">
              <h1 className="font-bold text-black text-2xl">
                {product.title}
                <button onClick={handleWishlist} className="ml-8 mt-1">
                  <HeartIcon
                    className={
                      activeFavorite
                        ? "w-6 text-blue hover:text-black transition-all duration-300"
                        : "w-6 hover:text-blue transition-all duration-300"
                    }
                  />
                </button>
              </h1>
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
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={quantity == 0 ? true : false}
                className="hover:bg-black disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500 hover:text-white transition-all duration-300 border border-black text-black px-3 py-2 mt-5 bg-white"
              >
                Add to cart
              </button>
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
        <div>
          <h1 className="mt-10 font-bold text-3xl">Similar Products</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 mt-10 gap-10">
            {similarProducts.length > 0 && similarProducts.map((product, index) => {
              return (
                <>
                  <div key={index}>
                    <div className="relative bg-full-white border border-blue justify-center rounded-3xl flex  py-10">
                      <Link href={`/product/${product._id}`}>
                        <img
                          src={
                            product.images ? product.images[0] : product.title
                          }
                          alt=""
                          className="h-32"
                        />
                      </Link>
                    </div>
                    <div className="flex justify-between mt-5">
                      <Link href={`/product/${product._id}`}>
                        <h1 className="font-bold text-xl">{product.title}</h1>
                      </Link>
                      <p className="font-semibold text-lg text-blue">
                        {product.price}£
                      </p>
                    </div>
                    <div className="my-1">
                      <div className="flex items-baseline gap-2">
                        <Star count={4} />
                        <p className="text-blue font-semibold">(12{product.reviewsNumber})</p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
