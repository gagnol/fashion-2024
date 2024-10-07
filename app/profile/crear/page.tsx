"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Edit, Users, Send, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export default function PressReleaseDashboard() {
  const [isSegmentationOpen, setIsSegmentationOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      
      <div className="flex-1 overflow-auto p-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8"
        >
          Creación y Distribución de Comunicados
        </motion.h1>
        <div className="max-w-4xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Edit className="mr-2" />
                Crear Comunicado de Prensa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <Input placeholder="Título del comunicado" />
                <Textarea placeholder="Contenido del comunicado" rows={10} />
                <div className="flex justify-end">
                  <Button>Guardar borrador</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2" />
                Segmentación de Audiencia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Criterios de Segmentación</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Tipo de medio" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="prensa">Prensa</SelectItem>
                          <SelectItem value="television">Televisión</SelectItem>
                          <SelectItem value="radio">Radio</SelectItem>
                          <SelectItem value="digital">Digital</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Temática" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="politica">Política</SelectItem>
                          <SelectItem value="economia">Economía</SelectItem>
                          <SelectItem value="tecnologia">Tecnología</SelectItem>
                          <SelectItem value="cultura">Cultura</SelectItem>
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
                          <SelectValue placeholder="Alcance" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pequeno">Pequeño</SelectItem>
                          <SelectItem value="mediano">Mediano</SelectItem>
                          <SelectItem value="grande">Grande</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className="mt-4">
                <Button onClick={() => setIsSegmentationOpen(!isSegmentationOpen)}>
                  Ver audiencia seleccionada
                  <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-200 ${
                    isSegmentationOpen ? "rotate-180" : ""
                  }`} />
                </Button>
              </div>
              <motion.div
                initial={false}
                animate={{ height: isSegmentationOpen ? "auto" : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 p-4 bg-muted rounded-md">
                  <p>Audiencia seleccionada: 150 contactos</p>
                  <ul className="list-disc list-inside">
                    <li>50 medios de prensa</li>
                    <li>30 canales de televisión</li>
                    <li>70 medios digitales</li>
                  </ul>
                </div>
              </motion.div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Send className="mr-2" />
                Distribución
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input type="datetime-local" />
                  <Button>Programar envío</Button>
                </div>
                <div className="flex justify-between items-center">
                  <p>Estado: Listo para enviar</p>
                  <Button>Enviar ahora</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}