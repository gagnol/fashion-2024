'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Users, FileText, Send, BarChart2 } from 'lucide-react';

export default function NexusFeatures() {
  return (
    <section id="features" className="py-20 px-4 md:px-6 lg:px-8 bg-muted">
      <h2 className="text-3xl font-bold text-center mb-12">
        Características principales
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Card>
          <CardHeader>
            <Users className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Directorio de contactos</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Accede a una amplia base de datos de periodistas y medios de comunicación.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <FileText className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Creación de comunicados</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Crea y edita comunicados de prensa con nuestro intuitivo editor.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Send className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Distribución segmentada</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Envía tus comunicados a audiencias específicas y relevantes.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <BarChart2 className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Análisis de impacto</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Mide y analiza el alcance e impacto de tus comunicados de prensa.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
