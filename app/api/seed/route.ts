import data from "@/data";
import dbConnect from "@/lib/db-connect";
import orderModel from "@/lib/order-model";
import { NextResponse } from "next/server";

export const GET = async (req: any) => {

  await dbConnect();

  await orderModel.insertMany(data.orders);

  return NextResponse.json({ message: 'seeded successfully' });
}