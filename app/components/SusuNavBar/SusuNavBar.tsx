"use client";
import Link from 'next/link'
import React, { useState, useRef } from 'react'
import {useAuth} from "../../contexts/AuthContext";
import { useRouter } from 'next/navigation';
import waiting from '@/app/funcs/waiting';
import styles from "./SusuNavBar.module.css";
import "./SusuNavBar.css";

const SusuNavBar = () => {
    const router = useRouter();
    const {currentUser, logout}:any = useAuth();
    const [logoutMessage, setLogoutMessage] = useState<string>('');
    const [failedMessage, setFailedMessage] = useState<string>('');
    const isAuthenticated:string = currentUser;
    console.log("isAuthenticated=",Boolean(isAuthenticated));
    const errorRef = useRef(null);
    const successRef = useRef(null);
    const handleLogout = async ()=>{
        
        try{
            await logout();
            // @ts-ignore
            // successRef.current?.classList.add("scrollDown");
            router.push("/login");
            // @ts-ignore
            // successRef.current?.classList.remove("scrollDown");
            // // @ts-ignore
            // successRef.current?.classList.remove("scrollDown");
            // // @ts-ignore
            // successRef.current?.classList.remove("scrollUp");
        }catch{
            setFailedMessage("Failed to logout");
            // @ts-ignore
            errorRef.current?.classList.add("scrollDown");
            await waiting(10000);
            // @ts-ignore
            errorRef.current?.classList.add("scrollUp")
            await waiting(600);
            setFailedMessage("");
            // @ts-ignore
            errorRef.current?.classList.remove("scrollUp");
            // @ts-ignore
            errorRef.current?.classList.remove("scrollDown");
        }
    };
  return (
    <>
        <div className="navbar bg-base-100 fixed top-0 z-40">
            <div className="navbar-start">
                <div className="drawer inline">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <label htmlFor='my-drawer' className="btn btn-circle sm:btn-sm bg-base-100 swap swap-rotate">
  
                            {/* this hidden checkbox controls the state */}
                            <input type="checkbox" />
                            
                            {/* hamburger icon */}
                            <svg className="swap-off fill-current sm:h-6 sm:w-6" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/></svg>
                            
                            {/* close icon */}
                            <svg className="swap-on fill-current sm:h-6 sm:w-6" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/></svg>
                        
                        </label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-60 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <li><Link className='btn btn-ghost' href="/transactions/borrowers">Borrowers</Link></li>
                        <li><Link className='btn btn-ghost' href="/transactions/user-settings">User Settings</Link></li>
                        <li><Link className='btn btn-ghost' href="/transactions/system-settings">System Settings</Link></li>
                        <li><Link className='btn btn-ghost' href="/transactions">Make Transaction</Link></li>
                        <li>{/* Logout button */}
                {isAuthenticated && <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>}</li>
                        </ul>
                    </div>
                </div>
                {/* Home button */}
                {isAuthenticated && <Link href="/transactions" className="btn hidden sm:flex mr-[80%] btn-ghost sm:btm-nav-sm">Home</Link>} 
            </div>
                <div className='navbar-center'>
                    <h1 className="btn bg-transparent border-none shadow-none text-lg hover:bg-transparent active:scale-100 hover:cursor-default min-w-fit text-nowrap sm:text-sm">MSys Consult</h1>
                </div>
            <div className="navbar-end">

                {/* Logout button */}
                {isAuthenticated && <button className="btn btn-ghost sm:btm-nav-sm" onClick={handleLogout}>Logout</button>}
            <label className="swap swap-rotate">
                
                {/* this hidden checkbox controls the state */}
                <input type="checkbox" className="theme-controller" value="dark" />
                
                {/* sun icon */}
                <svg className="swap-off fill-current w-10 h-10 sm:w-6 sm:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                
                {/* moon icon */}
                <svg className="swap-on fill-current w-10 h-10 sm:w-6 sm:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
                
            </label>
            </div>
        </div>
        {/* <div className='fixed z-30 w-full flex flex-col items-center justify-center'>
            <div className='navbar'></div>
            {
                logoutMessage &&
                <div role="alert" ref={successRef} className="alert alert-success w-[95vw] -translate-y-[100%]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{logoutMessage}</span>
                </div>
            }
            {
                failedMessage &&
                <div role="alert" ref={errorRef} className={`alert alert-error w-[95vw] -translate-y-[100%]`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{failedMessage}</span>
                </div>
            }
        </div> */}
    </>
  )
}

export default SusuNavBar;