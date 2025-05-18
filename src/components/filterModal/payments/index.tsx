import { FC, useState } from 'react';

import categoires_icon from '@/assets/filter/categories-icon.png';

import { useTransactionStore } from '@/store/useTransactionStore';
import { PaymentMethod } from '@/types/transactions';

import ToggleSwitch from '@/components/transactions/toggleSwitch';

interface PaymentsProps {
  selectedPayments: string[];
  selectPayment: (payment: string) => void;
}

const Payments: FC<PaymentsProps> = ({ selectedPayments, selectPayment }) => {
  const paymentMethodsOptions = useTransactionStore(
    (state) => state.metadata.paymentMethods
  );

  const [open, setOpen] = useState(!!selectedPayments?.length);

  return (
    <div className='mb-9'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <img
            src={categoires_icon}
            alt='categories-icon'
            className='w-[24px] h-[24px]'
          />
          <p className='ml-5'>Método de cobro</p>
        </div>
        <ToggleSwitch
          dataTestId={'payment-toggle-switch'}
          checked={open}
          onChange={() => setOpen((prev) => !prev)}
        />
      </div>
      {open && (
        <div className='overflow-x-auto pb-3 px-2'>
          <div className='flex flex-row justify-start mt-5 gap-3 min-w-fit'>
            {paymentMethodsOptions.map((pm: PaymentMethod) => {
              const isSelected = (selectedPayments || []).includes(
                pm.value as string
              );
              return (
                <button
                  key={pm.value}
                  onClick={() => selectPayment(pm.value as string)}
                  className={`flex items-center px-4 py-1.5 rounded-full border text-sm font-medium transition-colors whitespace-nowrap ${
                    isSelected
                      ? 'bg-blue-100 text-blue-900 border-blue-900'
                      : 'text-blue-900 border-blue-900'
                  }`}
                >
                  {pm.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
