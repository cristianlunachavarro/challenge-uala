import React from 'react';

import logo from '@/assets/navbar/wallex-logo.jpg';
import menu from '@/assets/header/menu-icon.png';
import photo from '@/assets/header/user-photo.png';

interface HeaderProps {
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ setIsNavOpen }) => {
  return (
    <div>
      <div className='bg-white relative flex items-center justify-center h-16 shadow-sm border-b border-[#dfe3f0] rounded-b-[40px] overflow-hidden md:hidden'>
        <div className='absolute bottom-0 left-0 w-[40px] h-[40px]' />
        <div className='absolute bottom-0 right-0 w-[40px] h-[40px]' />
        <img
          src={menu}
          alt='menu'
          className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 z-10 cursor-pointer'
          onClick={() => setIsNavOpen((prev) => !prev)}
        />
        <img src={logo} alt='wallex-logo' className='h-6 z-10' />
      </div>

      <div className='hidden md:flex items-center bg-white px-8 py-4'>
        <img
          src={photo}
          alt='user'
          className='w-10 h-10 rounded-full object-cover mr-4'
        />
        <p className='ml-5 text-base font-semibold'>Cristian Luna</p>
      </div>
    </div>
  );
};

export default Header;
