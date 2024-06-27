"use client";
import Link from 'next/link';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import businessIcon from "../../assets/business-deal-london-200-ico.svg";
import Image from 'next/image';
import blackAfroGirl from "../../assets/black-afro-girl.svg";
import blackGuyWhiteGirl from "../../assets/black-guy-and-white-girl.svg";
import styles from "./[id].module.css";
import waiting from '@/app/funcs/waiting';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import { useImagesContext } from '@/app/contexts/ImagesContext';
import { Auth, getAuth } from 'firebase/auth';

function TransactionsID({params, searchParams}: {params: {id: string}, searchParams?:{[key: string]:string|string[]|undefined},}) {
    const router = useRouter();
    const {currentUser}:any = useAuth();
    const auth:Auth = getAuth();
    const {id}:any = params;
    const [account, setAccount] = useState<string>(`${id}`);
    const [fullName, setFullName] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [agentUsername, setAgentUsername] = useState<string>("");
    const {onloggedIn}:any = useImagesContext();
    const cardAnimeRef = useRef<HTMLDivElement>(null)

    useEffect(()=>{
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
      onloggedIn();
      getFields();
      const cardAnimeVar = cardAnimeRef.current;
      return ()=>{
        cardAnimeVar?.classList.remove(`${styles.cardAnimeUp}`);
      }
    },[]);

    // obwan@gmail.com

    const getFields = async () => {
      try{
        const res = await Promise.all([fetch(`${process.env.NEXT_PUBLIC_REACT_SERVER_API}/borrowers/accountNumber/${id}`), fetch(`${process.env.NEXT_PUBLIC_REACT_SERVER_API}/users/email/${currentUser.email}`)]);
        if(!res[0].ok){console.error("Network busy"); return;}
        const data = await Promise.all([res[0].json(), res[1].json()]);
        console.log("_________data__________");
        console.log(data[0]);
        setFullName(data[0].fname);
        setPhoneNumber(data[0].phone);
        setAgentUsername(data[1].username);
      }catch(e){
        console.log(e);
      }
    }

    const handleSubmit = async(e:any)=>{
      e.preventDefault();
      if(amount == ""){
        setErrorMessage("Enter an amount")
        await waiting(4000)
        setErrorMessage('');
        return;
      }

      try{
        setIsLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_REACT_SERVER_API}/transactions`, {
          method: 'Post', 
          headers:{
            'Content-Type': "application/json",
          },
          body: JSON.stringify({
            "acctno": account,
            "amount": amount,
            "fn": fullName,
            "phone": phoneNumber,
            "username": agentUsername
          })
      }); 
        console.log(res);
        if(!res.ok){
          setErrorMessage("failed to make transaction");
          setIsLoading(false);
          await waiting(4000);
          setErrorMessage('');
          console.error("Transaction Failed");
          return;
        }
        if(res.ok){setErrorMessage(''); setSuccessMessage('Transaction Successful')}
        await waiting(4000);
        setIsLoading(false);
        cardAnimeRef.current?.classList.add(`${styles.cardAnimeUp}`);
        await waiting(500);
        setSuccessMessage('');
        router.push('/transactions');
      }catch(e){
        setErrorMessage("failed to make transaction");
        await waiting(4000);
        setErrorMessage("");
        setIsLoading(false);
        console.log(e);
      }

    }

    useLayoutEffect(()=>{
      try{
        if(!currentUser){
          return router.push("/login");
        }
      }catch(e){
        console.log(e);
      }
    },[]);

    try{
      if(!currentUser){
        return <></>
      }else{
        return (
          <>
            {
              errorMessage && 
              <>
                <div role="alert" className={`alert alert-error fixed left-0 z-50 right-0 top-[0vh] w-[90vw] justify-self-center self-center gap-1 mx-auto flex-row ${styles.promptAnime}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>{errorMessage}</span>
                </div>
              </>
              }
              {
                successMessage &&
                <>
                <div role="alert" className={`alert alert-success fixed left-0 z-50 right-0 top-[0vh] w-[90vw] justify-self-center self-center gap-1 mx-auto flex-row ${styles.promptAnime}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>{successMessage}</span>
                </div>
              </>
              }
            <div className='hidden sm:block sm:fixed sm:w-full sm:h-screen -z-50'>
              <Image src={blackAfroGirl} alt='black afro girl' className='w-1/4 absolute right-24 top-1/3 bottom-0'/>
              <Image src={blackGuyWhiteGirl} alt='black guy with white girl' className='w-2/5 left-2 top-1/3 bottom-0 absolute'/>
            </div>
            <div className='navbar'></div>
            {/* <div className='navbar sm:hidden max-md:flex'></div> */}
            {/* <div className={`flex flex-col justify-center items-center w-full h-[120%] sm:h-fit sm:-mb-[5%] md:mb-[0%] ${styles.scaleDown}`}> */}
            <div className={`relative flex flex-col justify-center items-center w-full max-sm:h-[100%] max-md:h-[110vh] mx-xl:h-[100%] gap-[2px] overflow-y-clip`}>
              <div className={`flex flex-col justify-center items-center w-full h-[100%] ${styles.cardAnimeDown}`} ref={cardAnimeRef}>
                  <div className='flex flex-col gap-1 justify-center items-center'>
                    <h1 className='block text-3xl font-extrabold'>Make A Transaction</h1>
                    <div className='w-30 h-30 rounded-full'>
                      <Image className='object-cover' src={businessIcon} alt='business image' />
                    </div>
                  </div>
                  {/* <div className="card  w-full max-w-sm shadow-2xl bg-base-100 sm:scale-90"> */}
                  <div className='card py-5  w-full max-w-sm sm:max-w-xl shadow-2xl bg-base-100 sm:scale-90'>
                        <form className="card-body" onSubmit={handleSubmit}>
                          <div className="form-control">
                            <label className="label" htmlFor='account-num'>
                              <span className="label-text">Acc No.</span>
                            </label>
                            <input type="text" id='account-num' name='account-num' value={account} pattern='\d+' title="Text Space can only contain digits" placeholder="Enter account number" className="input input-bordered" required />
                          </div>
                          <div className="form-control">
                            <label className="label" htmlFor='full-name'>
                              <span className="label-text">Full Name</span>
                            </label>
                            <input type="text" id='full-name' name='full-name' value={fullName} placeholder="Enter Full Name" className="input input-bordered" required />
                          </div>
                          <div className="form-control">
                            <label className="label" htmlFor='agent_username'>
                              <span className="label-text">Agent Username</span>
                            </label>
                            <input type="text" id='agent_username' name='agent_username' value={agentUsername} placeholder="Enter Agent Username" className="input input-bordered" required />
                          </div>
                          <div className="form-control">
                            <label className="label" htmlFor='phone-num'>
                              <span className="label-text">Phone Number</span>
                            </label>
                            <input type="tel" id='phone-num' value={phoneNumber} name='phone-num' title='Please Enter a Phone Number' pattern='^[0|\+233](2[0|3|4|5|6|7|8]|5[0|3|4|5|7|9])\d{7}$' placeholder="Enter Phone Number" className="input input-bordered" required />
                          </div>
                          <div className='form-control'>
                            <label className="label" htmlFor='amount-text'>
                              <span className="label-text" id='amount-text'>Enter an Amount</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-2" htmlFor='amount-figures'>
                              GH₵
                              <input type="number" value={amount} 
                              onChange={(e)=>{
                                setAmount(e.target.value);
                              }} 
                              step={0.01} min={1} className="grow" placeholder="money" id='amount-figures' />
                            </label>
                          </div>
                          <div className="form-control mt-6">
                            <button type='submit' {...(isLoading?{disabled: true}:{disabled: false})} className="btn btn-primary">Save</button>
                          </div>
                          <div className="form-control mt-2">
                              {/* <Link role='link' href={"/transactions"} className="btn btn-error">Cancel</Link> */}
                              <span
                              onClick={async ()=>{
                                cardAnimeRef.current?.classList.add(`${styles.cardAnimeUp}`);
                                await waiting(500);
                                router.push("/transactions");
                              }} 
                               role='link'  className="btn btn-error">Cancel</span>
                          </div>
                        </form>
                  </div>
              </div>
            </div>
            {/* lg:h-screen lg:mb-4 mb-4 md:mb-0 */}
            {/* <div className="nav opacity-0 lg:block"></div> */}
          </>
        )
      }
    }catch(e){
      console.log(e);
    }
}

export default TransactionsID;