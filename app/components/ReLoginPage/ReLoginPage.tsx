'use client'
import Link from 'next/link'
import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import LoginAvatar from '../../components/LoginAvatar/LoginAvatar'
import InputField from '../../components/InputField/InputField'
import { useAuth } from '@/app/contexts/AuthContext';
import {useRouter} from 'next/navigation';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import waiting from '@/app/funcs/waiting';
import { useRedirectContext } from '@/app/contexts/RedirectContext';
import { useImagesContext } from '@/app/contexts/ImagesContext';
import "./ReLoginPage.css";


const ReLoginPage = ({params, searchParams}: {params: {email: string}, searchParams?:{[key: string]:string|string[]|undefined},}) => {
  const router = useRouter();
  const {login, currentUser, logout}:any = useAuth();
  const {redirectHashId}:any = useRedirectContext();
  // const redirectionToLoginPage = useCallback(()=>{
  //   waiting(4000);
  //   if(!(redirectHashId == searchParams?.hashInfo)){
  //     router.push("/login");
  //   }
  //   return <></>;
  // }, [])

  // if(!(redirectHashId == searchParams?.hashInfo)){
  //   return redirectionToLoginPage
  // }
  // useLayoutEffect(() => {
  //   if(true){
  //     redirectionToLoginPage();
  //   }
    
  
  //   return () => {};
  // }, [])

  useEffect(()=>{
    logout();
    return ()=>{}
  },[])
  const redirectToTransactionsPage = () => {
    router.push("/transactions")
  };

  // Generate a v4 UUID
  // ?usingEmail=true&hashInfo=${emailHash}

  
  const warnRef = useRef(null);
  const warnRef2 = useRef(null);
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [registerError, setRegisterError] = useState<string>("");

  const {onloggedIn}:any = useImagesContext();
  
  const auth = getAuth();

  const handleSubmit = async (e:any)=>{
    e.preventDefault();

    try{
      setRegisterError('');
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_REACT_SERVER_API}/users/username/${username}`);
      if(!res.ok){
        setRegisterError('Failed to log in');
        await waiting(4000);
        setRegisterError('');
        setLoading(false);
        throw new Error("Failed to log in")
      }
      const data = await res.json();
      const {email} = data[0];
      await login(email, password);
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          
          await onloggedIn();
          setLoading(false);
          redirectToTransactionsPage();

          // ...
        } else {
          // User is signed out
          (async()=>{
            setPassword("");
            setUsername("");
            setRegisterError('Failed to log in');
            await waiting(4000);
            setRegisterError('');
            setLoading(false);
          })();
          return;
          // ...
        }
      });

    }catch{
      setRegisterError("Failed to Login");
      await waiting(4000);
      setRegisterError('');
    }

  }
  const redirectionToLoginPage = useCallback(()=>{
    waiting(4000);
    if(!(redirectHashId == searchParams?.hashInfo)){
      router.push("/login");
    }
    // return <></>;
  }, [])

  if(!(redirectHashId == searchParams?.hashInfo)){
    redirectionToLoginPage();
  }else{
    return (
      <>
        <div className='flex justify-center items-center h-screen'>
        {
          registerError && 
          <>
            <div role="alert" className="alert alert-error fixed left-0 z-50 right-0 top-[0vh] w-[90vw] justify-self-center self-center gap-1 flex-row mx-auto prompt-anime">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{registerError}</span>
            </div>
          </>
          }
          <div className='max-w-md m-auto w-10/12 border items-center border-back p-3 pb-6 flex flex-col gap-4 '>
  
              <div className='w-full mb-6'>
                <LoginAvatar />
                <h2 className='text-center text-xl font-extrabold'>Re-Login</h2>
                <p className='text-center text-sm'>:With new password</p>
              </div>
              <form className='w-full' onSubmit={handleSubmit}>
                <InputField isRequired={true} placeholder='Enter your username' ref={warnRef2} inputText={setUsername} inputTextValue={username} inputTypeValue='text' labelText='Username:' />
                <InputField passwordMatchText="Password don't Match" isRequired={true} placeholder='Enter your new password' ref={warnRef} inputText={setPassword} inputTextValue={password} inputTypeValue='password' labelText='New Password:' showPassword={true} />
                <button type='submit' {...(loading?({disabled:true}):({disabled:false}))} className="mt-6 self-center w-full mx-auto block max-w-xs items-center btn btn-md sm:btn-md md:btn-md lg:btn-md bg-blue-700 text-white">Submit</button>
              </form>
              {/* <p><span><Link className='text-right text-blue-900 hover:underline hover:decoration-blue-700' href={"/register"}>Register instead?</Link></span></p> */}
            </div>
        </div>
      </>
    )
  }
}

export default ReLoginPage;