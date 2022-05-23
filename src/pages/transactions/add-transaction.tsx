import { useRouter } from 'next/router';
import TransactionsForm from '../../components/transactionsForm';
import { ITransaction } from 'src/types';

const AddTransaction = () => {
  const router = useRouter();

  const addTransactionHandler = async (data: ITransaction) => {
    const response = await fetch('/api/transactions/createTransaction', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-Type': 'application/json',
      },
    });

    const res = await response.json();
    console.log(res);

    router.push('/transactions');
  };

  return (
    <>
      <TransactionsForm addTransactionHandler={addTransactionHandler} />
    </>
  );
};

export default AddTransaction;
