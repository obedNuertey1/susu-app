import React from 'react'
import LoginAvatar from '../components/LoginAvatar/LoginAvatar'
import illustration_1 from "../assets/Groupinfo-graph-1.svg"
import illustration_2 from "../assets/Groupinfo-graph-2.svg"
import Image from 'next/image'
import styles from './transactions.module.css';
import './transactions.css'
import {Animated} from "react-animated-css";
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faPeopleGroup, faGears, faUserGear, faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';

// import { Lato } from 'next/font/google'

// const lato = Lato({ subsets: ['latin'], weight: ["700"], style: ["normal"] });

export default function Transactions() {

  const scaleDown = {
    transformOrigin: "50% 50%",
    transform: "scale(0.9)",
    opacity: 0
  }

  const showUpAnime = {
    animation: "showUp 0.5s ease-in 0s 1 forwards"
  }

  return (
    <>
        <div className="hero min-h-screen bg-base-200 relative scroll-m-0 scroll-p-0">
        <Image src={illustration_1} alt="transaction illustration 1" className='sm:absolute w-1/4 right-2 stroke-base-100 fill-base-100' />
        <Image src={illustration_2} alt="transaction illustration 2" className='sm:absolute w-1/4 left-2 stroke-base-100 fill-base-100'/>
          <div className='flex flex-col gap-6 z-20'>
            <div className="hero-content flex-col lg:flex-row">
              <div className={`text-center lg:text-left`} style={{...scaleDown, ...showUpAnime}}>
                <div id='organisation-logo-name' className='w-full flex flex-col gap-0.5 justify-center items-center'>
                    <div id='organisation-logo'>
                      <div className="block avatar w-20 h-20 rounded-full m-auto bg-base-100 border-project-blue border">
                        {/* <Image
                            src={loginSvg}
                            alt="Description of the image"
                            className='w-20 fill-base-100'
                        /> */}
                        <FontAwesomeIcon icon={faPeopleGroup} className='w-20 h-20 text-lg text-color text-project-blue' />
                      </div>
                    </div>
                    <div id='organisation-name' className='w-fit'>
                      Organization Name
                    </div>
                </div>
                <h1 className="text-4xl font-bold sm:text-5xl">Transaction</h1>
              </div>
              <div className="card  w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Acc No.</span>
                    </label>
                    <input type="text" pattern='\d+' title="Text Space can only contain digits" placeholder="Enter account number" className="input input-bordered" required />
                  </div>
                  <div className="form-control mt-6">
                    <Link role='button' href="/transactions/[id]/?name=Obed+Nuertey&age=22&favorite=14" as={"/transactions/1234/?name=Obed+Nuertey&age=22&favorite=14"} className="btn btn-primary">Next</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className='card w-full max-w-screen-md flex flex-row gap-3 flex-wrap justify-center items-center sm:gap-7'>
              <div className='tooltip tooltip-bottom' data-tip="system settings page">
                <Link href="/transactions/system-settings" className='btn btn-circle h-16 w-16 text-white bg-orangered rounded-full shadow-xl'>
                  <div className='flex flex-col justify-center items-center origin-center scale-90'>
                    <FontAwesomeIcon icon={faGears} className='w-7 h-7' />
                    <span className={`${styles.smallText} font-semibold text-wrap line`}>System Settings</span>
                  </div>
                </Link>
              </div>
              <div className='tooltip tooltip-bottom' data-tip="user settings page" >
                <Link href="/transactions/user-settings" className='btn btn-circle h-16 w-16 text-white bg-orangered rounded-full shadow-xl'>
                  <div className='flex flex-col justify-center items-center origin-center scale-90'>
                    <FontAwesomeIcon icon={faUserGear} className='w-7 h-7' />
                    <span className={`${styles.smallText} font-semibold text-wrap line`}> <span style={{display: "block"}}>User</span> Settings</span>
                  </div>
                </Link>
              </div>
              <div className='tooltip tooltip-bottom' data-tip="borrowers page">
                <Link href="/transactions/borrowers" className='btn btn-circle h-16 w-16 text-white bg-orangered rounded-full shadow-xl'>
                  <div className='flex flex-col justify-center items-center origin-center scale-90'>
                    <FontAwesomeIcon icon={faHandHoldingDollar} className='w-7 h-7' />
                    <span className={`${styles.smallText} font-semibold text-wrap line`}>Borrowers</span>
                  </div>
                </Link>
              </div>
              {/* <div className='w-16 h-16 bg-gray-700 rounded-full shadow-lg shadow-gray-400'></div>
              <div className='w-16 h-16 bg-gray-700 rounded-full shadow-lg shadow-gray-400'></div>
              <div className='w-16 h-16 bg-gray-700 rounded-full shadow-lg shadow-gray-400'></div> */}
            </div>
          </div>
      </div>
    </>
  )
}
