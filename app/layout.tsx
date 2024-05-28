import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ComponentType, lazy, Suspense } from 'react';
import waiting from './funcs/waiting';
import SplashScreen from './components/SplashScreen/SplashScreen';
import SecondLayout from './SecondLayout/SecondLayout';

// const FirstLayout:any = lazy(async ():Promise<{default: ComponentType<JSX.Element>}>=>{
//   await waiting(10000);
//   return await import("./FirstLayout/FirstLayout");
// })

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
      {/* <Suspense fallback={<SplashScreen />}> */}
        <SecondLayout>
          {children}
        </SecondLayout>
      {/* </Suspense> */}
        </body>
    </html>
  )
}
