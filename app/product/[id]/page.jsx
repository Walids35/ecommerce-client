"use client"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import axios from "axios"

const page = () => {
  const {id} = useParams()
  console.log(id)

  const fetchProduct = async() => {
    try{
      const response = await axios.get(`/api/cart/${id}`);
      console.log(response.data)
    }catch(error){
      console.log("Error:", error)
    }
  }

  useEffect(() => {
    fetchProduct()
  },[id])

  return (
    <div>page</div>
  )
}

export default page