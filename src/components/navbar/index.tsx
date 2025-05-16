import React from 'react';

import uala_logo from '@/assets/navbar/uala-logo.png';
import home_logo from '@/assets/navbar/home-logo.png';
import fill_logo from '@/assets/navbar/fill-logo.png';
import google_store from '@/assets/navbar/google-play.png';
import app_store from '@/assets/navbar/app-store.png';
import back_button from '@/assets/navbar/back-button.png';

interface NavBarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar: React.FC<NavBarProps> = ({ isOpen, setIsOpen }) => {
  return (
    <>
      <div
        className={`flex flex-col justify-between min-h-screen bg-white nav-shadow-right fixed top-0 z-50 transition-transform duration-300
         w-full md:w-1/4 md:translate-x-0 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:static`}
      >
        <div>
          <div className='flex justify-between items-center cursor-pointer md:mt-8 mt-6 mb-9 ml-5'>
            <img
              className='w-[120px] h-[40px]'
              src={uala_logo}
              alt='uala_logo'
            />
            <img
              className='w-[8px] h-[14.5px] mr-5 md:hidden'
              onClick={() => setIsOpen(false)}
              src={back_button}
              alt='back_button'
            />
          </div>
          <div className='flex md:pl-7 pl-0 pb-7 items-center justify-center md:justify-start'>
            <img
              className='w-[24px] h-[24px] mr-5'
              src={home_logo}
              alt='home_logo'
            />
            <p className='text-sm font-normal'>Inicio</p>
          </div>
          <div className='flex md:pl-7 pl-0 pb-7 items-center justify-center md:justify-start'>
            <img
              className='w-[20px] h-[18.55px] mr-5'
              src={fill_logo}
              alt='fill_logo'
            />
            <p className='text-sm font-normal'>Métricas</p>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center mb-4 p-5'>
          <h4 className='mb-6 text-lg font-semibold'>Descargá la app desde</h4>
          <div className='flex flex-col items-center'>
            <img
              src={google_store}
              alt='google_store'
              className='w-36 h-10 mb-6'
            />
            <img
              src={app_store}
              alt='app_store'
              className='w-[136px] h-[40px]'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
