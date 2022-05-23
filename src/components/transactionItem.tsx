import React from 'react';
import { ITransaction } from 'src/types';

const TransactionItem = ({ address, amount }: ITransaction) => {
  return (
    <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <h4>Address</h4>
        <span className='py-5 font-bold text-blue-600'>{address}</span>
        <h4>Amount</h4>
        <span className='py-5'>{amount}</span>
      </div>
    </div>
  );
};

export default TransactionItem;
