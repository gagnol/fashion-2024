"use client";
import { FC } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/datatable";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@radix-ui/themes";
import { FaPencilAlt } from "react-icons/fa";
import { FaCheck, FaX } from "react-icons/fa6";

interface Props {
  products: any[]; 
  formattedProductSales: { productId: string; totalOrders: number }[];
}

// Define the column structure with dynamic content
export const stockColum: ColumnDef<any>[] = [
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
    accessorKey: "id",
    header: () => (
      <div className="font-[700] text-[14px] text-[#8A8A8A]">ID</div>
    ),
    cell: ({ row }) => <div>{(row.original._id).substring(15,25)}</div>,
  },
  {
    accessorKey: "topDeal",
    header: () => (
      <div className="font-[700] text-[14px] text-[#8A8A8A]">Top Deal</div>
    ),
    cell: ({ row }) => {
      const istopDeal = row.original.topDeal;
      return istopDeal==="true" ? (
        <FaCheck className="text-[16px]" color="#6649B6" />
      ) : (
        <FaX className="text-[16px]" color="red" />
      );
    },
  },
 
  {
    accessorKey: "discount",
    header: () => (
      <div className="font-[700] text-[14px] text-[#8A8A8A]">Discount</div>
    ),
    cell: ({ row }) => <div>{row.original.discount}%</div>,
  },
  {
    accessorKey: "totalOrders",
    header: () => (
      <div className="font-[700] text-[14px] text-[#8A8A8A]">Total Orders</div>
    ),
    cell: ({ row, table }) => {
      const productId = row.original._id;
      const formattedProductSales = table.options.data[0].formattedProductSales;

      // Find the matching product sales data
      const productSales = formattedProductSales.find(
        (sale: { productId: any; }) => sale.productId === productId
      );

      // Display total orders if found, else show 0
      return <div>{productSales ? productSales.totalOrders : 0}</div>;
    },
  },
  {
    accessorKey: "bestSeller",
    header: () => (
      <div className="font-[700] text-[14px] text-[#8A8A8A]">Best Seller</div>
    ),
    cell: ({ row }) => {
      const isBestSeller = row.original.bestSeller;
      return isBestSeller==="true" ? (
        <FaCheck className="text-[16px]" color="#6649B6" />
      ) : (
        <FaX className="text-[16px]" color="red" />
      );
    },
  },
  {
    accessorKey: "countInstock",
    header: () => (
      <div className="font-[700] text-[14px] text-[#8A8A8A]">Stock</div>
    ),
    cell: ({ row }) => <div>{row.original.countInStock}</div>,
  },
  {
    id: "edit",
    enableHiding: false,
    cell: ({ row }) => {
    const item = row.original;
      return (
        <Button size="1" variant='surface' color="indigo" asChild>
        <Link href={`/admin/product/${item._id}`} >
          Edit
          <FaPencilAlt />
        </Link>
      </Button>
      );
    },
  },
];

// SupplierNeeds Component
const SupplierNeeds: FC<Props> = ({ products, formattedProductSales  }) => {
  const dataWithSales = products.map((product) => ({
    ...product,
    formattedProductSales,
  }));
  return (
    <div className="px-7">
       <DataTable columns={stockColum} data={dataWithSales} infive />
    </div>
  );
};

export default SupplierNeeds;
