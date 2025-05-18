import axios from 'axios';

import { Transaction, Metadata } from '../types/transactions';

interface ApiResponse {
  transactions: Transaction[];
  metadata: Metadata;
}

const API_URL =
  import.meta.env.MODE === 'development'
    ? '/api/transactions'
    : 'https://uala-dev-challenge.s3.us-east-1.amazonaws.com/transactions.json';

export const fetchTransactions = async (): Promise<ApiResponse> => {
  const response = await axios.get(API_URL);
  return response.data;
};
