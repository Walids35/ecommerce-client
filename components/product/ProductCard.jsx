"use client"
import { useStore } from "@/store/store"
import Star from "../Star"
import Link from "next/link"

const ProductCard = ({key, product}) => {

  const addToCart = useStore((store) => store.addToCart)

  return (
    <>
        <div key={key}>
            <Link href={`/product/${product.title}`} className="w-full hover:border-b-4 hover:border-black rounded-3xl transition-all duration-300">
            <div className=" bg-slate-200 rounded-3xl flex justify-center items-center py-10">
                <img src={product.images ? (product.images[0]) : (product.title)} alt="" className="h-32" />
            </div>
            </Link>
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
            <button onClick={() => addToCart(product)} className="border-2 border-black px-3 py-1.5 mt-2 rounded-full hover:bg-black hover:text-white transition-all duration-300">Add To Cart</button>
        </div>
    </>
  )
}

export default ProductCard