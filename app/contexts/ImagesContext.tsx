"use client";
import React, {useContext, useState, createContext, useEffect} from "react";
import { StorageReference, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { imagesRef } from '@/app/firebase/firebase.config';
import { useAuth } from "./AuthContext";
import waiting from "../funcs/waiting";

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

  export interface IimageContext{
    systemImageUrl?: string;
    uploadFile?: (refArg:StorageReference, imageValFromInput:Blob | Uint8Array | ArrayBuffer)=>void;
    systemImageRef?: StorageReference;
    systemfileName?: string;
    setSystemFileName?: (val:string)=> void
    title?: string;
    systemName?: string;
    footer?: string;
    abb?: string;
    currency?: string;
    sms_charges?: string;
    fax?: string;
    website?: string;
    mobile?: string;
    email?: string;
    address?: string;
    map?: string;
    stamp?: string;
    timezone?: string;
    systemImage?: string;
    userImageUrl?: string;
  }

export function ImageContextProvider({children}:any){

    const [systemImageUrl, setSystemImageUrl] = useState<string>("");
    const [userImageUrl, setUserImageUrl] = useState<string>("");
    // const [image, setImage] = useState<string>(""); //<-system-info
    // const [addImage, setAddImage] = useState<Blob | Uint8Array | ArrayBuffer>();
    const [sysid, setSysid] = useState("");
    const [userid, setUserid] = useState("");
    const {currentUser}:any = useAuth();
    const [systemfileName, setSystemFileName] = useState<string>("");
    const [systemImageRef, setSystemImageRef] = useState<StorageReference>();
    const [userImage, setUserImage] = useState<string>("");
    const [userFileName, setUserFileName] = useState<string>("");
    const [userImageRef, setUserImageRef] = useState<StorageReference>();

    
    
    // For System
    const [title, setTitle] = useState<string>("");
    const [systemName, setSystemName] = useState<string>("");
    const [footer, setFooter] = useState<string>("");
    const [abb, setAbb] = useState<string>("");
    const [currency, setCurrency] = useState<string>("");
    const [sms_charges, setSms_charges] = useState<string>("");
    const [fax, setFax] = useState<string>("");
    const [website, setWebsite] = useState<string>("");
    const [mobile, setMobile] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [map, setMap] = useState<string>("");
    const [stamp, setStamp] = useState<string>("");
    const [timezone, setTimezone] = useState<string>("");
    const [systemImage, setSystemImage] = useState<string>("");

    // For User
    const [userPhone, setUserPhone] = useState<string>("");
    const [userAddress1, setUserAddress1] = useState<string>("");
    const [userAddress2, setUserAddress2] = useState<string>("");
    const [userCountry, setUserCountry] = useState<string>("");
    const [userState, setUserState] = useState<string>("");
    const [userZip, setUserZip] = useState<string>("");
    const [userCity, setUserCity] = useState<string>("");

    useEffect(()=>{
        (async ()=>{ // For system
            try{
              const res = await fetch(`${process.env.REACT_SERVER_API}/system-settings`);
              if(!res.ok){throw new Error("Couldn't get user data")}
              const data:any = await res.json();
              const systemSettingsImageRef = ref(imagesRef, 'systemSettings');
              setSystemImageRef(ref(systemSettingsImageRef, `${data.sysid}.jpg`));
            // @ts-ignore
              
              getDownloadURL(systemImageRef).then((url)=>{
              setSystemImageUrl(`${url}`);
              setSysid(data.sysid);
              setTitle(data.title);
              setSystemName(data.name);
              setFooter(data.footer);
              setAbb(data.abb);
              setCurrency(data.currency);
              setSms_charges(data.sms_charges);
              setFax(data.fax);
              setWebsite(data.website);
              setMobile(data.mobile);
              setEmail(data.email);
              setAddress(data.address);
              setMap(data.map);
              setStamp(data.stamp);
              setTimezone(data.timezone);
              setSystemImage(data.image);

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
                const userSettingsImageRef = ref(imagesRef, 'userSettings');
                setUserImageRef(ref(userSettingsImageRef, `${data.userid}.jpg`));
              // @ts-ignore
                
                getDownloadURL(systemImageRef).then((url)=>{
                  setUserImageUrl(`${url}`)
                })
                setUserid(data.userid);
                setUserImage(data.image);
                setUserPhone(data.phone);
                setUserAddress1(data.address1);
                setUserAddress2(data.address2);
                setUserCountry(data.countr);
                setUserState(data.state);
                setUserZip(data.zip);
                setUserCity(data.city);
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

    const value:IimageContext = {
      // ############# For System ##################
        systemImageUrl,
        uploadFile,
        systemImageRef,
        systemfileName,
        setSystemFileName,
        title,
        systemName,
        footer,
        abb,
        currency,
        sms_charges,
        fax,
        website,
        mobile,
        email,
        address,
        map,
        stamp,
        timezone,
        systemImage,
        userImageUrl,
        // ############### For User ####################
        // userImageRef,
        // userFileName
    }

    return (
      // @ts-ignore
        <ImagesContext.Provider value={value}>
            {children}
        </ImagesContext.Provider>
    );
}