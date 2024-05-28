// "use client";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import styles from "./splashScreen.module.css";

const SplashScreen= async ()=>{

    let companyName = "Msys";
    let imageUrl = "";
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_REACT_SSR_SERVER_API}/system-settings`)
        if(!res.ok){
            throw new Error("Bad request")
        }
        const data = await res.json();
        imageUrl = data.image;
        companyName = `${data.title}`;
    }catch(e:any){
        console.log(e.message);
    }

    return (
        <div className={`w-full h-screen flex flex-col items-center justify-center bg-project-blue`}>
            <div id='organisation-logo-name' className={`w-full flex flex-col gap-[1px] justify-center items-center`}>
            <div id='organisation-logo'>
                <div className={`block w-24 h-24 rounded-full m-auto bg-transparent border-transparent border overflow-clip ${styles["image-loading"]}`}>
                {!imageUrl && <FontAwesomeIcon icon={faPeopleGroup} className='w-1/2 h-1/2 text-lg text-color text-project-blue' />}
                    {imageUrl && <div className="w-full h-[100%] flex flex-col itmes-center justify-center"><Image src={`${imageUrl}`} alt="System Settings image" width="50" height="50" className='block m-auto w-2/3 h-2/3 ' unoptimized /></div>}
                </div>
            </div>
            <div id='organisation-name' className='w-fit -mt-1.5 mx-auto'>
                {/* {companyName && <>{companyName}</>} */}
                <span className="text-sm text-white -mb-1 text-cneter">{companyName}</span>
            </div>
            <span className="mx-auto text-center -mt-2 loading loading-infinity w-8 text-white"></span>
            </div>
        </div>
    );

}

SplashScreen.displayName = 'SplashScreen';
export default SplashScreen;



// const SplashScreen = ({ companyName, imageUrl }:any) => {

//     return (
//         <div className={`w-full h-screen flex flex-col items-center justify-center bg-project-blue`}>
//             <div id='organisation-logo-name' className={`w-full flex flex-col gap-[1px] justify-center items-center`}>
//                 <div id='organisation-logo'>
//                     <div className={`block w-24 h-24 rounded-full m-auto bg-transparent border-transparent border overflow-clip ${styles["image-loading"]}`}>
//                         {!imageUrl && <FontAwesomeIcon icon={faPeopleGroup} className='w-1/2 h-1/2 text-lg text-color text-project-blue' />}
//                         {imageUrl && <div className="w-full h-[100%] flex flex-col items-center justify-center"><Image src={`${imageUrl}`} alt="System Settings image" width="50" height="50" className='block m-auto w-2/3 h-2/3 ' unoptimized /></div>}
//                     </div>
//                 </div>
//                 <div id='organisation-name' className='w-fit -mt-1.5 mx-auto'>
//                     <span className="text-sm text-white -mb-1 text-center">{companyName}</span>
//                 </div>
//                 <span className="mx-auto text-center -mt-2 loading loading-infinity w-8 text-white"></span>
//             </div>
//         </div>
//     );
// }

// SplashScreen.displayName = 'SplashScreen';
// export default SplashScreen;