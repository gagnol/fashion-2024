/* eslint-disable react/no-children-prop */
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Session from './components/session'
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import Navbar from '@/components/header/navbar';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Newcommerce',
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
       <Theme appearance='light' accentColor='gray'>
           <Session>
            <Navbar/>
             {children}
            </Session>
        </Theme>
      </body>
    </html>
  )
}
