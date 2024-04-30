import { faGears, faMailReply, faUserGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import styles from "./user-settings.module.css";
import girlEngineer from "../../assets/Groupengineering-girl.svg"
import Image from 'next/image';

export default function UserSettingsPage() {
  return (
    <>
      <div className='hidden sm:block sm:fixed sm:w-full sm:h-screen'>
        <Image src={girlEngineer} alt='black afro girl' className='w-80 absolute right-4 lg:right-24 top-1/3 bottom-0'/>
        <Image src={girlEngineer} alt='black guy with white girl' className='w-80 left-4 lg:left-24 top-1/3 bottom-0 absolute transfrom scale-x-[-1]'/>
      </div>
      <div className='navbar'></div>
      <div className='navbar hidden lg:block'></div>
      <div className={`relative flex flex-col justify-center items-center w-full h-screen gap-2  lg:h-screen lg:mb-4 mb-4 md:mb-0 ${styles.scaleDown}`}>
        <div className={`absolute top-5 top- md:top-20 md:left-4 flex flex-row justify-between w-full px-5 ${styles.top}`}>
            <Link href="/transactions" className='shadow-lg h-16 w-16 bg-orangered text-white rounded-full self-start justify-self-start flex flex-col justify-center items-center hover:contrast-75 active:scale-95'>
                <FontAwesomeIcon icon={faMailReply} className='w-5 h-5' />
                <span className='text-xs font-semibold truncate'>Go Back</span>
            </Link>
            <div className='h-16 w-16'></div>
            <div className='h-16 w-16'></div>
        </div>
        <div className='flex flex-col gap-1 justify-center items-center'>
            <h1 className='block text-3xl font-extrabold'>User Settings</h1>
            <div className='w-30 h-30 rounded-full p-3 shadow-md'>
              <FontAwesomeIcon className='object-cover text-inherit w-14 h-14' icon={faUserGear} />
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
