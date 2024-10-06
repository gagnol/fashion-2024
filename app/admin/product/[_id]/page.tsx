
import dbConnect from "@/lib/db-connect";
import ProductModel from "@/lib/product-model";
import EditProduct from "@/components/dashboard/product/edit-product"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function ProductId({ params }: { params: { _id: string } }) {

    const session = await getServerSession();

    if (session?.user?.email !== "admin@example.com") {
        redirect("/")
    }

    const id = params._id;

    await dbConnect();
    const productDoc = await ProductModel.findOne({ _id: id });
    const product = JSON.parse(JSON.stringify(productDoc));

  

    return (
        <div className="max-w-screen-xl mx-auto px-6 gap-10 py-4">
          
        <EditProduct product={product}/>
        </div>


    );
}