"use client";
import { faGears, faUserPlus} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import styles from "./AddBorrowerPage.module.css";
import girlEngineer from "../../assets/Groupengineering-girl.svg"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import waiting from '@/app/funcs/waiting';
import { imageRepo, imagesRef } from '@/app/firebase/firebase.config';
import { StorageReference, getDownloadURL, listAll, ref, uploadBytes, deleteObject } from 'firebase/storage';
import { IimageContext, useImagesContext } from '@/app/contexts/ImagesContext';
import { Auth, getAuth } from 'firebase/auth';

export default function AddBorrowersPage() {
  const router = useRouter();

  // const {systemImageUrl,uploadFile}:any = useImagesContext();
//   const {}:any = useImagesContext();

  const [borrowerId, setBorrowerId] = useState<string>("");
  const [fname, setFname] = useState<string>(""); //
  const [lname, setLname] = useState<string>(""); //
  const [email, setEmail] = useState<string>(""); //
  const [phone, setPhone] = useState<string>(""); //
  const [addrs1, setAddrs1] = useState<string>(""); //
  const [addrs2, setAddrs2] = useState<string>(""); //
  const [city, setCity] = useState<string>(""); //
  const [state, setState] = useState<string>(""); //
  const [zip, setZip] = useState<string>(""); //
  const [country, setCountry] = useState<string>(""); //
  const [comment, setComment] = useState<string>(""); //
  const [balance, setBalance] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [date_time, setDate_time] = useState<string>("");//
  const [status, setStatus] = useState<string>("");//
  const [addImage, setAddImage] = useState<string>("");//
  const [imageSrc, setImageSrc] = useState(null);



  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  
  const {uploadFile, systemImageRef, onloggedIn, userRole}:any = useImagesContext();
  const auth:Auth = getAuth();
  const cardAnimeRef = useRef<HTMLDivElement>(null);
  const {currentUser, signup, logout}:any = useAuth();
  

  useEffect(()=>{

    (async ()=>{
      try{
          const res = await fetch(`${process.env.NEXT_PUBLIC_REACT_SERVER_API}/users/email/${currentUser.email}`);
          if(!res.ok){
              return router.push("/page-not-found")
          }
          const data = await res.json();
          if(data.role.toLowerCase() != 'admin'){
              return router.push("/page-not-found");
          }
          return;
      }catch(e){
          console.log(e);
      }

  })();
    
    try{
      // if(userRole?.toLowerCase() != 'admin'){
      //   return router.push("/page-not-found");
      // }
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
            setErrorMessage("Please verify your email - go to settings to start the process");
            await waiting(4000);
            setErrorMessage("");
        })();
      }
    }catch(e){
      console.log(e);
    }
    const cardAnimeRefVar = cardAnimeRef.current;
    return ()=>{
      cardAnimeRefVar?.classList.remove(`${styles.cardAnimeUp}`);
      // cardAnimeRefVar?.classList.remove(`${styles.animeDown}`);
    }
  }, []);
  
  
  
  const handleSubmit = async(e:any)=>{
    e.preventDefault();
    setIsLoading(true);
    try{
        
        //   Post a borrower to get a borrower ID
        const res = await fetch(`${process.env.NEXT_PUBLIC_REACT_SERVER_API}/borrowers`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body:JSON.stringify({
                fname:fname,
                lname:lname, 
                phone:phone, 
                addrs1:addrs1, 
                addrs2:addrs2, 
                city:city, 
                state:state, zip:zip, 
                country:country, 
                email:email, 
                comment:comment, 
                balance:balance, 
                status:status
            })
        });
        if(!res.ok){
            setErrorMessage("Failed to create borrower");
            await waiting(4000);
            setErrorMessage("");
            setIsLoading(false);
            return;
        }

        const resData = await res.json();
        const {account} = resData;
        //   Insert code in here
        // @ts-ignore
        if(addImage){
          const borrowerImage:StorageReference = ref(imagesRef, 'borrowers');
          // Post a borrower to get a borrower Id
          const borrowerImageRef:StorageReference = ref(borrowerImage, `${account}.jpg`);
          await uploadFile(borrowerImageRef, addImage).then(async(snapshot:any) => {
          }).catch((e:any)=>{
            (async ()=>{
              setErrorMessage(`Failed to create borrower`);
              await waiting(4000);
              setErrorMessage('');
              setIsLoading(false);
              console.error("Failed to send image");
            })();
          });
          await getDownloadURL(borrowerImageRef).then(async (url)=>{
              // Post a borrower to get a borrower Id
            const res = await fetch(`${process.env.NEXT_PUBLIC_REACT_SERVER_API}/borrowers/accountNumber/${account}`, {
              method: "PATCH",
              headers: {
                'Content-Type': "application/json"
              },
              body:JSON.stringify({
                image: url.toString()
              })
            });
            if(!res.ok){
              setErrorMessage("Failed to create borrower");
              await waiting(4000);
              setErrorMessage("");
              setIsLoading(false);
              return;
            }
            setSuccessMessage("One Borrower Created Successfully");
            await waiting(4000);
            setIsLoading(false);
            setSuccessMessage("");
            cardAnimeRef.current?.classList.add(`${styles.cardAnimeUp}`)
            await waiting(800);
            router.push("/transactions/borrowers");
          })
          return;
        }
      setSuccessMessage("One Borrower Created Successfully");
      await waiting(4000);
      setIsLoading(false);
      setSuccessMessage("");
      cardAnimeRef.current?.classList.add(`${styles.cardAnimeUp}`)
      await waiting(800);
      router.push("/transactions/borrowers");

    }catch(e){
      setErrorMessage(`Failed to update info`)
      await waiting(4000);
      setErrorMessage('');
      setIsLoading(false);
    }
  };


 
  
  return (
    <>
        {
            successMessage &&
            <div role="alert" className={`alert alert-success fixed left-0 z-50 right-0 top-[0vh] w-[90vw] justify-self-center self-center gap-1 flex-row mx-auto ${styles.promptAnime}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{successMessage}</span>
            </div>
        }
        {
            errorMessage &&
            <div role="alert" className={`alert alert-error fixed left-0 z-50 right-0 top-[0vh] w-[90vw] justify-self-center self-center gap-1 flex-row mx-auto`}>
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
                <h1 className='block text-3xl font-extrabold'>Add Borrower</h1>
                <div className='w-40 h-40 rounded-full  shadow-md overflow-clip flex flex-row items-center justify-center'>
                  {
                    (imageSrc)?<div className='w-full h-[100%] flex flex-col itmes-center justify-center'>
                    <Image src={imageSrc} alt={`${fname}'s image`} width="50" height="50" className='object-cover object-center w-full h-full rounded-full' unoptimized />
                  </div>:(`${image}`.startsWith(`${process.env.NEXT_PUBLIC_STORAGE_SERVICE_URL}`))?<div className='w-full h-[100%] flex flex-col itmes-center justify-center'>
                    <Image src={`${image}`} alt={`${fname}'s image`} width="50" height="50" className='object-cover object-center w-full h-full rounded-full' unoptimized />
                  </div>:<FontAwesomeIcon className='object-cover m-3 text-inherit w-2/3 h-2/3' icon={faUserPlus} />
                  }
                </div>
              </div>
                <form className="card-body">
                  <div className="divider">Add Borrower</div>
                      {/*System Info*/}
                    <div className="form-control">
                      <label className="label" htmlFor='fname'>
                        <span className="label-text">First Name:</span>
                      </label>
                      {/* @ts-ignore */}
                      <input type="text" id='fname' name='fname' value={fname} onChange={(e)=>{
                        setFname(e.target.value)
                      }} placeholder="first name" className="input input-bordered" required  />
                    </div>
                    <div className="form-control">
                      <label className="label" htmlFor='lname'>
                        <span className="label-text">Last Name:</span>
                      </label>
                      {/* @ts-ignore */}
                      <input type="text" id='lname' name='lname' value={lname} onChange={(e)=>{
                        setLname(e.target.value)
                      }} placeholder="lname" className="input input-bordered"  />
                    </div>
                    <div className="form-control">
                      <label className="label" htmlFor='email'>
                        <span className="label-text">Email:</span>
                      </label>
                      {/* @ts-ignore */}
                      <input type="email" id='email' name='email' value={email} onChange={(e)=>{
                        setEmail(e.target.value)
                      }} placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                      <label className="label" htmlFor='phone'>
                        <span className="label-text">Phone:</span>
                      </label>
                      {/* @ts-ignore */}
                      <input type="text" id='phone' name='phone' value={phone} onChange={(e)=>{
                        setPhone(e.target.value)
                      }} placeholder="phone" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                      <label className="label" htmlFor='addrs1'>
                        <span className="label-text">Address 1:</span>
                      </label>
                      {/* @ts-ignore */}
                      <input type="text" id='addrs1' name='addrs1' value={addrs1} onChange={(e)=>{
                        setAddrs1(e.target.value)
                      }} placeholder="Address 1" className="input input-bordered" required  />
                    </div>
                    <div className="form-control">
                      <label className="label" htmlFor='addrs2'>
                        <span className="label-text">Address 2:</span>
                      </label>
                      {/* @ts-ignore */}
                      <input type="text" id='addrs2' name='addrs2' value={addrs2} onChange={(e)=>{
                        setAddrs2(e.target.value)
                      }} placeholder="Address 2" className="input input-bordered"  />
                    </div>
                    <div className="form-control">
                      <label className="label" htmlFor='city'>
                        <span className="label-text">City:</span>
                      </label>
                      {/* @ts-ignore */}
                      <input type="text" id='city' name='city' value={city} onChange={(e)=>{
                        setCity(e.target.value)
                      }} placeholder="City" className="input input-bordered"  />
                    </div>
                    <div className="form-control">
                      <label className="label" htmlFor='state'>
                        <span className="label-text">State:</span>
                      </label>
                      {/* @ts-ignore */}
                      <input type="text" id='state' name='state' value={state} onChange={(e)=>{
                        setState(e.target.value)
                      }} placeholder="state" className="input input-bordered"  />
                    </div>
                    <div className="form-control">
                      <label className="label" htmlFor='zip'>
                        <span className="label-text">Zip:</span>
                      </label>
                      {/* @ts-ignore */}
                      <input type="text" id='zip' name='zip' value={zip} onChange={(e)=>{
                        setZip(e.target.value)
                      }} placeholder="zip" className="input input-bordered"  />
                    </div>
                    <div className="form-control">
                      <label className="label" htmlFor='country'>
                        <span className="label-text">Country:</span>
                      </label>
                      {/* @ts-ignore */}
                      <input type="text" id='country' name='country' value={country} onChange={(e)=>{
                        setCountry(e.target.value)
                      }} placeholder="Country" className="input input-bordered"  />
                    </div>
                    <div className="form-control">
                      <label className="label" htmlFor='comment'>
                        <span className="label-text">Comment:</span>
                      </label>
                      {/* @ts-ignore */}
                      <textarea type="text" id='comment' name='comment' value={comment} onChange={(e)=>{
                        setComment(e.target.value)
                      }} placeholder="comment" className="input input-bordered" rows={30} cols={30} />
                    </div>
                    <div className="form-control">
                      <label className="label" htmlFor='balance'>
                        <span className="label-text">Balance:</span>
                      </label>
                      {/* @ts-ignore */}
                      <input type="number" min={0} step={0.01} id='balance' name='balance' pattern='^\d*\.\d*$' value={balance} onChange={(e)=>{
                        setBalance(e.target.value)
                      }} placeholder="balance" className="input input-bordered"  />
                    </div>
                    {/* Image Image Image Image Image */}
                    <div className="form-control">
                      <label className="label" htmlFor='image'>
                        <span className="label-text">Image:</span>
                      </label>
                      {/* @ts-ignore */}
                      <input type="file" name='image' id='image' onChange={async (e)=>{
                        // @ts-ignore
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            // @ts-ignore
                            setImageSrc(e.target.result);
                          };
                          reader.readAsDataURL(file);
                        }
                        // @ts-ignore
                        setAddImage(e.target.files[0])
                      }} className="file-input file-input-bordered w-full max-w-full" />
                    </div>

                    <div className="divider">Actions</div>
                    {/* <div className="card-actions flex flex-col items-center w-full"> */}
                      <div className="form-control mt-6">
                        <button onClick={handleSubmit} {...(isLoading?{disabled:true}:{disabled:false})} type='submit' className="btn btn-primary">Save</button>
                      </div>
                      <div className="form-control mt-2">
                          <span role='link' className="btn btn-warning" onClick={async ()=>{
                            cardAnimeRef.current?.classList.add(`${styles.cardAnimeUp}`);
                            await waiting(800);
                            router.push("/transactions/borrowers");
                          }} >Cancel</span>
                      </div>
                </form>
          </div>
      </div>
    </>
  )
}
