import React from 'react';
import { metadata } from '../layout';
import ReLoginPage from '../components/ReLoginPage/ReLoginPage';

function page({params, searchParams}: {params: {email: string}, searchParams?:{[key: string]:string|string[]|undefined},}) {
    
    metadata.title = "ReLogin";
    metadata.description = "Login again with new password";
  return (
    <>
        <ReLoginPage params={params} searchParams={searchParams} />
    </>
  )
}

export default page