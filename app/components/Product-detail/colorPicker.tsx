"use client"
import { selectedColor } from '@/store/nextSlice';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';


const ColorPicker = ({ product }:any) => {
  const [colorname, setColorname] = useState("");
  const [colorpiker, setColorpiker] = useState("");
  const dispatch = useDispatch();

  return (
    <>
      {product.colors ? (
        <div className="flex text-center my-5">
          <h4 className="text-[14px] font-bold mr-5">Color</h4>
          <h5 className="text-[14px] font-normal">&nbsp;{colorname}</h5>
        </div>
      ) : (
        <></>
      )}
      <div className='flex'>
        {product.colors?.map((item: any, i: number) => (
          <div className="inline-flex justify-between border-transparent border-[3px]
          hover:border-[#3c52a2] cursor-pointer'" key={i}>
            <div className={colorpiker === item.color ? "colorPiked" : "colorBox"}
              style={{ backgroundColor: item.color }}
              onMouseEnter={() => setColorname(item.name)}
              onClick={() => {
                dispatch(selectedColor(colorname));
                toast.success('Color selected', { duration: 4000, position: "top-center" });
                setColorpiker(item.color);
              }}
            >
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ColorPicker;
