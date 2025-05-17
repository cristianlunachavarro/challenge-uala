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
    <div
      ref={errorRef}
      className='h-[48px] flex items-center justify-center mb-5 w-[90%] md:w-[60%] m-auto'
    >
      {alert && (
        <div
          className={`bg-[#002066] text-base text-white font-thin p-2 text-center w-full rounded-md transition-opacity duration-300 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p>{alert}</p>
        </div>
      )}
    </div>
  );
};

export default Alert;
