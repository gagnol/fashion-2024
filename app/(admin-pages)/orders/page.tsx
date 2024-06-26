import Image from 'next/image'
import { Toaster } from 'react-hot-toast'
import dbConnect from '@/lib/db-connect'
import OrderModel from '@/lib/order-model'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import UpdateForm from '@/app/components/Admin-navigation/update-order'
import Sidebar from '@/app/components/Admin-navigation/sidebar'
import { Button } from '@radix-ui/themes'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'


export default async function orders() {

  const session = await getServerSession();

  if (session?.user?.email !== "admin@example.com") {
    redirect("/")
  }


  await dbConnect()

  const NewOrders = (await OrderModel.find()
    .sort({
      _id: 1,
    }));
  const orders = JSON.parse(JSON.stringify(NewOrders))

  const totalorders = (await OrderModel.countDocuments({}))

  return (
    <div className="max-w-screen-2xl mx-auto my-10">
      <div className="grid grid-cols-1 md:grid-cols-5 md:gap-5">
        <Sidebar />
        <div className="col-span-1 md:col-span-4">
          <div className="mx-auto max-w-2xl lg:max-w-7xl" >
            <div className="flex justify-between items-center">
              <h1 className="font-bold py-10 text-2xl ">Admin Orders</h1>
              <Toaster />
            </div>
             Total orders :  {totalorders}
            <div className="overflow-x-auto">
              <div className='block md:hidden xl:hidden'>
              <Button variant="ghost" size="3">
               <FaArrowLeft/>
                Scroll 
               <FaArrowRight/>
              </Button>                
              </div>
             
              <table className="min-w-full divide-y divide-indigo-500 text-center">
                <thead>
                  <tr className="bg-gray-500">
                    <th scope="col" className="px-6 py-3 text-xs font-medium  uppercase tracking-wider">Id</th>
                    <th scope="col" className="px-6 py-3 text-xs font-medium  uppercase tracking-wider">Image</th>
                    <th scope="col" className="px-6 py-3 text-xs font-medium  uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-xs font-medium  uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-xs font-medium  uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-sm ">No orders found</td>
                    </tr>
                  ) : (
                    orders.map((order: any) => (
                      <tr key={order._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm ">{order._id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Image
                            src={order.image[0]}
                            alt={order.name}
                            width={50}
                            height={50}
                            className="rounded-lg max-w-[50px] max-h-[50px] min-h-[50px]"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-content">{order.user}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">{order.orderStatus}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <UpdateForm
                            _id={order._id}
                            orderStatus={order.orderStatus}
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>


          </div>
        </div>
      </div>
    </div>
  )
}