"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";

export default function DemoPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-5">
      <h1 className="text-3xl font-bold mb-6">Demostración de la Aplicación Nexus</h1>
      
      {/* Sección de Inicio de Sesión/Registro */}
      <Card className="w-[400px] mb-8 shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">Inicia sesión o Regístrate</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex">
            {/* Imagen a la izquierda */}
            <div className="w-1/2 pr-2">
              <Image 
                src="/ruta/a/tu/imagen.jpg" // Cambia esta ruta por la ruta de tu imagen
                alt="Descripción de la imagen"
                width={200} // Ajusta el ancho según sea necesario
                height={200} // Ajusta la altura según sea necesario
                className="w-full h-auto rounded-md"
              />
            </div>
            {/* Texto a la derecha */}
            <div className="w-1/2">
              <p className="text-center">
                Comienza registrándote con tu nombre completo, correo electrónico y contraseña.
              </p>
              <Button className="w-full mt-4">Registrarse Gratis</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sección de Panel de Control */}
      <div className="bg-white p-5 rounded-md shadow-md w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-4">Panel de Control</h2>
        <p>
          Una vez que inicies sesión, tendrás acceso al panel de control donde podrás administrar tu
          cuenta y tus comunicados.
        </p>
        
        <div className="flex space-x-4 mt-4">
          {/* Imagen 1 */}
          <div className="w-1/2">
            <Image 
              src="/ruta/a/tu/imagen1.jpg" // Cambia esta ruta por la ruta de tu primera imagen
              alt="Descripción de la primera imagen"
              width={200} // Ajusta el ancho según sea necesario
              height={200} // Ajusta la altura según sea necesario
              className="w-full h-auto rounded-md"
            />
          </div>
          {/* Imagen 2 */}
          <div className="w-1/2">
            <Image 
              src="/ruta/a/tu/imagen2.jpg" // Cambia esta ruta por la ruta de tu segunda imagen
              alt="Descripción de la segunda imagen"
              width={200} // Ajusta el ancho según sea necesario
              height={200} // Ajusta la altura según sea necesario
              className="w-full h-auto rounded-md"
            />
          </div>
        </div>

        <p className="mt-2">
          En el panel, encontrarás un botón para colapsar la barra lateral y tres opciones:
        </p>
        <ul className="list-disc list-inside ml-5">
          <li>Registro de Periodista</li>
          <li>Registro de Comunicador</li>
          <li>Publicar Comunicado</li>
        </ul>

        <h3 className="mt-4 font-semibold">Directorio General</h3>
        <p>
          También podrás ver un directorio de los últimos comunicados con un botón de <Eye/> para
          acceder a los detalles de cada comunicado.
        </p>

        <h3 className="mt-4 font-semibold">Mis Comunicados</h3>
        <p>
          En esta sección podrás gestionar tus propios comunicados, con opciones para ver, editar y
          borrar cada uno.
        </p>
      </div>

      {/* Nueva Sección de Barra Lateral */}
      <div className="bg-white p-5 rounded-md shadow-md w-full max-w-3xl mt-8">
        <h2 className="text-xl font-semibold mb-4">Barra Lateral</h2>
        <div className="flex">
          {/* Imagen de la barra lateral */}
          <div className="w-1/2 pr-2">
            <Image 
              src="barra.png" // Cambia esta ruta por la ruta de tu imagen de la barra lateral
              alt="Barra Lateral"
              width={200} // Ajusta el ancho según sea necesario
              height={200} // Ajusta la altura según sea necesario
              className="w-full h-auto rounded-md"
            />
          </div>
          {/* Texto explicativo */}
          <div className="w-1/2">
            <p>
              La barra lateral te permite navegar fácilmente por la aplicación. A continuación,
              se describen los iconos que encontrarás:
            </p>
            <ul className="list-disc list-inside ml-5 mt-2">
              <li>1. **Dashboard**: Accede al panel de control.</li>
              <li>2. **Búsqueda de Periodistas**: Encuentra periodistas registrados.</li>
              <li>3. **Búsqueda de Comunicadores**: Busca comunicadores en la plataforma.</li>
              <li>4. **Ajustes**: Cambia tu imagen de avatar y edita tus datos personales y contraseña.</li>
              <li>5. **Ayuda**: Te redirige a servicio al cliente para enviar un mensaje al admin.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
