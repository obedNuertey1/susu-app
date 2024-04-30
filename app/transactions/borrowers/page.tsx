import React from 'react';
import ReactQueryProvider from '@/app/components/ReactQueryProvider/ReactQueryProvider';
import BorrowersPage from '@/app/components/BorrowersPage/BorrowersPage';
import { metadata } from '@/app/layout';


function Borrowers() {
  metadata.title = "Borrowers";
  metadata.description = "A table of all borrowers of money";
  return (
    <ReactQueryProvider>
        <BorrowersPage />
    </ReactQueryProvider>
  )
}

export default Borrowers