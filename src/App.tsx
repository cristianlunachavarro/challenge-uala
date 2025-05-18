import { useState } from 'react';
import NavBar from '@/components/navbar';
import Header from '@/components/header';
import Transactions from '@/components/transactions';
import TimeRange from '@/components/timeRange';
import Error from '@/components/alert';
import Metrics from '@/components/metrics';

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [isOpenExport, setOpenExport] = useState<boolean>(false);
  const [isOpenMetrics, setIsOpenMetrics] = useState(false);

  return (
    <div className='flex h-screen overflow-hidden bg-[#FAFAFA]'>
      <NavBar isOpen={isNavOpen} setIsOpen={setIsNavOpen} />
      <div className='flex-1 h-screen overflow-y-auto'>
        <div className='sticky top-0 z-10 bg-[#FAFAFA]'>
          <Header setIsNavOpen={setIsNavOpen} />
        </div>
        <TimeRange />
        <Metrics
          isOpenMetrics={isOpenMetrics}
          setOpenExport={setOpenExport}
          setIsOpenMetrics={setIsOpenMetrics}
        />
        <Transactions
          isOpenModal={isOpenModal}
          isOpenExport={isOpenExport}
          setOpenModal={setOpenModal}
          setOpenExport={setOpenExport}
        />
        <Error />
      </div>
    </div>
  );
}

export default App;
