import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa';
import Image from 'next/image';
import Stars from '../Stars';
import { Button, Separator, Text } from '@radix-ui/themes';


function Reviews({ item }:any) {

  return (
    <div key={item._id} className=" mx-5 my-3" >
    <ul key={item._id} >
      <li className='flex'>
       {item.avatar?
        <>
        <Button variant='ghost'>
        <Image src={item.avatar} alt="" width={100} height={100} 
          className="w-11 h-11 rounded-full object-cover"/> 
          <Text size="4">&nbsp;{item.name}</Text>
        </Button>
       
        </>
       :
       <>
       <FaUserCircle fontSize={25} color='#666' />
       </>
       }
        
        
      </li>
      <li className='block md:flex'>
      <Stars value={item.rating} />
        <h4 ><b>&nbsp; {item.subject}</b></h4>
      </li>
      <li >
        <h4 className="text-primary" >Reviewed on
          &nbsp;
          {new Date(item.createdAt.substring(0, 10)).toLocaleDateString(
            'en-US',
            {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }
          )};
        </h4>
      </li>
      <li className='my-2'>
      <Text size="4"> {item.review}</Text> 
      </li>
      <Separator size="4" my="1"/>
    </ul>
  </div>
  )
}

export default Reviews
