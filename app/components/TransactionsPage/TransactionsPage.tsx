'use client';
import React, {useState, useEffect} from 'react'
import illustration_1 from "../../assets/Groupinfo-graph-1.svg"
import illustration_2 from "../../assets/Groupinfo-graph-2.svg"
import Image from 'next/image'
import styles from './transactions.module.css';
import './transactions.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPeopleGroup, faGears, faUserGear, faHandHoldingDollar, faMoneyBillTransfer, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import {useQuery} from 'react-query';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import waiting from '@/app/funcs/waiting';
import { IimageContext, useImagesContext } from '@/app/contexts/ImagesContext';
import { Auth, getAuth } from 'firebase/auth';

async function getData(key:any){
  try{
    await waiting(3000);
    const res = await fetch(`${process.env.NEXT_PUBLIC_REACT_SERVER_API}/borrowers/accountNumber/${key?.queryKey[0]}`);
    if(!res.ok){
      console.error("Network response was not ok");
      return;
    }

    const resData = await res.json();

  if(resData.hasOwnProperty("id") != true){
    return {verify: false};
  }else{
    return {verify: true};
  }
 
  }catch(e){
    console.error(e);
  }
}

export default function TransactionsPage() {
  const router = useRouter();
  const {currentUser}:any = useAuth();

  const auth:Auth = getAuth();
  const [accountNum, setAccountNum] = useState("");
  const {status, data} = useQuery([accountNum], getData);
  const {onloggedIn, getUser, getSystem}:any = useImagesContext();
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(()=>{
    try{
      if(!currentUser){
        return router.push("/login");
      }
    }catch(e){
      console.log(e);
    }
    onloggedIn();
    try{
      if(!auth.currentUser?.emailVerified){
        (async ()=>{
            await waiting(4000);
            setErrorMessage("Please verify your email - UserSettings/[resend mail]");
            await waiting(4000);
            setErrorMessage("");
        })();
      }
    }catch(e){
      console.log(e);
    }
    return ()=>{}
  }, []);
  // @ts-ignore
  const {systemName, systemImageUrl, userRole}:any = useImagesContext();
 
  const scaleDown = {
    transformOrigin: "50% 50%",
    transform: "scale(0.9)",
    opacity: 0
  }

  const showUpAnime = {
    animation: "showUp 0.5s ease-in 0s 1 forwards"
  }

  const moveDown = {
    transformOrigin: "50% 50%",
    transform: "scale(0.9) translateY(30px)",
    opacity: 0
  }


  const isAdmin = userRole?.toLowerCase() == 'admin';

  const buttons = ([
    <>
    {
      isAdmin
      &&
      <div key="system-settings" className='tooltip tooltip-top sm:tooltip-bottom' data-tip="system settings page">
      <Link href="/transactions/system-settings" className='btn btn-circle h-16 w-16 text-white bg-orangered rounded-full shadow-xl'>
        <div className='flex flex-col justify-center items-center origin-center scale-90'>
          <FontAwesomeIcon icon={faGears} className='w-7 h-7' />
          <span className={`${styles.smallText} font-semibold text-wrap line`}>System Settings</span>
        </div>
      </Link>
    </div>
    }
    </>
    ,
    <>
    {
      isAdmin
      &&
      <div key="all-transactions" className='tooltip tooltip-top sm:tooltip-bottom' data-tip="all transactions page">
      <Link href="/transactions/all-transactions" className='btn btn-circle h-16 w-16 text-white bg-orangered rounded-full shadow-xl'>
        <div className='flex flex-col justify-center items-center origin-center scale-90'>
          <FontAwesomeIcon icon={faMoneyBillTransfer} className='w-7 h-7' />
          <span className={`${styles.smallText} font-semibold text-wrap overfl`}>All<br/>Transacts</span>
        </div>
      </Link>
    </div>
    }
    </>
    ,
    <>
    {
      isAdmin
      &&
      <div key="all-users" className='tooltip tooltip-top sm:tooltip-bottom' data-tip="all transactions page">
      <Link href="/transactions/all-users" className='btn btn-circle h-16 w-16 text-white bg-orangered rounded-full shadow-xl'>
        <div className='flex flex-col justify-center items-center origin-center scale-90'>
          <FontAwesomeIcon icon={faUserFriends} className='w-7 h-7' />
          <span className={`${styles.smallText} font-semibold text-wrap overfl`}>All<br/>Users</span>
        </div>
      </Link>
    </div>
    }
    </>
    ,
    <div key="user-settings" className='tooltip tooltip-bottom' data-tip="user settings page" >
    <Link href="/transactions/user-settings" className='btn btn-circle h-16 w-16 text-white bg-orangered rounded-full shadow-xl'>
      <div className='flex flex-col justify-center items-center origin-center scale-90'>
        <FontAwesomeIcon icon={faUserGear} className='w-7 h-7' />
        <span className={`${styles.smallText} font-semibold text-wrap line`}> <span style={{display: "block"}}>User</span> Settings</span>
      </div>
    </Link>
  </div>,
  <div key="borrowers" className='tooltip tooltip-bottom' data-tip="borrowers page">
  <Link href="/transactions/borrowers" className='btn btn-circle h-16 w-16 text-white bg-orangered rounded-full shadow-xl'>
    <div className='flex flex-col justify-center items-center origin-center scale-90'>
      <FontAwesomeIcon icon={faHandHoldingDollar} className='w-7 h-7' />
      <span className={`${styles.smallText} font-semibold text-wrap line`}>Borrowers</span>
    </div>
  </Link>
</div>,
{/* <>
  {
    !isAdmin && 
    <div className='h-16 w-16 btn btn-circle opacity-0'></div>
  }
</>,
<>
  {
    !isAdmin && 
    <div className='h-16 w-16 btn btn-circle opacity-0'></div>
  }
</> */}
  ]).map((elem:any, i:number)=>{
    let animatedUp = {animation: `showUpButtons 0.3s ease-in ${0.3*i}s 1 forwards`};
    return (<div key={i} style={{...moveDown, ...animatedUp}}>{elem}</div>);
  })

  return (
    <>
    {
      errorMessage && 
      <>
        <div role="alert" className="alert alert-error fixed left-0 z-50 right-0 top-[0vh] w-[90vw] justify-self-center self-center gap-1 flex-row mx-auto prompt-anime">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{errorMessage}</span>
        </div>
      </>
      }
        <div className="hero min-h-screen bg-base-200 relative scroll-m-0 scroll-p-0">
        <Image src={illustration_1} alt="transaction illustration 1" className='sm:fixed w-1/4 right-2 stroke-base-100 fill-base-100' />
        <Image src={illustration_2} alt="transaction illustration 2" className='sm:fixed w-1/4 left-2 stroke-base-100 fill-base-100'/>
          <div className='flex flex-col gap-6 z-20'>
            <div className="hero-content flex-col lg:flex-row">
              <div className={`text-center lg:text-left`} style={{...scaleDown, ...showUpAnime}}>
                <div id='organisation-logo-name' className='w-full flex flex-col gap-0.5 justify-center items-center'>
                    <div id='organisation-logo'>
                      <div className="block w-24 h-24 rounded-full m-auto bg-transparent border-transparent border overflow-clip">
                        {!systemImageUrl && <FontAwesomeIcon icon={faPeopleGroup} className='w-1/2 h-1/2 text-lg text-color text-project-blue' />}
                          {systemImageUrl && <div className="w-full h-[100%] flex flex-col itmes-center justify-center"><Image src={`${systemImageUrl}`} alt="System Settings image" width="50" height="50" className='block m-auto w-2/3 h-2/3 ' unoptimized /></div>}
                      </div>
                    </div>
                    <div id='organisation-name' className='w-fit'>
                      {systemName && <>{systemName}</>}
                      {!systemName && <>Organization Name</>}
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
                    <input type="text" 
                    pattern='^\d+$' 
                    title="Text Space can only contain digits" 
                    placeholder="Enter account number" 
                    className="input input-bordered"
                    value={accountNum}
                    onChange={(e)=>{setAccountNum(e.target.value)}}
                    required />
                  </div>
                  <div className="form-control mt-6">
                    <Link role='button' href={`/transactions/[id]/?name=Obed+Nuertey&age=22&favorite=14`} as={`/transactions/${encodeURI(accountNum.trim())}`} className={`btn btn-primary ${(!(data?.verify === true)?"btn-disabled cursor-not-allowed":"")}`}>
                      {
                        (accountNum.length === 0)?"No Acc. No.":
                        (status === "loading" || status === "idle")
                        ?<>Verifying<span className="loading loading-dots loading-xs -ml-1"></span></>
                        :(status === "error")?"Error":
                        (data?.verify === true)?"Next":"Invalid Acc. No."
                      }
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className='card w-full max-w-screen-md flex flex-row gap-3 flex-wrap justify-center items-center sm:gap-7'>
              <div className={`${isAdmin?"w-[66%] flex-wrap": "w-full flex-nowrap" } sm:w-full flex flex-row justify-center items-center gap-x-3 gap-y-2 sm:gap-x-7 sm:gap-y-4`}>
                {buttons}
              </div>
            </div>
          </div>
      </div>
      </>
  )
}
