import { FC, useMemo, useState } from 'react';

import card_icon from '@/assets/filter/card-icon.png';

import { useTransactionStore } from '@/store/useTransactionStore';
import { Card } from '@/types/transactions';

import ToggleSwitch from '@/components/transactions/toggleSwitch';

interface CardsProps {
  selectedCards: string[];
  selectCard: (card: string) => void;
}

const Cards: FC<CardsProps> = ({ selectedCards, selectCard }) => {
  const cardOptions = useTransactionStore((state) => state.metadata.cards);

  const [open, setOpen] = useState(!!selectedCards?.length);

  const shownOptions = useMemo(
    () => [{ value: 'todas', label: 'Todas' }, ...cardOptions],
    [cardOptions]
  );

  return (
    <div className='mb-9'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <img src={card_icon} alt='card-icon' className='w-[24px] h-[24px]' />
          <p className='ml-5'>Tarjeta</p>
        </div>
        <ToggleSwitch
          checked={open}
          onChange={() => setOpen((prev) => !prev)}
        />
      </div>
      {open && (
        <div className='flex flex-row justify-center mt-5 gap-3'>
          {shownOptions.map((card: Card) => {
            const isSelected = (selectedCards || []).includes(
              card.value as string
            );
            return (
              <button
                key={card.value}
                onClick={() => selectCard(card.value as string)}
                className={`flex items-center px-4 py-1.5 rounded-full border text-sm font-medium transition-colors ${
                  isSelected
                    ? 'bg-blue-100 text-blue-900 border-blue-900'
                    : 'text-blue-900 border-blue-900'
                }`}
              >
                {card.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Cards;
