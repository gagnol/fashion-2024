
import Tabmenu from "@/components/dashboard/product/tabmenu";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import StockTable from '@/components/dashboard/product/stockTable'
import { FC } from "react";
import ProductModel from '@/lib/product-model'
import dbConnect from '@/lib/db-connect'
import { getServerSession } from 'next-auth'
import { redirect } from "next/navigation";
import orderModel from "@/lib/order-model";


export default async function Stock() {
	const session = await getServerSession();

    if (session?.user?.email !== "admin@example.com") {
      redirect("/")
    }
    await dbConnect()

    const productsDocs = (await ProductModel.find()
      .sort({
        countInStock: 1,
      }));
    const products = JSON.parse(JSON.stringify(productsDocs))

	const currentYear = new Date().getFullYear();

	const productSalesAggregation = await orderModel.aggregate([
	  {
		// Match orders created in the current year
		$match: {
		  createdAt: {
			$gte: new Date(`${currentYear}-01-01`),
			$lte: new Date(`${currentYear}-12-31`),
		  },
		},
	  },
	  {
		// Unwind the product array, creating a separate document for each product in an order
		$unwind: "$product",
	  },
	  {
		// Group by each product ID and accumulate total sales and order count
		$group: {
		  _id: "$product", // Group by product ID
		  totalSales: { $sum: "$totalAmount" }, // Sum the total amount
		  totalOrders: { $sum: 1 }, // Count the number of orders per product
		},
	  },
	  {
		// Sort by total sales in descending order (optional)
		$sort: {
		  totalSales: -1,
		},
	  },
	]);
	
	const formattedProductSales = productSalesAggregation.map((sale: { _id: any; totalSales: number; totalOrders: any; }) => ({
	  productId: sale._id,
	  totalSales: sale.totalSales / 100, // Assuming totalAmount is stored in cents
	  totalOrders: sale.totalOrders,
	}));
	
	console.log(formattedProductSales)

	return (
		<div className="bg-[#F6F6F6] p-4 lg:gap-6 lg:p-6 
		min-h-screen w-full">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/admin/main"
						 className="text-muted-foreground/70">
							Admin
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage 
						className="text-muted-foreground/70">
							Products
						</BreadcrumbPage>
						<BreadcrumbSeparator />
					</BreadcrumbItem>
					<BreadcrumbItem>
						<BreadcrumbPage className="text-[16px] font-[400]">
							Stock Control
						</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<h1 className=" md:text-3xl sm:text-2xl text-xl font-medium my-2">
				Stock Control{" "}
			</h1>
			<main className="bg-white w-full h-full rounded-t-[12px] 
			rounded-b-[12px]">
				<Tabmenu />
				<StockTable products={products} formattedProductSales={formattedProductSales} />
			</main>
		</div>
	);
};


