"use client";
import { SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import { Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast, Toaster } from "react-hot-toast";
import { nuevaComicacion } from "@/lib/action";
import { useSession } from "next-auth/react";
import ImageUpload from "@/components/User-navigation/UploadImage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation"; 

export default function PressReleaseDashboard() {
  const { data: session } = useSession();
  const router = useRouter(); // Initialize useRouter
  const [mediaType, setMediaType] = useState("");
  const [topic, setTopic] = useState("");
  const [location, setLocation] = useState("");
  const [reach, setReach] = useState("");
  const [distributionDate, setDistributionDate] = useState("");
  const [image, setImage] = useState<string[]>([]); // Store uploaded image URLs
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleImageChange = (url: string) => setImage([url]); // Limit to one image
  const handleImageRemove = () => setImage([]);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);

    // Append hidden email and image to formData
    formData.append("email", session?.user?.email || "");
    if (image.length > 0) {
      formData.append("image", image[0]); // Only one image
    }

    // Append Select values
    formData.append("mediaType", mediaType);
    formData.append("topic", topic);
    formData.append("location", location);
    formData.append("reach", reach);
    formData.append("distributionDate", distributionDate);

    const res = await nuevaComicacion(null, formData);
    toast.success(res.message, { duration: 4000, position: "top-center" });
    setIsSubmitting(false);

    // Redirect after 2 seconds
    setTimeout(() => {
      router.push("/profile/main");
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-background">
      <Toaster />
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
                <div>
                  <h4>Imagen de portada</h4>
                  <ImageUpload
                    value={image}
                    onChange={handleImageChange}
                    onRemove={handleImageRemove}
                  />
                </div>
                <Input name="title" placeholder="Título del comunicado" required />
                <Textarea name="content" placeholder="Contenido del comunicado" rows={10} required />

                <Select onValueChange={(value: SetStateAction<string>) => setMediaType(value)} required>
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

                <Select onValueChange={(value: SetStateAction<string>) => setTopic(value)} required>
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

                <Select onValueChange={(value: SetStateAction<string>) => setLocation(value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Ubicación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Local</SelectItem>
                    <SelectItem value="nacional">Nacional</SelectItem>
                    <SelectItem value="internacional">Internacional</SelectItem>
                  </SelectContent>
                </Select>

                <Select onValueChange={(value: SetStateAction<string>) => setReach(value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Alcance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pequeno">Pequeño</SelectItem>
                    <SelectItem value="mediano">Mediano</SelectItem>
                    <SelectItem value="grande">Grande</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="datetime-local"
                  name="distributionDate"
                  onChange={(e: { target: { value: SetStateAction<string>; }; }) => setDistributionDate(e.target.value)}
                />
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
