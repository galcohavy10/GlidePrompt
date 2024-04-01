import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import logo from '../assets/logo.png';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='flex justify-between items-center h-24 max-w-[1400px] mx-auto px-4 text-white'>
    <img src={logo} alt="NEXAFLOW Logo" className='w-auto h-32 object-cover cursor-pointer' onClick={() => setCurrentPage('home')} />
      <ul className='hidden md:flex'>
        <li className='p-4 cursor-pointer' onClick={() => setCurrentPage('home')}>Home</li>
        <li className='p-4 cursor-pointer' onClick={() => setCurrentPage('roadmap')}>Roadmap</li>
        <li className='p-4 cursor-pointer' onClick={() => setCurrentPage('faq')}>FAQ</li>
        <li className='p-4 cursor-pointer' onClick={() => setCurrentPage('about')}>About</li>
        <li className='p-4 cursor-pointer' onClick={() => setCurrentPage('contact')}>Contact</li>
      </ul>
      <div onClick={handleNav} className='block md:hidden cursor-pointer'>
        {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20} />}
      </div>
      <ul className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
      <img src={logo} alt="NEXAFLOW Logo" className='w-auto h-32 object-cover cursor-pointer' onClick={() => setCurrentPage('home')} />
        <li className='p-4 border-b border-gray-600 cursor-pointer' onClick={() => setCurrentPage('home')}>Home</li>
        <li className='p-4 border-b border-gray-600 cursor-pointer' onClick={() => setCurrentPage('roadmap')}>Roadmap</li>
        <li className='p-4 border-b border-gray-600 cursor-pointer' onClick={() => setCurrentPage('faq')}>FAQ</li>
        <li className='p-4 border-b border-gray-600 cursor-pointer' onClick={() => setCurrentPage('about')}>About</li>
        <li className='p-4 cursor-pointer' onClick={() => setCurrentPage('contact')}>Contact</li>
    </ul>

    </div>
  );
};

export default Navbar;
