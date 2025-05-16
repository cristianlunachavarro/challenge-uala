import { FC, useState, useEffect } from 'react';

import commission_icon from '@/assets/filter/commission-icon.png';

import ToggleSwitch from '@/components/transactions/toggleSwitch';

interface AmountsProps {
  amountRange: { min?: number; max?: number };
  setAmountRange: (value: { min?: number; max?: number }) => void;
}

const Amounts: FC<AmountsProps> = ({ amountRange, setAmountRange }) => {
  const DEFAULT_MIN = 0;
  const DEFAULT_MAX = 2000;
  const DEFAULT_ACTIVE_MAX = 1000;

  const [minValue, setMinValue] = useState(amountRange.min ?? DEFAULT_MIN);
  const [maxValue, setMaxValue] = useState(
    amountRange.max ?? DEFAULT_ACTIVE_MAX
  );
  const [open, setOpen] = useState(!!(amountRange.min || amountRange.max));

  const parseCurrency = (value: string) => {
    return Number(value.replace(/[^\d]/g, '')) || 0;
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseCurrency(e.target.value);
    const value = Math.min(raw, maxValue);
    setMinValue(value);
    setAmountRange({ min: value, max: maxValue });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseCurrency(e.target.value);
    const value = Math.max(raw, minValue);
    setMaxValue(value);
    setAmountRange({ min: minValue, max: value });
  };

  const handleSliderChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'min' | 'max'
  ) => {
    const value = Number(e.target.value);
    if (type === 'min') {
      const newMin = Math.min(value, maxValue);
      setMinValue(newMin);
      setAmountRange({ min: newMin, max: maxValue });
    } else {
      const newMax = Math.max(value, minValue);
      setMaxValue(newMax);
      setAmountRange({ min: minValue, max: newMax });
    }
  };

  useEffect(() => {
    if (open) {
      const min = Math.min(amountRange.min ?? DEFAULT_MIN, DEFAULT_MAX);
      const max = Math.min(amountRange.max ?? DEFAULT_ACTIVE_MAX, DEFAULT_MAX);
      setMinValue(min);
      setMaxValue(max);
    }
  }, [amountRange, open]);


  return (
    <div className='mb-9'>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center'>
          <img
            src={commission_icon}
            alt='commission_icon'
            className='w-[24px] h-[24px]'
          />
          <p className='ml-5'>Monto</p>
        </div>
        <ToggleSwitch
          checked={open}
          onChange={() => setOpen((prev) => !prev)}
        />
      </div>
      {open && (
        <div className='w-4/5 m-auto pt-5 max-w-xl'>
          <div className='relative h-2 bg-blue-100 rounded-full mb-6'>
            <div
              className='absolute h-2 bg-blue-700 rounded-full'
              style={{
                left: `${
                  ((Math.min(minValue, DEFAULT_MAX) - DEFAULT_MIN) /
                    (DEFAULT_MAX - DEFAULT_MIN)) *
                  100
                }%`,
                width: `${
                  ((Math.min(maxValue, DEFAULT_MAX) -
                    Math.min(minValue, DEFAULT_MAX)) /
                    (DEFAULT_MAX - DEFAULT_MIN)) *
                  100
                }%`,
              }}
            />

            <input
              type='range'
              min={DEFAULT_MIN}
              max={DEFAULT_MAX}
              value={Math.min(minValue, DEFAULT_MAX)}
              onChange={(e) => handleSliderChange(e, 'min')}
              className='absolute w-full h-2 bg-transparent appearance-none z-10'
            />
            <input
              type='range'
              min={DEFAULT_MIN}
              max={DEFAULT_MAX}
              value={Math.min(maxValue, DEFAULT_MAX)}
              onChange={(e) => handleSliderChange(e, 'max')}
              className='absolute w-full h-2 bg-transparent appearance-none z-10'
            />

            <div
              className='absolute top-[-36px] text-blue-800 font-semibold text-sm'
              style={{
                left: `${
                  ((Math.min(maxValue, DEFAULT_MAX) - DEFAULT_MIN) /
                    (DEFAULT_MAX - DEFAULT_MIN)) *
                  100
                }%`,
                transform: 'translateX(-50%)',
              }}
            >
              ${maxValue}
            </div>
          </div>
          <div className='flex justify-between gap-4'>
            <div className='text-center border border-blue-700 rounded-xl px-1 py-1 w-full'>
              <p className='text-gray-500 text-xs'>Monto mínimo</p>
              <input
                type='text'
                value={`$${minValue}`}
                onChange={handleMinChange}
                className='text-base text-gray-800 text-center text-sm outline-none w-full no-spinner'
              />
            </div>
            <div className='text-center border border-blue-700 rounded-xl px-1 py-1 w-full'>
              <p className='text-gray-500 text-xs'>Monto máximo</p>
              <input
                type='text'
                value={`$${maxValue}`}
                onChange={handleMaxChange}
                className='text-base text-gray-800 text-center text-sm outline-none w-full no-spinner'
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Amounts;
