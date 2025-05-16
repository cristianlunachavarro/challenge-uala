import axios from 'axios';
import { Transaction, Metadata } from '../types/transactions';

interface ApiResponse {
  transactions: Transaction[];
  metadata: Metadata;
}

const API_URL =
  'https://uala-dev-challenge.s3.us-east-1.amazonaws.com/transactions.json';

export const fetchTransactions = async (): Promise<ApiResponse> => {
  const response = await axios.get('/api/transactions');
  return response.data;
};
