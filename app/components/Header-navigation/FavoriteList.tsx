
"use client"
import { Badge, Button } from '@radix-ui/themes';
import Link from 'next/link'
import React from 'react'
import { FaHeart } from 'react-icons/fa';
import { useSelector } from 'react-redux';

function FavoriteList() {
 
  const { favoriteData, } = useSelector(
    (state:any) => state.next
  );
  return (
    <div className='mx-5 min-w-[80px]'>
     {/* fovorite */}
     <Button variant='ghost' size="3" asChild> 
     <Link  href="/favorite">
     
     <FaHeart className='text-[20px]' />
     
          {favoriteData.length > 0 && ( 
            <>
            {/* <span className="absolute right-2 top-2 w-4 h-4 border-[1px]
             border-gray-400 flex items-center justify-center "> */}
             
               <Badge variant="surface" radius="full" >
                {favoriteData.length}
               </Badge>
             
              </>
              
            
          )}
              
           </Link>   
    </Button>
    </div>
  )
}

export default FavoriteList
