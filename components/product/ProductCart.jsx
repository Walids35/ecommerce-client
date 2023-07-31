import { TrashIcon } from "@heroicons/react/24/solid"

const ProductCart = ({product}) => {

  const deleteProduct = () => {
    
  }

  return (
    <>
        <div className="flex p-10 justify-around  ">
            <img src="/headphone.svg" alt="" className="w-16 h-16" />
            <div>
                <h1>{product.title}</h1>
                <p className="font-medium text-purple">{product.price}£</p>
                <p className="font-normal text-sm hidden md:block">[64b5a93cc77e31b306739963]</p>
            </div>
            <div className="text-start font-normal">
                <p>200.99£</p>
                <div className="flex">
                    <p className="py-2 px-5 bg-gray-200">1</p>
                    <button className="border py-2 px-5 hover:bg-slate-200">+</button>
                    <button className="border py-2 px-5 hover:bg-slate-200">-</button>
                </div>
            </div>
            <div className="">
                <button onClick={deleteProduct}>
                    <TrashIcon className="w-6 hover:text-purple"/>
                </button>
            </div>
        </div>
    </>
  )
}

export default ProductCart