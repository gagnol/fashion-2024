"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ChevronDown, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProfileModal from "./comunicationModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CommunicationDashboard({ product }: any) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal
  const [selectedComunicador, setSelectedComunicador] = useState<any>(null); // Periodista seleccionado

  // Estados para los filtros
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");

  const filteredProducts = product.filter((i: any) => {
    const matchesSearchQuery = i.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = selectedSector ? i.sector === selectedSector : true;
    const matchesSpecialization = selectedSpecialization ? i.specialization === selectedSpecialization : true;
    const matchesLocation = selectedLocation ? i.location === selectedLocation : true;
    const matchesExperience = selectedExperience ? i.experience === selectedExperience : true;

    return (
      matchesSearchQuery &&
      matchesSector &&
      matchesSpecialization &&
      matchesLocation &&
      matchesExperience
    );
  });

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSector("");
    setSelectedSpecialization("");
    setSelectedLocation("");
    setSelectedExperience("");
  };

  const openModal = (journalist: any) => {
    setSelectedComunicador(journalist);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedComunicador(null);
  };

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
                name="responsable"
                id="responsable"
                placeholder="Buscar responsables..."
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
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="flex items-center space-x-2"
              >
                <XCircle className="h-4 w-4" />
                <span>Borrar Filtros</span>
              </Button>
            </div>
            <motion.div
              initial={false}
              animate={{ height: isFiltersOpen ? "auto" : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <Select value={selectedSector} onValueChange={setSelectedSector}>
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
                <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
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
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Ubicación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Local</SelectItem>
                    <SelectItem value="nacional">Nacional</SelectItem>
                    <SelectItem value="internacional">Internacional</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedExperience} onValueChange={setSelectedExperience}>
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
          {filteredProducts.length > 0 ? (
            filteredProducts.map((i: any) => (
              <Card key={i._id}>
                <CardHeader>
                  <CardTitle>{i.name}</CardTitle>
                </CardHeader>
                <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm m-2">
                    <div>
                      <p className="font-semibold">Sector:</p>
                      <p>{i.sector}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Organización:</p>
                      <p>{i.organization}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Área de especialización:</p>
                      <p>{i.specialization}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Ubicación:</p>
                      <p>{i.location}</p>
                    </div>
                  </div>

                  <Button onClick={() => openModal(i)}>Ver perfil</Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center text-muted-foreground">
              No se encontraron registros.
            </div>
          )}
        </motion.div>
      </div>

      {/* Modal para ver detalle */}
      <ProfileModal
        isOpen={isModalOpen}
        onClose={closeModal}
        periodista={selectedComunicador}
      />
    </div>
  );
}
