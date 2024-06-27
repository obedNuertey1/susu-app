import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ComponentType, lazy, Suspense } from 'react';
import waiting from './funcs/waiting';
import SplashScreen from './components/SplashScreen/SplashScreen';
import SecondLayout from './SecondLayout/SecondLayout';
// app version - 7

const inter = Inter({ subsets: ['latin'] })



export const metadata: Metadata = {
  title: 'Msys consult',
  description: 'Msys consult group page',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SecondLayout>
          {children}
        </SecondLayout>
        </body>
    </html>
  )
}
