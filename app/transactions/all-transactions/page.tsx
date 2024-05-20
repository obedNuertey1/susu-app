import React from 'react';
import AllTransactionsPage from '@/app/components/AllTransactionsPage/AllTransactionsPage';
import ReactQueryProvider from '@/app/components/ReactQueryProvider/ReactQueryProvider';
import { metadata } from '@/app/layout';

function page() {
    metadata.title = 'MSYS | all transactions';
    metadata.description = 'MSYS view all transactions';
  return (
    <ReactQueryProvider>
        {/* @ts-ignore */}
        <AllTransactionsPage />
    </ReactQueryProvider>
  )
}

export default page;