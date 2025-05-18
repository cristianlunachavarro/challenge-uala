import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { Transaction, Metadata } from '../src/types/transactions';

interface ApiResponse {
  transactions: Transaction[];
  metadata: Metadata;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const response = await fetch(
      'https://uala-dev-challenge.s3.us-east-1.amazonaws.com/transactions.json'
    );
    const data: ApiResponse = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
}
