export interface Transaction {
  id: string;
  amount: number;
  card: string;
  installments: number;
  createdAt: string;
  updatedAt: string;
  paymentMethod: string;
}

export interface Metadata {
  cards: Card[];
  paymentMethods: PaymentMethod[];
}

export interface Card {
  value: string;
  label: string;
}

export interface PaymentMethod {
  value: string;
  label: string;
}

export interface FilterOptions {
  card?: string;
  paymentMethod?: string;
  installments?: number;
  dateFrom?: string;
  dateTo?: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface Filters {
  exportFilter?: 'day' | 'week' | 'month' | null;
  dateRange?: { from?: string; to?: string };
  amountRange?: { min?: number; max?: number };
  cards?: string[];
  paymentMethod?: string[];
  installments?: number | null;
}

export interface TransactionStore {
  transactions: Transaction[];
  filtered: Transaction[];
  filters: FilterOptions;
  metadata: Metadata | null;
  setTransactions: (tx: Transaction[]) => void;
  setMetadata: (meta: Metadata) => void;
  setFilters: (filters: Partial<FilterOptions>) => void;
  applyFilters: () => void;
}

export type TimeRange = 'day' | 'week' | 'month';
