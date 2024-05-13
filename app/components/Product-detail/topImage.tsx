import Image from 'next/image'
import React from 'react'


const Topimage = ({product}:any) => {
    
    return (
<div className="container w-full mx-auto mb-5">
{product.department ==="Men"?
(<>
<Image alt='men' width={1500} height={400}
src="https://m.media-amazon.com/images/S/al-na-9d5791cf-3faf/ff6df515-544a-436a-8be4-7d5f0e41330e._SL5000_CR0%2C250%2C5000%2C1000_SX1500_.jpg" 

/>

</>):(<>
    <Image alt='woman' width={1500} height={400}
    src="https://m.media-amazon.com/images/S/al-na-9d5791cf-3faf/c8cb9f4c-6d76-4cc5-af8c-64ba0877d0f8._SL5000_CR0%2C250%2C5000%2C1000_SX1500_.jpg" />
</>)
       
}       
  </div>
    )
}

export default Topimage
