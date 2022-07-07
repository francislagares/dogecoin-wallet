import React from 'react';
import { ITransaction } from 'src/types';

const TransactionItem = ({ address, amount }: ITransaction) => {
  return (
    <div className='min-h-full flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8 p-6 border'>
        <h4 className='text-xl font-medium leading-5 text-gray-800'>Address</h4>
        <span className='text-sm leading-normal pt-2 text-gray-500'>
          {address}
        </span>
        <h4 className='text-xl font-medium leading-5 text-gray-800'>Amount</h4>
        <span className='text-sm leading-normal pt-2 text-gray-500'>
          {amount}
        </span>
      </div>
    </div>
  );
};

export default TransactionItem;
