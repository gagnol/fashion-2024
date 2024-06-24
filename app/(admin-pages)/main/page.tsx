import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Sidebar from "@/app/components/Admin-navigation/sidebar";
import Transactions from "@/app/components/Admin-navigation/transactions";
import OrderModel from '@/lib/order-model'
import ProductModel from '@/lib/product-model'
import UserModel from '@/lib/user-model'
import dbConnect from '@/lib/db-connect'
import Rightbar from "@/app/components/Admin-navigation/rightbar";
import { getSalesPerDay, getSalesPerMonth } from "@/lib/action";
import SalesChart from "@/app/components/Admin-navigation/Charts/salesChart";
import DailyChart from "@/app/components/Admin-navigation/Charts/dailyChart";
import ResponsiveSideBar from "@/app/components/Admin-navigation/responsive-sidebar";

export default async function Main() {
  const session = await getServerSession();

  if (session?.user?.email !== "admin@example.com") {
    redirect("/")
  }


  await dbConnect()

  const ordersCount = await OrderModel.countDocuments()
  const productsCount = await ProductModel.countDocuments()
  const usersCount = await UserModel.countDocuments()

  const ordersPriceGroup = await OrderModel.aggregate([
    {
      $group: {
        _id: null,
        sales: { $sum: '$totalAmount' },
      },
    },

  ])

  const formattedSales = (ordersPriceGroup[0]?.sales)/100

  const salesData = await OrderModel.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%d-%m', date: '$createdAt' } },
        totalOrders: { $sum: 1 },
        totalSales: { $sum: '$totalAmount' }
      },
    },
    {
      $project: {
        _id: 1,
        totalOrders: 1,
        totalSales: { $round: ['$totalSales', 2] } // Round to 2 decimal places
      }
    },
    { $sort: { _id: 1 } },
  ]);


  const totalProductsCount = await ProductModel.aggregate([
    {
      $group: {
        _id: null,
        totalProducts: { $sum: 1 },
      },
    },
  ]);

  

  const totalProducts = totalProductsCount.length > 0 ? totalProductsCount[0].totalProducts : 0;

  const productsData = await ProductModel.aggregate([
    {
      $group: {
        _id: '$category',
        totalProducts: { $sum: 1 },
      },
    },
    {
      $project: {
        category: '$_id',
        totalProducts: 1,
        percentage: {
          $multiply: [
            { $divide: ['$totalProducts', totalProducts] },
            100,
          ],
        },
      },
    },
    { $sort: { percentage: -1 } },
  ]);

  const graphData = await getSalesPerMonth();
  const graphData2 = await getSalesPerDay();
  return (
    <>
      <div className="max-w-screen-2xl w-full mx-auto my-10">
     
      <ResponsiveSideBar/>
        <div className="grid md:grid-cols-5 md:gap-4">
          <Sidebar />
        <div className="col-span-1 md:col-span-3">
            <h1 className="m-4 text-[28px] font-extrabold">Admin Dashboard</h1>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4 ">
                <div className=" max-w-[350px] xl:max-w-full m-5 p-5 rounded-md border-2">
                  <p className="text-3xl">${formattedSales} </p>
                  <p>Sales</p>
                  <Link href="/admin/orders" className="hover:text-primary">View sales</Link>
                </div>
                <div className="max-w-[350px] xl:max-w-full m-5 p-5 rounded-md border-2">
                  <p className="text-3xl">{ordersCount} </p>
                  <p>Orders</p>
                  <Link href="/orders" className="hover:text-primary">View orders</Link>
                </div>
             </div>
              <h2 className=" text-lg xl:text-xl my-2">Sales Report</h2>
            </div>
            <div className="mx-auto justify-center max-w-[350px] xl:max-w-full">
              <DailyChart data={graphData2} />
              <br/>
              <SalesChart data={graphData}/>
          </div>
          <Transactions />
          </div>
        
          <div className="md:col-span-1">
          <Rightbar  
          productsCount={productsCount}  
          usersCount={usersCount}
          productsData={productsData} />
          </div>
      </div>
    </div >
    </>
  )
}