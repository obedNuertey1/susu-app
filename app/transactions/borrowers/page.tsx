import React from 'react';
import ReactQueryProvider from '@/app/components/ReactQueryProvider/ReactQueryProvider';
import BorrowersPage from '@/app/components/BorrowersPage/BorrowersPage';


function Borrowers() {

  return (
    <ReactQueryProvider>
        <BorrowersPage />
    </ReactQueryProvider>
  )
}

export default Borrowers