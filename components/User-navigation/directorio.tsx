"use client";

import { FC, useState, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./datatable";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Eye, Filter, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";

interface Props {
  orders: any[]; // Adjust based on your order model
}

// Column definitions for the DataTable
export const ordersColumn: ColumnDef<any>[] = [
  {
    accessorKey: "image",
    header: () => (
      <div className="font-[700] text-[14px] text-[#8A8A8A]">Portada</div>
    ),
    cell: ({ row }) => (
      <Image
        src={row.original.image}
        alt=""
        width={150}
        height={150}
        className="rounded-lg max-w-[50px] max-h-[50px] min-h-[50px]"
      />
    ),
  },
  {
    accessorKey: "title",
    header: () => (
      <div className="font-[700] text-[14px] text-[#8A8A8A]">Título</div>
    ),
    cell: ({ row }) => <div className="font-bold">   {row.original.title.length > 100 
      ? `${row.original.title.substring(0, 100)}...` 
      : row.original.title}</div>,
  },
  {
    accessorKey: "topic",
    header: () => (
      <div className="font-[700] text-[14px] text-[#8A8A8A]">Tópico</div>
    ),
    cell: ({ row }) => <div>{row.original.topic}</div>,
  },
  {
    accessorKey: "location",
    header: () => (
      <div className="font-[700] text-[14px] text-[#8A8A8A]">Ubicación</div>
    ),
    cell: ({ row }) => <div>{row.original.location}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Link href={`/profile/crear/${row.original._id}`}>
        <Button size="sm" variant="ghost">
          <Eye />
        </Button>
      </Link>
    ),
  },
];

const SupplierNeeds: FC<Props> = ({ orders }) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter orders based on the search query
  const filteredOrders = useMemo(() => {
    return orders.filter(
      (order) =>
        order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [orders, searchQuery]);

  return (
    <div className="px-7">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 mt-8"
      >
        Directorio de Comunicados
      </motion.h1>

      {/* Search and Filters Section */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <Search className="text-muted-foreground" />
            <Input
              placeholder="Buscar comunicados..."
              className="flex-grow"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button onClick={() => setIsFiltersOpen(!isFiltersOpen)}>
             <Filter className="mr-2 h-4 w-4" />
              Filtros
              <ChevronDown
                className={`ml-2 h-4 w-4 transition-transform duration-200 ${
                 isFiltersOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
          </div>

          {/* Filters Dropdown */}
          <motion.div
            initial={false}
            animate={{ height: isFiltersOpen ? "auto" : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="borrador">Borrador</SelectItem>
                  <SelectItem value="programado">Programado</SelectItem>
                  <SelectItem value="enviado">Enviado</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Fecha" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ultima-semana">Última semana</SelectItem>
                  <SelectItem value="ultimo-mes">Último mes</SelectItem>
                  <SelectItem value="ultimo-ano">Último año</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Audiencia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pequena">Pequeña (&lt;100)</SelectItem>
                  <SelectItem value="mediana">Mediana (100-500)</SelectItem>
                  <SelectItem value="grande">Grande (&gt;500)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <DataTable columns={ordersColumn} data={filteredOrders} />
    </div>
  );
};

export default SupplierNeeds;
