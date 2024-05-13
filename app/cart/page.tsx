"use client"
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CartProduct from "@/app/components/Cart/CartProduct";
import ResetCart from "@/app/components/Cart/ResetCart";
import Link from "next/link";
import CartPayment from "@/app/components/Cart/CartPayment";
import { useRouter } from "next/navigation";
import { Button } from "@radix-ui/themes";

const CartPage = () => {
  const { productData,userInfo} = useSelector((state: any) => state.next);
  const router = useRouter();

  useEffect(() => {
        if (!userInfo || userInfo === null || userInfo === undefined || userInfo.length === 0) {
          router.push('/signin'); 
    }
  }, [userInfo, router]); 

  return (
    <div className="max-w-screen-2xl mx-auto px-6 grid md:grid-cols-2 xl:grid-cols-5 gap-2 py-4">
      {productData.length > 0 ? (
        <>
          <div className="bg-[#141726] col-span-4 p-4 rounded-lg">
            <div className="flex items-center justify-between border-b-[1px] border-b-white pb-1">
              <p className="text-2xl text-white font-semibold text-amazon_blue">
                Your Cart
              </p>
            </div>
            <div className="p-2 flex flex-col gap-2  bg-[#141726]">
              {productData.map((item: any) => (
                <div key={item._id}>
                  <CartProduct item={item} />
                </div>
              ))}
              <ResetCart />
            </div>
          </div>
          <div className="bg-[#141726] h-65 col-span-1 p-4 rounded-lg flex items-center justify-center">
            <CartPayment />

          </div>
          <div className="xl:w-[1000px] md:w-[300px] md:m-1 border-[1px] p-4 m-10 bg-[#141726]">
            <p>
            The price and availability of items at are subject to change.
            The Cart is a temporary place to store a list of your items and reflects each item&apos;s most recent price.
            </p>
          </div>
        </>
      ) : (
        <div className=" h-64 col-span-5 flex flex-col items-center 
        justify-center py-5 rounded-lg shadow-lg bg-[#141726]">
          <h1 className="text-lg font-medium">Your cart is empty!</h1>
          <Link href={"/"}>
            <Button variant="classic" color="amber" size="3" >
             Go shopping
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
