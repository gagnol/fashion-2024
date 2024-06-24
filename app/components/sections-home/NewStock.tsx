"use client"
import { Button, Heading, Strong, Text } from '@radix-ui/themes'
import Image from 'next/image'
import React from 'react'
import Slider from './Slider'
import { InView } from 'react-intersection-observer'
import Link from 'next/link'


const Newstock = ({products}:any) => {
    return (
        <InView as="div" onChange={(inView, entry) => console.log('Inview0:', inView)}>
        <div className="max-w-screen-2xl ">
            <div className="border-b-3 border-dotted bg-[#ebe6e2] border-gray-500 pb-30">
                <div className="flex flex-wrap">
                    <div className="lg:w-1/2 relative">
                        <Image width={700} height={700} src="/ban2.png" alt="banner" 
                        className='overflow-hidden w-full max-h-[550px]' 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"                         
                        />
                        <div className="absolute inset-0 p-2 xl:p-10 ">
                        {/* text here */}
                        </div>
                    </div>
                    <div className="lg:w-1/2 justify-start">
                    <Heading size="6" className='text-[#6b6b6b] hidden xl:block m-5' >
                        Features Products  2024
                        </Heading>
                    <div className="mx-5 grid grid-cols-2 md:grid-cols-2 xl:grid-cols-2">
                    {products.slice(10,14).map((product:any) => (
                        <div key={product.slug} className="relative min-h-[8rem] p-4 
                            border-2 border-l-gray-300 hover:border-[#435db1]
                            cursor-pointer">
                            <Link href={`/products/${product.slug}`}>
                            <Text as="p" size="3" className=" text-black">
                                {product.name.substring(21,40)}
                            </Text>
                            <span className="text-slate-800 font-normal">
                                From &nbsp;<span className="text-[14px]">$</span><Strong>{product.price}</Strong>
                            </span>
                <Image alt={product.name} src={product.image[0]} 
                width={100} height={100}
                className="my-0 absolute w-[5rem] right-1 bottom-0 max-h-[100px] min-h-[100px]" />
                </Link>
                        </div>
                    ))}
                </div>
                <div className="mx-5 grid grid-cols-2 md:grid-cols-2 xl:grid-cols-2">
                 {products.slice(20, 24).map((product:any) => (
                        <div key={product.slug} className="relative min-h-[8rem] p-4 border-l 
                        border-2 border-gray-300 hover:border-[#435db1] cursor-pointer">
                    <Link href={`/products/${product.slug}`}>
                        <Text as="p" size="3" className="my-0 text-black">
                            {product.name.substring(21,40)}
                        </Text>
                            <span className="text-slate-800 font-normal">
                                From &nbsp;<span className="text-[14px]">$</span>
                                <Strong>{product.price}</Strong>
                            </span>
                            <Image src={product.image[0]} width={100} height={100} alt={product.name}
                             className="my-0 absolute w-[5rem] right-1 bottom-0 max-h-[100px] min-h-[100px]" />
                        </Link>
                        </div>
                  ))}
                </div>
                    </div>
                </div>
            </div>
        </div>
</InView>
    )
}

export default Newstock
