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
import { Button, Separator } from "@radix-ui/themes";

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

const Sidebar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  
  return (
    <div className="h-screen left-0 top-0 sticky p-10 flex flex-col border-[1px] border-spacing-1 
     border-[#666] gap-5 shadow-xl max-lg:hidden">
       <div className="flex flex-col gap-3">
        <Separator orientation="vertical"  size="4" mx="1"/>
        <div className="flex flex-col items-center">
        <Image
          className="rounded-[50%]"
          src={session?.user?.image || "/noavatar.png"}
          alt=""
          width={100}
          height={100}
        />
          <span className="font-bold">{session?.user?.name}</span>
          <span className="text-[12px]">Administrator</span>
        </div>
       <ul className="list-none">
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <Separator size="4" my="1"/>
            <span className="font-bold mx-5 text-[13px]">{cat.title}</span>
            {cat.list.map((item) => (
              <div key={item.title}>
                <Link href={item.path}  className={`flex gap-4 text-body-medium rounded-lg ${
              pathname === item.path ? " bg-[#444] border-2 font-semibold border-base-100" : "text-green-200"
            }`} >
                  <div className=" flex gap-2 MX-1 my-5 hover:text-primary">
                    <Button variant="ghost" size="3">
                      {item.icon}
                      {item.title}
                      </Button>
                    
                  </div>
                </Link>
              </div>
            ))}
          </li>
        ))}
      </ul>
      </div>
      </div>
  );
};

export default Sidebar;
