import React from 'react'
import AuthVerificationPage from '../components/AuthVerificationPage/AuthVerificationPage'
import { metadata } from '../layout'

function page({params, searchParams}: {params: {email: string}, searchParams?:{[key: string]:string|string[]|undefined},}) {
    metadata.title = "MSYS - Verification Page";
    metadata.description = "Verify email and password reset";
    return (
      <>
      {/* @ts-ignore */}
          <AuthVerificationPage params={params} searchParams={searchParams} />
      </>
    )
  }
export default page