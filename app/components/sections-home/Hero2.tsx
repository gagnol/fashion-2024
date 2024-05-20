import { Button, Heading, Text } from '@radix-ui/themes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const Hero2 = () => {
    return (
        <div className="container w-full mx-auto ">
            <div className="border-b-3 border-dotted border-gray-500 pb-30 " id="top">
                <div className="container-fluid">
                    <div className="flex flex-wrap">
                        <div className="lg:w-1/2 hidden xl:block">
                            <div className="left-content">
                                <div className="thumb">
                                    <div className="absolute bg-[#ebe6e2] top-48 left-[510px] text-center w-[240px]">
                                     
                                        </div>
    <Image src="/cow13.jpg" width={327} height={327} alt="banner13"
    priority
    className='overflow-hidden w-full min-h-[327px] max-h-[327px] p-1 cursor-pointer '
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
         
             <Image src="/cow10.jpg" alt='banner1' width={500} height={320} 
             priority
             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
             className='min-h-[320px] max-h-[320px] cursor-pointer hover:opacity-75'/>
      <div className="absolute inset-0 p-6">
      <Button variant='classic' size="2"  asChild >    
      <Link href="/search?department=Women">
        View More
      </Link>
      </Button>

      </div>
        </div>
         </div>
           </div>
            <div className="lg:w-1/2">
             <div className="right-first-image">
                <div className="relative m-1 cursor-pointer">
           <Image src="/cow5.jpg" alt='banner2'width={500} height={320}
            className='min-h-[320px] max-h-[320px] cursor-pointer hover:opacity-75' 
             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
      <div className="absolute inset-0 p-6  right-0 ">
      <Button variant='classic' size="2"  asChild >    
      <Link href="/search?department=Men">
        View More
      </Link>
      </Button>
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
    )
}

export default Hero2
