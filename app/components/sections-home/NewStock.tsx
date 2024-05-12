"use client"
import { Button, Heading, Text } from '@radix-ui/themes'
import Image from 'next/image'
import React from 'react'
import Slider from './Slider'
import { InView } from 'react-intersection-observer'


const Newstock = ({products}:any) => {
    return (
        <InView as="div" onChange={(inView, entry) => console.log('Inview0:', inView)}>
        <div className="container ">
            <div className="border-b-3 border-dotted bg-[#ebe6e2] border-gray-500 pb-30">
                <div className="flex flex-wrap">
                    <div className="lg:w-1/2 relative">
                        <Image width={700} height={700} src="/ban2.png" alt="banner" 
                        className='overflow-hidden w-full max-h-[550px]' 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"                         
                        />
                        <div className="absolute inset-0 p-2 xl:p-10 ">
                        <Heading size="6" className='text-[#6b6b6b] hidden xl:block' >
                        Features Products  2024
                        </Heading>
                        <Button variant="classic" size="3" color="amber"
                        className=" mx-3 xl:mx-16 my-6 cursor-pointer">
                        View more
                        </Button>
                        </div>
                    </div>
                    <div className="lg:w-1/2 justify-start ">
                        <div className='w-full mx-auto'> 
                        <Slider products={products}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</InView>
    )
}

export default Newstock
