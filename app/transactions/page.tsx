import React from 'react'
import LoginAvatar from '../components/LoginAvatar/LoginAvatar'
import illustration_1 from "../assets/Groupinfo-graph-1.svg"
import illustration_2 from "../assets/Groupinfo-graph-2.svg"
import Image from 'next/image'
// import { Lato } from 'next/font/google'

// const lato = Lato({ subsets: ['latin'], weight: ["700"], style: ["normal"] });

export default function Transactions() {
  return (
    <>
        <div className="hero min-h-screen bg-base-200 relative scroll-m-0 scroll-p-0">
        <Image src={illustration_1} alt="transaction illustration 1" className='sm:absolute w-1/4 right-2' />
        <Image src={illustration_2} alt="transaction illustration 2" className='sm:absolute w-1/4 left-2'/>
          <div className='flex flex-col gap-6'>
            <div className="hero-content flex-col lg:flex-row">
              <div className="text-center lg:text-left">
                <div id='organisation-logo-name' className='w-full flex flex-col gap-0.5 justify-center items-center'>
                    <div id='organisation-logo'>
                      <LoginAvatar />
                    </div>
                    <div id='organisation-name' className='w-fit'>
                      Organization Name
                    </div>
                </div>
                <h1 className="text-4xl font-bold sm:text-5xl">Transaction</h1>
              </div>
              <div className="card  w-full max-w-sm shadow-2xl bg-base-100">
                <form className="card-body">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Acc No.</span>
                    </label>
                    <input type="email" placeholder="Enter account number" className="input input-bordered" required />
                  </div>
                  <div className="form-control mt-6">
                    <button className="btn btn-primary">Submit</button>
                  </div>
                </form>
              </div>
            </div>
            <div className='card w-full max-w-screen-md flex flex-row gap-3 flex-wrap justify-center items-center sm:gap-7'>
              <div className='w-16 h-16 bg-gray-700 rounded-full shadow-lg shadow-gray-400'></div>
              <div className='w-16 h-16 bg-gray-700 rounded-full shadow-lg shadow-gray-400'></div>
              <div className='w-16 h-16 bg-gray-700 rounded-full shadow-lg shadow-gray-400'></div>
              <div className='w-16 h-16 bg-gray-700 rounded-full shadow-lg shadow-gray-400'></div>
            </div>
          </div>
      </div>
    </>
  )
}
