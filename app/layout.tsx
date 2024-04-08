/* eslint-disable react/no-children-prop */
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/app/components/Footer'
import Navbar from './components/Header-navigation/Navbar'
import BottomHeader from './components/Header-navigation/BottomHeader'
import Session from './components/session'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mil proveedores',
  description: 'Generated Guille',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} >
       
            <Session>
              <Navbar />
              <BottomHeader />
              {children}
              <Footer />
            </Session>
        
      </body>
    </html>
  )
}
