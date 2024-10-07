"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, ChevronDown } from "lucide-react"
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
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function CommunicationDashboard() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-center"
      >
        Búsqueda de Responsables de Comunicación y Prensa
      </motion.h1>
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Search className="text-muted-foreground" />
              <Input
                placeholder="Buscar responsables..."
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="empresarial">Empresarial</SelectItem>
                    <SelectItem value="publico">Sector Público</SelectItem>
                    <SelectItem value="ong">ONG</SelectItem>
                    <SelectItem value="asociacion">Asociación Civil</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Área de especialización" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corporativa">Comunicación Corporativa</SelectItem>
                    <SelectItem value="crisis">Gestión de Crisis</SelectItem>
                    <SelectItem value="digital">Comunicación Digital</SelectItem>
                    <SelectItem value="rse">Responsabilidad Social</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Ubicación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Local</SelectItem>
                    <SelectItem value="nacional">Nacional</SelectItem>
                    <SelectItem value="internacional">Internacional</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Experiencia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="junior">Junior (0-3 años)</SelectItem>
                    <SelectItem value="mid">Mid (3-7 años)</SelectItem>
                    <SelectItem value="senior">Senior (7+ años)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid gap-6"
        >
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle>Nombre del Responsable {i}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold">Sector:</p>
                    <p>Empresarial</p>
                  </div>
                  <div>
                    <p className="font-semibold">Organización:</p>
                    <p>Empresa Innovadora S.A.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Área de especialización:</p>
                    <p>Comunicación Corporativa</p>
                  </div>
                  <div>
                    <p className="font-semibold">Ubicación:</p>
                    <p>Madrid, España</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  )
}