"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Users, Send, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "react-hot-toast";
import { nuevaComicacion } from "@/lib/action";

export default function PressReleaseDashboard() {
  const [isSegmentationOpen, setIsSegmentationOpen] = useState(false);
  const [mediaType, setMediaType] = useState("");
  const [topic, setTopic] = useState("");
  const [location, setLocation] = useState("");
  const [reach, setReach] = useState("");
  const [distributionDate, setDistributionDate] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);

    // Manually append the 'Select' values to the formData
    formData.append("mediaType", mediaType);
    formData.append("topic", topic);
    formData.append("location", location);
    formData.append("reach", reach);
    formData.append("distributionDate", distributionDate);

    const res = await nuevaComicacion(null, formData); // Llamar a nuevaComicacion (action.ts)
    toast.success(res.message, { duration: 4000, position: "top-center" });
    setIsSubmitting(false);
  };

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
              <form
                onSubmit={async (event) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  await handleSubmit(formData);
                }}
                className="space-y-4"
              >
                {/* Campo para el título */}
                <Input name="title" placeholder="Título del comunicado" required />

                {/* Campo para el contenido */}
                <Textarea name="content" placeholder="Contenido del comunicado" rows={10} required />

                {/* Select para el tipo de medio */}
                <Select onValueChange={(value) => setMediaType(value)} required>
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

                {/* Select para la temática */}
                <Select onValueChange={(value) => setTopic(value)} required>
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

                {/* Select para la ubicación */}
                <Select onValueChange={(value) => setLocation(value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Ubicación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Local</SelectItem>
                    <SelectItem value="nacional">Nacional</SelectItem>
                    <SelectItem value="internacional">Internacional</SelectItem>
                  </SelectContent>
                </Select>

                {/* Select para el alcance */}
                <Select onValueChange={(value) => setReach(value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Alcance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pequeno">Pequeño</SelectItem>
                    <SelectItem value="mediano">Mediano</SelectItem>
                    <SelectItem value="grande">Grande</SelectItem>
                  </SelectContent>
                </Select>

                {/* Input para la fecha de distribución */}
                <Input
                  type="datetime-local"
                  name="distributionDate"
                  onChange={(e) => setDistributionDate(e.target.value)}
                  required
                />

                {/* Botón de enviar */}
                <div className="flex justify-end">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Enviar comunicado"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
