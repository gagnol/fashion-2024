import Tabmenu from "@/components/User-navigation/spend-analysis-comp/tabmenu";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import BannersList from "@/components/dashboard/settings/bannersList";
import ProductModel from "@/lib/product-model";
import SliderModel from "@/lib/slider-model";
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { getSalesPerDay, getSalesPerMonth } from "@/actions/dashborad";
import CardHeaders from "@/components/dashboard/spend-analysis-comp/cards-headers";
import MonthlySales from "@/components/dashboard/spend-analysis-comp/monthly_sales";
import SupplierNeeds from "@/components/dashboard/spend-analysis-comp/supplierneeds";
import dbConnect from "@/lib/db-connect";
import OrderModel from '@/lib/order-model'
import { motion } from "framer-motion";
import PressReleaseDirectory from "@/components/User-navigation/directorio";


export default async function ProfileScreen() {

    const session = await getServerSession();

    if (!session?.user) {
        redirect("/signin")
    }
  /* data table */
  const orderDocs = await OrderModel.find().sort({ _id: -1 });
  const orders = JSON.parse(JSON.stringify(orderDocs));

    return (
      <div className="bg-[#F6F6F6] p-4 lg:gap-6 lg:p-6 h-full w-full">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/" className="text-muted-foreground/70">
							Usuario
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage className="text-muted-foreground/70">
							Comunicados
						</BreadcrumbPage>
						<BreadcrumbSeparator />
					</BreadcrumbItem>
					<BreadcrumbItem>
						<BreadcrumbPage className="text-[16px] font-[400]">
						 	Mis comunicados
						</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		
		<main className="bg-white w-full h-full rounded-t-[12px] rounded-b-[12px]">
		<Tabmenu />
		<PressReleaseDirectory/>
		</main>
		</div>
);
}


