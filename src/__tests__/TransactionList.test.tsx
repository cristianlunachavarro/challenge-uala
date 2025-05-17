import { render, screen } from '@testing-library/react';

import dayjs from 'dayjs';
import '@testing-library/jest-dom';

import TransactionList from '@/components/transactions/transactionList';

jest.mock('@/store/useTransactionStore', () => ({
  useTransactionStore: jest.fn(),
}));

import { useTransactionStore } from '@/store/useTransactionStore';

const mockTransaction = [
  {
    id: '9e610322-cda9-4903-aabb-3b14309d95b1',
    amount: 1106.39,
    card: 'mastercard',
    installments: 1,
    createdAt: '2025-12-10T04:02:53Z',
    updatedAt: '2025-12-10T04:27:53Z',
    paymentMethod: 'pospro',
  },
  {
    id: '2',
    amount: 200,
    card: 'mastercard',
    installments: 2,
    createdAt: '2025-11-10T04:02:53Z',
    updatedAt: '2025-12-10T04:27:53Z',
    paymentMethod: 'visa',
  },
];

describe('TransactionList', () => {
  test('Render all parameters formated from a transaction', () => {
    (useTransactionStore as unknown as jest.Mock).mockReturnValue({
      loading: false,
    });

    render(<TransactionList transactions={mockTransaction} />);
    expect(
      screen.getByText(`+$${mockTransaction[0].amount.toLocaleString()}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(dayjs(mockTransaction[0].createdAt).format('DD/MM/YYYY'))
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockTransaction[0].paymentMethod)
    ).toBeInTheDocument();
  });

  test('Render múltiples transactions', () => {
    (useTransactionStore as unknown as jest.Mock).mockReturnValue({
      loading: false,
    });

    render(<TransactionList transactions={mockTransaction} />);
    expect(screen.getByText('pospro')).toBeInTheDocument();
    expect(screen.getByText('visa')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  test('Show "not result view" when not transaction found', () => {
    (useTransactionStore as unknown as jest.Mock).mockReturnValue({
      loading: false,
    });

    render(<TransactionList transactions={[]} />);
    expect(
      screen.getByText(
        'No hay resultados que mostrar. Podés probar usando los filtros.'
      )
    ).toBeInTheDocument();
  });

  test('Shows skeleton when loading', () => {
    (useTransactionStore as unknown as jest.Mock).mockReturnValue({
      loading: true,
    });

    render(<TransactionList transactions={[]} />);
    expect(
      screen.getByTestId('transactions-list-skeleton')
    ).toBeInTheDocument();
  });
});


