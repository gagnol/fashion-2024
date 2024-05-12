"use client"
import React from "react"
import { TRENDING_CATEGORIES } from "@/constant/products"
import Link from "next/link"
import { Button, Heading } from "@radix-ui/themes"
import Image from "next/image"
import { InView } from "react-intersection-observer"

function TrendingCategories() {
    return (
        <InView as="div" onChange={(inView, entry) => console.log('Inview0:', inView)}>
        <div className="my-6 w-full mx-10 justify-center text-center items-center">
            <Heading className="mb-4 text-xl font-medium">Trending</Heading>
            <div className="flex flex-wrap gap-4 mx-auto xl:mx-16 w-full items-center ">
                {TRENDING_CATEGORIES.map((category:any) => (
                  <div key={category.id} className="relative flex-1 block group
                     min-h-[300px] max-h-[300px] min-w-[350px] max-w-[350px]
                      rounded-lg overflow-hidden border border-gray-300">
                     <Link href="/" >
                     <Image
                         alt=""
                         src={category.image}
                         width={350}
                         height={350}
                         className="object-cover w-full aspect-video group-hover:scale-105 
                         transition-transform opacity-55"
                     />
                     <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                        <h3 className="text-3xl font-bold text-white">{category.name}</h3>
                                 <p className="max-w-lg py-3 text-white">
                                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque dolorum officia autem
                                     libero!
                                 </p>
                       <Button variant="classic" color="gray" className="cursor-pointer">Shop Now</Button>
                    </div>
                 </Link>
            </div>
           ))}
            </div>
        </div>
        </InView>
    )
}

export default TrendingCategories
