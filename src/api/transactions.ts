import Transactions from '../../public/transactions.json';
import type { Transaction, Metadata } from '../types/transactions';

interface ApiResponse {
  transactions: Transaction[];
  metadata: Metadata;
}

// Mock API call to fetch transactions
export const fetchTransactions = async (): Promise<ApiResponse> => {
  const response = await Promise.resolve(Transactions);
  return response;
};
