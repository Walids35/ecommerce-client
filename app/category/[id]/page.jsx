"use client"
import { useParams } from 'next/navigation'
import ProductCard from '@/components/product/ProductCard'
import Footer from '@/components/footer/Footer'
import { useEffect, useState } from 'react'
import axios from 'axios'

const page = () => {
  const {id} = useParams()
  const [products, setProducts] = useState([])

  useEffect(() => (
    axios.get(`/api/product/${id}`).then((response) => {
      setProducts(response.data)
      console.log(response.data)
    }).catch((error) => {
      console.log(error);
    })
  ),[])
  const newId = id.replaceAll("-"," ").toUpperCase()
  
  return (
    <>
    <div className='px-10 py-10 sm:px-10 md:px-32 lg:px-60'>
        <h1 className='font-bold text-3xl'>{newId}</h1>
        <h2 className='font-semibold text-xl'>Today's Best Deals For You !</h2>
        <div className='mt-5 flex gap-8'>
            <select className='px-6 py-2 rounded-full bg-blue text-white border-2 border-black'>
                <option>Sort: Newest First</option>
                <option>test</option>
                <option>test</option>
            </select>
            <select className='px-6 py-2 rounded-full bg-white text-black border-2 border-black'>
                <option>Color: All</option>
                <option>test</option>
                <option>test</option>
            </select>
            <select className='px-6 py-2 rounded-full bg-white text-black border-2 border-black'>
                <option>Storage: All</option>
                <option>test</option>
                <option>test</option>
            </select>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
        {products.length > 0 ? products.map((product, index) => {
            return <ProductCard key={index} product={product} />
        }) : (<div>Waiting ...</div>)}
        </div>
    </div>
    <Footer />
    </>
  )
}

export default page