import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import logo from '../assets/logo.png';
import Auth from './Auth';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [nav, setNav] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="relative">
      <div className='flex justify-between items-center h-24 max-w-[1400px] mx-auto px-4 text-white'>
        <img
          src={logo}
          alt="NEXAFLOW Logo"
          className='w-auto h-20 object-cover cursor-pointer'
          onClick={() => setCurrentPage('home')}
        />
        <ul className='hidden md:flex'>
          <li className='p-4 cursor-pointer' onClick={() => setCurrentPage('home')}>Home</li>
          <li className='p-4 cursor-pointer' onClick={() => setCurrentPage('roadmap')}>Roadmap</li>
          <li className='p-4 cursor-pointer' onClick={() => setCurrentPage('faq')}>FAQ</li>
          <li className='p-4 cursor-pointer' onClick={() => setCurrentPage('about')}>About</li>
          <li className='p-4 cursor-pointer' onClick={() => setCurrentPage('contact')}>Contact</li>
          <li className='p-4 cursor-pointer bg-veryLightGray text-black rounded' onClick={() => setShowAuth(true)}>Sign Up</li>
        </ul>
        <div onClick={handleNav} className='block md:hidden cursor-pointer'>
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        <ul className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
          <img
            src={logo}
            alt="NEXAFLOW Logo"
            className='w-auto h-32 object-cover cursor-pointer'
            onClick={() => setCurrentPage('home')}
          />
          <li className='p-4 border-b border-gray-600 cursor-pointer' onClick={() => setCurrentPage('home')}>Home</li>
          <li className='p-4 border-b border-gray-600 cursor-pointer' onClick={() => setCurrentPage('roadmap')}>Roadmap</li>
          <li className='p-4 border-b border-gray-600 cursor-pointer' onClick={() => setCurrentPage('faq')}>FAQ</li>
          <li className='p-4 border-b border-gray-600 cursor-pointer' onClick={() => setCurrentPage('about')}>About</li>
          <li className='p-4 cursor-pointer' onClick={() => setCurrentPage('contact')}>Contact</li>
          <li className='p-4 cursor-pointer bg-veryLightGray text-black rounded' onClick={() => setShowAuth(true)}>Sign Up</li>
        </ul>
      </div>

      {showAuth && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <Auth />
            <button onClick={() => setShowAuth(false)} className="mt-4 text-blue-500">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
