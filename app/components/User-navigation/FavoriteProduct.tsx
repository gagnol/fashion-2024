"use client"
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { Button, Strong, Text } from "@radix-ui/themes";

const FavoriteProduct = ({ item }: any) => {
  const dispatch = useDispatch();
  return (
    <div className="bg-[#141726] text-white rounded-lg flex flex-col md:flex-row p-2 items-center gap-4 mb-2">
      
        <div className="block min-w-[150px] text-center text-primary cursor-pointer">
          <Image src={item.image[0]} alt="Product image" width={150} height={150}
            className="max-h-[150px] min-h-[150px]	" />

          <Button size="2" asChild my="2">
          <Link  href={`/products/${item.slug}`} >
            Order Now
            </Link>
            </Button>
        </div>
      
      <div className="flex items-center px-2 gap-4">
        <div className="flex flex-col gap-1">
          <Text size="4" ><Strong>{item.name}</Strong></Text>
          <Text size="3" >{item.description}</Text>
          <p className="text-sm">
            Price:{" "}
            <span className="font-semibold text-primary">
              ${item.price}
            </span>
          </p>

        </div>
               
        
      </div>
    </div >
  );
};

export default FavoriteProduct;