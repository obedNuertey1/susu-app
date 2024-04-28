'use client'
import Link from 'next/link'
import React, {useRef, useState} from 'react';
import LoginAvatar from '../../components/LoginAvatar/LoginAvatar'
import InputField from '../../components/InputField/InputField'

const LoginPage = () => {
  const warnRef = useRef(null);
  const warnRef2 = useRef(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className='flex justify-center items-center h-screen'>
        <div className='max-w-md m-auto w-10/12 border items-center border-back p-3 flex flex-col gap-4 '>
            <div className='w-full mb-6'>
              <LoginAvatar />
              <h2 className='text-center text-2xl font-extrabold'>Login</h2>
            </div>
            <form className='w-full'>
              <InputField isRequired={true} placeholder='Enter your username' ref={warnRef2} inputText={setUsername} inputTextValue={username} inputTypeValue='text' labelText='Username:' />
              <InputField passwordMatchText="Password don't Match" isRequired={true} placeholder='Enter your password' ref={warnRef} inputText={setPassword} inputTextValue={password} inputTypeValue='password' labelText='Password:' showPassword={true} />
              <button type='submit' className="mt-6 self-center w-full mx-auto block max-w-xs items-center btn btn-md sm:btn-md md:btn-md lg:btn-md bg-blue-700 text-white">Submit</button>
            </form>
            <p><span><Link className='text-right text-blue-900 hover:underline hover:decoration-blue-700' href={"/register"}>Register instead?</Link></span></p>
          </div>
      </div>
    </>
  )
}

export default LoginPage;