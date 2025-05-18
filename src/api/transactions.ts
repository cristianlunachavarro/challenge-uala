import axios from 'axios';
import type { Transaction, Metadata } from '../types/transactions';

interface ApiResponse {
  transactions: Transaction[];
  metadata: Metadata;
}

const API_URL = '/api/transactions';

export const fetchTransactions = async (): Promise<ApiResponse> => {
  const response = await axios.get(API_URL);
  return response.data;
};