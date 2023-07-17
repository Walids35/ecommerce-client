import Star from "../Star"

const ProductCard = ({key, product}) => {
  return (
    <>
        <div key={key}>
            <div className=" bg-slate-200 rounded-3xl flex justify-center items-center py-10">
                <img src="headphone.svg" alt="" className="w-32" />
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
            <button className="border-2 border-black px-3 py-1.5 mt-2 rounded-full hover:bg-black hover:text-white transition-all duration-300">Add To Cart</button>
        </div>
    </>
  )
}

export default ProductCard