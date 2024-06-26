import Image from "next/image";
import dbConnect from "@/lib/db-connect";
import OrderModel from "@/lib/order-model"
import { Button } from "@radix-ui/themes";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Transactions = async () => {
  await dbConnect();
  const orderDocs = (await OrderModel.find().sort({
    _id: -1,
  }))
  const orders = JSON.parse(JSON.stringify(orderDocs));


  return (
    <div className="overflow-x-auto">
    <div className='block md:hidden xl:hidden'>
    <Button variant="ghost" size="3"><FaArrowLeft/> Scroll <FaArrowRight/></Button>                
    </div>
    <div className="max-w-[350px] xl:max-w-full my-5 rounded-md">
      <h2 className=" text-xl">Pending Transactions</h2>
      <table className="table text-center"> 
        <thead>
          <tr className="bg-base-200">
            <th>Product</th>
            <th>Buyer</th>
            <th>Price</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={5}>No orders found</td>
            </tr>
          ) : (
            orders
              .filter((item:any) => item.orderStatus === "Processing")
              .map((item: any) => (
                <tr key={item._id}>
                  <td>
                    <Image
                      src={item.image[0]}
                      alt=""
                      width={50}
                      height={50}
                      className="rounded-lg max-w-[50px] max-h-[50px] min-h-[50px]"
                    />
                  </td>
                  <td className='text-neutral-content'>{item.user}</td>
                  <td className='text-bold'>${(item.totalAmount)/100}</td>
                  <td>
                    {new Date(item.createdAt.substring(0, 10)).toLocaleDateString(
                      'en-US',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }
                    )}
                  </td>
                  <td>{item.orderStatus}</td>
                </tr>
              ))
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Transactions;
