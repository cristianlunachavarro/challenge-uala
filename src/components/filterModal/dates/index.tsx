import { FC, useState } from 'react';

import { DayPicker, DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import calendar_icon from '@/assets/filter/calendar-icon.png';

import ToggleSwitch from '@/components/transactions/toggleSwitch';

interface DatesProps {
  dateRange: { from?: string; to?: string };
  setDateRange: (value: { from: string; to: string }) => void;
}

const Dates: FC<DatesProps> = ({ dateRange, setDateRange }) => {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>({
    from: dateRange.from ? new Date(dateRange.from) : undefined,
    to: dateRange.to ? new Date(dateRange.to) : undefined,
  });

  const handleSelect = (selectedRange: DateRange | undefined) => {
    setRange(selectedRange);
    if (selectedRange?.from && selectedRange?.to) {
      setDateRange({
        from: selectedRange.from.toISOString(),
        to: selectedRange.to.toISOString(),
      });
    }
  };

  const handleClear = () => {
    setRange(undefined);
    setDateRange({ from: '', to: '' });
  };

  return (
    <div className='mb-9'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <img
            src={calendar_icon}
            alt='calendar_icon'
            className='w-[24px] h-[24px]'
          />
          <p className='ml-5'>Fecha</p>
        </div>
        <ToggleSwitch
          checked={open}
          onChange={() => setOpen((prev) => !prev)}
        />
      </div>
      {open && (
        <div className='p-3 rounded-xl shadow bg-white w-fit relative mt-5 left-0 m-auto left-[-15px]'>
          <DayPicker
            mode='range'
            selected={range}
            onSelect={handleSelect}
            navLayout='around'
          />
          <button
            onClick={handleClear}
            className='mt-4 px-4 py-1 border border-blue-800 text-blue-800 rounded-full hover:bg-blue-50'
          >
            Borrar
          </button>
        </div>
      )}
    </div>
  );
};

export default Dates;
