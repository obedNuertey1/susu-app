"use client";
import { faGears, faMailReply, faUserGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { LegacyRef, useEffect, useRef, useState } from 'react'
import styles from "./user-settings.module.css";
import girlEngineer from "../../assets/Groupengineering-girl.svg"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import waiting from '@/app/funcs/waiting';
import InputField, { passwordMatchType } from '../InputField/InputField';
import { warnTextType, warnColorType } from '../InputField/InputField';
import checkPasswordStrength from '@/app/funcs/checkPasswordStrength';
import {deleteUser, getAuth, updatePassword, reauthenticateWithCredential, AuthCredential, sendEmailVerification, Auth} from "firebase/auth";
import { useRedirectContext } from '@/app/contexts/RedirectContext';
import {SHA256} from 'crypto-js';
import generateRandomText from '@/app/funcs/generateRandomText';
import { useImagesContext } from '@/app/contexts/ImagesContext';
import { getDownloadURL, deleteObject } from 'firebase/storage';
import { EmailAuthProvider } from 'firebase/auth';


export default function UserSettingsPage() {
  const router = useRouter();
  const {currentUser, signup, logout}:any = useAuth();

  const auth:Auth = getAuth();

  const {setRedirectHashId, redirectHashId}:any = useRedirectContext();

  const promptForCredential = (userEmail:string, userPassword:string) =>{
    const credential = EmailAuthProvider.credential(userEmail, userPassword);
    return credential;
  }

  const [userid, setUserId] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address1, setAddress1] = useState<string>("");
  const [address2, setAddress2] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [zip, setZip] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [imageSrc, setImageSrc] = useState(null);

  const [password, setPassword] = useState<string>("");
  const [passwordWarnText, setPasswordWarnText] = useState<string>("");
  const [passwordWarnColor, setPasswordWarnColor] = useState<warnColorType>("");
  const passwordRef = useRef(null);

  const [password2, setPassword2] = useState<string>("");
  const [password2WarnText, setPassword2WarnText] = useState<string>("");
  const [password2WarnColor, setPassword2WarnColor] = useState<warnColorType>("");
  const password2Ref = useRef(null);
  const passwordModalRef = useRef<HTMLDialogElement>(null);
  
  const oldPasswordRef = useRef(null);
  const [oldPassword, setOldPassword] = useState<string>("");



  
  const [emailState, setEmailState] = useState<string>("");

  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState<boolean>(true);
  const [randomText, setRandomText] = useState<string>("");
  const [deleteInput, setDeleteInput] = useState<string>("");
  const deleteInputRef = useRef<HTMLInputElement>(null);
  const randomTextRef = useRef<HTMLSpanElement>(null);
  const deleteDialogueRef = useRef<HTMLDialogElement>(null);

  const [changeButtonDisabled, setChangeButtonDisabled] = useState<boolean>(false);

  const [addImage, setAddImage] = useState<Blob | Uint8Array | ArrayBuffer>();

  const [deletePasswordInput, setDeletePasswordInput] = useState<string>("");
  const deletePasswordRef = useRef(null);
  const cardAnimeRef = useRef<HTMLDivElement>(null);

    // @ts-ignore
    const {onloggedOut, uploadFile, userImageUrl, userImageRef, onloggedIn}:any = useImagesContext();
    

    const handleSendVerificationMail = async (e:any)=>{
      try{
        e.preventDefault();
        await sendEmailVerification(currentUser, {url: `http://localhost:3000/transactions?email=${currentUser.email}`});
        setSuccessMessage(`An verification mail has been sent to ${currentUser.email}`);
        await waiting(4000);
        setSuccessMessage("");
      }catch(x){
        console.log(x);
        setErrorMessage("Failed to send email verification mail😥");
        await waiting(4000);
        setErrorMessage("");
      }
    }

  useEffect(()=>{
    try{
      if(!currentUser){ // Go to login page if user has not logged in.
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
            setErrorMessage("Please verify your email - UserSettings/resend mail");
            await waiting(4000);
            setErrorMessage("");
        })();
      }
    }catch(e){
      console.log(e);
    }
    (async ()=>{
      try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_REACT_SERVER_API}/users/email/${currentUser.email}`);
        if(!res.ok){console.error("Couldn't get user data"); return;}
        const data:any = await res.json();
        setPhone(data.phone);
        setAddress1(data.addr1);
        setAddress2(data.addr2);
        setCountry(data.country);
        setState(data.state);
        setZip(data.zip);
        setCity(data.city);
        setUserId(data.userid);
        setImage(data.image);
      }catch(e){
        console.log(e);
      }
    })();

    const cardAnimeRefVar = cardAnimeRef.current;
    return ()=>{
      cardAnimeRefVar?.classList.remove(`${styles.cardAnimeUp}`);
    }
  },[])

    // @ts-ignore
    useEffect(()=>{
      (async ()=>{ // For first password field
        
        function passCheckTextAndColor(str:warnColorType, password:warnTextType):void{
          // @ts-ignore
          passwordRef.current.showWarn();
          setPasswordWarnText(checkPasswordStrength(password));
          setPasswordWarnColor(str);
        }
        
        switch(checkPasswordStrength(password)){
          case 'Very Weak':
            // @ts-ignore
            passCheckTextAndColor('text-red-600', password);
            break;
          case 'Weak':
            // @ts-ignore
            passCheckTextAndColor('text-red-400', password);
            break;
          case 'Moderate':
            // @ts-ignore
            passCheckTextAndColor('text-cyan-600', password);
            break;
          case 'Strong':
            // @ts-ignore
            passCheckTextAndColor('text-yellow-500', password);
            break;
          case 'Very Strong':
            // @ts-ignore
            passCheckTextAndColor('text-green-500', password);
            break;
          default:
            passCheckTextAndColor("", "");
        }
        if(password.length < 1){
          // @ts-ignore
          passwordRef?.current?.hideWarn();
  
        }
      })();
  
      (async ()=>{ // For password2 field
    
        function correctPassTextAndColor(str:warnColorType, word:passwordMatchType):void{
          // @ts-ignore
          password2Ref.current.showWarn();
          setPassword2WarnText(word);
          setPassword2WarnColor(str);
        }
        
        if(password2.length > 1){
          if(password2 !== password){
            correctPassTextAndColor("text-red-600", "Password don't Match");
          }else if(password2 === password){
            correctPassTextAndColor("text-green-500", "Password Matches");
          }else{
            correctPassTextAndColor("", "");
          }
        }else if(password2.length === 0){
          // @ts-ignore
          password2Ref.current?.hideWarn();
        }
  
      })();
    }, [password2, password])

  const handleSubmit = async(e:any)=>{
    e.preventDefault();
    setIsLoading(true);
    try{
      // @ts-ignore
      if(addImage){
        await uploadFile(userImageRef, addImage).then(async(snapshot:any)=>{
          console.log('Uploaded a blob or file!');
          console.log(snapshot);
        }).catch((e:any)=>{
          (async ()=>{
            setErrorMessage(`Failed to update info else block ${e}`)
            await waiting(4000);
            setErrorMessage('');
            setIsLoading(false);
            throw new Error("Failed to send image");
          })();
        })
        await getDownloadURL(userImageRef).then(async (url)=>{
  
          const res1 = await fetch(`${process.env.NEXT_PUBLIC_REACT_SERVER_API}/users/email/${currentUser.email}`)
          if(!res1.ok){
            setErrorMessage("Failed to update");
            await waiting(4000);
            setErrorMessage("");
            setIsLoading(false);
            return;
          }
          const res1Data = await res1.json();
          console.log("res1Data.userid");
          console.log(res1Data.userid);
          const res = await fetch(`${process.env.NEXT_PUBLIC_REACT_SERVER_API}/users/${res1Data.userid}`, {
            method: "PATCH",
            headers: {
              'Content-Type': "application/json"
            },
            body:JSON.stringify({
              phone,
              addr1: address1,
              addr2: address2,
              country: country,
              state: state,
              zip: zip,
              city: city,
              image: url.toString()
            })
          });
          if(!res.ok){
            setErrorMessage("Failed to update");
            await waiting(4000);
            setErrorMessage("");
            setIsLoading(false);
            return;
          }
          setSuccessMessage("Updated Successfully");
          await waiting(4000);
          setIsLoading(false);
          setSuccessMessage("");
          cardAnimeRef.current?.classList.add(`${styles.cardAnimeUp}`)
          await waiting(1000);
          router.push("/transactions");
        })
        return;
      }


      const res1 = await fetch(`${process.env.NEXT_PUBLIC_REACT_SERVER_API}/users/email/${currentUser.email}`)
      if(!res1.ok){
        setErrorMessage("Failed to update");
        await waiting(4000);
        setErrorMessage("");
        setIsLoading(false);
        return;
      }
      const res1Data = await res1.json();
      console.log("res1Data.userid");
      console.log(res1Data.userid);
      const res = await fetch(`${process.env.NEXT_PUBLIC_REACT_SERVER_API}/users/${res1Data.userid}`, {
        method: "PATCH",
        headers: {
          'Content-Type': "application/json"
        },
        body:JSON.stringify({
          phone,
          addr1: address1,
          addr2: address2,
          country: country,
          state: state,
          zip: zip,
          city: city
        })
      });
      if(!res.ok){
        setErrorMessage("Failed to update");
        await waiting(4000);
        setErrorMessage("");
        setIsLoading(false);
        return;
      }
      setSuccessMessage("Updated Successfully");
      await waiting(4000);
      setIsLoading(false);
      setSuccessMessage("");
      cardAnimeRef.current?.classList.add(`${styles.cardAnimeUp}`)
      await waiting(1000);
      router.push("/transactions");

    }catch(e){
      setErrorMessage('Failed to update info')
      await waiting(4000);
      setErrorMessage('');
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e:any)=>{
    e.preventDefault();

    
    if(password !== password2){
      setPassword(''); setPassword2(''); setOldPassword('');
      passwordModalRef?.current?.close();
      setErrorMessage("Passwords don't match");
      await waiting(4000);
      setErrorMessage("");
      return;
    }
    
    if(password == "" || password2 == ""){
      passwordModalRef?.current?.close();
      return
    }
    if(password.length < 5 || password2.length < 5){
      setPassword(''); setPassword2(''); setOldPassword('');
      passwordModalRef?.current?.close();
      setErrorMessage("Password is too short");
      await waiting(4000);
      setErrorMessage("");
      return;
    }

    if(oldPassword.length === 0){
      setPassword(''); setPassword2('');
      passwordModalRef?.current?.close();
      setErrorMessage("Enter your old password");
      await waiting(4000);
      setErrorMessage("");
      return;
    }
    // ### Algorithm ####
    try{
      // store current user email in a emailState
      setChangeButtonDisabled(true);
      setEmailState(currentUser.email);
      await reauthenticateWithCredential(currentUser, promptForCredential(currentUser.email, oldPassword)).then(async ()=>{

        // delete current user from firebase
        console.log("emailState=",emailState);
        await updatePassword(currentUser, password).then(async (value:any)=>{
          const res = await fetch(`${process.env.NEXT_PUBLIC_REACT_SERVER_API}/users/email`, {
            method: 'PUT',
            headers: {
              'Content-Type': "application/json"
            },
            body:JSON.stringify({
              email: emailState,
              password: password
            })
          })
          if(!res.ok){
            passwordModalRef?.current?.close();
            setErrorMessage("Failed To Update Password Server");
            await waiting(4000);
            setErrorMessage("");
            setEmailState(''); setPassword(''); setPassword2('');
            return;
          }
          const emailHash:string = SHA256(emailState).toString();
          setRedirectHashId(emailHash);
          // clear state fields
          setEmailState(''); setPassword(''); setPassword2('');
          // close modal
          passwordModalRef?.current?.close();
          setSuccessMessage("Password Updated: You'll be redirected to login again");
          await waiting(4000);
          cardAnimeRef.current?.classList.add(`${styles.cardAnimeUp}`)
          await waiting(1000);
          // move to relogin page
          router.push(`/relogin?usingEmail=true&hashInfo=${emailHash}`);
        }).catch(async ()=>{
          passwordModalRef?.current?.close();
          setErrorMessage("Failed To Update Password - you need to login again to update password");
          setEmailState(''); setPassword(''); setPassword2('');
          await waiting(4000);
          setErrorMessage("");
          await waiting(1000);
          await onloggedOut();
          await logout();
        });
      })
      setChangeButtonDisabled(false);
    }catch{
      passwordModalRef?.current?.close();
      setErrorMessage("Failed To Update Password");
      setEmailState(''); setPassword(''); setPassword2('');
      await waiting(4000);
      setErrorMessage("");
      setChangeButtonDisabled(false);
    }
  }
  
  useEffect(()=>{//For delete input effects
    try{
        if(deleteInput === randomText && deletePasswordInput.length >= 1){
          deleteInputRef.current?.classList.remove("text-gray-900");
          deleteInputRef.current?.classList.add("text-error");
          randomTextRef.current?.classList.remove("text-gray-900");
          randomTextRef.current?.classList.add("text-error");
          setDeleteButtonDisabled(false);
        }else{
          setDeleteButtonDisabled(true);
          if(!deleteInputRef.current?.classList.contains("text-gray-900")){
            deleteInputRef.current?.classList.add("text-gray-900");
          }
          if(!randomTextRef.current?.classList.contains("text-gray-900")){
            randomTextRef.current?.classList.add("text-gray-900");
          }
        }
    }catch(e){
      console.error(e)
    }

    return ()=>{}
  },[deleteInput, deletePasswordInput]);

  const handleDeleteAcc = async (e:any) => {
    e.preventDefault();
    if(!(deleteInput === randomText)){
      setErrorMessage("Failed to delete account");
      deleteDialogueRef.current?.close();
      await waiting(4000);
      setErrorMessage("");
      setDeleteInput('');
      return;
    }

    try{
      setDeleteButtonDisabled(true);
      if(`${image}`.startsWith(`${process.env.NEXT_PUBLIC_STORAGE_SERVICE_URL}`)){
        await deleteObject(userImageRef);
      }
      await reauthenticateWithCredential(currentUser, promptForCredential(currentUser.email, deletePasswordInput)).then(async ()=>{

        const res = await fetch(`${process.env.NEXT_PUBLIC_REACT_SERVER_API}/users/email/${currentUser.email}`, {method: 'DELETE'});
        if(!res.ok){
          setErrorMessage("Failed to delete account");
          deleteDialogueRef.current?.close();
          await waiting(4000);
          setErrorMessage("");
          setDeleteInput('');
          return;
        }
        const auth = getAuth();
        const user:any = auth?.currentUser;
        // @ts-ignore
        deleteUser(user).then(()=>{
          (async()=>{
            setSuccessMessage("You've deleted your account succesfully");
            deleteDialogueRef.current?.close();
            await waiting(4000);
            setSuccessMessage('');
            setDeleteInput('');
            router.push("/login");
            return;
          })();
        }).catch(()=>{
          (async ()=>{
            setErrorMessage(`You will need to login again to delete account`);
            setDeleteInput('');
            deleteDialogueRef.current?.close();
            await waiting(4000);
            setErrorMessage("");
            await onloggedOut();
            await logout();
            router.push("/login");
            return;
          })();
        })
      })
      setDeleteButtonDisabled(false);
    }catch{
      setErrorMessage("Failed to delete account");
      setDeleteInput('');
      deleteDialogueRef.current?.close();
      await waiting(4000);
      setErrorMessage("");
      setDeleteButtonDisabled(false);
    }
  };

  return (
    <>
        {
            successMessage &&
            <div role="alert" className={`alert alert-success fixed left-0 z-50 right-0 top-[0vh] w-[90vw] justify-self-center self-center gap-1 mx-auto flex-row ${styles.promptAnime}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{successMessage}</span>
            </div>
        }
        {
            errorMessage &&
            <div role="alert" className={`alert alert-error fixed left-0 z-50 right-0 top-[0vh] w-[90vw] justify-self-center self-center gap-1 flex-row mx-auto ${styles.promptAnime}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{errorMessage}</span>
            </div>
        }
      <div className='hidden sm:block sm:fixed sm:w-full sm:h-screen -z-40'>
        <Image src={girlEngineer} alt='black afro girl' className='w-80 absolute right-4 lg:right-24 top-1/3 bottom-0'/>
        <Image src={girlEngineer} alt='black guy with white girl' className='w-80 left-4 lg:left-24 top-1/3 bottom-0 absolute transfrom scale-x-[-1]'/>
      </div>
      <div className={`navbar hidden ${styles.pushUp}`}></div>
      <div className='navbar lg:hidden xl:block'></div>
      <div className={`relative flex flex-col justify-center items-center w-full h-[100%] sm:h-[60%] gap-[2px] overflow-y-clip`}>
          <div className={`card py-5  w-full max-w-sm sm:max-w-xl shadow-2xl bg-base-100 sm:scale-90 ${styles.cardAnimeDown}`} ref={cardAnimeRef}>
            <div className='flex card-title flex-col gap-1 justify-center items-center'>
                <h1 className='block text-3xl font-extrabold'>User Settings</h1>
                <div className='w-40 h-40 rounded-full  shadow-md overflow-clip flex flex-row items-center justify-center'>
                  {/* {(userImageUrl.length > 40) && <Image src={`${userImageUrl}`} alt="System Settings image" width="50" height="50" className='object-cover object-center w-full h-full rounded-full' unoptimized />}
                  {!(userImageUrl.length > 40) && <FontAwesomeIcon className='object-cover m-3 text-inherit w-2/3 h-2/3' icon={faUserGear} />} */}
                {
                    (imageSrc)?<div className='w-full h-[100%] flex flex-col itmes-center justify-center'>
                    <Image src={imageSrc} alt={`User image`} width="50" height="50" className='object-cover object-center w-full h-full rounded-full' unoptimized />
                  </div>:(`${userImageUrl}`.startsWith(`${process.env.NEXT_PUBLIC_STORAGE_SERVICE_URL}`))?<div className='w-full h-[100%] flex flex-col itmes-center justify-center'>
                    <Image src={`${userImageUrl}`} alt={`User image`} width="50" height="50" className='object-cover object-center w-full h-full rounded-full' unoptimized />
                  </div>:<FontAwesomeIcon className='object-cover m-3 text-inherit w-2/3 h-2/3' icon={faUserGear} />
                  }

                </div>
              </div>
                <form className="card-body">
                  <div className="divider">Contact & Address</div>
                      {/* Contact & Address */}
                    <div className="form-control">
                      <label className="label" htmlFor='phone'>
                        <span className="label-text">Phone:</span>
                      </label>
                      {/* @ts-ignore */}
                      <input type="tel" id='phone' name='phone' value={phone} onChange={(e)=>{
                        setPhone(e.target.value)
                      }} placeholder="Enter your new phone number" className="input input-bordered"  />
                    </div>
                    <div className="form-control">
                      <label className="label" htmlFor='address1'>
                        <span className="label-text">Address1:</span>
                      </label>
                      <input type="text" id='address1' value={address1} onChange={(e)=>{setAddress1(e.target.value)}} name='address1' placeholder="Enter your first address" className="input input-bordered"  />
                    </div>
                    <div className="form-control">
                      <label className="label" htmlFor='address2'>
                        <span className="label-text">Address2:</span>
                      </label>
                      <input type="text" id='address2' name='address2' value={address2} onChange={(e)=>{setAddress2(e.target.value)}} title='Please Enter Second address' pattern='^[0|\+233](2[0|3|4|5|6|7|8]|5[0|3|4|5|7|9])\d{7}$' placeholder="Enter Phone Number" className="input input-bordered"  />
                    </div>
                    <div className="divider">Add Photo</div>
                    <div className="form-control">
                      <label className="label" htmlFor='image'>
                        <span className="label-text">Image:</span>
                      </label>
                      {/* @ts-ignore */}
                      <input type="file" name='image' id='image' onChange={(e)=>{
                        // @ts-ignore
                        const file = e.target.files[0];
                        if(file){
                          const reader:any = new FileReader();
                          reader.onload = (e:any)=>{
                            // @ts-ignore
                            setImageSrc(e.target.result);
                          };
                          reader.readAsDataURL(file);
                        }
                        // @ts-ignore
                        setAddImage(e.target.files[0])
                      }} className="file-input file-input-bordered w-full max-w-full" />
                    </div>
                    {/* Contact & Address */}
                  <div className="divider">Country Info</div>
                    {/* Country Info */}
                    <div className="form-control">
                      <label className="label" htmlFor='country'>
                        <span className="label-text">Country:</span>
                      </label>
                      <input type="text" id='country' name='country' value={country} onChange={(e)=>{setCountry(e.target.value)}} placeholder="Enter your Country" className="input input-bordered"  />
                    </div>
                    <div className="form-control">
                      <label className="label" htmlFor='state'>
                        <span className="label-text">State:</span>
                      </label>
                      <input type="text" id='state' value={state} onChange={(e)=>{setState(e.target.value)}} name='state' placeholder="Enter your state" className="input input-bordered"  />
                    </div>
                    <div className="form-control">
                      <label className="label" htmlFor='city'>
                        <span className="label-text">City:</span>
                      </label>
                      <input type="text" id='city' value={city} onChange={(e)=>{setCity(e.target.value)}} name='city' placeholder="Enter your city" className="input input-bordered"  />
                    </div>
                    <div className="form-control">
                      <label className="label" htmlFor='zip'>
                        <span className="label-text">Zip:</span>
                      </label>
                      <input type="text" id='zip' value={zip} onChange={(e)=>{setZip(e.target.value)}} name='zip' placeholder="Enter your zip code" className="input input-bordered"  />
                    </div>
                    {/* Country Info */}
                    {
                    !auth.currentUser?.emailVerified
                    &&
                    <>
                      <div className="divider">Verify your email</div>
                      <div className="form-control mt-6">
                          <button onClick={handleSendVerificationMail} className="btn btn-info">Resend verification mail</button>
                      </div>
                    </>
                    }
                    <div className="divider">Actions</div>
                    {/* <div className="card-actions flex flex-col items-center w-full"> */}
                      <div className="form-control mt-6">
                        <button onClick={handleSubmit} {...(isLoading?{disabled:true}:{disabled:false})} type='submit' className="btn btn-primary">Update</button>
                      </div>
                      <div className="form-control mt-2">
                          <span role='link' className="btn btn-error" onClick={async ()=>{
                            cardAnimeRef.current?.classList.add(`${styles.cardAnimeUp}`)
                            await waiting(1000);
                            router.push("/transactions");
                          }} >Cancel</span>
                      </div>
                    {/* </div> */}
                    <div className="divider divider-error text-error">Danger Zone</div>
                    {/* Danger Zone */}
                    <div className='card-actions flex flex-row items-center justify-evenly'>
                      <div className="form-control">
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        {/* @ts-ignore */}
                        <button className="btn btn-outline btn-warning" role='button' onClick={(e)=>{e.preventDefault() ; document.getElementById('my_modal_1').showModal()}}>Change Password</button>
                        <dialog id="my_modal_1" ref={passwordModalRef} className="modal">
                          <div className="modal-box">
                            <div className="card">
                              <div className="card-title flex flex-col justify-center items-center gap-1">
                                <h3 className="font-bold text-lg">Change Password</h3>
                              </div>
                              <div className="modal-action w-full">
                                <form className='card-body w-full flex flex-col justify-center items-stretch gap-2' method="dialog">
                                  {/* if there is a button in form, it will close the modal */}
                                  <InputField isRequired={true} placeholder='Enter your old password' ref={oldPasswordRef} inputText={setOldPassword} inputTextValue={oldPassword} inputTypeValue='password' labelText='Old Password:'
                                  // @ts-ignore  
                                  // @ts-ignore
                                  showPassword={true} />
                                  <InputField isRequired={true} placeholder='Enter your new password' ref={passwordRef} inputText={setPassword} inputTextValue={password} inputTypeValue='password' labelText='New Password:'
                                  // @ts-ignore 
                                  warningText={passwordWarnText} 
                                  // @ts-ignore
                                  warnColor={passwordWarnColor} showPassword={true} />
                                  <InputField isRequired={true} 
                                      placeholder='Retype the password' 
                                      ref={password2Ref} 
                                      inputText={setPassword2} 
                                      inputTextValue={password2} 
                                      inputTypeValue='password' 
                                      labelText='Retype Password:'
                                      // @ts-ignore
                                      passwordMatchText={password2WarnText}
                                      // @ts-ignore
                                      warnColor={password2WarnColor}
                                      // queryStatus={status}
                                      />
                                    <button onClick={handleChangePassword} className="btn btn-wide btn-outline btn-warning self-center mt-[3%]" {...(changeButtonDisabled?{disabled: true}: {disabled:false})} >Change</button>
                                </form>
                              </div>
                            </div>
                          </div>
                        </dialog>
                      </div>
                      <div className="form-control">
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        {/* @ts-ignore */}
                        <button role='button' className="btn btn-outline btn-error" onClick={(e)=>{e.preventDefault(); setRandomText(`${currentUser.email}${generateRandomText(6)}`); document.getElementById('my_modal_2').showModal()}}>Delete Account</button>
                        <dialog id="my_modal_2" className="modal" ref={deleteDialogueRef}>
                        <div className="modal-box bg-red-200">
                            <div className="card">
                              <div className="card-title flex flex-col justify-center items-center gap-1">
                                <h3 className="font-bold text-lg text-error">Delete Account</h3>
                                <p className="text-base text-error">Are you sure you want to delete your account?</p>
                              </div>
                              <div className="modal-action w-full">
                                <form className='card-body w-full flex flex-col justify-center items-stretch gap-2' method="dialog">
                                  <p className='text-base text-center text-gray-900'>Enter the text to match the pattern below</p>
                                  <p className='text-base text-center text-gray-900'>pattern: <span className='text-gray-900 select-none' ref={randomTextRef}>{randomText}</span></p>
                                    <div className='flex flex-col gap-3 items-center justify-center'>
                                      {/*  */}
                                      <input ref={deleteInputRef} type="text" placeholder="Type here" value={deleteInput} onChange={(e)=>setDeleteInput(e.target.value)} className="input bg-red-100 input-bordered w-full max-w-xs input-error text-gray-900" />
                                      {/* @ts-ignore */}
                                      <input ref={deletePasswordRef} type="password" placeholder="Type password here" value={deletePasswordInput} onChange={(e)=>setDeletePasswordInput(e.target.value)} className="input bg-red-100 input-bordered w-full max-w-xs input-error text-gray-900" />
                                    </div>
                                    <div className="card-actions flex flex-row items-center justify-center flex-wrap mt-[3%]">
                                      <button onClick={handleDeleteAcc}  {...(deleteButtonDisabled?{disabled:true}:{disabled:false})} className="btn btn-outline btn-error self-center w-[35%]">Delete</button>
                                      {/* @ts-ignore */}
                                      <button onClick={(e)=>{e.preventDefault(); setDeletePasswordInput(""); setDeleteInput(""); document.getElementById('my_modal_2').close()}}  className="btn btn-outline self-center w-[35%]">Cancel</button>
                                    </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </dialog>
                      </div>
                    </div>
                    {/* Danger Zone */}
                    
                </form>
            </div>
      </div>
    </>
  )
}
