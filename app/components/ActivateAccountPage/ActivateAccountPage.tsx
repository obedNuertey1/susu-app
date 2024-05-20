"use client";
import React, { use, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import { Auth, getAuth, sendEmailVerification } from 'firebase/auth';
import { useImagesContext } from '@/app/contexts/ImagesContext';
import "./ActivateAccountPage.css";

function ActivateAccountPage({params, searchParams}: {params: {email: string}, searchParams?:{[key: string]:string|string[]|undefined},}) {
    const router = useRouter();
    const emailRegex:RegExp = /.+@.{2,10}\..+/i;
    const {email}:any = searchParams;
    
    const auth:Auth = getAuth();
    const currentUser:any = auth.currentUser
    

    const cardAnimeRef = useRef<HTMLDivElement>(null)
    
    // @ts-ignore
    const {onloggedIn}:any = useImagesContext();
    
    useEffect(()=>{
        try{
            if(!email || !emailRegex.test(email) || auth.currentUser?.emailVerified){
                router.push("/page-not-found");
                return;
            }
        }catch(e){
            console.log(e);
        }
        
        try{

            onloggedIn();
            if(cardAnimeRef.current?.classList.contains("popout")){
                cardAnimeRef.current?.classList.remove("popout");
            }
            cardAnimeRef.current?.classList.add("popup");
            sendEmailVerification(currentUser, {url: `${process.env.CONTINUE_URL}?email=${currentUser.email}`})
        }catch(e){
            console.log(e);
        }
        const cardAnimeRefVar = cardAnimeRef.current;
        return ()=>{
            cardAnimeRefVar?.classList.remove("popup");
            cardAnimeRefVar?.classList.remove("popout");
        }
    },[]);

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