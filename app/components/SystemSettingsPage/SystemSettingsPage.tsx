"use client";
import { faGears} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import styles from "./system-settings.module.css";
import girlEngineer from "../../assets/Groupengineering-girl.svg"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import waiting from '@/app/funcs/waiting';
import { imageRepo, imagesRef } from '@/app/firebase/firebase.config';
import { StorageReference, getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { IimageContext, useImagesContext } from '@/app/contexts/ImagesContext';
import { Auth, getAuth } from 'firebase/auth';

export default function SystemSettingsPage() {
  const router = useRouter();
  const {currentUser, signup, logout}:any = useAuth();
  // const {userRole}:any = useImagesContext();

  // const {systemImageUrl,uploadFile}:any = useImagesContext();

  const [sysid, setSysid] = useState<string>("");
  const [title, setTitle] = useState<string>(""); //<-system-info
  const [name, setName] = useState<string>(""); //<-system-info
  const [footer, setFooter] = useState<string>(""); //<-system-info
  const [abb, setAbb] = useState<string>(""); //<-system-info
  const [currency, setCurrency] = useState<string>(""); //<-system-info
  const [image, setImage] = useState<string>(""); //<-system-info
  const [addImage, setAddImage] = useState<Blob | Uint8Array | ArrayBuffer>();
  const [sms_charges, setSms_charges] = useState<string>("");//<-system-info
  const [fax, setFax] = useState<string>("");  //<- Contact
  const [website, setWebsite] = useState<string>("");  //<- Contact
  const [mobile, setMobile] = useState<string>(""); //<- Contact
  const [email, setEmail] = useState<string>(""); //<- Contact
  const [address, setAddress] = useState<string>(""); //<- location
  const [map, setMap] = useState<string>(""); //<-location
  const [stamp, setStamp] = useState<string>(""); //<- Time
  const [timezone, setTimezone] = useState<string>(""); //<- Time
  const [imageSrc, setImageSrc] = useState(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  
  const {uploadFile, systemImageRef, onloggedIn}:any = useImagesContext();
  const auth:Auth = getAuth();
  const cardAnimeRef = useRef<HTMLDivElement>(null);
  

  useEffect(()=>{
    // cardAnimeRef.current?.classList.add(`${styles.animeDown}`);
    (async ()=>{
      try{
          const res = await fetch(`${process.env.NEXT_PUBLIC_REACT_SERVER_API}/users/email/${currentUser.email}`);
          if(!res.ok){
              return router.push("/page-not-found")
          }
          const data = await res.json();
          if(data.role.toLowerCase() != 'admin'){
              return router.push("/page-not-found");
          }
          return;
      }catch(e){
          console.log(e);
      }

  })();
    try{
      // if(userRole?.toLowerCase() != 'admin'){
      //   return router.push("/page-not-found");
      // }
      if(!currentUser){ // Go to login page if user has not logged in.
        return router.push("/login");
      }
    }catch(e){
      console.log(e);
    }
    onloggedIn();
    try{
      if(!auth.currentUser?.emailVerified){
        (async ()=>{
            await waiting(4000);
            setErrorMessage("Please verify your email - go to settings to start the process");
            await waiting(4000);
            setErrorMessage("");
        })();
      }
    }catch(e){
      console.log(e);
    }
    const cardAnimeRefVar = cardAnimeRef.current;
    return ()=>{
      cardAnimeRefVar?.classList.remove(`${styles.cardAnimeUp}`);
      // cardAnimeRefVar?.classList.remove(`${styles.animeDown}`);
    }
  }, []);

  useEffect(()=>{
    (async ()=>{
      try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_REACT_SERVER_API}/system-settings`);
        if(!res.ok){console.error("Couldn't get user data"); return;}
        const data:any = await res.json();
        setSysid(data.sysid);
        await waiting(4000);
        setTitle(data.title);
        setName(data.name);
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
        setImage(data.image);

      }catch(e){
        console.log(e);
      }
    })();
    
    return ()=>{}
  },[image]);

  
  
  
  const handleSubmit = async(e:any)=>{
    e.preventDefault();
    setIsLoading(true);
    try{
      // @ts-ignore
      if(addImage){
        await uploadFile(systemImageRef, addImage).then(async(snapshot:any) => {
          console.log('Uploaded a blob or file!');
          console.log(snapshot);
        }).catch((e:any)=>{
          (async ()=>{
            setErrorMessage(`Failed to update info else block ${e}`)
            await waiting(4000);
            setErrorMessage('');
            setIsLoading(false);
            return;
          })();
        });
        await getDownloadURL(systemImageRef).then(async (url)=>{
          const res = await fetch(`${process.env.NEXT_PUBLIC_REACT_SERVER_API}/system-settings/1`, {
            method: "PATCH",
            headers: {
              'Content-Type': "application/json"
            },
            body:JSON.stringify({
              title:title,
              name:name, 
              footer:footer, 
              abb:abb, 
              currency:currency, 
              sms_charges:sms_charges, 
              fax:fax, website:website, 
              mobile:mobile, 
              email:email, 
              address:address, 
              map:map, 
              stamp:stamp, 
              timezone:timezone,
              image: url.toString()
            })
          });
          if(!res.ok){
            setErrorMessage("Failed to update");
            await waiting(4000);
            setErrorMessage("");
            setIsLoading(false);
            return;
          }
          setSuccessMessage("Updated Successfully");
          await waiting(4000);
          setIsLoading(false);
          setSuccessMessage("");
          cardAnimeRef.current?.classList.add(`${styles.cardAnimeUp}`)
          await waiting(1000);
          router.push("/transactions");
        })
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_REACT_SERVER_API}/system-settings/1`, {
        method: "PATCH",
        headers: {
          'Content-Type': "application/json"
        },
        body:JSON.stringify({
          title:title,
          name:name, 
          footer:footer, 
          abb:abb, 
          currency:currency, 
          sms_charges:sms_charges, 
          fax:fax, website:website, 
          mobile:mobile, 
          email:email, 
          address:address, 
          map:map, 
          stamp:stamp, 
          timezone:timezone
        })
      });
      if(!res.ok){
        setErrorMessage("Failed to update");
        await waiting(4000);
        setErrorMessage("");
        setIsLoading(false);
        return;
      }
      setSuccessMessage("Updated Successfully");
      await waiting(4000);
      setIsLoading(false);
      setSuccessMessage("");
      cardAnimeRef.current?.classList.add(`${styles.cardAnimeUp}`)
      await waiting(1000);
      router.push("/transactions");

    }catch(e){
      setErrorMessage(`Failed to update info ${e}`)
      await waiting(4000);
      setErrorMessage('');
      setIsLoading(false);
    }
  };

 
  
  return (
    <div>
        {
            successMessage &&
            <div className="w-full h-fit relative flex flex-row justify-center items-center">
              <div role="alert" className={`alert alert-success fixed left-0 z-50 right-0 top-[0vh] w-[90vw] justify-self-center self-center gap-1 flex-row ${styles.promptAnime}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>{successMessage}</span>
              </div>
            </div>
        }
        {
            errorMessage &&
            <div className="w-full h-fit relative flex flex-row justify-center items-center">
              <div role="alert" className={`alert alert-error fixed left-0 z-50 right-0 top-[0vh] w-[90vw] justify-self-center self-center gap-1 flex-row`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>{errorMessage}</span>
              </div>
            </div>
        }
      <div className='hidden sm:block sm:fixed sm:w-full sm:h-screen -z-40'>
        <Image src={girlEngineer} alt='black afro girl' className='w-80 absolute right-4 lg:right-24 top-1/3 bottom-0'/>
        <Image src={girlEngineer} alt='black guy with white girl' className='w-80 left-4 lg:left-24 top-1/3 bottom-0 absolute transfrom scale-x-[-1]'/>
      </div>
      <div className={`navbar hidden ${styles.pushUp}`}></div>
      <div className='navbar lg:hidden xl:block'></div>
      <div className={`relative flex flex-col justify-center items-center w-full h-[100%] sm:h-[60%] gap-[2px] overflow-y-clip`}>
          <div className={`card py-5  w-full max-w-sm sm:max-w-xl shadow-2xl bg-base-100 sm:scale-90 ${styles.cardAnimeDown}`} ref={cardAnimeRef}>
            <div className='flex card-title flex-col gap-1 justify-center items-center'>
                <h1 className='block text-3xl font-extrabold'>System Settings</h1>
                <div className='w-40 h-40 rounded-full  shadow-md overflow-clip flex flex-row items-center justify-center'>
                  {/* {image && <div className='w-full h-[100%] flex flex-col itmes-center justify-center'>
                    <Image src={`${image}`} alt="System Settings image" width="50" height="50" className='object-center w-1/2 h-1/2 m-auto' unoptimized />
                  </div>}
                  {!image && <FontAwesomeIcon className='object-cover m-3 text-inherit w-2/3 h-2/3' icon={faGears} />} */}
                  {
                    (imageSrc)?
                    <div className='w-full h-[100%] flex flex-col itmes-center justify-center'>
                    <Image src={imageSrc} alt="System Settings image" width="50" height="50" className='object-center w-1/2 h-1/2 m-auto' unoptimized />
                    </div>
                    :(`${image}`.startsWith(`${process.env.NEXT_PUBLIC_STORAGE_SERVICE_URL}`))?
                    <div className='w-full h-[100%] flex flex-col itmes-center justify-center'>
                      <Image src={`${image}`} alt="System Settings image" width="50" height="50" className='object-center w-1/2 h-1/2 m-auto' unoptimized />
                    </div>
                    :<FontAwesomeIcon className='object-cover m-3 text-inherit w-2/3 h-2/3' icon={faGears} />
                  }
                </div>
              </div>
                <form className="card-body">
                  <div className="divider">System Info</div>
                      {/*System Info*/}
                    <div className="form-control">
                      <label className="label" htmlFor='title'>
                        <span className="label-text">Title:</span>
                      </label>
                      {/* @ts-ignore */}
                      <input type="text" id='title' name='title' value={title} onChange={(e)=>{
                        setTitle(e.target.value)
                      }} placeholder="title" className="input input-bordered"  />
                    </div>
                    <div className="form-control">
                      <label className="label" htmlFor='name'>
                        <span className="label-text">Name:</span>
                      </label>
                      {/* @ts-ignore */}
                      <input type="text" id='name' name='name' value={name} onChange={(e)=>{
                        setName(e.target.value)
                      }} placeholder="Name" className="input input-bordered"  />
                    </div>
                    <div className="form-control">
                      <label className="label" htmlFor='footer'>
                        <span className="label-text">Footer:</span>
                      </label>
                      {/* @ts-ignore */}
                      <input type="text" id='footer' name='footer' value={footer} onChange={(e)=>{
                        setFooter(e.target.value)
                      }} placeholder="Footer" className="input input-bordered"  />
                    </div>
                    <div className="form-control">
                      <label className="label" htmlFor='abb'>
                        <span className="label-text">Abbreviation:</span>
                      </label>
                      {/* @ts-ignore */}
                      <input type="text" id='abb' name='abb' value={abb} onChange={(e)=>{
                        setAbb(e.target.value)
                      }} placeholder="Abbreviation" className="input input-bordered"  />
                    </div>
                    <div className="form-control">
                      <label className="label" htmlFor='currency'>
                        <span className="label-text">Currency:</span>
                      </label>
                      {/* @ts-ignore */}
                      <input type="text" id='currency' name='currency' value={currency} onChange={(e)=>{
                        setCurrency(e.target.value)
                      }} placeholder="Currency" className="input input-bordered"  />
                    </div>
                    {/* Image Image Image Image Image */}
                    <div className="form-control">
                      <label className="label" htmlFor='image'>
                        <span className="label-text">Image:</span>
                      </label>
                      {/* @ts-ignore */}
                      <input type="file" name='image' id='image' onChange={(e)=>{
                        // @ts-ignore
                        const file = e.target.files[0];
                        if(file){
                          const reader = new FileReader();
                          reader.onload = (e)=>{
                            // @ts-ignore
                            setImageSrc(e.target.result);
                          }
                          reader.readAsDataURL(file);
                        }
                        // @ts-ignore
                        setAddImage(e.target.files[0])
                      }} className="file-input file-input-bordered w-full max-w-full" />
                    </div>
                    {/* Image Image Image Image Image */}
                    <div className="form-control">
                      <label className="label" htmlFor='sms_charges'>
                        <span className="label-text">Sms Charges:</span>
                      </label>
                      {/* @ts-ignore */}
                      <input type="number" step={0.1} min={0} id='sms_charges' name='sms_charges' value={sms_charges} onChange={(e)=>{
                        setSms_charges(e.target.value)
                      }} placeholder="sms charges" className="input input-bordered"  />
                    </div>
                    <div className="divider">Contact</div>
                    <div className="form-control">
                      <label className="label" htmlFor='fax'>
                        <span className="label-text">Fax:</span>
                      </label>
                      {/* @ts-ignore */}
                      <input type="tel" id='fax' name='fax' value={fax} onChange={(e)=>{
                        setFax(e.target.value)
                      }} placeholder="fax" className="input input-bordered"  />
                    </div>
                    <div className="form-control">
                      <label className="label" htmlFor='website'>
                        <span className="label-text">Website:</span>
                      </label>
                      {/* @ts-ignore */}
                      <input type="url" id='website' name='website' value={website} onChange={(e)=>{
                        setWebsite(e.target.value)
                      }} placeholder="Website" className="input input-bordered"  />
                    </div>
                    <div className="form-control">
                      <label className="label" htmlFor='mobile'>
                        <span className="label-text">Mobile:</span>
                      </label>
                      {/* @ts-ignore */}
                      <input type="tel" id='mobile' name='mobile' value={mobile} onChange={(e)=>{
                        setMobile(e.target.value)
                      }} placeholder="Mobile" className="input input-bordered"  />
                    </div>
                    <div className="form-control">
                      <label className="label" htmlFor='email'>
                        <span className="label-text">Email:</span>
                      </label>
                      {/* @ts-ignore */}
                      <input type="text" id='email' name='email' value={email} onChange={(e)=>{
                        setEmail(e.target.value)
                      }} placeholder="Email" className="input input-bordered"  />
                    </div>
                    <div className="divider">Location</div>
                    <div className="form-control">
                      <label className="label" htmlFor='address'>
                        <span className="label-text">Address:</span>
                      </label>
                      {/* @ts-ignore */}
                      <input type="tel" id='address' name='address' value={address} onChange={(e)=>{
                        setAddress(e.target.value)
                      }} placeholder="Address" className="input input-bordered"  />
                    </div>
                    <div className="form-control">
                      <label className="label" htmlFor='map'>
                        <span className="label-text">Map:</span>
                      </label>
                      <input type="tel" id='map' name='map' value={map} onChange={(e)=>{setMap(e.target.value)}} title='Map' placeholder="Map" className="input input-bordered"  />
                    </div>
                    <div className="divider">Time</div>
                    <div className="form-control">
                      <label className="label" htmlFor='stamp'>
                        <span className="label-text">TimeStamp:</span>
                      </label>
                      {/* @ts-ignore */}
                      <input type="text" id='stamp' name='stamp' value={stamp} onChange={(e)=>{
                        setStamp(e.target.value)
                      }} placeholder="Stamp" className="input input-bordered"  />
                    </div>
                    <div className="form-control">
                      <label className="label" htmlFor='timezone'>
                        <span className="label-text">Timezone:</span>
                      </label>
                      {/* @ts-ignore */}
                      <input type="text" id='timezone' name='timezone' value={timezone} onChange={(e)=>{
                        setTimezone(e.target.value)
                      }} placeholder="Time zone" className="input input-bordered"  />
                    </div>
                    <div className="divider">Actions</div>
                    {/* <div className="card-actions flex flex-col items-center w-full"> */}
                      <div className="form-control mt-6">
                        <button onClick={handleSubmit} {...(isLoading?{disabled:true}:{disabled:false})} type='submit' className="btn btn-primary">Update</button>
                      </div>
                      <div className="form-control mt-2">
                          <span role='link' className="btn btn-error" onClick={async ()=>{
                            cardAnimeRef.current?.classList.add(`${styles.cardAnimeUp}`);
                            await waiting(1000);
                            router.push("/transactions");
                          }} >Cancel</span>
                      </div>
                    
                </form>
          </div>
      </div>
    </div>
  )
}
