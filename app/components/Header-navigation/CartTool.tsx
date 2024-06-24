"use client"

import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux';
import { Badge, Button } from '@radix-ui/themes';
import { FaOpencart } from 'react-icons/fa';

const CartTool = () => {

    const { productData} = useSelector(
        (state:any) => state.next
      );
  return (
    <>
    <div className='relative mx-5'>
    <Button variant='ghost'size="3" asChild  >
       <Link href={"/cart"} >
       <FaOpencart className='text-[30px]'/>
       <span className="absolute -top-1 flex items-center justify-center "> 
            <Badge variant="solid" radius="full" >
            {productData ? productData.length : 0}
            </Badge>
            </span>
            
           </Link>
      </Button>
      </div>
    </>
  )
}

export default CartTool
