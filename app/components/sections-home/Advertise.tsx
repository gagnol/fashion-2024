"use client"
import { Button, Heading, Text } from '@radix-ui/themes'
import Image from 'next/image'
import React from 'react'
import { InView } from 'react-intersection-observer'


const Advertise = () => {
    return (
      <InView as="div" onChange={(inView, entry) => console.log('Inview0:', inView)}>
        <div className="container w-full mx-auto ">
            <div className="border-b-3 border-dotted border-gray-500 pb-30 " id="top">
                <div className="container-fluid">
                    <div className="flex flex-wrap">
                        <div className="lg:w-1/2 hidden xl:block ">
                            <div className="left-content">
                                <div className="thumb">
                                    <div className="absolute p-5 xl:p-10 xl:m-3 w-[300px]
                                     bg-[#ebe6e2] opacity-95">
                                     <Text size="5" className='text-black w-[250px] ]' >
                                      Legendary Whitetails flannel shirt for men, 
                                      recognized for its top-tier quality, is crafted 
                                      from 100% soft brushed cotton flannel and promises 
                                      warmth and breathability.
                                     </Text>
                                     </div>
    <Image src="/cow8.jpg" alt="banner" width={700} height={327}
     className='overflow-hidden w-full min-h-[327px] max-h-[327px] p-1'
     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="right-content">
                                <div className="flex flex-wrap">
                                    <div className="lg:w-1/2">
                           <div className="right-first-image">
                     <div className="relative m-1  cursor-pointer hover:visible">
            <Image src="/cow20.jpg" alt='banner1' width={500} height={320} 
            className='min-h-[320px] max-h-[320px]'
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
                <div className="absolute inset-0 p-6">
               {/* text */}
                </div>
                  </div>
                    </div>
                       </div>
                        <div className="lg:w-1/2">
                           <div className="right-first-image">
                                <div className="relative m-1">
       <Image src="/cow9.jpg" alt='banner2'width={500} height={320}
       className='min-h-[320px] max-h-[320px] 
       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"'/>
       <div className="absolute inset-0 p-6 ">
                {/* text */}       
                     </div>
                       </div>
                         </div>
                           </div>
                             </div>
                </div>
           </div>
        </div>
     </div>
    </div>
  </div >
  </InView>
    )
}

export default Advertise
