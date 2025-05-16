import { useCallback, useEffect, useState } from 'react';

import back_button from '@/assets/filter/back-button.png';

import { useTransactionStore } from '@/store/useTransactionStore';

import Installments from '@/components/filterModal/installments';
import Cards from '@/components/filterModal/cards';
import Dates from '@/components/filterModal/dates';
import Amounts from '@/components/filterModal/amounts';
import Payments from '@/components/filterModal/payments';

interface FilterProps {
  setOpenModal: (value: boolean) => void;
}

const FilterModal: React.FC<FilterProps> = ({ setOpenModal }) => {
  const cardMeta = useTransactionStore((state) => state.metadata.cards);
  const clearStoreFilters = useTransactionStore((state) => state.clearFilters);

  const setStoreFilters = useTransactionStore((state) => state.setFilters);

  const storeFilters = useTransactionStore((state) => state.filters);

  const [selectedCards, setSelectedCards] = useState<string[]>(
    storeFilters?.cards || []
  );
  const [selectedInstallment, setSelectedInstallment] = useState<number | null>(
    storeFilters?.installments || null
  );
  const [selectedPayments, setSelectedPayments] = useState<string[]>(
    storeFilters?.paymentMethod || []
  );
  const [dateRange, setDateRange] = useState<{ from?: string; to?: string }>(
    storeFilters.dateRange || {}
  );
  const [amountRange, setAmountRange] = useState<{
    min?: number;
    max?: number;
  }>(storeFilters.amountRange || {});

  const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);

  const selectCard = (value: string) => {
    setSelectedCards((prev) => {
      const allCards = cardMeta.map((c) => c.value);

      const isAllSelected =
        allCards.every((c) => prev.includes(c)) && prev.includes('todas');

      if (value === 'todas') {
        return isAllSelected ? [] : ['todas', ...allCards];
      }

      if (value === 'todas') {
        return ['todas', ...allCards];
      }

      let updated = prev.includes(value)
        ? prev.filter((v) => v !== value && v !== 'todas')
        : [...prev.filter((v) => v !== 'todas'), value];

      const hasAll = allCards.every((card) => updated.includes(card));
      if (hasAll) {
        updated = ['todas', ...allCards];
      }

      return updated;
    });
  };

  const selectPayment = (value: string) => {
    setSelectedPayments((prev) => {
      if (prev.includes(value)) {
        return prev.filter((p) => p !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const validateInputs = () => {
    const hasCards = selectedCards.length > 0;
    const hasInstallment = selectedInstallment !== null;
    const hasPayments = selectedPayments.length > 0;
    const hasDateRange = dateRange.from && dateRange.to;
    const hasAmountRange = 
      amountRange.min !== undefined &&
      amountRange.max !== undefined &&
      amountRange.max > 0;

    console.log({
      hasCards,
      hasInstallment,
      hasPayments,
      hasDateRange,
      hasAmountRange,
    });

    return (
      hasCards ||
      hasInstallment ||
      hasPayments ||
      hasDateRange ||
      hasAmountRange
    );
  };

  const selectInstallment = (inst: number) => {
    setSelectedInstallment(inst);
  };

  const clearFilters = () => {
    setSelectedCards([]);
    setSelectedInstallment(null);
    setAmountRange({ min: undefined, max: undefined });
    setSelectedPayments([]);
    setDateRange({});
    clearStoreFilters();
  };

  const handleSubmit = useCallback(() => {
    if (!validateInputs()) return false;
    setStoreFilters({
      cards: selectedCards,
      installments: selectedInstallment,
      amountRange,
      paymentMethod: selectedPayments,
      dateRange,
    });
    setOpenModal(false);
  }, [
    selectedCards,
    selectedInstallment,
    amountRange,
    selectedPayments,
    dateRange,
  ]);

  useEffect(() => {
    console.log('pasda aca')
    if (validateInputs()) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [
    selectedCards,
    selectedInstallment,
    amountRange,
    selectedPayments,
    dateRange,
    clearFilters,
    setAmountRange
  ]);

  console.log({ amountRange });

  return (
    <div className='fixed inset-0 z-[90] bg-black bg-opacity-30 backdrop-blur-sm'>
      <div
        className='flex flex-col fixed top-0 right-0 h-full w-full md:w-2/5 bg-white shadow-lg z-50 p-9 overflow-y-auto 
    transition-transform duration-300 ease-in-out justify-between h-full'
      >
        <div>
          <div className='flex mb-9 content-center'>
            <img
              onClick={() => setOpenModal(false)}
              className='w-[8px] h-[14.5px] self-center cursor-pointer'
              src={back_button}
              alt='back-button'
            />
            <h1 className='pl-7 text-base text-gray-700'>Filtros</h1>
          </div>
          <div className='flex flex-row justify-between mb-9'>
            <h2 className='text-base font-semibold'>Todos los filtros</h2>
            <p
              className='text-gray-400 cursor-pointer'
              onClick={() => clearFilters()}
            >
              Limpiar
            </p>
          </div>
          <Dates dateRange={dateRange} setDateRange={setDateRange} />
          <Cards selectedCards={selectedCards} selectCard={selectCard} />

          <Installments
            selectedInstallment={selectedInstallment}
            selectInstallment={selectInstallment}
          />
          <Amounts amountRange={amountRange} setAmountRange={setAmountRange} />
          <Payments
            selectedPayments={selectedPayments}
            selectPayment={selectPayment}
          />
        </div>
        <button
          disabled={submitDisabled}
          className={`${
            submitDisabled ? 'bg-[#B7BFD3]' : 'bg-blue-800'
          } w-full text-white py-3 px-8 rounded-full`}
          onClick={handleSubmit}
        >
          Aplicar filtros
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
