import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";

import Order from '@/lib/order-model'; // Update the path as needed

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(request: Request): Promise<Response> {
  const body = await request.text();
  const headersList = headers();
  const sig = headersList.get("stripe-signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig as string, endpointSecret);

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSessionCompleted = event.data.object as Stripe.Checkout.Session;

      // Extract metadata fields
      const { name, quantity, image, shippingAddress, user, prices, product, shipping }: any =
        checkoutSessionCompleted.metadata;

      // Create a new order document
      const order = new Order({
        product: JSON.parse(product),
        image: JSON.parse(image),
        name: JSON.parse(name),
        user: user,
        prices: JSON.parse(prices),
        quantity: JSON.parse(quantity),
        orderStatus: "Processing",
        shipping: JSON.parse(shipping),
        payment_status: checkoutSessionCompleted.payment_status,
        payment_intent: checkoutSessionCompleted.payment_intent,
        totalAmount: checkoutSessionCompleted.amount_total,
        shippingAdress: shippingAddress,
        createdAt: new Date()
      });

      try {
        // Save the order to MongoDB
        await order.save();
        console.log("Order saved successfully");
      } catch (error) {
        console.log("Error saving order:", error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
      }

      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return new Response(null, { status: 200 });
}
