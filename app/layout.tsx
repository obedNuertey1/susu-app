import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ComponentType, lazy, Suspense } from 'react';
import waiting from './funcs/waiting';
import SplashScreen from './components/SplashScreen/SplashScreen';

// const FirstLayout:any = lazy(async ():Promise<{default: ComponentType<JSX.Element>}>=>{
//   await waiting(10000);
//   return await import("./FirstLayout/FirstLayout");
// })

// const inter = Inter({ subsets: ['latin'] })



// export const metadata: Metadata = {
//   title: 'Msys consult',
//   description: 'Msys consult group page',
// }


// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//       <Suspense fallback={<SplashScreen />}>
//           <FirstLayout>
//             {children}
//           </FirstLayout>
//       </Suspense>
//         </body>
//     </html>
//   )
// }

const FirstLayout: any = lazy(async (): Promise<{ default: ComponentType<JSX.Element> }> => {
  setTimeout(async ()=>{
    await waiting(10000);
  }, 0);
  return await import("./FirstLayout/FirstLayout");
})

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Msys consult',
  description: 'Msys consult group page',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let companyName = "Msys";
  let imageUrl = "";

  try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_REACT_SSR_SERVER_API}/system-settings`)
      if (!res.ok) {
          throw new Error("Bad request")
      }
      const data = await res.json();
      imageUrl = data.image;
      companyName = data.title || "Msys";
  } catch (e: any) {
      console.log(e.message);
  }

  return (
      <html lang="en">
          <body className={inter.className}>
              <Suspense fallback={<SplashScreen companyName={companyName} imageUrl={imageUrl} />}>
                  <FirstLayout>
                      {children}
                  </FirstLayout>
              </Suspense>
          </body>
      </html>
  )
}