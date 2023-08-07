import { TrashIcon } from "@heroicons/react/24/solid"
import { useStore } from "@/store/store"

const ProductCart = ({product}) => {

  const deleteFromCart = useStore((store) => store.removeFromCart); 
  const totalPrice = product.quantity * product.price;

  return (
    <>
        <div className="flex p-10 justify-around" key={product._id}>
            <img src="" alt="" className="w-16 h-16" />
            <div>
                <h1>{product.title}</h1>
                <p className="font-medium text-purple">{product.price}£</p>
                <p className="font-normal text-sm hidden md:block">[{product._id}]</p>
            </div>
            <div className="text-start font-normal">
                <p>{totalPrice}£</p>
                <div className="flex">
                    <p className="py-2 px-5 bg-gray-200">{product.quantity}</p>
                    <button className="border py-2 px-5 hover:bg-slate-200">+</button>
                    <button className="border py-2 px-5 hover:bg-slate-200">-</button>
                </div>
            </div>
            <div className="">
                <button onClick={() => deleteFromCart(product._id)}>
                    <TrashIcon className="w-6 hover:text-purple"/>
                </button>
            </div>
        </div>
    </>
  )
}

export default ProductCart