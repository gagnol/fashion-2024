"use client"
import { selectedSize } from '@/store/nextSlice'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

const SizePicker = ({product}:any) => {
  
    const [sizepiker, setSizepiker] = useState("")
    const dispatch = useDispatch();
    return (
    <>
      {product.sizes?(
                  <>
                  <div className="flex text-center my-5">
                    <h4 className="text-[14px] font-bold mr-5">Sizes</h4>
                  </div>
                  </> 
                  ):( <></>  )
                }
                <div className='block xl:flex'>
                  {product.sizes?.map((item:any, i:number) => (
                    <div className="inline-flex justify-between border-transparent border-[3px]
                    text-white text-center
                    hover:border-[#c45500] cursor-pointer'" key={i}>
                      <div className={sizepiker === item ? "sizePiked" : "sizeBox"}
                        style={{ backgroundColor:"#5e514b"}}
                        onClick={() => {
                          dispatch(selectedSize(item));
                          toast.success('Size selected', { duration: 4000, position: "top-center" });
                          setSizepiker(item);
                        }}
                      >
                        {item}
                      </div>
                    </div>
                  ))}
                </div>
    </>
  )
}

export default SizePicker
