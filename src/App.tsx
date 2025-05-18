import { useState } from 'react';
import NavBar from '@/components/navbar';
import Header from '@/components/header';
import Transactions from '@/components/transactions';
import TimeRange from '@/components/timeRange';
import Error from '@/components/alert';
import Metrics from '@/components/metrics';

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className='flex bg-[#FAFAFA] min-h-[980px]'>
      <NavBar isOpen={isNavOpen} setIsOpen={setIsNavOpen} />
      <div className='flex-1 min-h-[980px]' >
        <Header setIsNavOpen={setIsNavOpen} />
        <TimeRange />
        <Metrics />
        <Transactions />
        <Error />
      </div>
    </div>
  );
}

export default App;
