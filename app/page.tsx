"use client"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Users, FileText, Send, BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import SigninTool from "@/components/header/SigninTool"
import Link from "next/link"
import Navbar from "@/components/header/navbar"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
     
      <main>
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
          <motion.div
            className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button size="lg">Solicitar una demo <ArrowRight className="ml-2 h-4 w-4" /></Button>
            <Button size="lg" variant="outline">
            <Link href="/register" >
              Registrarse gratis
              </Link>
              </Button>
          </motion.div>
        </section>

        <section id="features" className="py-20 px-4 md:px-6 lg:px-8 bg-muted">
          <h2 className="text-3xl font-bold text-center mb-12">Características principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Directorio de contactos</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Accede a una amplia base de datos de periodistas y medios de comunicación.</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <FileText className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Creación de comunicados</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Crea y edita comunicados de prensa con nuestro intuitivo editor.</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Send className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Distribución segmentada</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Envía tus comunicados a audiencias específicas y relevantes.</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <BarChart2 className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Análisis de impacto</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Mide y analiza el alcance e impacto de tus comunicados de prensa.</CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="testimonials" className="py-20 px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Lo que dicen nuestros clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>Empresa {i}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    PressConnect ha revolucionado nuestra forma de comunicarnos con la prensa. Es fácil de usar y los resultados son increíbles.
                  </p>
                  <p className="font-semibold">Juan Pérez, Director de Comunicación</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="pricing" className="py-20 px-4 md:px-6 lg:px-8 bg-muted">
          <h2 className="text-3xl font-bold text-center mb-12">Planes y precios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {['Básico', 'Profesional', 'Empresarial'].map((plan, index) => (
              <Card key={plan} className={index === 1 ? 'border-primary' : ''}>
                <CardHeader>
                  <CardTitle>{plan}</CardTitle>
                  <CardDescription>
                    {index === 0 && 'Para pequeñas empresas'}
                    {index === 1 && 'Para empresas en crecimiento'}
                    {index === 2 && 'Para grandes corporaciones'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold mb-4">
                    ${(index + 1) * 50}<span className="text-sm font-normal">/mes</span>
                  </p>
                  <ul className="space-y-2">
                    {[
                      'Directorio de contactos',
                      'Creación de comunicados',
                      'Distribución segmentada',
                      'Análisis básico',
                      index > 0 && 'Soporte prioritario',
                      index > 1 && 'API access'
                    ].filter(Boolean).map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant={index === 1 ? 'default' : 'outline'}>
                    Elegir plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-20 px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para empezar?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Únete a miles de profesionales que ya están mejorando su estrategia de comunicación con PressConnect.
          </p>
          <Button size="lg">Comenzar ahora <ArrowRight className="ml-2 h-4 w-4" /></Button>
        </section>
      </main>

      <footer className="py-12 px-4 md:px-6 lg:px-8 bg-muted">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">PressConnect</h3>
            <p className="text-sm text-muted-foreground">Transformando la distribución de comunicados de prensa desde 2023.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Producto</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary">Características</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Precios</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Compañía</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary">Sobre nosotros</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">
                <Link href="/customer">
                Contacto
                </Link>
                </a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">
              Legal
              </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary">
              <Link href="/terminos">
                Términos de servicio
                </Link>
                </a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">
              <Link href="/aviso">
                Política de privacidad
                </Link>
                </a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">
              <Link href="/cookies">
                Política de Cookies
                </Link>
                </a></li>


            </ul>
          </div>
        </div>
        <div className="mt-12 text-center text-sm text-muted-foreground">
          © 2023 PressConnect. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  )
}