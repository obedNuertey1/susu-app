"use client";
import React, {useContext, useState, createContext, useEffect} from "react";
import { StorageReference, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { imagesRef } from '@/app/firebase/firebase.config';
import { useAuth } from "./AuthContext";

const ImagesContext = createContext(null);

export function useImagesContext(){
    return useContext(ImagesContext);
}

  // useEffect(()=>{
    // (async ()=>{
    //   try{
    //     const res = await fetch(`${process.env.REACT_SERVER_API}/system-settings`);
    //     if(!res.ok){throw new Error("Couldn't get user data")}
    //     const data:any = await res.json();
    //     setSysid(data.sysid);
    //   }catch(e){
    //     console.log(e);
    //   }
    // })();
    
  //   return ()=>{}
  // },[])

export function ImageContextProvider({children}:any){

    const [systemImageUrl, setSystemImageUrl] = useState<string>("");
    const [userImageUrl, setUserImageUrl] = useState<string>("");
    // const [image, setImage] = useState<string>(""); //<-system-info
    // const [addImage, setAddImage] = useState<Blob | Uint8Array | ArrayBuffer>();
    const [sysid, setSysid] = useState("");
    const [systemImage, setSystemImage] = useState<string>("");
    const [userImage, setUserImage] = useState<string>("");
    const [userid, setUserid] = useState("");
    const {currentUser}:any = useAuth();
    const [systemfileName, setSystemFileName] = useState<string>("");
    const [systemImageRef, setSystemImageRef] = useState<StorageReference>();

    useEffect(()=>{
        (async ()=>{
            try{
              const res = await fetch(`${process.env.REACT_SERVER_API}/system-settings`);
              if(!res.ok){throw new Error("Couldn't get user data")}
              const data:any = await res.json();
              const systemSettingsImageRef = ref(imagesRef, 'systemSettings');
              setSystemImageRef(ref(systemSettingsImageRef, `${data.sysid}.jpg`));
            // @ts-ignore
              getDownloadURL(systemImageRef).then((url)=>{
              setSystemImageUrl(`${url}`);
              
            })
            }catch(e){
              console.log(e);
            }
          })();

          (async ()=>{
            try{
                const res = await fetch(`${process.env.REACT_SERVER_API}/users/email/${currentUser.email}`);
                if(!res.ok){throw new Error("Couldn't get user data")}
                const data:any = await res.json();
                setUserid(data.userid);
                setUserImage(data.image);
              }catch(e){
                console.log(e);
              }
          })();
    }, [userid, userImage]);

    console.log("_____________systemImageUrl______________");
    console.log(systemImageUrl);
    // let systemImageRef:any;
    // useEffect(()=>{
    //   try{
    //     if(Boolean(sysid) && systemImage.endsWith(systemfileName)){
    //         const systemSettingsImageRef = ref(imagesRef.root, 'images/systemSettings');
    //         setSystemImageRef(ref(systemSettingsImageRef, systemfileName));
    //         // @ts-ignore
    //         getDownloadURL(systemImageRef).then((url)=>{
    //         setSystemImageUrl(`${url}`);
    //         })
    //     }
        
    //   }catch(e){
    //     console.log(e);
    //   }

    //   return ()=>{}
    // },[systemImageUrl, systemImageRef])

    // console.log("____userImage____");
    // console.log(userImage)
    // const userFileName = `${userid}.jpg`;
    // let userImageRef:any;
    // try{
    //   if(userid && userImage.endsWith(userFileName)){
    //       const userSettingsImageRef = ref(imagesRef.root, 'images/userSettings');
    //       userImageRef = ref(userSettingsImageRef, userFileName);
    //       getDownloadURL(userImageRef).then((url)=>{
    //           setUserImageUrl(`${url}`);
    //       });
    //   }
    // }catch(e){
    //   console.log(e)
    // }

    async function uploadFile(refArg:StorageReference, imageValFromInput:Blob | Uint8Array | ArrayBuffer){
        return uploadBytes(refArg, imageValFromInput);
    }

    const value:any = {
        systemImageUrl,
        userImageUrl,
        uploadFile,
        systemImageRef,
        // userImageRef,
        systemfileName,
        setSystemFileName,
        // userFileName
    }

    return (
        <ImagesContext.Provider value={value}>
            {children}
        </ImagesContext.Provider>
    );
}