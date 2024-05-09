"use client";
import { faGears} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from "./system-settings.module.css";
import girlEngineer from "../../assets/Groupengineering-girl.svg"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import waiting from '@/app/funcs/waiting';
import { timeStamp } from 'console';
// import { getAuth} from 'firebase/auth';
// import { useRedirectContext } from '@/app/contexts/RedirectContext';

/*
 sysid       Int    @id @default(autoincrement())
  title       String @db.VarChar(200)
  name        String @db.VarChar(200)
  footer      String @db.Text
  abb         String @db.VarChar(200)
  fax         String @db.Text
  currency    String @db.Text
  website     String @db.Text
  mobile      String @db.Text
  image       String @db.VarChar(200)
  address     String @db.Text
  email       String @db.Text
  map         String @db.Text
  stamp       String @db.VarChar(350)
  timezone    String @db.Text
  sms_charges String @db.VarChar(200)
*/

export default function SystemSettingsPage() {
  const router = useRouter();
  const {currentUser, signup, logout}:any = useAuth();
  if(!currentUser){ // Go to login page if user has not logged in.
    return router.push("/login");
  }

  const [sysid, setSysid] = useState<string>("");
  const [title, setTitle] = useState<string>(""); //<-system-info
  const [name, setName] = useState<string>(""); //<-system-info
  const [footer, setFooter] = useState<string>(""); //<-system-info
  const [abb, setAbb] = useState<string>(""); //<-system-info
  const [currency, setCurrency] = useState<string>(""); //<-system-info
  const [image, setImage] = useState<string>(""); //<-system-info
  const [addImage, setAddImage] = useState(null);
  const [sms_charges, setSms_charges] = useState<string>("");//<-system-info
  const [fax, setFax] = useState<string>("");  //<- Contact
  const [website, setWebsite] = useState<string>("");  //<- Contact
  const [mobile, setMobile] = useState<string>(""); //<- Contact
  const [email, setEmail] = useState<string>(""); //<- Contact
  const [address, setAddress] = useState<string>(""); //<- location
  const [map, setMap] = useState<string>(""); //<-location
  const [stamp, setStamp] = useState<string>(""); //<- Time
  const [timezone, setTimezone] = useState<string>(""); //<- Time


  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");


  useEffect(()=>{
    (async ()=>{
      try{
        const res = await fetch(`${process.env.REACT_SERVER_API}/system-settings`);
        if(!res.ok){throw new Error("Couldn't get user data")}
        const data:any = await res.json();
        setSysid(data.sysid);
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
  },[])


  const handleSubmit = async(e:any)=>{
    e.preventDefault();
    setIsLoading(true);
    try{
      const res = await fetch(`${process.env.REACT_SERVER_API}/system-settings/1`, {
        method: "PATCH",
        headers: {
          'Content-Type': "application/json"
        },
        body:JSON.stringify({
          title, name, footer, abb, currency, sms_charges, fax, website, mobile, email, address, map, stamp, timezone, image
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
      await waiting(3000);
      setIsLoading(false);
      setSuccessMessage("");
      router.push("/transactions");
    }catch(e){
      setErrorMessage(`Failed to update info ${e}`)
      await waiting(4000);
      setErrorMessage('');
      setIsLoading(false);
    }
  };

 
  
  return (
    <>
        {
            successMessage &&
            <div role="alert" className="alert alert-success fixed left-0 z-50 right-0 top-[0vh] w-[90vw] justify-self-center self-center gap-1 flex-row">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{successMessage}</span>
            </div>
        }
        {
            errorMessage &&
            <div role="alert" className={`alert alert-error fixed left-0 z-50 right-0 top-[0vh] w-[90vw] justify-self-center self-center gap-1 flex-row`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{errorMessage}</span>
            </div>
        }
      <div className='hidden sm:block sm:fixed sm:w-full sm:h-screen -z-40'>
        <Image src={girlEngineer} alt='black afro girl' className='w-80 absolute right-4 lg:right-24 top-1/3 bottom-0'/>
        <Image src={girlEngineer} alt='black guy with white girl' className='w-80 left-4 lg:left-24 top-1/3 bottom-0 absolute transfrom scale-x-[-1]'/>
      </div>
      <div className={`navbar hidden ${styles.pushUp}`}></div>
      <div className='navbar lg:hidden xl:block'></div>
      <div className={`relative flex flex-col justify-center items-center w-full h-[100%] sm:h-[60%] gap-[2px] `}>
          <div className="card py-5  w-full max-w-sm sm:max-w-xl shadow-2xl bg-base-100 sm:scale-90">
            <div className='flex card-title flex-col gap-1 justify-center items-center'>
                <h1 className='block text-3xl font-extrabold'>System Settings</h1>
                <div className='w-30 h-30 rounded-full p-3 shadow-md'>
                  <FontAwesomeIcon className='object-cover text-inherit w-14 h-14' icon={faGears} />
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
                      <input type="text" id='image' name='image' value={image} onChange={(e)=>{
                        setImage(e.target.value)
                      }} placeholder="Currency" className="input input-bordered"  />
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
                          <Link role='link' href={"/transactions"} className="btn btn-error">Cancel</Link>
                      </div>
                    
                </form>
            </div>
      </div>
    </>
  )
}
