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
    //     const res = await fetch(`${process.env.NEXT_PUBLIC_REACT_SERVER_API}/system-settings`);
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
    uploadFile?: (refArg:StorageReference, imageValFromInput:Blob | Uint8Array | ArrayBuffer)=>Promise<any>;
    // For system
    systemImageUrl?: string;
    systemImageRef?: StorageReference;
    systemfileName?: string;
    setSystemFileName?: React.Dispatch<React.SetStateAction<string>>;
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
    // For User
    userImageUrl?: string;
    userid?: string;
    userImage?: string;
    userPhone?: string;
    userAddress1?: string;
    userAddress2?: string;
    userCountry?: string;
    userState?: string;
    userZip?: string;
    userCity?: string;
    setUserFileName?: React.Dispatch<React.SetStateAction<string>>;
    userImageRef?: StorageReference | undefined;
    userFileName?: string;
    userFullName?: string;
    userRole?: string;
    setUserImageUrl?: React.Dispatch<React.SetStateAction<string>>;
    setUserImageRef?: React.Dispatch<React.SetStateAction<StorageReference>>;
    setLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
    onloggedIn?: ()=>Promise<void>;
    onloggedOut?: ()=>Promise<void>;
    getUser?: ()=>Promise<void>;
    getSystem?: ()=>Promise<void>;
  }

export function ImageContextProvider({children}:any){

    const [systemImageUrl, setSystemImageUrl] = useState<string>("");
    const [userImageUrl, setUserImageUrl] = useState<string>("");
    // const [image, setImage] = useState<string>(""); //<-system-info
    // const [addImage, setAddImage] = useState<Blob | Uint8Array | ArrayBuffer>();
    const [sysid, setSysid] = useState("");
    const [userid, setUserid] = useState("");
    const {currentUser}:any = useAuth();
    const isAuthenticated:boolean = Boolean(currentUser);
    const [systemfileName, setSystemFileName] = useState<string>("jk");
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
    const [userFullName, setUserFullName] = useState<string>("");
    const [userRole, setUserRole] = useState<string>("");

    const [loggedIn, setLoggedIn] = useState<boolean>(true);

    useEffect(()=>{
          
          return ()=>{};
        }, []);
        
        const getUser = async ()=>{
          try{ // user
              const res = await fetch(`${process.env.NEXT_PUBLIC_REACT_SERVER_API}/users/email/${currentUser.email}`);
              if(!res.ok){throw new Error("Couldn't get user data")}
              const data:any = await res.json();
              const userSettingsImageRef = ref(imagesRef, 'userSettings');
              setUserImageRef(ref(userSettingsImageRef, `${data.userid}.jpg`));
              setUserid(data.userid);
              setUserImage(data.image);
              setUserPhone(data.phone);
              setUserAddress1(data.address1);
              setUserAddress2(data.address2);
              setUserCountry(data.country);
              setUserState(data.state);
              setUserZip(data.zip);
              setUserCity(data.city);
              setUserImageUrl(data.image);
              setUserFullName(data.name);
              setUserRole(data.role);
              
            }catch(e){
              console.log(e);
            }
        }

        const clearUser = async ()=>{
          try{
            // @ts-ignore
            setUserImageRef();
            setUserid("");
            setUserImage("");
            setUserPhone("");
            setUserAddress1("");
            setUserAddress2("");
            setUserCountry("");
            setUserState("");
            setUserZip("");
            setUserCity("");
            setUserImageUrl("");
            setUserFullName("");
            setUserRole("");
            setLoggedIn(false);
          }catch(e){
            console.log(e)
          }
        }

        const getSystem = async ()=>{ // For system
          try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_REACT_SERVER_API}/system-settings`);
            if(!res.ok){throw new Error("Couldn't get user data")}
            const data:any = await res.json();
            const systemSettingsImageRef = ref(imagesRef, 'systemSettings');
            setSystemImageRef(ref(systemSettingsImageRef, `${data.sysid}.jpg`));
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
            setSystemImageUrl(data.image);
          }catch(e){
            console.log(e);
          }
        }

        const clearSystem = async ()=>{
          try{
            // @ts-ignore
            setSystemImageRef();
            setSysid('');
            setTitle('');
            setSystemName('');
            setFooter('');
            setAbb('');
            setCurrency('');
            setSms_charges('');
            setFax('');
            setWebsite('');
            setMobile('');
            setEmail('');
            setAddress('');
            setMap('');
            setStamp('');
            setTimezone('');
            setSystemImage('');
            setSystemImageUrl('');
          }catch(e){
            console.log(e);
          }
        }

        useEffect(()=>{
          getUser();
          getSystem();
          return ()=>{}
        }, []);
        
        console.log("userFullName=",userFullName);
      
        const onloggedIn = async ()=>{
          getUser();
          getSystem();
        }

        const onloggedOut = async ()=>{
          clearUser();
          clearSystem();
        }

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
        // ############### For User ####################
        userImageUrl,
        userid,
        userImage,
        userPhone,
        userAddress1,
        userAddress2,
        userCountry,
        userState,
        userZip,
        userCity,
        setUserFileName,
        userImageRef,
        userFileName,
        userFullName,
        userRole,
        setUserImageUrl,
        // @ts-ignore
        setUserImageRef,

        setLoggedIn,
        onloggedIn,
        onloggedOut,
        getUser,
        getSystem
    }

    return (
      // @ts-ignore
        <ImagesContext.Provider value={value}>
            {children}
        </ImagesContext.Provider>
    );
}