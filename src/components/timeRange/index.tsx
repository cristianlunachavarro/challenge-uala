import { FC, useMemo } from 'react';

import { useTransactionStore } from '@/store/useTransactionStore';

import TimeRangeSkeleton from '@/components/timeRange/timeRangeSkeleton';

const dateOptions = [
  { value: 'day', label: 'Diario' },
  { value: 'week', label: 'Semanal' },
  { value: 'month', label: 'Mensual' },
];

const TimeRange: FC = () => {
  const totalAmount = useTransactionStore((state) => state.totalAmount);
  const timeRange = useTransactionStore((state) => state.timeRange);
  const loading = useTransactionStore((state) => state.loading);
  const setTimeRange = useTransactionStore((state) => state.setTimeRange);

  const formatedAmount = useMemo(() => {
    const rounded = Number(totalAmount).toFixed(2);
    const [integerPart, decimalPart] = rounded.split('.');
    const formattedInteger = new Intl.NumberFormat('es-AR').format(
      Number(integerPart)
    );
    return { formattedInteger, decimalPart };
  }, [totalAmount]);

  const handleTimeRange = (timeRange: string) => {
    setTimeRange(timeRange);
  };

  return (
    <div className='max-w-lg m-auto'>
      <h1 className='text-2xl font-semibold my-9 mx-9'>Tus cobros</h1>
      <div className='flex flex-row gap-4 justify-between justify-self-center w-[70%]'>
        {dateOptions.map((dt) => {
          const isSelected = dt.value === timeRange;
          return (
            <div
              key={dt.value}
              className='flex flex-col items-center cursor-pointer'
              onClick={() => handleTimeRange(dt.value)}
            >
              <h2
                className={`transition-all duration-200 ${
                  isSelected
                    ? 'font-semibold -translate-y-1 text-black'
                    : 'text-gray-500 translate-y-1'
                }`}
              >
                {dt.label}
              </h2>
              {isSelected && (
                <span className='w-2 h-2 rounded-full bg-blue-700 mt-1'></span>
              )}
            </div>
          );
        })}
      </div>
      {loading ? (
        <TimeRangeSkeleton />
      ) : (
        <div className='text-4xl font-extralight text-center my-7'>
          +$ {formatedAmount.formattedInteger}
          <span className='text-base align-bottom ml-0.5'>
            ,{formatedAmount.decimalPart}
          </span>
        </div>
      )}
    </div>
  );
};

export default TimeRange;
