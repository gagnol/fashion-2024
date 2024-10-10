"use client";
import { FC } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/datatable";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@radix-ui/themes";

interface Props {
  orders: any[]; // Adjust based on your order model
}

// Define the column structure with dynamic content
export const ordersColumn: ColumnDef<any>[] = [
  {
    accessorKey: "image",
    header: () => (
      <div className="font-[700] text-[14px] text-[#8A8A8A]">Image</div>
    ),
    cell: ({ row }) => {
      const item = row.original;
      return (
        <Image
          src={item.image[0]} // Assuming item.image is an array and you need the first image
          alt=""
          width={50}
          height={50}
          className="rounded-lg max-w-[50px] max-h-[50px] min-h-[50px]"
        />
      );
    },
  },
  {
    accessorKey: "user",
    header: () => (
      <div className="font-[700] text-[14px] text-[#8A8A8A]">User</div>
    ),
    cell: ({ row }) => <div>{row.original.user}</div>,
  },
  {
    accessorKey: "totalAmount",
    header: () => (
      <div className="font-[700] text-[14px] text-[#8A8A8A]">Total Amount</div>
    ),
    cell: ({ row }) => <div>${(row.original.totalAmount / 100).toFixed(2)}</div>,
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <div className="font-[700] text-[14px] text-[#8A8A8A]">Date</div>
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt.substring(0, 10)).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );
      return <div>{date}</div>;
    },
  },
  {
    accessorKey: "orderStatus",
    header: () => (
      <div className="font-[700] text-[14px] text-[#8A8A8A]">Order Status</div>
    ),
    cell: ({ row }) => {
      const orderStatus = row.original.orderStatus;
      const buttonColor = orderStatus === "Processing" ? "yellow" : "jade";
  
      return (
        <div>
          <Button variant="surface" size="1" color={buttonColor}>
            {orderStatus}
          </Button>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original;
      return (
              <Button  size="1" variant="classic" asChild>
                  <Link href={`/admin/orders/${item._id}`}>
                  Update Order
                  </Link>
                </Button>
                );
    },
  },
];

// SupplierNeeds Component
const SupplierNeeds: FC<Props> = ({ orders }) => {
  return (
    <div className="px-7">
      <DataTable columns={ordersColumn} data={orders} infive />
    </div>
  );
};

export default SupplierNeeds;
