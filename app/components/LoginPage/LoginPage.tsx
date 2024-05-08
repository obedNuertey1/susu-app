'use client'
import Link from 'next/link'
import React, {useRef, useState} from 'react';
import LoginAvatar from '../../components/LoginAvatar/LoginAvatar'
import InputField from '../../components/InputField/InputField'
import { useAuth } from '@/app/contexts/AuthContext';
import {useRouter} from 'next/navigation';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import waiting from '@/app/funcs/waiting';

const LoginPage = () => {
  const router = useRouter();
  const redirectToTransactionsPage = () => {
    router.push("/transactions")
  };
  const warnRef = useRef(null);
  const warnRef2 = useRef(null);
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [registerError, setRegisterError] = useState<string>("");
  


  const {login, currentUser, setCurrentUser}:any = useAuth();
  const auth = getAuth();

  const handleSubmit = async (e:any)=>{
    e.preventDefault();

    try{
      setRegisterError('');
      setLoading(true);
      const res = await fetch(`${process.env.REACT_SERVER_API}/users/username/${username}`);
      if(!res.ok){
        setRegisterError('Failed to log in');
        await waiting(3000);
        setRegisterError('');
        setLoading(false);
        throw new Error("Failed to log in")
      }
      const data = await res.json();
      const {email} = data[0];
      await login(email, password);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          
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
          // ...
        }
      });
      return;
      // await fetch("api_key", {
      //   method: "Post",
      //   headers: {
      //     "Content-Type": "application/json",
      //     body: JSON.stringify({})
      //   }
      // }); 

    }catch{
      setRegisterError("Failed to Login");
    }

  }
  return (
    <>
      <div className='flex justify-center items-center h-screen'>
      {
        registerError && 
        <>
          <div role="alert" className="alert alert-error fixed left-0 z-50 right-0 top-[0vh] w-[90vw] justify-self-center self-center gap-1 flex-row">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{registerError}</span>
          </div>
        </>
        }
        <div className='max-w-md m-auto w-10/12 border items-center border-back p-3 flex flex-col gap-4 '>

            <div className='w-full mb-6'>
              <LoginAvatar />
              <h2 className='text-center text-2xl font-extrabold'>Login</h2>
            </div>
            <form className='w-full' onSubmit={handleSubmit}>
              <InputField isRequired={true} placeholder='Enter your username' ref={warnRef2} inputText={setUsername} inputTextValue={username} inputTypeValue='text' labelText='Username:' />
              <InputField passwordMatchText="Password don't Match" isRequired={true} placeholder='Enter your password' ref={warnRef} inputText={setPassword} inputTextValue={password} inputTypeValue='password' labelText='Password:' showPassword={true} />
              <button type='submit' {...(loading?({disabled:true}):({disabled:false}))} className="mt-6 self-center w-full mx-auto block max-w-xs items-center btn btn-md sm:btn-md md:btn-md lg:btn-md bg-blue-700 text-white">Submit</button>
            </form>
            <p><span><Link className='text-right text-blue-900 hover:underline hover:decoration-blue-700' href={"/register"}>Register instead?</Link></span></p>
          </div>
      </div>
    </>
  )
}

export default LoginPage;