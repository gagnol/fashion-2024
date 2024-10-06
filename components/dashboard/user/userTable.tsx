"use client";
import { FC } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/datatable";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@radix-ui/themes";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import DeleteForm from "./delete-user";

interface Props {
  users: any[]; 
}

// Define the column structure with dynamic content
export const usersColumn: ColumnDef<any>[] = [
  {
    accessorKey: "image",
    header: () => (
      <div className="font-[700] text-[14px] text-[#8A8A8A]">Image</div>
    ),
    cell: ({ row }) => {
      const item = row.original;
      return (
        <Image
          src={item.image} 
          alt=""
          width={50}
          height={50}
          className="rounded-lg max-w-[50px] max-h-[50px] min-h-[50px]"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: () => (
      <div className="font-[700] text-[14px] text-[#8A8A8A]">Name</div>
    ),
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: "email",
    header: () => (
      <div className="font-[700] text-[14px] text-[#8A8A8A]">Email</div>
    ),
    cell: ({ row }) => <div>{row.original.email}</div>,
  },
  
  {
    id: "edit",
    enableHiding: false,
    cell: ({ row }) => {
    const item = row.original;
      return (
        <Button size="2" variant='surface' asChild>
        <Link href={`/admin/product/${item._id}`} >
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
        <DeleteForm _id={item._id} name={item.name}/>
             );
    },
  },
];

// SupplierNeeds Component
const SupplierNeeds: FC<Props> = ({ users }) => {
  return (
    <div className="px-7">
      <DataTable columns={usersColumn} data={users} infive />
    </div>
  );
};

export default SupplierNeeds;
