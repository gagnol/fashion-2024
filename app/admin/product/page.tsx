import { Toaster } from 'react-hot-toast';
import dbConnect from '@/lib/db-connect';
import ProductModel from '@/lib/product-model';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import SearchBox from '@/components/dashboard/product/search';
import ProductTable from '@/components/dashboard/product/productTable';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Tabmenu from '@/components/dashboard/product/tabmenu';
import ProductClient from '@/components/dashboard/product/filter';

export default async function ProductDashboard({ searchParams }:any) {
  const session = await getServerSession();

  if (session?.user?.email !== "admin@example.com") {
    redirect("/");
  }

  await dbConnect();
  const productsDocs = await ProductModel.find().sort({ _id: -1 });
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
							Products
						</BreadcrumbPage>
						<BreadcrumbSeparator />
					</BreadcrumbItem>
					<BreadcrumbItem>
						<BreadcrumbPage className="text-[16px] font-[400]">
						 	All Products
						</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<h1 className=" md:text-3xl sm:text-2xl text-xl font-medium my-2">
				All Products{" "}
			</h1>
      <main className="bg-white w-full h-full rounded-t-[12px] rounded-b-[12px]">
      <Tabmenu />
        <div className="overflow-x-auto">
       <ProductClient products={products}  />
          </div>
      </main>
        
     
    </div>
  );
}
