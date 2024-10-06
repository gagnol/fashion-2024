import Image from 'next/image'
import { Toaster } from 'react-hot-toast'
import dbConnect from '@/lib/db-connect'
import OrderModel from '@/lib/order-model'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import UpdateForm from '@/app/components/Admin-navigation/update-order'
import Sidebar from '@/app/components/Admin-navigation/sidebar'
import { Button } from '@radix-ui/themes'
import { FaArrowLeft, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Link from 'next/link'


export default async function orders({ searchParams }:
  { searchParams: { [key: string]: string | string } }) {

  const query = searchParams.query || '';
  let page = parseInt(searchParams.page, 10);
  page = !page || page < 1 ? 1 : page;
  const perPage = 8;

  const session = await getServerSession();

  if (session?.user?.email !== "admin@example.com") {
    redirect("/")
  }


  await dbConnect()

  const NewOrders = (await OrderModel.find(
    {
      name: { $regex: new RegExp(query, 'i') },
    }
  )
    .skip(perPage * (page - 1))
    .limit(perPage)
    .sort({
      _id: -1,
    }));
  const orders = JSON.parse(JSON.stringify(NewOrders))

  const totalorders = (await OrderModel.countDocuments({}))


  const totalPages = Math.ceil(totalorders / perPage);

  const prevPage = page - 1 > 0 ? page - 1 : 1;
  const nextPage = page + 1;

  const pageNumbers = [];
  const offsetNumber = 3;
  for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
    if (i >= 1 && i <= totalPages) {
      pageNumbers.push(i);
    }
  }

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
                  <FaArrowLeft />
                  Scroll
                  <FaArrowRight />
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
                        <td>
                          <Button size="2" >
                            <Link href={`/orders/${order._id}`} >
                              Order detail
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center items-center my-16">
              <div className="flex border-[1px] gap-4 rounded-[10px] border-light-green p-4">
                {page === 1 ? (
                  <Button size="2" variant='surface' color='gray' aria-disabled="true">
                    Previous
                  </Button>
                ) : (
                  <Link href={`?page=${prevPage}`} aria-label="Previous Page">
                    <Button size="2" variant='surface' >
                      <FaChevronLeft />
                      Previous
                    </Button>
                  </Link>
                )}
                {pageNumbers.map((pageNumber, index) => (
                  <Link
                    key={index}
                    className={
                      page === pageNumber
                        ? "join-item btn btn-square btn-sm "
                        : "hover:join-item btn btn-square btn-neutral btn-sm "
                    }
                    href={`?page=${pageNumber}`}
                  >
                    {pageNumber}
                  </Link>
                ))}
                {page === totalPages ? (
                  <Button size="2" variant='surface' color='gray' aria-disabled="true">
                    Next
                  </Button>
                ) : (
                  <Link href={`?page=${nextPage}`} aria-label="Next Page">
                    <Button size="2" variant='surface'>
                      Next
                      <FaChevronRight />
                    </Button>
                  </Link>
                )}
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  )
}