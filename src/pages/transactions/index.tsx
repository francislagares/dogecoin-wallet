import { MongoClient } from 'mongodb';
import { GetServerSideProps } from 'next';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Button from 'src/components/button';
import TransactionItem from 'src/components/transactionItem';
import { ITransaction } from 'src/types';

interface IProps {
  transactions: ITransaction[];
}

const Transactions = ({ transactions }: IProps) => {
  const { data: session } = useSession();
  const router = useRouter();

  const transactionsList = transactions?.map((transaction: ITransaction) => (
    <TransactionItem
      key={transaction.id}
      address={transaction.address}
      amount={transaction.amount}
    />
  ));

  return (
    <>
      {session ? (
        <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
          <div className='max-w-md w-full space-y-8'>
            Signed in as {session.user?.email} <br />
            <Button type='button' onClick={() => signOut()}>
              Sign Out
            </Button>
            <Button
              type='button'
              onClick={() => router.push('/transactions/add-transaction')}
            >
              Add Transaction
            </Button>
          </div>
        </div>
      ) : (
        <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
          <div className='max-w-md w-full space-y-8 text-center'>
            Not signed in <br />
            <Button
              type='button'
              onClick={() => router.push('/api/auth/signin')}
            >
              Sign In
            </Button>
          </div>
        </div>
      )}
      {transactionsList}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const client = await MongoClient.connect(process.env.DATABASE_URL as string);
  const transactionCollection = client.db().collection('Transactions');
  const transactionArray = await transactionCollection
    .find()
    .sort({ _id: -1 })
    .toArray();
  client.close();

  return {
    props: {
      transactions: transactionArray.map(transaction => ({
        address: transaction.address,
        amount: transaction.amount,
        id: transaction._id.toString(),
      })),
    },
  };
};

export default Transactions;
