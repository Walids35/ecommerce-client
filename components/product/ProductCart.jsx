import { TrashIcon } from "@heroicons/react/24/solid"
import { useStore } from "@/store/store"

const ProductCart = ({product}) => {

  const cart = useStore((store) => store.cartProducts)
  const deleteFromCart = useStore((store) => store.removeFromCart); 
  const addToCart = useStore((store) => store.addToCart)
  
  const productQuantity = () => {
    return cart.filter(id => id === product._id).length
  } 

  return (
    <>
        {productQuantity() > 0 && (
            <div className="flex p-10 justify-around" key={product._id}>
            <img src={product.images[0]} alt="" className="w-16 h-16" />
            <div>
                <h1>{product.title}</h1>
                <p className="font-medium text-purple">{product.price}£</p>
                <p className="font-normal text-sm hidden md:block">[{product._id}]</p>
            </div>
            <div className="text-start font-normal">
                <p>{product.price}£</p>
                <div className="flex">
                    <p className="py-2 px-5 bg-gray-200">{productQuantity()}</p>
                    <button type="button" onClick={() => addToCart(product._id)} className="border py-2 px-5 hover:bg-slate-200">+</button>
                    <button type="button" onClick={() => deleteFromCart(product._id)} className="border py-2 px-5 hover:bg-slate-200">-</button>
                </div>
            </div>
            <div className="">
                <button onClick={() => deleteFromCart(product._id)}>
                    <TrashIcon className="w-6 hover:text-purple"/>
                </button>
            </div>
        </div>
        )}
    </>
  )
}

export default ProductCart