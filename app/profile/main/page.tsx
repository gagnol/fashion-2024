
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import dbConnect from "@/lib/db-connect";
import OrderModel from "@/lib/order-model"
import UserModel from "@/lib/user-model"
import UserUpdate from "../../components/User-navigation/update-user"
import Directories from "@/components/User-navigation/directorio"
import Link from 'next/link';
import { MdAttachMoney, MdFavorite, MdOutlineChat } from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";
import { Button, Strong, Text } from '@radix-ui/themes';



export default async function ProfileScreen() {

    const session = await getServerSession();

    if (!session?.user) {
        redirect("/signin")
    }

    await dbConnect();

    const orderDocs = (await OrderModel.find({ user:session.user.email }).sort({
        _id: -1,
    }))
    const orders = JSON.parse(JSON.stringify(orderDocs));

    const userDocs = (await UserModel.findOne({ email: session.user.email }))
    const users = JSON.parse(JSON.stringify(userDocs));

    return (
      <div>
        <Directories/>
      </div>
    );
}


