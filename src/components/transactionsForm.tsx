import React, { useRef } from 'react';
import Button from './button';
import { ITransaction, Submit } from 'src/types';

interface IProps {
  addTransactionHandler: (data: ITransaction) => Promise<void>;
}

const TransactionForm = ({ addTransactionHandler }: IProps) => {
  const addressRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);

  const formSubmitHandler = (e: Submit) => {
    e.preventDefault();

    const formData = {
      address: addressRef?.current?.value,
      amount: amountRef?.current?.value,
    };
    addTransactionHandler(formData);
  };

  return (
    <div className='bw-full h-screen flex items-center justify-center'>
      <form className='max-w-lg w-full mx-auto' onSubmit={formSubmitHandler}>
        <div className='flex flex-wrap mb-6 -mx-3'>
          <label
            htmlFor='address'
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
          >
            Address
          </label>
          <input
            className='w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline'
            type='text'
            placeholder='address'
            ref={addressRef}
          />
        </div>
        <div className='flex flex-wrap mb-6 -mx-3'>
          <label
            htmlFor='amount'
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
          >
            Amount
          </label>
          <input
            className='w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline'
            type='text'
            placeholder='amount'
            ref={amountRef}
          />
        </div>
        <Button type='submit'>Add Transaction</Button>
      </form>
    </div>
  );
};

export default TransactionForm;
