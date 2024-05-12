"use client"
import React from "react"
import { Heading, Strong, Text } from "@radix-ui/themes"
import Image from "next/image"
import { InView } from "react-intersection-observer"
import Link from "next/link"

function WinterCollection({products}:any) {
    return (
        <InView as="div" onChange={(inView, entry) => console.log('Inview0:', inView)}>
        <div className="my-6 border border-gray-300 bg-white flex overflow-hidden ">
            <div className="p-3 pr-12 w-[400px] bg-cover bg-center bg-no-repeat hidden xl:block"
                style={{ backgroundImage: "url('/cow6.jpg')" }}>
                <Heading  size="6" className="text-white text-center pb-2">
                 Winter Collection
                </Heading>
             </div>
             <div className="flex-1 w-full mx-auto">
            <h3 className=" block xl:hidden mb-4 text-xl font-medium text-black text-center">
                Winter Collection
            </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
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
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
                 {products.slice(20, 24).map((product:any) => (
                        <div key={product.slug} className="relative min-h-[8rem] p-4 border-l 
                        border-2 border-gray-300 hover:border-[#435db1] cursor-pointer">
                    <Link href={`/products/${product.slug}`}>
                        <Text as="p" size="3" className="my-0 text-black">
                            {product.name.substring(21,40)}
                        </Text>
                            <span className="text-slate-800 font-normal">
                                From &nbsp;<span className="text-[14px]">$</span><Strong>{product.price}</Strong>
                            </span>
                            <Image src={product.image[0]} width={100} height={100} alt={product.name}
                             className="my-0 absolute w-[5rem] right-1 bottom-0 max-h-[100px] min-h-[100px]" />
                        </Link>
                        </div>
                  ))}
                </div>
            </div>
        </div>
        </InView>
    )
}

export default WinterCollection
