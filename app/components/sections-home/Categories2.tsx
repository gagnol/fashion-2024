"use client"
import React from "react"
import { QUICK_OFFERS } from "@/constant/products"
import { Box, Heading, Inset, Strong } from "@radix-ui/themes"
import Image from "next/image"
import Slider from "../Slider"
import { InView } from "react-intersection-observer"
import Link from "next/link"

function Categories2() {
    return (
      <InView as="div" onChange={(inView, entry) => console.log('Inview0:', inView)}>
        <div className=" max-w-screen-2xl xl:mx-auto my-6 border
         border-gray-300 bg-white  flex divide-x divide-gray-300 ">
            <div className="p-3 pr-12 min-h-[14rem] w-[400px] min-w-[400px] hidden xl:flex
                 flex-col bg-cover bg-center bg-no-repeat"
                 style={{ backgroundImage: "url('/cow6.jpg')" }} 
            >
                <Heading size="6" className="text-white text-center">
                <Strong>Shop by Category</Strong> 
                </Heading>
             
                <div className="pt-6">
              {/*   <Button variant="classic" color="gray" >Shop Now</Button> */}
                </div>
            </div>
            
            <div className="flex-1 flex items-center divide-x divide-gray-300 gap-5
             bg-[#ebe6e2] overflow-x-hidden">
              
              <Slider>
                {QUICK_OFFERS.map((product) => (
                    <Box maxWidth="440px" key={product.id} className="mx-6 border-none">
                    
                    <Inset clip="padding-box" side="top" pb="current">
                    <Link href={`/search?subcategory=${product.name}`} >
                          <Image
                          height={220} width={200}
                          src={product.image}
                          alt="Bold typography"
                          priority
                          style={{
                            display: 'block',
                            objectFit: 'cover',
                            width: '100%',
                            height: 140,
                            backgroundColor: 'var(--gray-5)',
                          }}
                          className="min-w-[200px] max-w-[200px] min-h-[220px] cursor-pointer hover:scale-105 
                          transition-transform overflow-hidden rounded-md"
                        />
                        </Link>
                      </Inset>
                      <Heading size="4" className="text-black text-center">
                        <Strong>{product.name}</Strong> 
                      </Heading>
                    </Box>
                ))}
                </Slider>           
              </div>
            </div>
            </InView>
          
    )
}

export default Categories2
