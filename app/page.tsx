"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, CheckCircle, Users, FileText, Send, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function LandingPage() {
  const { ref: featuresRef, inView: featuresInView } = useInView({ triggerOnce: true });
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({ triggerOnce: true });
  const { ref: pricingRef, inView: pricingInView } = useInView({ triggerOnce: true });

  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-6 lg:px-8 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Distribuye tus comunicados de prensa con eficacia
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Conecta con periodistas, gestiona tus comunicados y analiza el impacto de tus noticias en una sola plataforma.
          </motion.p>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="py-20 px-4 md:px-6 lg:px-8 bg-muted">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: featuresInView ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            Características principales
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Directorio de contactos", icon: Users, description: "Accede a una amplia base de datos de periodistas y medios." },
              { title: "Creación de comunicados", icon: FileText, description: "Crea y edita comunicados de prensa fácilmente." },
              { title: "Distribución segmentada", icon: Send, description: "Envía tus comunicados a audiencias específicas." },
              { title: "Análisis de impacto", icon: BarChart2, description: "Mide el impacto de tus comunicados." },
            ].map(({ title, icon: Icon, description }) => (
              <Card key={title}>
                <CardHeader>
                  <Icon className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section ref={testimonialsRef} className="py-20 px-4 md:px-6 lg:px-8">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: testimonialsInView ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            Lo que dicen nuestros clientes
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {["Entidad Pública", "ONG", "Periodista"].map((empresa) => (
              <Card key={empresa}>
                <CardHeader>
                  <CardTitle>Empresa: {empresa}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="border-l-4 border-gray-300 pl-4 italic text-base text-muted-foreground">
                    Testimonio sobre cómo Nexus ha facilitado su comunicación.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section ref={pricingRef} className="py-20 px-4 md:px-6 lg:px-8 bg-muted">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: pricingInView ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            Planes y precios
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {["Básico", "Profesional", "Empresarial"].map((plan, index) => (
              <Card key={plan}>
                <CardHeader>
                  <CardTitle>{plan}</CardTitle>
                  <CardDescription>
                    {index === 0 ? "Para pequeñas empresas" : index === 1 ? "Para empresas en crecimiento" : "Para grandes corporaciones"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold mb-4">${(index + 1) * 50}/mes</p>
                </CardContent>
                <Button variant={index === 1 ? "default" : "outline"}>Elegir plan</Button>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
