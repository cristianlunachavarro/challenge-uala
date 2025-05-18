import { useEffect, useRef, useState } from 'react';

import { useTransactionStore } from '@/store/useTransactionStore';

const Alert = () => {
  const alert = useTransactionStore((state) => state.alert);
  const setAlert = useTransactionStore((state) => state.setAlert);

  const [visible, setVisible] = useState(false);

  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (alert) {
      setVisible(true);

      setTimeout(() => {
        errorRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

      const timeout = setTimeout(() => {
        setVisible(false);
        setTimeout(() => setAlert(null), 300);
      }, 4000);

      return () => clearTimeout(timeout);
    }
  }, [alert, setAlert]);

  return (
    <>
      {alert && (
        <div
          ref={errorRef}
          className={`md:w-3/4 w-[90%] bg-[#002066] text-white text-base font-normal px-4 py-2 mx-auto mb-4 md:px-4 md:py-2 rounded-md shadow-lg transition-opacity duration-300 ${
            true ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <p className='text-center'>{alert}</p>
        </div>
      )}
    </>
  );
};

export default Alert;
