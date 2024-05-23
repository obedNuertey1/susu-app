import React from 'react';
import AddBorrowersPage from '@/app/components/AddBorrowerPage/AddBorrowerPage';
import { metadata } from '@/app/layout';

function page() {
    metadata.title = "MSYS - Add borrower";
    metadata.description = "This page allows admin to add a borrower";
  return (
    <>
        <AddBorrowersPage />
    </>
  )
}

export default page;