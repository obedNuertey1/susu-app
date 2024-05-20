"use client";
import React, { useEffect, useRef, useState } from 'react';
import waiting from '@/app/funcs/waiting';
import { Auth, EmailAuthProvider, applyActionCode, confirmPasswordReset, getAuth} from 'firebase/auth';
import InputField from '../InputField/InputField';
import { useRouter } from 'next/navigation';
import getSearchQueryParams from '@/app/funcs/getSearchQueryParams';
import { useAuth } from '@/app/contexts/AuthContext';
import "./AuthVerificationPage.css";


function AuthVerificationPage({params, searchParams}: {params: {email: string}, searchParams?:{[key: string]:string|string[]|undefined},}) {
    const router = useRouter();
    const {oobCode, continueUrl, mode}:any = searchParams;
    const auth:Auth = getAuth();
    const {login}:any = useAuth();

    const {email} = getSearchQueryParams(continueUrl);

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const cardAnimeRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
      try{
        if(!mode || !oobCode || !continueUrl){
            return router.push("/page-not-found");
        }else if(auth.currentUser?.emailVerified){
          return router.push("/transactions");
        }
        
      }catch(e){
        console.log(e)
      }
      cardAnimeRef.current?.classList.add("popup");
      return ()=>{
        cardAnimeRef.current?.classList.remove("popup");
        cardAnimeRef.current?.classList.remove("popout");
      }
    }, []);

    const handleVerify = async (e:any)=>{
      e.preventDefault();
      try{
        setIsLoading(true);
        await applyActionCode(auth, oobCode);
        setSuccessMessage("Email has been successfully verified 🥳🥳")
        await waiting(4000);
        setSuccessMessage("");
        setIsLoading(false);
        cardAnimeRef.current?.classList.add("popout");
        await waiting(700);
        window.location.reload();
      }catch(x){
        console.log(x);
        setErrorMessage("Failed to verify email 🥺🥺");
        await waiting(4000);
        setErrorMessage("");
        setIsLoading(false);
      }
    }

    const handleSubmit = async (e:any)=>{
        e.preventDefault();

        if(password.length < 6){
            setErrorMessage("Your Password is too short");
            await waiting(4000);
            setErrorMessage("");
            setIsLoading(false);
            return;
        }
        try{
            setIsLoading(true);
            await confirmPasswordReset(auth, oobCode, password).then(()=>{
                (async()=>{
                    console.log("############################Beneath confirmPasswordReset#######################################")
                    console.log('email=',email);
                    const updateUserPassword = await fetch(`${process.env.REACT_SERVER_API}/users/email`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({password: password, email: email})
                    });
                    if(!updateUserPassword.ok){
                        setErrorMessage("Failed to update password !updateUserPassword.ok");
                        await waiting(4000);
                        setErrorMessage("");
                        setIsLoading(false);
                        return;
                    }
                })();
            });
            
            await login(email, password);
            
            setSuccessMessage("Successfully updated password");
            await waiting(4000);
            setSuccessMessage("");
            setIsLoading(false);
            cardAnimeRef.current?.classList.add("popout");
            await waiting(700);
            router.push("/transactions");

        }catch(e){
            setErrorMessage("An error occured "+e);
            await waiting(4000);
            setErrorMessage('');
            setIsLoading(false);
        }
    }
  return (
    <>
    <div className='flex justify-center items-center h-screen'>
    {
      errorMessage && 
      <>
        <div role="alert" className="alert alert-error fixed left-0 z-50 right-0 top-[0vh] w-[90vw] justify-self-center self-center gap-1 flex-row prompt-anime">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{errorMessage}</span>
        </div>
      </>
      }
      {
            successMessage &&
            <div role="alert" className="alert alert-success fixed left-0 z-50 right-0 top-[0vh] w-[90vw] justify-self-center self-center gap-1 flex-row prompt-anime">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{successMessage}</span>
            </div>
        }
        {
        (mode === "resetPassword")
        &&
        <div className='max-w-md m-auto w-10/12 border items-center border-back p-3 flex flex-col gap-4 original-state' ref={cardAnimeRef}>
            <div className='w-full mb-6'>
              <h2 className='text-center text-2xl font-extrabold'>New Password</h2>
            </div>
            <form className='w-full' onSubmit={handleSubmit}>
              <InputField isRequired={true} placeholder='Enter your new password' inputText={setPassword} inputTextValue={password} inputTypeValue='password' showPassword={true} labelText='Your New Password:' />
              <button type='submit' {...(isLoading?({disabled:true}):({disabled:false}))} className="mt-6 self-center w-full mx-auto block max-w-xs items-center btn btn-md sm:btn-md md:btn-md lg:btn-md bg-blue-700 text-white">Submit</button>
            </form>
        </div>
        }
        {
          (mode === "verifyEmail")
          &&
          <div className='max-w-md m-auto w-10/12 items-center justify-center flex flex-col'>
            <div className="card card-bordered card-normal shadow-lg rounded-lg p-4 original-state" ref={cardAnimeRef}>
              <div className="card-title"><h1 className='text-center w-full'>Email verification - One step to go!😅😅</h1></div>
              <div className="card-body">
                <p className='text-center'>Welcome aboard! Your email is one step closer to being verified. Click the button below to verify your email</p>
              </div>
              <div className="card-actions flex flex-row justify-center items-center"><button {...(isLoading?({disabled:true}):({disabled:false}))} onClick={handleVerify} className='btn btn-outline btn-primary'>Complete Verification</button></div>
            </div>
          </div>
        }
    </div>
  </>
  )
}

export default AuthVerificationPage;