import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const createTransaction = async (
  req: NextApiRequest,
  resp: NextApiResponse,
) => {
  if (req.method !== 'POST') return;

  const { address, amount } = req.body;

  if (!address || !amount) return;

  const client = await MongoClient.connect(process.env.DATABASE_URL as string);
  const db = client.db();
  const collection = db.collection('Transactions');
  const result = await collection.insertOne({ address, amount });
  client.close();

  resp.status(201).json({
    transaction: result,
    message: 'Transaction created',
  });
};

export default createTransaction;
