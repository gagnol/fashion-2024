"use client"
import Image from "next/image";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";
import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator, Text } from "@radix-ui/themes";
import { useState } from "react";
import { LuMenu } from "react-icons/lu";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/main",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Products",
        path: "/product",
        icon: <MdShoppingBag />,
      },
      {
        title: "Orders",
        path: "/orders",
        icon: <MdAttachMoney />,
      },
    ],
  },
  {
    title: "Actions",
    list: [
      {
        title: "Customer Question",
        path: "/answers",
        icon: < MdHelpCenter />,
      },
      {
        title: "Stock Control",
        path: "/stock",
        icon: <MdAnalytics />,
      },
      {
        title: "Teams",
        path: "/dashboard/teams",
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const AdminSidebar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
<>
    <button onClick={() => setOpen(true)}>
                <p className=" items-center gap-1 h-8 px-2 border border-transparent
                text-white  hover:border-white cursor-pointer duration-300 flex xl:hidden" >
                    <LuMenu className="text-xl text-white font-extrabold" /> 
                    <Text size="4" className='font-bold'>Navigation</Text>
                </p>
            </button>
            <div className='py-3 top-0 left-0 right-0 shadow-md z-10 text-white'>
                <div className={`${!open && "hidden"} bg-gray-600/50 min-h-screen w-full 
              fixed top-0 left-0 right-0 `} onClick={() => setOpen(false)}></div>
                <div className={`${open ? "w-80" : "w-0"}  bg-[#141726] min-h-screen fixed overflow-y-scroll
                top-0 left-0 transition-all duration-300 `}>
                    <div className={`${!open && "hidden"} pt-3 mt-[80px]`}></div>
   
       <div className="flex flex-col gap-3 z-30 bg-[#141726]">
        
        <Image
          className="rounded-[50%]"
          src={session?.user?.image || "/noavatar.png"}
          alt=""
          width={100}
          height={100}
        />
          <span className="font-bold">{session?.user?.name}</span>
          <span className="text-[12px]">Administrator</span>
       <ul className="list-none">
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <Separator size="4" my="1"/>
            <span className="font-bold mx-5 text-[13px]">{cat.title}</span>
            {cat.list.map((item) => (
              <div key={item.title}>
                <Link href={item.path}  className={`flex gap-4 text-body-medium rounded-lg ${
              pathname === item.path ? "text-white bg-[#444] border-2 font-semibold border-base-100" : "text-green-200"
            }`} >
                  <div className=" flex gap-2 my-5 hover:text-primary">
                    <span className="text-primary text-[22px] mx-1">{item.icon}</span>
                    {item.title}
                  </div>
                </Link>
              </div>
            ))}
          </li>
        ))}
      </ul>
      </div>
      </div>
      </div>
      </>
  );
};

export default AdminSidebar;
