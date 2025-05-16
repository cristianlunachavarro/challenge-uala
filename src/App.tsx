import { useState } from 'react';
import NavBar from '@/components/navbar';
import Header from '@/components/header';
import Transactions from '@/components/transactions';
import TimeRange from '@/components/timeRange';

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className='flex bg-[#FAFAFA]'>
      <NavBar isOpen={isNavOpen} setIsOpen={setIsNavOpen} />
      <div className='flex-1'>
        <Header setIsNavOpen={setIsNavOpen} />
        <TimeRange />
        <Transactions />
      </div>
    </div>
  );
}

export default App;
