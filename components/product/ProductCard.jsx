"use client"
import { useStore } from "@/store/store"
import Star from "../Star"
import Link from "next/link"
import {useWishList} from "@/store/wishlist"
import { HeartIcon } from "@heroicons/react/24/solid"
import { useEffect } from "react"

const ProductCard = ({key, product}) => {

  const addToCart = useStore((store) => store.addToCart)
  const addToWishList =useWishList((store)=>store.addToWishList)

  return (
    <>
        <div key={key}>
            <div className="relative bg-full-white border border-blue justify-center rounded-3xl flex  py-10">
            <Link href={`/product/${product._id}`}><img src={product.images ? (product.images[0]) : (product.title)} alt="" className="h-32" /></Link>
                <button className="absolute top-4 right-4" onClick={() => addToWishList(product._id)}>
                    <HeartIcon className="w-6 hover:text-blue transition-all duration-300" />
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
            <button onClick={() => addToCart(product._id)} className="border-2 border-black px-3 py-1.5 mt-2 rounded-full hover:bg-black hover:text-white transition-all duration-300">Add To Cart</button>
        </div>
    </>
  )
}

export default ProductCard