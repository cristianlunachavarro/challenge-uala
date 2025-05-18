import { act, render, screen, waitFor } from '@testing-library/react';

import Payments from '../components/filterModal/payments';

jest.mock('../store/useTransactionStore', () => ({
  useTransactionStore: (selector: any) =>
    selector({
      metadata: {
        paymentMethods: [
          { value: 'link', label: 'Link de pago' },
          { value: 'qr', label: 'Código QR' },
          { value: 'mpos', label: 'mPOS' },
          { value: 'pospro', label: 'POS Pro' },
        ],
      },
    }),
}));

describe('Payments component', () => {
  test('Renders payemtn methods from the store', async () => {
    render(<Payments selectedPayments={['link']} selectPayment={() => {}} />);
    const toggleSwitch = screen.getByTestId('payment-toggle-switch');
    act(() => {
      toggleSwitch.click();
    });

    waitFor(() => {
      const expectedLabels = ['Link de pago', 'Código QR', 'mPOS', 'POS Pro'];
      expectedLabels.forEach((label) => {
        expect(screen.getByText(label)).toBeInTheDocument();
      });
    });
  });
});
