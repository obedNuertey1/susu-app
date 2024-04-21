import React from 'react'
import LoginAvatar from '../components/LoginAvatar/LoginAvatar'
import InputField from '../components/InputField/InputField'
import Link from 'next/link'

const Register = () => {
  return (
    <>
      <div className='flex justify-center items-center h-screen'>
        <div className='max-w-md m-auto w-10/12 border items-center border-back p-3 flex flex-col gap-4 '>
            <div className='w-full mb-6'>
              <LoginAvatar />
              <h2 className='text-center text-2xl font-extrabold'>Login</h2>
            </div>
            <form className='w-full'>
              <InputField />
              <InputField />
              <button type='submit' className="mt-6 self-center w-full mx-auto block max-w-xs items-center btn btn-md sm:btn-md md:btn-md lg:btn-md bg-blue-700 text-white">Submit</button>
            </form>
            <p><span><Link className='text-right text-blue-900 hover:decoration-blue-700' href={"/login"}>Login instead?</Link></span></p>
          </div>
      </div>
    </>
  )
}

export default Register