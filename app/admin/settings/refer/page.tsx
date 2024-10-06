"use client";
import Tabmenu from "@/components/dashboard/settings/tabmenu";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import Image from "next/image";

import toast from "react-hot-toast";

import { FC } from "react";

interface ReferProps {}

const Refer: FC<ReferProps> = ({}) => {
	const link = "https://detmo.co/ba3989723";

	const onCopy = async () => {
		await navigator.clipboard.writeText(link);
		toast.success("link copied");
	};

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
							Refer
						</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<h1 className="mt-4 mb-7 text-[32px] font-[700]">Refer</h1>

			<main className="bg-white w-full h-full rounded-t-[12px] rounded-b-[12px]">
				<Tabmenu />

				<h1>hello 3</h1>
				
			</main>
		</div>
	);
};

export default Refer;
