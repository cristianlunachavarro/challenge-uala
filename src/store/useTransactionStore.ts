import { create } from 'zustand';
import { Filters, Metadata, Transaction } from '../types/transactions';
import { fetchTransactions } from '../api/transactions';

type TransactionStore = {
  transactions: Transaction[];
  totalAmount: number;
  timeRange: string;
  filters: Filters;
  metadata: Metadata;
  loading: boolean;
  alert: string | null;
  setTimeRange: (value: string) => void;
  fetchTransactions: () => Promise<void>;
  setFilters: (filters: Partial<Filters>) => void;
  clearFilters: () => void;
  setTotalAmount: (value: number) => void;
  setAlert: (alert: string | null) => void;
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
  alert: null,
  totalAmount: 0,
  fetchTransactions: async () => {
    try {
      set({ loading: true, alert: null });
      const { transactions, metadata } = await fetchTransactions();
      set({ transactions, metadata, loading: false });
    } catch (error: any) {
      set({ alert: error.message || 'Server error', loading: false });
    }
  },
  setTimeRange: (timeRange: string) => set(() => ({ timeRange })),
  setFilters: (filters: Partial<Filters>) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  clearFilters: () => set(() => ({ filters: {} })),
  setTotalAmount: (totalAmount: number) => set(() => ({ totalAmount })),
  setAlert: (alert: string | null) => set(() => ({ alert: alert })),
}));
