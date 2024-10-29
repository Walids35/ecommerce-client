'use client'
 
import { useEffect } from 'react'
import Link from "next/link";
import Image from 'next/image';
 
export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className='h-[80vh] flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center gap-3'>
        <Image src={"/Illustrations/not-found.svg"} width={400} height={400} />
        <h2 className='text-2xl font-bold'>Something went wrong!</h2>
        <button
          className='px-3 py-2 bg-black text-white hover:bg-gray-900 hover:text-gray-100'
          onClick={
            () => reset()
          }
        >
          Try again
        </button>
        <Link
        className='underline underline-offset-4'
        href={"/"}
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}