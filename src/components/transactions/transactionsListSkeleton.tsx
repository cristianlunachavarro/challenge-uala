const TransactionsListSkeleton = () => {
  return (
    <div className='overflow-y-auto max-h-[350px] pr-2 animate-pulse'>
      <ul className='space-y-4'>
        {Array.from({ length: 5 }).map((_, idx) => (
          <li key={idx} className='border-b py-3'>
            <div className='flex justify-between'>
              <div className='flex'>
                <div className='w-[32px] h-[32px] bg-gray-300 rounded-full self-center mr-2' />
                <div className='flex flex-col space-y-1'>
                  <div className='w-24 h-4 bg-gray-300 rounded' />
                  <div className='w-16 h-3 bg-gray-200 rounded' />
                </div>
              </div>
              <div className='flex flex-col items-end space-y-1 text-right'>
                <div className='w-20 h-4 bg-gray-300 rounded' />
                <div className='w-24 h-3 bg-gray-200 rounded' />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsListSkeleton;
