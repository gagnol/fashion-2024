"use client"
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { checkoutOrder, createOrder } from '@/lib/order-actions';
import { useEffect } from "react";
import Link from "next/link";
import { Button, Heading, Text } from "@radix-ui/themes";
import FormattedPrice from "../FormattedPrice";

interface CartItem {
  discountPrice: number;
  quantity: number;
  shipping: number;
  totalPrice: number;
}


const CartPayment = () => {
 
  const router = useRouter();

  const { productData, userInfo } = useSelector(
    (state: any) => state.next
  );
  const shippingAddress= userInfo.user?.address+","+userInfo.user?.city+","
  +userInfo.user?.country+","+userInfo.user?.postal 

  const shipping = (
    productData.reduce(
      (acc: number,item: CartItem ) => acc + item.shipping ,0
    )
  );
  
  const subTotal = (
    productData.reduce(
      (acc: number, item: CartItem) =>
        acc + item.discountPrice * item.quantity, 0
    )
  );
  
  
  const totalAmount = subTotal + shipping
  
  interface Product {
    [key: string]: string | string[];
  }
  
  const orderData: Product[] = productData.map((item: Product) => {
    const newItem: Product = {};
    for (const key in item) {
      if (Object.prototype.hasOwnProperty.call(item, key)) {
        newItem[key] = Array.isArray(item[key]) ? (item[key] as string[]).join(', ') : String(item[key]);
      }
    }
    return newItem;
  });
  
    console.log(orderData)
// Stripe payment
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
const { data: session } = useSession();

useEffect(() => {
  if (!session || !session.user) {
    router.push('/signin');
  }
  if(!userInfo){
    router.push('/signin');
  }
  
  
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [session]);
 
const onCheckout = async () => {
  const order  = {
    name:userInfo.user?.name,
    price:Math.ceil(totalAmount * 100),
    items:productData,
    email:userInfo.user?.email,
    shippingAddress:shippingAddress
  }
  console.log(order)  
  const res:any = await fetch('/api/checkout', {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const session = await res.json()
    window.location = session.url
  
}

  return (
    <div className="flex flex-wrap flex-col gap-3 min-w-full bg-[#141726]">
      <div className="rounded-md border mt-5 p-2 text-white text-center">      
      <Heading size="5"  >Shipping Info</Heading>
      
      <Text size="1" >Address:&nbsp;{userInfo?.user.address||""}</Text><br/>
      <Text size="1">City:&nbsp;{userInfo?.user.city||""}</Text><br/>
      <Text size="1">Postal Code:&nbsp;{userInfo?.user.postal||""}</Text><br/>
      <Button variant="surface" size="2" color="indigo" asChild >
      <Link href="/profile">
        Change Info
      </Link>
      </Button>
      </div>
      <p className="flex items-center justify-between px-1 font-semibold text-white">
        SubTotal: {" "}(
        {(
          productData.reduce((a: number, c: CartItem) => a + c.quantity, 0)
        )}{" "}
        items)
        <FormattedPrice discountPrice={subTotal}/>
      </p>
      
      <p className="text-white">
        Shipping:<span className="float-right pr-1">${shipping}</span>
      </p>
      <p className="flex items-center justify-between px-1 font-semibold border-t text-white">
        Total:{" "}
        <FormattedPrice discountPrice={totalAmount}/>
      </p>
      <div className="flex flex-col items-center">
      <form action={onCheckout} >
        <button
          type="submit"
          className="btn btn-primary btn-outline w-full"
        >
          Order Now
        </button>
        </form>
      </div>
    </div>
  );
};

export default CartPayment;
