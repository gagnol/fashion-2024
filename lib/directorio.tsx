"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, ChevronDown, Eye, Edit, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default function PressReleaseDirectory() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  // Ejemplo de datos de comunicados
  const pressReleases = [
    { id: 1, title: "Lanzamiento de Nuevo Producto", date: "2023-05-15", status: "Enviado", audience: 150 },
    { id: 2, title: "Informe Anual de Resultados", date: "2023-06-01", status: "Borrador", audience: 200 },
    { id: 3, title: "Apertura de Nueva Sucursal", date: "2023-06-10", status: "Programado", audience: 100 },
  ]

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 overflow-auto p-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8"
        >
          Directorio de Comunicados
        </motion.h1>
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Search className="text-muted-foreground" />
              <Input
                placeholder="Buscar comunicados..."
                className="flex-grow"
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
        <Card>
          <CardHeader>
            <CardTitle>Lista de Comunicados</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Audiencia</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pressReleases.map((release) => (
                  <TableRow key={release.id}>
                    <TableCell>{release.title}</TableCell>
                    <TableCell>{release.date}</TableCell>
                    <TableCell>{release.status}</TableCell>
                    <TableCell>{release.audience}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}