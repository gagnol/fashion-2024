
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import dbConnect from "@/lib/db-connect";
import OrderModel from "@/lib/order-model"
import UserModel from "@/lib/user-model"
import UserUpdate from "../../components/User-navigation/update-user"
import Journalist from "@/components/User-navigation/journalist"
import Link from 'next/link';
import { MdAttachMoney, MdFavorite, MdOutlineChat } from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";
import { Button, Strong, Text } from '@radix-ui/themes';



export default async function ProfileScreen() {

    const session = await getServerSession();

    if (!session?.user) {
        redirect("/signin")
    }

     

    return (
      <div>
        <Journalist/>
      </div>
    );
}


