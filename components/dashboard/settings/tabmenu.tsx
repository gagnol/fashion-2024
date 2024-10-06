'use client';
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface Props {}

const Tabmenu: FC<Props> = ({}) => {
	const pathname = usePathname();

	return (
		<div className="border-b-[1px] p-5 py-4 flex items-center gap-5 md:gap-10 lg:gap-16">
			<Link
				href="/admin/settings"
				className={cn(
					"flex items-center py-2 text-muted-foreground/70 transition-all hover:text-blue text-[16px]",
					pathname === "/admin/settings" &&
				"text-blue text-black font-[500] border-b-blue-700 border-b-[4px]"
				)}
			>
				General
			</Link>
			<Link
				href="/admin/settings/users"
				className={cn(
					"flex items-center py-2 text-muted-foreground/70 transition-all hover:text-blue text-[16px]",
					pathname === "/admin/settings/users" &&
						"text-blue text-black font-[500] border-b-blue-700 border-b-[4px]"
				)}
			>
				Users
			</Link>

			<Link
				href="/admin/settings/billing"
				className={cn(
					"flex items-center py-2 text-muted-foreground/70 transition-all hover:text-blue text-[16px]",
					pathname === "/admin/settings/billing" &&
						"text-blue text-black font-[500] border-b-blue-700 border-b-[4px]"
				)}
			>
				Billing
			</Link>
			<Link
				href="/admin/settings/refer"
				className={cn(
					"flex items-center py-2 text-muted-foreground/70 transition-all hover:text-blue text-[16px]",
					pathname === "/admin/settings/refer" &&
						"text-blue text-black font-[500] border-b-blue-700 border-b-[4px]"
				)}
			>
				Refer
			</Link>
		</div>
	);
};




export default Tabmenu