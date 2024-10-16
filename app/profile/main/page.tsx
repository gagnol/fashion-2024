
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import PressReleaseDirectory from "@/components/User-navigation/directorio";
import dbConnect from "@/lib/db-connect";
import PressModel from '@/lib/Pressrelease-model'
import Tabmenu from "@/components/User-navigation/tabmenu";


export default async function ProfileScreen() {

    const session = await getServerSession();

    if (!session?.user) {
     redirect("/signin")
    }
	await dbConnect();
    const ordersDocs = await PressModel.find().sort({ _id: -1 });
    const orders = JSON.parse(JSON.stringify(ordersDocs));
    
    return (
      <div className="bg-[#F6F6F6] p-4 lg:gap-6 lg:p-6 h-full w-full">
		<main className="bg-white w-full h-full rounded-t-[12px] rounded-b-[12px]">
		<Tabmenu/>
		<PressReleaseDirectory orders={orders}/>
		</main>
		</div>
);
}


