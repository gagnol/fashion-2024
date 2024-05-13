"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux';
import { BsFillCartFill } from "react-icons/bs";
import { Badge } from '@radix-ui/themes';

const CartTool = () => {

    const { productData} = useSelector(
        (state:any) => state.next
      );
  return (
    <>

       <Link
          href={"/cart"}
          className="flex items-center px-2 border border-transparent xl:mx-10
           hover:border-white cursor-pointer duration-300 h-[70%] relative"
        >
          <BsFillCartFill className='text-[30px]' />
          <p className="text-xs text-white font-bold mt-3">Cart</p>
          <p className="absolute left-[18px] text-[16px] text-black font-semibold">
            {productData ? productData.length : 0}
          </p>
        </Link>
    </>
  )
}

export default CartTool
