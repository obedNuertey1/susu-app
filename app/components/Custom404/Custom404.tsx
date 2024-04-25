import React from 'react'
import svg404 from "../../assets/page-not-found.svg";
import Image from 'next/image';
import Link from "next/link";

function Custom404() {
  return (
    <div className='flex flex-col justify-center items-center h-screen w-full'>
      <div className="flex flex-col lg:flex-row">
        <div className="grid flex-grow h-20 place-items-center text-5xl font-extrabold">404</div> 
        <div className="divider lg:divider-horizontal"></div> 
        <div className="grid flex-grow h-20 place-items-center">Charley this page does not exist wy</div>
      </div>
      <Image src={svg404} alt='404 image' className='w-40 h-40' />
      <Link href="/transactions" className='btn btn-info btn-base-1'>Go Back</Link>
    </div>
  )
}

Custom404.getInitialProps = async ({res, err}:any) => {
  return {statusCode:res ? res.statusCode : err ? err.statusCode : null}
}

export default Custom404;