import { FC, useState } from 'react';

import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts';

import analize_icon from '@/assets/timeRange/analyze-icon.png';

import { useTransactionStore } from '@/store/useTransactionStore';
import { Transaction } from '@/types/transactions';

interface MetricsProps {
  isOpenMetrics: boolean;
  setOpenExport: (isOpenExport: boolean) => void;
  setIsOpenMetrics: (isOpenMetrics: boolean) => void;
}

dayjs.extend(isoWeek);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const Metrics: FC<MetricsProps> = ({
  isOpenMetrics,
  setIsOpenMetrics,
  setOpenExport,
}) => {
  const transactions = useTransactionStore((state) => state.transactions);

  const [filter, setFilter] = useState<'week' | 'month'>('week');

  const today = dayjs();
  const startOfMonth = dayjs().startOf('month');
  const startOfWeek = dayjs().startOf('isoWeek');

  const filteredTransactions: Transaction[] = transactions.filter((tx) => {
    const date = dayjs(tx.createdAt);
    const startDate = filter === 'month' ? startOfMonth : startOfWeek;
    return date.isSameOrAfter(startDate) && date.isSameOrBefore(today);
  });

  const groupedData: Record<string, { count: number; total: number }> = {};

  filteredTransactions.forEach((tx) => {
    const dateStr = dayjs(tx.createdAt).format('D MMM');
    if (!groupedData[dateStr]) {
      groupedData[dateStr] = { count: 0, total: 0 };
    }
    groupedData[dateStr].count += 1;
    groupedData[dateStr].total += tx.amount;
  });

  const chartData = Object.entries(groupedData).map(([date, data]) => ({
    date,
    count: data.count,
    total: Math.round(data.total * 100) / 100,
  }));

  return (
    <div className='w-full'>
      <div
        className='flex justify-center text-blue-800 hover:text-blue-600 cursor-pointer'
        onClick={() => {
          setIsOpenMetrics(true);
          setOpenExport(false);
        }}
      >
        <img
          src={analize_icon}
          alt='analize-icon'
          className='w-[24px] h-[24px] mr-2'
        />
        <span>Ver métricas</span>
      </div>

      {isOpenMetrics && (
        <div className='fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center'>
          <div className='bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 relative'>
            <button
              onClick={() => setIsOpenMetrics(false)}
              className='absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl'
            >
              &times;
            </button>
            <div className='flex gap-4 mb-4 justify-center'>
              <button
                className={`px-4 py-2 ${
                  filter === 'week'
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-600'
                }`}
                onClick={() => setFilter('week')}
              >
                Resumen Semanal
              </button>
              <button
                className={`px-4 py-2 ${
                  filter === 'month'
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-600'
                }`}
                onClick={() => setFilter('month')}
              >
                Resumen Mensual
              </button>
            </div>
            <div className='w-full overflow-x-auto'>
              <div style={{ minWidth: 700, height: 300 }}>
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='date' />
                    <YAxis dataKey='total' />
                    <Tooltip cursor={{ fill: 'transparent' }} />
                    <Legend
                      content={({ payload }) => (
                        <div
                          style={{
                            display: 'flex',
                            gap: '24px',
                            justifyContent: 'center',
                            marginTop: '20px',
                          }}
                        >
                          {payload?.map((entry) => (
                            <div
                              key={entry.value}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                              }}
                            >
                              <div
                                style={{
                                  width: 12,
                                  height: 12,
                                  backgroundColor: entry.color,
                                }}
                              />
                              <span className='text-base font-semibold'>
                                {entry.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    />
                    <Bar dataKey='count' fill='#3182ce' name='Cantidad' />
                    <Bar dataKey='total' fill='#90cdf4' name='Monto total' />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Metrics;
