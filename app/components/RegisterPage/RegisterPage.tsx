'use client';
import React, {useState, useRef, Dispatch, SetStateAction, useEffect, useLayoutEffect} from 'react'
import LoginAvatar from '../LoginAvatar/LoginAvatar'
import InputField, {IinputField, warnColorType, warnTextType, passwordMatchType, usernameTextType} from '../InputField/InputField'
import Link from 'next/link'
import checkPasswordStrength from '../../funcs/checkPasswordStrength';
import waiting from '../../funcs/waiting';
import { useQuery } from 'react-query';
import dynamic from 'next/dynamic';

async function getData(key:any){
  try{
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1", {});
    if(!res.ok){
      throw new Error("Network response was not ok");
    }
    const resData = await res.json();
    
    if(key?.queryKey[0] === resData?.title){
      // await waiting(20000);
      return {verify: false};
    }else{
      // await waiting(20000);
      return {verify: true};
    }

    // return resData;
  }catch(e){
    console.error(e);
  }
}


const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordWarnText, setPasswordWarnText] = useState("");
  const [passwordWarnColor, setPasswordWarnColor] = useState("");
  const [password2WarnText, setPassword2WarnText] = useState("");
  const [password2WarnColor, setPassword2WarnColor] = useState("");
  const [usernameCheckText, setUsernameCheckText] = useState("");
  const [usernameWarnColor, setUsernameWarnColor] = useState("");
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef();
  const password2Ref = useRef(null);

  const {status, data, refetch} = useQuery([username, ""], getData);


  // getData({queryKey: "djeks"})
// "text-red-600" | "text-red-400" | "text-cyan-600" | "text-yellow-500" | "text-green-500" | "";
// "Very Weak" | 'Weak' | 'Moderate' | 'Strong' | 'Very Strong';
// export type passwordMatchType = "Password don't Match" | "Password Matches" | "";

  // useLayoutEffect(()=>{
  // },[password])
  
  // @ts-ignore
  useEffect(()=>{
    (async ()=>{ // For first password field
  
      function passCheckTextAndColor(str:warnColorType, password:warnTextType):void{
        // @ts-ignore
        passwordRef.current.showWarn();
        setPasswordWarnText(checkPasswordStrength(password));
        setPasswordWarnColor(str);
      }
      
      // let myTimer;
      // clearTimeout(myTimer);
      
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
      // await waiting(4000);
      // myTimer = await waiting(10000);
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
  
      // let myTimer:any;
      // clearTimeout(myTimer);
      
      if(password2.length > 1){
        if(password2 !== password){
          correctPassTextAndColor("text-red-600", "Password don't Match");
        }else if(password2 === password){
          correctPassTextAndColor("text-green-500", "Password Matches");
          // myTimer = await waiting(2000);
            // @ts-ignore
            // password2Ref.current?.hideWarn();
        }else{
          correctPassTextAndColor("", "");
          // @ts-ignore
          // password2Ref.current?.hideWarn();
        }
      }else if(password2.length === 0){
        // @ts-ignore
        password2Ref.current?.hideWarn();
      }

    })();
    
    
    // const 
  }, [password2, password])
  
  
  
  useEffect(()=>{
    (async (data:any)=>{
      // console.log("data=",data)
      // @ts-ignore
      usernameRef.current?.showWarn();
      // refetch();
      if(username.length > 0){
        if(status === "success"){
          if(data?.verify === true){
            setUsernameWarnColor("text-green-500");
            setUsernameCheckText("All good");
          }else if(data?.verify === false){
            // @ts-ignore
            usernameRef.current?.showWarn();
            setUsernameWarnColor("text-red-600");
            setUsernameCheckText("Already taken");
          }
    
        }else if(status === "error" || status === "idle"){
          // @ts-ignore
          usernameRef.current?.showWarn();
          setUsernameWarnColor("text-red-600");
          setUsernameCheckText("Bad Network");
        }
      }
    
      if(username.length < 1){
        // @ts-ignore
        usernameRef.current?.hideWarn();
        setUsernameCheckText("");
      }
    })(data);

    if(status==="loading"){
      refetch();
    }
    console.log("status=",status);
  }, [username, usernameCheckText, usernameWarnColor]);

  // git branch fix/username-in-database

  return (
    <>
      <div className='navbar'></div>
      <div className='flex justify-center items-center h-screen'>
        <div className='max-w-md m-auto w-10/12 border items-center border-back p-3 flex flex-col gap-4 '>
            <div className='w-full mb-6'>
              <LoginAvatar />
              <h2 className='text-center text-2xl font-extrabold'>Register</h2>
            </div>
            <form className='w-full'>
              <InputField 
              isRequired={true} 
              placeholder='Choose a username' 
              ref={usernameRef} 
              inputText={setUsername} 
              inputTextValue={username} 
              inputTypeValue='text' 
              labelText='Username:'
              isRegisterUsername={true}
              // @ts-ignore
              usernameCheckText={usernameCheckText}
              // @ts-ignore
              warnColor={usernameWarnColor}
              queryStatus={status}
              queryData={data} 
              refetchInputData={refetch}
              />
              <InputField isRequired={true} placeholder='Enter your email address' ref={emailRef} inputText={setEmail} inputTextValue={email} inputTypeValue='email' labelText='Email:' />
              <InputField isRequired={true} placeholder='Enter your password' ref={passwordRef} inputText={setPassword} inputTextValue={password} inputTypeValue='password' labelText='Password:'
              // @ts-ignore 
              warningText={passwordWarnText} 
              // @ts-ignore
              warnColor={passwordWarnColor} showPassword={true} />

              <InputField isRequired={true} 
              placeholder='Retype the password' 
              ref={password2Ref} 
              inputText={setPassword2} 
              inputTextValue={password2} 
              inputTypeValue='password' 
              labelText='Retype Password:'
              // @ts-ignore
              passwordMatchText={password2WarnText}
              // @ts-ignore
              warnColor={password2WarnColor}
              queryStatus={status}
              />
              <button type='submit' {...(usernameCheckText == "All good")?{disabled: false}:{disabled: true}} className="mt-6 self-center w-full mx-auto block max-w-xs items-center btn btn-md sm:btn-md md:btn-md lg:btn-md bg-blue-700 text-white">Submit</button>
            </form>
            <p><span><Link className='text-right text-blue-900 hover:underline hover:decoration-blue-700' href={"/login"}>Login instead?</Link></span></p>
          </div>
      </div>
      <div className='navbar bg-transparent'></div>
    </>
  )
}

export default Register