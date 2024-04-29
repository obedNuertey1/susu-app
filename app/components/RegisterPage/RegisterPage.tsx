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
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef();
  const password2Ref = useRef(null);
  const successRef = useRef(null);
  const loadingRef = useRef(null);
  const goodRef = useRef(null);
  const takenRef = useRef(null);

  const {status, data} = useQuery([username], getData);


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

  const verifying = async (data:any)=>{

    if(username.length > 0){
      console.log("status=",status);
      // @ts-ignore
      console.log('successRef.current.classList.contains("hidden")=',successRef.current.classList.contains("hidden"))
      // @ts-ignore
      usernameRef.current.classList.remove("hidden");
      if(status == "success"){
        // @ts-ignore
        if(successRef.current.classList.contains("hidden") == true){
          // @ts-ignore
          successRef.current.classList.remove("hidden");
          // @ts-ignore
          loadingRef.current.classList.add("hidden");
        }
        if(data?.verify === true){
          // @ts-ignore
          goodRef.current.classList.remove("hidden");
          // @ts-ignore
          takenRef.current.classList.add("hidden");
        }else if(data?.verify === false){
          // @ts-ignore
          takenRef.current.classList.remove("hidden");
          // @ts-ignore
          goodRef.current.classList.add("hidden");
        }
      }else{
        // @ts-ignore
        loadingRef.current.classList.remove("hidden");
        // @ts-ignore
        successRef.current.classList.add("hidden");
      }
    }else{
      // @ts-ignore
      usernameRef.current?.classList.add("hidden");
    }
  }
  // git branch fix/username-in-database
  verifying(data);
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
              <div className='flex items-center justify-center'>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Username:</span>
                      <span className="label-text-alt hidden" ref={usernameRef}>
                        <span className='is-loading hidden' ref={loadingRef} >
                          <span>Verifying<span className="loading loading-ring loading-xs"></span></span>
                        </span>
                        <span className='is-success hidden' ref={successRef}>
                          <span className="text-green-500 hidden" ref={goodRef}>All good</span>
                          <span className="text-red-600 hidden" ref={takenRef}>Already taken</span>
                        </span>
                      </span>
                    </div>
                    <input type="text" 
                    value={username} 
                    onChange={(e)=>{
                      setUsername(e.target.value);
                    }} 
                    placeholder="Choose a username" 
                    className="input input-bordered w-full max-w-xs"
                    />
                </label>
              </div>
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
              <button type='submit' {...(data?.verify === true)?{disabled: false}:{disabled: true}} className="mt-6 self-center w-full mx-auto block max-w-xs items-center btn btn-md sm:btn-md md:btn-md lg:btn-md bg-blue-700 text-white">Submit</button>
            </form>
            <p><span><Link className='text-right text-blue-900 hover:underline hover:decoration-blue-700' href={"/login"}>Login instead?</Link></span></p>
          </div>
      </div>
      <div className='navbar bg-transparent'></div>
    </>
  )
}

export default Register