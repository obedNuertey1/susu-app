import ReactQueryProvider from '@/app/components/ReactQueryProvider/ReactQueryProvider';
import React from 'react';
import TransactionsID from '@/app/components/TransactionsID/TrasactionsID';
import { metadata } from '@/app/layout';

function MakeTransactions({params, searchParams}: {params: {id: string}, searchParams?:{[key: string]:string|string[]|undefined},}) {
  metadata.description = "Add an amount to make transaction";
  let id:string = params.id;
  metadata.title = `Trasactions - ${decodeURI(id)}`;
  console.log("params=");

  return (
    <ReactQueryProvider>
      {/* @ts-ignore */}
      <TransactionsID params={params} searchParams={searchParams}  />
    </ReactQueryProvider>
  )
}

export default MakeTransactions;