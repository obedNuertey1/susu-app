"use client";
import React, { useState } from 'react';
import waiting from '@/app/funcs/waiting';
import { EmailAuthProvider, confirmPasswordReset, getAuth} from 'firebase/auth';
import InputField from '../InputField/InputField';
import { useRouter } from 'next/navigation';
import getSearchQueryParams from '@/app/funcs/getSearchQueryParams';
import { useAuth } from '@/app/contexts/AuthContext';


function AuthVerificationPage({params, searchParams}: {params: {email: string}, searchParams?:{[key: string]:string|string[]|undefined},}) {
    const router = useRouter();
    const {oobCode, continueUrl, mode}:any = searchParams;
    
    if(!oobCode || !continueUrl){
        return router.push("/login");
    }
    const auth = getAuth();

    const {login}:any = useAuth();


    console.log("_____getSearchQueryParams(continue).email_______");
    const {email} = getSearchQueryParams(continueUrl);
    console.log(email);

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");

    const promptForCredential = (userEmail:string, userPassword:string) =>{
        const credential = EmailAuthProvider.credential(userEmail, userPassword);
        return credential;
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
        <div role="alert" className="alert alert-error fixed left-0 z-50 right-0 top-[0vh] w-[90vw] justify-self-center self-center gap-1 flex-row">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{errorMessage}</span>
        </div>
      </>
      }
      {
            successMessage &&
            <div role="alert" className="alert alert-success fixed left-0 z-50 right-0 top-[0vh] w-[90vw] justify-self-center self-center gap-1 flex-row">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{successMessage}</span>
            </div>
        }
        {
        (mode === "resetPassword")
        &&
        <div className='max-w-md m-auto w-10/12 border items-center border-back p-3 flex flex-col gap-4 '>
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
          (mode === "action")
          &&
          <div className='max-w-md m-auto w-10/12 items-center justify-center flex flex-col'>
            <div className="card card-bordered card-normal shadow-lg rounded-md p-4">
              <div className="card-title"><h1 className='text-center w-full'>Email Verified!🥳🥳</h1></div>
              <div className="card-body">
                <p className='text-center'>Welcome aboard! Your email has been successfully verified. We're thrilled to have you join us!</p>
              </div>
              <div className="card-actions flex flex-row justify-center items-center"><button className='btn btn-outline btn-primary'>Go to homepage</button></div>
            </div>
          </div>
        }
    </div>
  </>
  )
}

export default AuthVerificationPage;