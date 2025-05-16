import { FC, useState } from 'react';

import program_deposit_icon from '@/assets/filter/program-deposit-icon.png';

import { useTransactionStore } from '@/store/useTransactionStore';

import ToggleSwitch from '@/components/transactions/toggleSwitch';

interface InstallmentsProps {
  selectedInstallment: number | null;
  selectInstallment: (inst: number) => void;
}

const Installments: FC<InstallmentsProps> = ({
  selectedInstallment,
  selectInstallment,
}) => {
  const transactions = useTransactionStore((state) => state.transactions);
  const installmentOptions = [1, 2, 3, 6, 12];
  const [open, setOpen] = useState(false);

  return (
    <div className='mb-9'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <img
            src={program_deposit_icon}
            alt='program-deposit-icon'
            className='w-[24px] h-[24px]'
          />
          <p className='ml-5'>Cuotas</p>
        </div>
        <ToggleSwitch
          checked={open}
          onChange={() => setOpen((prev) => !prev)}
        />
      </div>
      {open && (
        <div className='flex flex-row justify-center mt-5 gap-3'>
          {installmentOptions.map((inst: number) => {
            const isSelected = selectedInstallment === inst;
            return (
              <button
                key={inst}
                onClick={() => selectInstallment(inst)}
                className={`flex items-center px-4 py-1.5 rounded-full border text-sm font-medium transition-colors ${
                  isSelected
                    ? 'bg-blue-100 text-blue-900 border-blue-900'
                    : 'text-blue-900 border-blue-900'
                }`}
              >
                {inst}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Installments;
