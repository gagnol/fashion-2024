
"use client"
import React from 'react'
import { useDispatch } from 'react-redux';
import { addFavorite } from '@/store/nextSlice';
import toast from "react-hot-toast";
import { Button } from '@radix-ui/themes';

interface AddToFavoriteProps {
    product:any;
  }
  
const AddToFavorite: React.FC<AddToFavoriteProps> = ({product}) => {
    const dispatch = useDispatch();
  return (
    <>
        <Button variant='surface' color='indigo' size="3" my="3" style={{width:"100%"}}
                  onClick={() =>
                    dispatch(
                      addFavorite({
                        ...product
                      }),
                      toast.success('Product added to your Whishlist ', { duration: 4000, position: "top-center", })
                    )
                    
                    } >
                  Add to your Whishlist
                </Button>
    </>
  )
}
 
export default AddToFavorite