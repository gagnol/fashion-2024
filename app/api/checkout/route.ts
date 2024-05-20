import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request:any) {
  const body = await request.json();

  const session = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: body.name,
            images: ["https://m.media-amazon.com/images/S/al-na-9d5791cf-3faf/fcf7ac46-f921-4b66-b183-8db87d9e61eb._CR0%2C0%2C1800%2C1800_SX200_.png"],
          },
          unit_amount: body.price,
        },
        quantity: 1,
      },
    ],
    
    metadata: {
       product: JSON.stringify(body.items.map((item:any) => item._id)), 
       name: JSON.stringify(body.items.map((item:any) => item.name)),
       image: JSON.stringify(body.items.map((item:any) => item.image)),
       prices: JSON.stringify(body.items.map((item:any) => item.price)),
       shipping: JSON.stringify(body.items.map((item:any) => item.shipping)),
       quantity: JSON.stringify(body.items.map((item:any) => item.quantity)),
       user: body.email,
       shippingAddress:body.shippingAddress
    },
    mode: "payment",

  });

  return NextResponse.json(session);
}
