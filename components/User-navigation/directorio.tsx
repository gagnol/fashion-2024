"use client";
import { FC, useState, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./datatable";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Eye, Filter, Search, X } from "lucide-react";
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
import { subDays, subMonths, subYears, isAfter } from "date-fns";

interface Props {
  orders: any[]; // Ajustar según el modelo de orden
}

// Columnas para DataTable
export const ordersColumn: ColumnDef<any>[] = [
  {
    accessorKey: "image",
    header: () => <div className="font-[700] text-[14px] text-[#8A8A8A]">Portada</div>,
    cell: ({ row }) => (
      <Image
        src={row.original.image}
        alt=""
        width={100}
        height={100}
        className="rounded-lg max-w-[100px] max-h-[100px] min-h-[100px]"
      />
    ),
  },
  {
    accessorKey: "title",
    header: () => <div className="font-[700] text-[14px] text-[#8A8A8A]">Título</div>,
    cell: ({ row }) => (
      <div className="font-bold">
        {row.original.title.length > 50
          ? `${row.original.title.substring(0, 50)}...`
          : row.original.title}
      </div>
    ),
  },
  {
    accessorKey: "topic",
    header: () => <div className="font-[700] text-[14px] text-[#8A8A8A]">Tópico</div>,
    cell: ({ row }) => <div>{row.original.topic}</div>,
  },
  {
    accessorKey: "date",
    header: () => (
      <div className="font-[700] text-[14px] text-[#8A8A8A]">Fecha</div>
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.updatedAt); // Assuming 'createdAt' holds the date
      const formattedDate = date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
  
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "location",
    header: () => <div className="font-[700] text-[14px] text-[#8A8A8A]">Ubicación</div>,
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
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedDateRange("");
    setSelectedLocation("");
  };

  const filteredOrders = useMemo(() => {
    const now = new Date();
    return orders.filter((order) => {
      const matchesSearch =
        order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.location.toLowerCase().includes(searchQuery.toLowerCase());

      const orderDate = new Date(order.createdAt);
      const matchesDateRange =
        (selectedDateRange === "ultima-semana" && isAfter(orderDate, subDays(now, 7))) ||
        (selectedDateRange === "ultimo-mes" && isAfter(orderDate, subMonths(now, 1))) ||
        (selectedDateRange === "ultimo-ano" && isAfter(orderDate, subYears(now, 1))) ||
        !selectedDateRange;

      const matchesLocation = selectedLocation
        ? order.location === selectedLocation
        : true;

      return matchesSearch && matchesDateRange && matchesLocation;
    });
  }, [orders, searchQuery, selectedDateRange, selectedLocation]);

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

      {/* Sección de búsqueda y filtros */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <Search className="text-muted-foreground" />
            <Input
              name="Buscar"
              id="Buscar"
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
            <Button variant="ghost" onClick={handleClearFilters}>
              <X className="h-4 w-4" />Limpiar filtros
            </Button>
          </div>

          {/* Filtros desplegables */}
          <motion.div
            initial={false}
            animate={{ height: isFiltersOpen ? "auto" : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <Select
                onValueChange={(value) => setSelectedDateRange(value)}
                value={selectedDateRange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Fecha" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ultima-semana">Última semana</SelectItem>
                  <SelectItem value="ultimo-mes">Último mes</SelectItem>
                  <SelectItem value="ultimo-ano">Último año</SelectItem>
                </SelectContent>
              </Select>

              <Select
                onValueChange={(value) => setSelectedLocation(value)}
                value={selectedLocation}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Ubicación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="local">Local</SelectItem>
                  <SelectItem value="nacional">Nacional</SelectItem>
                  <SelectItem value="internacional">Internacional</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Tabla de datos */}
      <DataTable
        columns={ordersColumn}
        data={filteredOrders}
      />
    </div>
  );
};

export default SupplierNeeds;
