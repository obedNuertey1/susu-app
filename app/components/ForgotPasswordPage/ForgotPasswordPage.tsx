"use client";
import React, { useEffect, useRef, useState } from 'react'
import InputField from '../InputField/InputField';
import Link from 'next/link';
import waiting from '@/app/funcs/waiting';
import { confirmPasswordReset, getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import styles from "./ForgotPasswordPage.module.css";

function ForgotPasswordPage() {
    const auth = getAuth();
    // const {oobCode}:any = searchParams;
    const router = useRouter();
    console.log("_______auth.currentUser______");
    console.log(auth.currentUser);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");

    const forgotPasswordRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
      forgotPasswordRef.current?.classList.add(`${styles["animate-appear-top"]}`);
      forgotPasswordRef.current?.classList.remove(`${styles["animate-disappear-down"]}`);
      // forgotPasswordRef.current?.classList.add("animate-disappear-down");
      return ()=>{
        forgotPasswordRef.current?.classList.remove(`${styles["animate-appear-top"]}`);
      }
    },[]);

    const handleSubmit = async (e:any)=>{
        e.preventDefault();
        try{
            setIsLoading(true);
            const checkEmail = await fetch(`${process.env.NEXT_PUBLIC_REACT_SERVER_API}/users/email/${email}`);
            if(!checkEmail.ok){
                setErrorMessage("An error occured");
                await waiting(4000);
                setErrorMessage("");
                setIsLoading(false);
                return;
            }
            const emailData = await checkEmail.json();
            if(!emailData){
                setErrorMessage("The email you provided does not exist");
                await waiting(4000);
                setErrorMessage("");
                setIsLoading(false);
                return;
            }
            const firstname = emailData.name?.split(/\s/)[0];

            const getCompanyData = await fetch(`${process.env.NEXT_PUBLIC_REACT_SERVER_API}/system-settings`);
            if(!getCompanyData.ok){
                setErrorMessage("Failed to send email");
                await waiting(4000);
                setErrorMessage("");
                return;
            }

            const getCompanyInfo = await getCompanyData.json();
            const companyLogoLink = getCompanyInfo.image;
            const companyName = getCompanyInfo.title;
            
            
            await sendPasswordResetEmail(auth, email, {url: `${process.env.NEXT_PUBLIC_CONTINUE_URL}?email=${email}&firstname=${firstname}&company_logo_link=${companyLogoLink}&company_name=${companyName}`});
            setSuccessMessage(`An email has been sent to ${email} to reset password`);
            await waiting(4000);
            setSuccessMessage("");

            setIsLoading(false);
            // await confirmPasswordReset(auth, oobCode, );

        }catch(e){
            setErrorMessage("An error occured");
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
        <div role="alert" className="alert alert-error fixed left-0 z-50 right-0 top-[0vh] w-[90vw] justify-self-center self-center gap-1 flex-row mx-auto prompt-anime">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{errorMessage}</span>
        </div>
      </>
      }
      {
            successMessage &&
            <div role="alert" className="alert alert-success fixed left-0 z-50 right-0 top-[0vh] w-[90vw] justify-self-center self-center gap-1 flex-row mx-auto prompt-anime">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{successMessage}</span>
            </div>
        }
      <div className={`max-w-md m-auto w-10/12 border items-center border-back p-3 flex flex-col gap-4 ${styles["original-state"]}`} ref={forgotPasswordRef}>
          <div className='w-full mb-6'>
            <h2 className='text-center text-2xl font-extrabold'>Email</h2>
          </div>
          <form className='w-full' onSubmit={handleSubmit}>
            <InputField isRequired={true} placeholder='Enter your email' inputText={setEmail} inputTextValue={email} inputTypeValue='email' labelText='Your Email:' />
            <button type='submit' {...(isLoading?({disabled:true}):({disabled:false}))} className="mt-6 self-center w-full mx-auto block max-w-xs items-center btn btn-md sm:btn-md md:btn-md lg:btn-md bg-blue-700 text-white">Submit</button>
          </form>
          {/* <p><span><Link className='text-right text-blue-900 hover:underline hover:decoration-blue-700' href={"/login"}>Login instead?</Link></span></p> */}
          <p
          onClick={async ()=>{
            forgotPasswordRef.current?.classList.remove(`${styles["original-state"]}`);
            forgotPasswordRef.current?.classList.add(`${styles["animate-disappear-down"]}`);
            await waiting(700);
            // Move to the bottom and disappear
            router.push("/login");
          }}
          ><span className='text-right text-blue-900 hover:underline hover:decoration-blue-700 link link-hover'>Login instead?</span></p>
        </div>
    </div>
  </>
  )
}

export default ForgotPasswordPage