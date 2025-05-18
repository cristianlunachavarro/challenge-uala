import { FC, useState } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';

import calendar_icon from '@/assets/filter/calendar-icon.png';

import { downloadFile } from '@/utils/downloadFile';
import { useTransactionStore } from '@/store/useTransactionStore';
import { Transaction } from '@/types/transactions';

interface ExportModalProps {
  setOpenExport: () => void;
}

const TRANSACTIONS_MSG = {
  SUCCESS_MESSAGE: 'Archivo exportado con éxito',
  NO_TRANSACTIONS:
    'No hay movimientos en las fechas seleccionadas para descargar',
};

const ExportModal: FC<ExportModalProps> = ({ setOpenExport }) => {
  const transactions = useTransactionStore((state) => state.transactions);
  const setAlert = useTransactionStore((state) => state.setAlert);
  
  const [range, setRange] = useState<DateRange | undefined>(undefined);

  const getTransactionToDownload = (): Transaction[] => {
    if (!range?.from || !range?.to) return [];

    const from = new Date(range.from);
    const to = new Date(range.to);

    return transactions.filter(({ createdAt }) => {
      const created = new Date(createdAt);
      return created >= from && created <= to;
    });
  };

  const handleDownload = () => {
    const transactionsToDownload = getTransactionToDownload();

    if (transactionsToDownload.length === 0) {
      return setAlert(TRANSACTIONS_MSG.NO_TRANSACTIONS);
    }
    downloadFile(transactionsToDownload);
    setOpenExport();
    setAlert(TRANSACTIONS_MSG.SUCCESS_MESSAGE);
  };

  const handleClear = () => setRange(undefined);

  return (
    <div className='absolute top-[75px] right-[35px] md:top-20 md:right-[75px] z-50 bg-white shadow-lg rounded-xl p-6 w-[355px]'>
      <div className='flex justify-between mx-2 mb-4 items-center'>
        <img
          className='w-[24px] h-[24px]'
          src={calendar_icon}
          alt='calendar-icon'
        />
        <p className='text-base font-semibold text-gray-700 mx-5'>
          Elegí las fechas que querés descargar
        </p>
      </div>
      <DayPicker
        mode='range'
        selected={range}
        onSelect={setRange}
        navLayout='around'
      />
      <div className='flex justify-center mt-4 space-x-9'>
        <button
          onClick={handleClear}
          className='px-3 py-1 border border-blue-800 text-[#022A9A] rounded-full hover:bg-blue-50'
        >
          Borrar
        </button>
        <button
          onClick={handleDownload}
          className='px-3 py-1 bg-[#022A9A] text-white rounded-full hover:bg-blue-900'
        >
          Descargar
        </button>
      </div>
    </div>
  );
};

export default ExportModal;
