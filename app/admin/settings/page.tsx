

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import dbConnect from '@/lib/db-connect';
import SliderModel from "@/lib/slider-model";


export default async function Settings() {
	
	await dbConnect();
	const productsDocs = await SliderModel.find().sort({ _id: -1 });
	const products = JSON.parse(JSON.stringify(productsDocs));
  
	return (
		<div className="bg-[#F6F6F6] p-4 lg:gap-6 lg:p-6 h-full w-full">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/" className="text-muted-foreground/70">
							Admin
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage className="text-muted-foreground/70">
							Settings
						</BreadcrumbPage>
						<BreadcrumbSeparator />
					</BreadcrumbItem>
					<BreadcrumbItem>
						<BreadcrumbPage className="text-[16px] font-[400]">
						 	General
						</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		<h1 className="mt-4 mb-7 text-[32px] font-[700]">General</h1>
		<main className="bg-white w-full h-full rounded-t-[12px] rounded-b-[12px]">
		
		
		</main>
		</div>
	);
};


