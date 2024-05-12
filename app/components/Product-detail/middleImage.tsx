import { Heading } from '@radix-ui/themes'
import Image from 'next/image'
import React from 'react'


const Middleimage = ({product}:any) => {
    
    return (
<div className="container w-full mx-auto text-center">
{product.department ==="Men"?
(<>
<Heading size="6" my="4">Men&apos;s Size Guide</Heading>
<Image alt='men' width={1500} height={400}
src="https://m.media-amazon.com/images/S/aplus-media-library-service-media/7d568163-dc8d-4646-8a4e-f23ec7c8d5dd.__CR0,0,2928,1200_PT0_SX1464_V1___.jpg" 

/>

</>):(<>
    <Heading size="6" my="4">Women&apos;s Size Guide</Heading>
    <Image alt='woman' width={1500} height={400}
    src="https://m.media-amazon.com/images/S/aplus-media-library-service-media/c8cbc85a-2ec9-47b0-9c2e-ccbe391aec35.__CR0,0,2928,1200_PT0_SX1464_V1___.jpg" />
</>)
       
}       
  </div>
    )
}

export default Middleimage
