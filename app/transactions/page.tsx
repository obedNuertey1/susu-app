import React from 'react';
import TransactionsPage from "../components/TransactionsPage/TransactionsPage";
import {metadata} from "../layout";
import ReactQueryProvider from '../components/ReactQueryProvider/ReactQueryProvider';

function Transactions() {
  metadata.title = "Transactions";
  metadata.description = "Create a Trasaction to continue";
  return (
    <ReactQueryProvider>
      {/* @ts-ignore */}
      <TransactionsPage/>
    </ReactQueryProvider>
  )
}

export default Transactions