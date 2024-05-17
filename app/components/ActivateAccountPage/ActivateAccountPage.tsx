"use client";
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import { Auth, getAuth, sendEmailVerification } from 'firebase/auth';
import { useImagesContext } from '@/app/contexts/ImagesContext';
import "./ActivateAccountPage.css";

function ActivateAccountPage({params, searchParams}: {params: {email: string}, searchParams?:{[key: string]:string|string[]|undefined},}) {
    const auth:Auth = getAuth();
    const currentUser:any = auth.currentUser
    const router = useRouter();
    const {email}:any = searchParams;
    const emailRegex:RegExp = /.+@.{2,10}\..+/i;
    try{
        if(!email || !emailRegex.test(email) || auth.currentUser?.emailVerified){
            return router.push("/page-not-found");
        }
    }catch(e){
        console.log(e);
    }

    const cardAnimeRef = useRef<HTMLDivElement>(null)

    // @ts-ignore
    const {onloggedIn}:any = useImagesContext();

    useEffect(()=>{
        try{
        onloggedIn();
        if(cardAnimeRef.current?.classList.contains("popout")){
            cardAnimeRef.current?.classList.remove("popout");
        }
        cardAnimeRef.current?.classList.add("popup");
            sendEmailVerification(currentUser, {url: `http://localhost:3000/transactions?email=${currentUser.email}`})
        }catch(e){
            console.log(e);
        }
        return ()=>{
            cardAnimeRef.current?.classList.remove("popup");
            cardAnimeRef.current?.classList.remove("popout");
        }
    },[])
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='max-w-sm m-auto w-10/12 items-center justify-center flex flex-col'>
                <div className="card card-bordered card-normal shadow-lg rounded-lg p-4 font-bolder original-state" ref={cardAnimeRef}>
                    <div className="card-title"><h1 className='text-center w-full text-error text-3xl'>Activate your account!</h1></div>
                    <div className="card-body">
                    <p className='text-center'>You need to activate your account. An email has been sent to <span className='text-primary italic'>{email}</span>. Visit your email to activate your account and continue</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActivateAccountPage