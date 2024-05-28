"use client";
import React, {lazy, Suspense,  ComponentType, useEffect, useState} from 'react'
import waiting from '../funcs/waiting';
import SplashScreen from '../components/SplashScreen/SplashScreen';

const FirstLayout:any = lazy(async ():Promise<{default: ComponentType<JSX.Element>}>=>{
    await waiting(10000);
    return await import("../FirstLayout/FirstLayout");
  })

function SecondLayout({children}:any) {
  return (
    <Suspense fallback={<SplashScreen />}>
        <FirstLayout>
            {children}
        </FirstLayout>
    </Suspense>
  )
}

export default SecondLayout;