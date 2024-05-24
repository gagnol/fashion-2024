import dbConnect from "@/lib/db-connect";
import orderModel from "@/lib/order-model";
import { Button } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

export default async function OrderId({ params }: { params: { _id: string } }) {
    const id = params._id;
    await dbConnect();
    const orderDoc = await orderModel.findOne({ _id: id });
    const order = JSON.parse(JSON.stringify(orderDoc));
   
 
    return (
        <div className="max-w-screen-xl mx-auto px-6 gap-10 py-4">
            <div className="bg-[#141726] p-4 rounded-lg">
                <div className="flex items-center justify-between border-b-[1px] pb-1">
                    <p className="text-2xl font-semibold">
                        Your Order Detail
                    </p>
                </div>
                <div>
                    <div className="mt-2">
                        <div>
                            <strong>Product:</strong> {order.product.join(', ')}
                        </div>
                        <div>
                            <strong>Image:</strong>
                            {order.image.map((img: string, index: number) => (
                                <div key={index} className="flex gap-2" >
                                <Image
                                     src={img}
                                    alt={`Product Image ${index + 1}`}
                                    width={100}
                                    height={100}
                                    className="rounded-md "
                                />
                                </div>
                            ))}
                        </div>
                        <div>
                            <strong>Name:</strong> {order.name.join(', ')}
                        </div>
                        <div>
                            <strong>User:</strong> {order.user}
                        </div>
                        <div>
                            <strong>Prices:</strong>$ {order.prices.join(', ')}
                        </div>
                        <div>
                            <strong>Quantity:</strong> {order.quantity.join(', ')}
                        </div>
                        <div>
                            <strong>Order Status:</strong> {order.orderStatus}
                        </div>
                        <div>
                            <strong>Shipping:</strong> {order.shipping.join(', ')}
                        </div>
                        <div>
                            <strong>Payment Status:</strong>&nbsp;
                            <Button size="1" color="jade" variant="surface" >
                             {order.payment_status}
                             </Button>
                        </div>
                        <div>
                            <strong>Payment Intent:</strong> {order.payment_intent}
                        </div>
                        <div>
                            <strong>Total Amount:</strong> ${(order.totalAmount)/100}
                        </div>
                        <div>
                            <strong>Shipping Address:</strong> {order.shippingAdress}
                        </div>
                        <div>
                            <strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}
                        </div>
                    </div>
                    <Button size="2" asChild >
                    <Link href="/profile" >
                        Back
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
