'use client';
import React, {useState, useRef, Dispatch, SetStateAction, useEffect, useLayoutEffect} from 'react'
import LoginAvatar from '../LoginAvatar/LoginAvatar'
import InputField, {IinputField, warnColorType, warnTextType, passwordMatchType, usernameTextType} from '../InputField/InputField'
import Link from 'next/link'
import checkPasswordStrength from '../../funcs/checkPasswordStrength';
import { useQuery } from 'react-query';
import { useAuth } from '@/app/contexts/AuthContext';
import {useRouter} from 'next/navigation';
import waiting from '@/app/funcs/waiting';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


async function getData(key:any){
  try{
    const res = await fetch(`${process.env.REACT_SERVER_API}/users/username/${key.queryKey[0]}`);
    if(!res.ok){
      throw new Error("Network response was not ok");
    }
    const resData = await res.json();
    if(resData[0] != null){
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
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordWarnText, setPasswordWarnText] = useState("");
  const [passwordWarnColor, setPasswordWarnColor] = useState("");
  const [password2WarnText, setPassword2WarnText] = useState("");
  const [password2WarnColor, setPassword2WarnColor] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [loading, setLoading] = useState(false);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef();
  const password2Ref = useRef(null);
  const successRef = useRef(null);
  const loadingRef = useRef(null);
  const goodRef = useRef(null);
  const takenRef = useRef(null);
  
  const {status, data} = useQuery([username], getData);
  

  const {signup, currentUser}:any = useAuth(); // authentication
  
  console.log(JSON.stringify(currentUser));
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

  const handleSubmit = async (e:any)=>{
    e.preventDefault();

    if(password !== password2){
      setRegisterError("Passwords do not match");
      await waiting(3000);
      setRegisterError('');
      return;
    }

    try{
      setRegisterError('');
      setLoading(true);
      
      await signup(email, password);

      const auth = getAuth();
      onAuthStateChanged(auth, (user)=>{
        if(user){
          (async ()=>{
            const res = await fetch(`${process.env.REACT_SERVER_API}/users`, {
              method: "Post",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username,
                email,
                password,
                name
              })
            });
            if(!res.ok){
              setRegisterError('Failed to Register');
              await waiting(3000);
              setRegisterError('');
              throw new Error("Failed to Register")
            }
            setLoading(false);
            router.push("/transactions")
          })();
        }else{
          (async ()=>{
            setRegisterError("Failed to Register");
            setUsername(''); setEmail(''); setName(''); setPassword(''), setPassword2(''); setLoading(false);
            await waiting(4000);
            setRegisterError('');
          })();
        }
      })
    }catch{
      setRegisterError("Failed to Register");
      setUsername(''); setEmail(''); setName(''); setPassword(''), setPassword2(''); setLoading(false);
      await waiting(4000);
      setRegisterError('');
    }

  }

  return (
    <>
        {
        registerError && 
        <>
          <div role="alert" className="alert alert-error fixed left-0 z-50 right-0 top-[0vh] w-[90vw] justify-self-center self-center gap-1 flex-row">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{registerError}</span>
          </div>
        </>
        }
      <div className='navbar'></div>
      <div className='flex justify-center items-center h-screen sm:h-full mb-[18%] sm:mb-[10%] md:mb-[2%] '>
        <div className='max-w-md m-auto w-10/12 border items-center border-back p-3 flex flex-col gap-4 '>
            <div className='w-full mb-6'>
              <LoginAvatar />
              <h2 className='text-center text-2xl font-extrabold'>Register</h2>
            </div>
            <form className='w-full' onSubmit={handleSubmit}>
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
              <InputField isRequired={true} placeholder='Enter full name' inputText={setName} inputTextValue={name} inputTypeValue='text' labelText='Full Name:' />
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
              <button type='submit' {...(data?.verify === false || loading === true)?{disabled: true}:{disabled: false}} className="mt-6 self-center w-full mx-auto block max-w-xs items-center btn btn-md sm:btn-md md:btn-md lg:btn-md bg-blue-700 text-white">Submit</button>
            </form>
            <p><span><Link className='text-right text-blue-900 hover:underline hover:decoration-blue-700' href={"/login"}>Login instead?</Link></span></p>
          </div>
      </div>
      {/* <footer className="footer items-center p-4 bg-neutral text-neutral-content  opacity-1 z-50">
            <aside className="items-center grid-flow-col">
                <p></p>
            </aside> 
            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                </a>
                <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
                <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
            </nav>
      </footer> */}
      {/* <div className='navbar bg-transparent'></div> */}
      {/* <div className='navbar bg-transparent'></div>
      <div className='navbar bg-transparent'></div> */}
    </>
  )
}

export default Register