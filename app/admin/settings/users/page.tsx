import Tabmenu from "@/components/dashboard/settings/tabmenu";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { FC } from "react";

interface UsersProps {}



const Users: FC<UsersProps> = ({}) => {
	return (
		<div className="bg-[#F6F6F6] p-4 lg:gap-6 lg:p-6 min-h-screen w-full">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/" className="text-muted-foreground/70">
							Home
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
							User
						</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<h1 className="mt-4 mb-7 text-[32px] font-[700]">User</h1>

			<main className="bg-white w-full h-full rounded-t-[12px] rounded-b-[12px]">
				<Tabmenu />
			<h4>LOLO</h4>
			</main>
		</div>
	);
};

export default Users;
