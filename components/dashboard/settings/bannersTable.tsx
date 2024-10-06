"use client";
import { FC } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/datatable";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@radix-ui/themes";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import DeleteForm from "./delete-banner";
import { FaEye } from "react-icons/fa6";

interface Props {
  products: any[]; 
}

// Define the column structure with dynamic content
export const productsColumn: ColumnDef<any>[] = [
  {
    accessorKey: "image",
    header: () => (
      <div className="font-[700] text-[14px] text-[#8A8A8A]">Image</div>
    ),
    cell: ({ row }) => {
      const item = row.original;
      return (
        <Image
          src={item.image} // Assuming item.image is an array and you need the first image
          alt=""
          width={250}
          height={150}
          className="rounded-lg max-w-[250px] max-h-[150px] min-h-[150px]"
        />
      );
    },
  },
  {
    accessorKey: "text",
    header: () => (
      <div className="font-[700] text-[14px] text-[#8A8A8A]">Text</div>
    ),
    cell: ({ row }) => <div>{row.original.text}</div>,
  },
  {
    accessorKey: "link",
    header: () => (
      <div className="font-[700] text-[14px] text-[#8A8A8A]">Link</div>
    ),
    cell: ({ row }) => <div>{row.original.link}</div>,
  },
  {
    id: "edit",
    enableHiding: false,
    cell: ({ row }) => {
    const item = row.original;
      return (
        <Button size="1" variant='surface' color="indigo" asChild>
        <Link href={`/admin/settings/${item._id}`} >
          Edit
          <FaPencilAlt />
        </Link>
      </Button>
             );
    },
  },
  {
    id: "delete",
    enableHiding: false,
    cell: ({ row }) => {
        const item = row.original;
      return (
        <DeleteForm _id={item._id} />
             );
    },
  },
 
 
];

// SupplierNeeds Component
const SupplierNeeds: FC<Props> = ({ products }) => {
  return (
    <div className="px-7">
      <DataTable columns={productsColumn} data={products} infive />
    </div>
  );
};

export default SupplierNeeds;
