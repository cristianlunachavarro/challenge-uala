import { FC } from 'react';
import dayjs from 'dayjs';

import category_stores from '@/assets/transaction/category-stores-in.png';
import empty_search from '@/assets/transaction/empty-search.png';

import { Transaction } from '@/types/transactions';
import { useTransactionStore } from '@/store/useTransactionStore';

import TransactionsListSkeleton from '@/components/transactions/transactionsListSkeleton';

interface TransactionsListProps {
  transactions: Transaction[];
}

const TransactionsList: FC<TransactionsListProps> = ({ transactions }) => {
  const { loading } = useTransactionStore();

  if (loading) return <TransactionsListSkeleton />;

  if (!transactions.length) {
    return (
      <div className='flex flex-col justify-center items-center m-9'>
        <img
          className='w-[72px] h-[72px]'
          src={empty_search}
          alt='empty-search'
        />
        <p className='text-sm text-gray-400 mt-5 md:mt-9 px-2 md:px-5 text-center'>
          No hay resultados que mostrar. Podés probar usando los filtros.
        </p>
      </div>
    );
  }

  return (
    <div className='overflow-y-auto max-h-[450px] pr-2'>
      <ul className='space-y-4'>
        {transactions.map((tx: Transaction) => (
          <li key={tx.id} className='border-b py-3'>
            <div className='flex justify-between'>
              <div className='flex'>
                <img
                  src={category_stores}
                  alt='category-store-image'
                  className='w-[32px] h-[32px] self-center mr-2'
                />
                <div className='flex-co'>
                  <p className='text-base'>{tx.paymentMethod}</p>
                  <p className='text-sm text-gray-400'>Venta</p>
                </div>
              </div>
              <div className='flex flex-col items-end text-right'>
                <p className='text-sm text-green-700 font-semibold'>{`+$${tx.amount.toLocaleString()}`}</p>
                <p className='text-sm text-gray-400'>
                  {dayjs(tx.createdAt).format('DD/MM/YYYY')}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsList;
