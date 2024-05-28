"use client";
import React, {lazy, Suspense,  ComponentType, useEffect, useState} from 'react'
import waiting from '../funcs/waiting';
import SplashScreen from '../components/SplashScreen/SplashScreen';

const FirstLayout:any = lazy(async ():Promise<{default: ComponentType<JSX.Element>}>=>{
    await waiting(10000);
    return await import("../FirstLayout/FirstLayout");
  })

function SecondLayout({children}:any) {
  const [companyName, setCompanyName] = useState<string>("Msys");
  const [imageUrl, setImageUrl] = useState<string>("");
  useEffect(()=>{
    (async ()=>{
      try{
          const res = await fetch(`${process.env.NEXT_PUBLIC_REACT_SSR_SERVER_API}/system-settings`)
          if(!res.ok){
              throw new Error("Bad request")
          }
          const data = await res.json();
          setImageUrl(`${data.image}`);
          setCompanyName(`${data.title}`);
      }catch(e:any){
          console.log(e.message);
      }

    })();
    return ()=>{}
  },[])
  return (
    <Suspense fallback={<SplashScreen companyName={companyName} imageUrl={imageUrl} />}>
        <FirstLayout>
            {children}
        </FirstLayout>
    </Suspense>
  )
}

export default SecondLayout;