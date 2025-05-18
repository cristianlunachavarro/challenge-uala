import axios from 'axios';
import type { Transaction, Metadata } from '../types/transactions';

interface ApiResponse {
  transactions: Transaction[];
  metadata: Metadata;
}
const vercelEnv = import.meta.env.VITE_VERCEL_ENV;

const API_URL =
  vercelEnv === 'production'
    ? 'https://uala-dev-challenge.s3.us-east-1.amazonaws.com/transactions.json'
    : '/api/transactions';

export const fetchTransactions = async (): Promise<ApiResponse> => {
const response = await axios.get(API_URL, {
  headers: {
    Origin: 'https://challenge-uala-inky.vercel.app',
    'Access-Control-Request-Headers': 'Content-Type',
  },
})  
return response.data;
};
