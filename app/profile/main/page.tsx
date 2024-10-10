
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import OrderModel from '@/lib/order-model'
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
		
		<PressReleaseDirectory/>
		</main>
		</div>
);
}


