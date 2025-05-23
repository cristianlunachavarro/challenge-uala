import { FC, useEffect, useMemo, useState } from 'react';

import weekOfYear from 'dayjs/plugin/weekOfYear';
import dayjs from 'dayjs';

import filter_icon from '@/assets/transaction/filter-icon.png';
import export_icon from '@/assets/transaction/download-icon.png';

import { Filters, Transaction } from '@/types/transactions';
import { useTransactionStore } from '@/store/useTransactionStore';

import FilterModal from '@/components/filterModal';
import TransactionsList from '@/components/transactions/transactionList';
import ExportModal from '@/components/exportModal';

dayjs.extend(weekOfYear);

interface TransactionsProps {
  isOpenModal: boolean;
  isOpenExport: boolean;
  setOpenModal: (isOpenModal: boolean) => void;
  setOpenExport: (isOpenExport: boolean) => void;
}

const Transactions: FC<TransactionsProps> = ({
  isOpenModal,
  isOpenExport,
  setOpenModal,
  setOpenExport,
}) => {
  const transactions = useTransactionStore((state) => state.transactions);
  const filters = useTransactionStore((state) => state.filters);
  const timeRange = useTransactionStore((state) => state.timeRange);
  const setTotalAmount = useTransactionStore((state) => state.setTotalAmount);
  const { fetchTransactions, clearFilters } = useTransactionStore();

  const filterTxs = (tx: Transaction, filters: Filters) => {
    if (filters?.cards?.length && !filters.cards.includes(tx.card))
      return false;
    if (
      filters?.dateRange?.from &&
      dayjs(tx.createdAt) < dayjs(filters.dateRange.from)
    )
      return false;
    if (
      filters?.dateRange?.to &&
      dayjs(tx.createdAt) > dayjs(filters.dateRange.to)
    )
      return false;
    if (
      filters?.paymentMethod?.length &&
      !filters.paymentMethod.includes(tx.paymentMethod)
    )
      return false;
    if (filters?.installments && tx.installments !== filters.installments)
      return false;
    if (filters?.amountRange?.min && tx.amount < filters.amountRange.min)
      return false;
    if (filters?.amountRange?.max && tx.amount > filters.amountRange.max)
      return false;
    return true;
  };

  const shownTransactions = useMemo(
    () =>
      transactions
        .filter((tx) => {
          if (timeRange === 'day') {
            const start = dayjs().hour(0).minute(0).second(0);
            const end = dayjs().hour(23).minute(59).second(59);
            const value = dayjs(tx.createdAt);
            return value >= start && value <= end;
          }
          if (timeRange === 'week') {
            const value = dayjs(tx.createdAt);
            return (
              value.week() === dayjs().week() && value.year() === dayjs().year()
            );
          }

          const value = dayjs(tx.createdAt);
          return (
            value.month() === dayjs().month() && value.year() === dayjs().year()
          );
        })
        .filter((tx) => filterTxs(tx, filters))
        .sort((tx) => (dayjs(tx.createdAt) < dayjs(tx.createdAt) ? 1 : -1)),
    [transactions, filters, timeRange]
  );

  useEffect(() => {
    const amount = shownTransactions.reduce(
      (acc: number, tx: Transaction) => acc + tx.amount,
      0
    );
    setTotalAmount(amount);
  }, [shownTransactions]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  console.log('filters', filters);

  return (
    <div className='flex flex-col max-w-lg m-auto p p-9 relative'>
      <div className='flex justify-between mb-5'>
        <h2 className='text-sm font-semibold'>Historial de transacciones</h2>
        <div className='flex items-center space-x-4'>
          {Object.keys(filters).length > 0 && (
            <p
              className='text-center text-xs md:text-sm text-blue-900 hover:text-blue-600 font-semibold cursor-pointer'
              onClick={() => clearFilters()}
            >
              Limpiar filtros
            </p>
          )}
          <img
            onClick={() => {
              setOpenModal(!isOpenModal);
              setOpenExport(false);
            }}
            className='w-[24px] h-[24px] cursor-pointer'
            src={filter_icon}
            alt='filter-icon'
          />
          <img
            onClick={() => {
              setOpenExport(!isOpenExport);
              setOpenModal(false);
            }}
            className='w-[24px] h-[24px] cursor-pointer'
            src={export_icon}
            alt='export-icon'
          />
        </div>
      </div>
      <TransactionsList transactions={shownTransactions} />
      {isOpenExport && <ExportModal setOpenExport={setOpenExport} />}
      {isOpenModal && <FilterModal setOpenModal={setOpenModal} />}
    </div>
  );
};

export default Transactions;
