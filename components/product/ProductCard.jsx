"use client"
import { useStore } from "@/store/store"
import Star from "../Star"
import Link from "next/link"
import {useWishList} from "@/store/wishlist"
import { HeartIcon } from "@heroicons/react/24/solid"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const ProductCard = ({key, product}) => {

  const addToCart = useStore((store) => store.addToCart)
  const addToWishList =useWishList((store)=>store.addToWishList)
  const removeFromWishList =useWishList((store)=>store.removeFromWishList)
  const wishlistProducts = useWishList ((store) => store.wishlistProducts)
  const [active, setActive] = useState(false);
  const router = useRouter()

  useEffect(() => {
    const filtered = wishlistProducts.filter((id) => id == product._id)
    if(filtered.length > 0){
        setActive(true)
    }
  },[])

  const handleWishlist = () => {
    if(active == false){
        addToWishList(product._id)
        setActive(true)
        toast("Successfully added to your wishlist !", {
            action: {
                label: 'Go To Wishlist',
                onClick: () => router.push("/wishlist")
            },
        })
    }else{
        removeFromWishList(product._id)
        setActive(false)
        toast("Product deleted from your wishlist !")
    }
  }

  return (
    <>
        <div key={key}>
            <div className="relative bg-full-white border border-blue justify-center rounded-3xl flex  py-10">
            <Link href={`/product/${product._id}`}><img src={product.images ? (product.images[0]) : (product.title)} alt="" className="h-32" /></Link>
                <button className="absolute hover:top-3 top-4 right-4 transition-all duration-300" onClick={handleWishlist}>
                    <HeartIcon className={active ? "w-6 text-blue hover:text-black transition-all duration-300" : "w-6 hover:text-blue transition-all duration-300"} />
                </button>
            </div>
            <div className="flex justify-between mt-5">
                <h1 className="font-bold text-xl">{product.title}</h1>
                <p className="font-semibold text-lg text-blue">{product.price}£</p>
            </div>
            <div className="my-1">
                <p className="text-sm">{product.description}</p>
                <div className="flex items-baseline gap-2">
                <Star count={4} />
                <p className="text-blue">({product.reviewsNumber})</p>
                </div>
            </div>
            <button onClick={() => {addToCart(product._id) 
                toast.success(`${product.title} is successfully added to the cart !`)}} className="border-2 border-black px-3 py-1.5 mt-2 rounded-full hover:bg-black hover:text-white transition-all duration-300">Add To Cart</button>
        </div>
    </>
  )
}

export default ProductCard