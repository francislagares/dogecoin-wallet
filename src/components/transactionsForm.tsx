import React, { useRef } from 'react';
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
    <form className='max-w-lg w-full mx-auto' onSubmit={formSubmitHandler}>
      <div className='flex flex-wrap mb-6 -mx-3'>
        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
          Address
        </label>
        <input
          className='appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
          type='text'
          placeholder='address'
          ref={addressRef}
        />
      </div>
      <div className='flex flex-wrap mb-6 -mx-3'>
        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
          Amount
        </label>
        <input
          className='appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
          type='text'
          placeholder='amount'
          ref={amountRef}
        />
      </div>
      <button
        className='px-4 py-2 my-1 font-semibold text-red-700 bg-transparent border border-red-500 rounded hover:bg-red-500 hover:text-white hover:border-transparent'
        type='submit'
      >
        Add
      </button>
    </form>
  );
};

export default TransactionForm;
