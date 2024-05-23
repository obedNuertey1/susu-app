import React from 'react';
import BorrowersID from '@/app/components/BorrowersID/BorrowersID';
import { metadata } from '@/app/layout';

function page({params, searchParams}: {params: {id: string}, searchParams?:{[key: string]:string|string[]|undefined},}) {
  metadata.title = `MSYS | Borrower - ${params.id}`;
  metadata.description = "This page displays borrowers info";
  return (
    <>
    {/* @ts-ignore */}
     <BorrowersID params={params} searchParams={searchParams} />
    </>
  )
}

export default page;