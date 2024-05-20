import React from 'react'
import ReactQueryProvider from '@/app/components/ReactQueryProvider/ReactQueryProvider'
import AllUsersPage from '@/app/components/AllUsersPage/AllUsersPage';
import { metadata } from '@/app/layout'

function page() {
    metadata.title = "MSYS | all users";
    metadata.description = "MSYS | display all users page";
  return (
    <ReactQueryProvider>
        {/* @ts-ignore */}
        <AllUsersPage />
    </ReactQueryProvider>
  )
}

export default page;