import { create } from 'zustand';
import {
  Filters,
  Metadata,
  TimeRange,
  Transaction,
} from '../types/transactions';
import { fetchTransactions } from '../api/transactions';

type TransactionStore = {
  transactions: Transaction[];
  totalAmount: number;
  timeRange: string;
  setTimeRange: (value: string) => void;
  filters: Filters;
  metadata: Metadata;
  loading: boolean;
  error: string | null;
  fetchTransactions: () => Promise<void>;
  setFilters: (filters: Partial<Filters>) => void;
  clearFilters: () => void;
  setTotalAmount: (value: number) => void;
};

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  metadata: {
    cards: [{ value: '', label: '' }],
    paymentMethods: [{ value: '', label: '' }],
  },
  timeRange: 'week',
  filters: {},
  loading: false,
  error: null,
  totalAmount: 0,
  fetchTransactions: async () => {
    try {
      set({ loading: true, error: null });
      const { transactions, metadata } = await fetchTransactions();
      set({ transactions, metadata, loading: false });
    } catch (error: any) {
      set({ error: error.message || 'Error desconocido', loading: false });
    }
  },
  setTimeRange: (timeRange: string) => set(() => ({ timeRange })),
  setFilters: (filters: Partial<Filters>) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  clearFilters: () => set(() => ({ filters: {} })),
  setTotalAmount: (totalAmount: number) => set(() => ({ totalAmount })),
}));
