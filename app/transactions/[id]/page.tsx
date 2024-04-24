"use client";
import Link from 'next/link';
import React from 'react';
import businessIcon from "../../assets/business-deal-london-200-ico.svg";
import Image from 'next/image';
import blackAfroGirl from "../../assets/black-afro-girl.svg";
import blackGuyWhiteGirl from "../../assets/black-guy-and-white-girl.svg";
import styles from "./[id].module.css"

function MakeTransaction({params, searchParams}: {params: {slug: string}, searchParams?:{[key: string]:string|string[]|undefined},}) {
    const {id}:any = params;
    console.log("searchParams");
    console.log(searchParams)
  return (
    <>
      <div className='hidden sm:block sm:fixed sm:w-full sm:h-screen'>
        <Image src={blackAfroGirl} alt='black afro girl' className='w-80 absolute right-24 top-auto bottom-auto'/>
        <Image src={blackGuyWhiteGirl} alt='black guy with white girl' className='w-2/5 left-2 top-0 bottom-0 absolute'/>
      </div>
      <div className={`flex flex-col justify-center items-center w-full h-screen  lg:h-screen lg:mt-24 lg:mb-4 mt-16 md:mt-0 mb-4 md:mb-0 ${styles.scaleDown}`}>
          <div className='flex flex-col gap-1 justify-center items-center'>
            <h1 className='block text-3xl font-extrabold'>Make A Transaction</h1>
            <div className='w-30 h-30 rounded-full'>
              <Image className='object-cover' src={businessIcon} alt='business image' />
            </div>
          </div>
          <div className="card  w-full max-w-sm shadow-2xl bg-base-100 sm:scale-90">
                <form className="card-body">
                  <div className="form-control">
                    <label className="label" htmlFor='account-num'>
                      <span className="label-text">Acc No.</span>
                    </label>
                    <input type="text" id='account-num' name='account-num' pattern='\d+' title="Text Space can only contain digits" placeholder="Enter account number" className="input input-bordered" required />
                  </div>
                  <div className="form-control">
                    <label className="label" htmlFor='full-name'>
                      <span className="label-text">Full Name</span>
                    </label>
                    <input type="text" id='full-name' name='full-name' placeholder="Enter Full Name" className="input input-bordered" required />
                  </div>
                  <div className="form-control">
                    <label className="label" htmlFor='phone-num'>
                      <span className="label-text">Phone Number</span>
                    </label>
                    <input type="text" id='phone-num' name='phone-num' title='Please Enter a Phone Number' pattern='^[0|\+233](2[0|3|4|5|6|7|8]|5[0|3|4|5|7|9])\d{7}$' placeholder="Enter Phone Number" className="input input-bordered" required />
                  </div>
                  <div className='form-control'>
                    <label className="label" htmlFor='amount-text'>
                      <span className="label-text" id='amount-text'>Enter an Amount</span>
                    </label>
                    <label className="input input-bordered flex items-center gap-2" htmlFor='amount-figures'>
                      GH₵
                      <input type="number" step={0.01} min={1} className="grow" placeholder="money" id='amount-figures' />
                    </label>
                  </div>
                  <div className="form-control mt-6">
                    <button type='submit' className="btn btn-primary">Save</button>
                  </div>
                  <div className="form-control mt-2">
                      <Link role='link' href={"/transactions"} className="btn btn-error">Cancel</Link>
                  </div>
                </form>
            </div>
      </div>
    </>
  )
}

export default MakeTransaction