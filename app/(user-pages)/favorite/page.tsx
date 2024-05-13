"use client"
import React from "react";
import { useSelector } from "react-redux";
import FavoriteProduct from "@/app/components/User-navigation/FavoriteProduct";
import ResetFavoriteItems from "@/app/components/User-navigation/ResetFavoriteItems";
import Link from "next/link";
import { Button } from "@radix-ui/themes";

const FavoritePage: React.FC = () => {
  const { favoriteData } = useSelector((state: any) => state.next);

  return (
    <div className="max-w-screen-xl mx-auto px-6 gap-10 py-4">
      {favoriteData.length > 0 ? (
        <div className="bg-[#141726] p-4 rounded-lg">
          <div className="flex items-center justify-between border-b-[1px] pb-1">
            <p className="text-2xl font-semibold ">
              Your Favorite List 
            </p>
            
          </div>
          <div>
            {favoriteData.map((item: any) => (
              <div key={item._id} className="mt-2">
                <FavoriteProduct item={item} />                
              </div>
            ))}
            
            <ResetFavoriteItems />
         
          </div>
        </div>
      ) : (
        <div className="bg-base h-96 flex flex-col items-center  border-b-gray-400
        justify-center py-5 rounded-lg shadow-lg">
          <h1>Nothing available in your list</h1>
         
            <Button variant="classic" size="2" color="amber" className=" my-5">
            <Link href="/">
              Back
              </Link>
            </Button>
          
        </div>
      )}
    </div>
  );
};

export default FavoritePage;