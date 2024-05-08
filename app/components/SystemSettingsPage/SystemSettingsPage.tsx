"use client";
import { faGears, faMailReply, faUserGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import styles from "./system-settings.module.css";
import girlEngineer from "../../assets/Groupengineering-girl.svg"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import waiting from '@/app/funcs/waiting';
import { getAuth, updatePassword } from 'firebase/auth';
import InputField, { passwordMatchType, warnColorType, warnTextType } from '../InputField/InputField';
import checkPasswordStrength from '@/app/funcs/checkPasswordStrength';
import { SHA256 } from 'crypto-js';
import { useRedirectContext } from '@/app/contexts/RedirectContext';

export default function SystemSettingsPage() {
  const router = useRouter();
  const {currentUser, signup, logout}:any = useAuth();
  if(!currentUser){ // Go to login page if user has not logged in.
    return router.push("/login");
  }

  const auth2 = getAuth();

  const {setRedirectHashId, redirectHashId}:any = useRedirectContext();

  const [phone, setPhone] = useState<string>("");
  const [address1, setAddress1] = useState<string>("");
  const [address2, setAddress2] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [zip, setZip] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [passwordWarnText, setPasswordWarnText] = useState<string>("");
  const [passwordWarnColor, setPasswordWarnColor] = useState<warnColorType>("");
  const passwordRef = useRef(null);

  const [password2, setPassword2] = useState<string>("");
  const [password2WarnText, setPassword2WarnText] = useState<string>("");
  const [password2WarnColor, setPassword2WarnColor] = useState<warnColorType>("");
  const password2Ref = useRef(null);
  const passwordModalRef = useRef<HTMLDialogElement>(null);


  const [emailState, setEmailState] = useState<string>("");

  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState<boolean>(true);
  const [randomText, setRandomText] = useState<string>("");
  const [deleteInput, setDeleteInput] = useState<string>("");
  const deleteInputRef = useRef<HTMLInputElement>(null);
  const randomTextRef = useRef<HTMLSpanElement>(null);
  const deleteDialogueRef = useRef<HTMLDialogElement>(null);

  const [deletePasswordInput, setDeletePasswordInput] = useState<string>("");
  const deletePasswordRef = useRef(null);


  useEffect(()=>{
    (async ()=>{
      try{
        const res = await fetch(`${process.env.REACT_SERVER_API}/users/email/${currentUser.email}`);
        if(!res.ok){throw new Error("Couldn't get user data")}
        const data:any = await res.json();
        setPhone(data.phone);
        setAddress1(data.addr1);
        setAddress2(data.addr2);
        setCountry(data.country);
        setState(data.state);
        setZip(data.zip);
        setCity(data.city);
      }catch(e){
        console.log(e);
      }
    })();

    return ()=>{}
  },[])

    // @ts-ignore
    useEffect(()=>{
      (async ()=>{ // For first password field
        
        function passCheckTextAndColor(str:warnColorType, password:warnTextType):void{
          // @ts-ignore
          passwordRef.current.showWarn();
          setPasswordWarnText(checkPasswordStrength(password));
          setPasswordWarnColor(str);
        }
        
        switch(checkPasswordStrength(password)){
          case 'Very Weak':
            // @ts-ignore
            passCheckTextAndColor('text-red-600', password);
            break;
          case 'Weak':
            // @ts-ignore
            passCheckTextAndColor('text-red-400', password);
            break;
          case 'Moderate':
            // @ts-ignore
            passCheckTextAndColor('text-cyan-600', password);
            break;
          case 'Strong':
            // @ts-ignore
            passCheckTextAndColor('text-yellow-500', password);
            break;
          case 'Very Strong':
            // @ts-ignore
            passCheckTextAndColor('text-green-500', password);
            break;
          default:
            passCheckTextAndColor("", "");
        }
        if(password.length < 1){
          // @ts-ignore
          passwordRef?.current?.hideWarn();
  
        }
      })();
  
      (async ()=>{ // For password2 field
    
        function correctPassTextAndColor(str:warnColorType, word:passwordMatchType):void{
          // @ts-ignore
          password2Ref.current.showWarn();
          setPassword2WarnText(word);
          setPassword2WarnColor(str);
        }
        
        if(password2.length > 1){
          if(password2 !== password){
            correctPassTextAndColor("text-red-600", "Password don't Match");
          }else if(password2 === password){
            correctPassTextAndColor("text-green-500", "Password Matches");
          }else{
            correctPassTextAndColor("", "");
          }
        }else if(password2.length === 0){
          // @ts-ignore
          password2Ref.current?.hideWarn();
        }
  
      })();
    }, [password2, password])

  const handleSubmit = async(e:any)=>{
    e.preventDefault();
    setIsLoading(true);
    try{
      const res1 = await fetch(`${process.env.REACT_SERVER_API}/users/email/${currentUser.email}`)
      if(!res1.ok){
        setErrorMessage("Failed to update");
        await waiting(4000);
        setErrorMessage("");
        setIsLoading(false);
        return;
      }
      const res1Data = await res1.json();
      console.log("res1Data.userid");
      console.log(res1Data.userid);
      const res = await fetch(`${process.env.REACT_SERVER_API}/users/${res1Data.userid}`, {
        method: "PATCH",
        headers: {
          'Content-Type': "application/json"
        },
        body:JSON.stringify({
          phone,
          addr1: address1,
          addr2: address2,
          country,
          state,
          zip,
          city
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
      setErrorMessage('Failed to update info')
      await waiting(4000);
      setErrorMessage('');
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e:any)=>{
    e.preventDefault();
    if(password !== password2){
      setPassword(''); setPassword2('');
      passwordModalRef?.current?.close();
      setErrorMessage("Passwords don't match");
      await waiting(5000);
      setErrorMessage("");
      return;
    }

    if(password == "" || password2 == ""){
      passwordModalRef?.current?.close();
      return
    }
    // ### Algorithm ####
    try{
      // store current user email in a emailState
      setEmailState(currentUser.email);
      // delete current user from firebase
      console.log("emailState=",emailState);
      await updatePassword(currentUser, password).then(async (value:any)=>{
        const res = await fetch(`${process.env.REACT_SERVER_API}/users/email`, {
          method: 'PUT',
          headers: {
            'Content-Type': "application/json"
          },
          body:JSON.stringify({
            email: emailState,
            password: password
          })
        })
        if(!res.ok){
          passwordModalRef?.current?.close();
          setErrorMessage("Failed To Update Password Server");
          await waiting(4000);
          setErrorMessage("");
          setEmailState(''); setPassword(''); setPassword2('');
          return;
        }
        const emailHash:string = SHA256(emailState).toString();
        setRedirectHashId(emailHash);
        // clear state fields
        setEmailState(''); setPassword(''); setPassword2('');
        // close modal
        passwordModalRef?.current?.close();
        setSuccessMessage("Password Updated: You'll be redirected to login again");
        await waiting(5000);
        // move to relogin page
        router.push(`/relogin?usingEmail=true&hashInfo=${emailHash}`);
      }).catch(async ()=>{
        passwordModalRef?.current?.close();
        setErrorMessage("Failed To Update Password");
        setEmailState(''); setPassword(''); setPassword2('');
        await waiting(4000);
        setErrorMessage("");
      });

    }catch{
      passwordModalRef?.current?.close();
      setErrorMessage("Failed To Update Password");
      setEmailState(''); setPassword(''); setPassword2('');
      await waiting(4000);
      setErrorMessage("");
    }
  }
  
  useEffect(()=>{//For delete input effects
    try{
        if(deleteInput === randomText && deletePasswordInput.length >= 1){
          deleteInputRef.current?.classList.remove("text-gray-900");
          deleteInputRef.current?.classList.add("text-error");
          randomTextRef.current?.classList.remove("text-gray-900");
          randomTextRef.current?.classList.add("text-error");
          setDeleteButtonDisabled(false);
        }else{
          setDeleteButtonDisabled(true);
          if(!deleteInputRef.current?.classList.contains("text-gray-900")){
            deleteInputRef.current?.classList.add("text-gray-900");
          }
          if(!randomTextRef.current?.classList.contains("text-gray-900")){
            randomTextRef.current?.classList.add("text-gray-900");
          }
        }
    }catch(e){
      console.error(e)
    }

    return ()=>{}
  },[deleteInput, deletePasswordInput]);

  const handleDeleteAcc = async (e:any) => {
    e.preventDefault();
    if(!(deleteInput === randomText)){
      setErrorMessage("Failed to delete account - !(deleteInput === randomText)");
      deleteDialogueRef.current?.close();
      await waiting(4000);
      setErrorMessage("");
      setDeleteInput('');
      return;
    }

    try{
      const res = await fetch(`${process.env.REACT_SERVER_API}/users/email/${currentUser.email}`, {method: 'DELETE'});
      if(!res.ok){
        setErrorMessage("Failed to delete account - !res.ok");
        deleteDialogueRef.current?.close();
        await waiting(4000);
        setErrorMessage("");
        setDeleteInput('');
        return;
      }
      const auth = getAuth();
      const user:any = auth?.currentUser;
      // @ts-ignore
      deleteUser(user).then(()=>{
        (async()=>{
          setSuccessMessage("You've deleted your account succesfully");
          deleteDialogueRef.current?.close();
          await waiting(4000);
          setSuccessMessage('');
          setDeleteInput('');
          router.push("/login");
          return;
        })();
      }).catch(()=>{
        (async ()=>{
          setErrorMessage(`You will need to login again to delete account`);
          setDeleteInput('');
          deleteDialogueRef.current?.close();
          await waiting(4000);
          setErrorMessage("");
          router.push("/login");
          logout();
          return;
        })();
      })

    }catch{
      setErrorMessage("Failed to delete account - try-catch");
      setDeleteInput('');
      deleteDialogueRef.current?.close();
      await waiting(4000);
      setErrorMessage("");
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
                  <div className="divider">Contact & Address</div>
                      {/* Contact & Address */}
                    <div className="form-control">
                      <label className="label" htmlFor='phone'>
                        <span className="label-text">Phone:</span>
                      </label>
                      {/* @ts-ignore */}
                      <input type="tel" id='phone' name='phone' value={phone} onChange={(e)=>{
                        setPhone(e.target.value)
                      }} placeholder="Enter your new phone number" className="input input-bordered"  />
                    </div>
                    <div className="form-control">
                      <label className="label" htmlFor='address1'>
                        <span className="label-text">Address1:</span>
                      </label>
                      <input type="tel" id='address1' value={address1} onChange={(e)=>{setAddress1(e.target.value)}} name='address1' placeholder="Enter your first address" className="input input-bordered"  />
                    </div>
                    <div className="form-control">
                      <label className="label" htmlFor='address2'>
                        <span className="label-text">Address2:</span>
                      </label>
                      <input type="tel" id='address2' name='address2' value={address2} onChange={(e)=>{setAddress2(e.target.value)}} title='Please Enter Second address' pattern='^[0|\+233](2[0|3|4|5|6|7|8]|5[0|3|4|5|7|9])\d{7}$' placeholder="Enter Phone Number" className="input input-bordered"  />
                    </div>
                    {/* Contact & Address */}
                  <div className="divider">Country Info</div>
                    {/* Country Info */}
                    <div className="form-control">
                      <label className="label" htmlFor='country'>
                        <span className="label-text">Country:</span>
                      </label>
                      <input type="text" id='country' name='country' value={country} onChange={(e)=>{setCountry(e.target.value)}} placeholder="Enter your Country" className="input input-bordered"  />
                    </div>
                    <div className="form-control">
                      <label className="label" htmlFor='state'>
                        <span className="label-text">State:</span>
                      </label>
                      <input type="text" id='state' value={state} onChange={(e)=>{setState(e.target.value)}} name='state' placeholder="Enter your state" className="input input-bordered"  />
                    </div>
                    <div className="form-control">
                      <label className="label" htmlFor='city'>
                        <span className="label-text">City:</span>
                      </label>
                      <input type="text" id='city' value={city} onChange={(e)=>{setCity(e.target.value)}} name='city' placeholder="Enter your city" className="input input-bordered"  />
                    </div>
                    <div className="form-control">
                      <label className="label" htmlFor='zip'>
                        <span className="label-text">Zip:</span>
                      </label>
                      <input type="text" id='zip' value={zip} onChange={(e)=>{setZip(e.target.value)}} name='zip' placeholder="Enter your zip code" className="input input-bordered"  />
                    </div>
                    {/* Country Info */}
                    <div className="divider">Actions</div>
                    {/* <div className="card-actions flex flex-col items-center w-full"> */}
                      <div className="form-control mt-6">
                        <button onClick={handleSubmit} {...(isLoading?{disabled:true}:{disabled:false})} type='submit' className="btn btn-primary">Update</button>
                      </div>
                      <div className="form-control mt-2">
                          <Link role='link' href={"/transactions"} className="btn btn-error">Cancel</Link>
                      </div>
                    {/* </div> */}
                    
                </form>
            </div>
      </div>
    </>
  )
}
