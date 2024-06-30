import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import Auth from './Auth';
import AuthButton from './AuthButton';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="relative">
      <div className='flex justify-between items-center h-24 max-w-[1400px] mx-auto px-4 text-white'>
        <Link to="/">
          <img src={logo} alt="glideprompt Logo" className='w-auto h-20 object-cover cursor-pointer' />
        </Link>
        <ul className='hidden md:flex'>
          <li className='p-4'>
            <NavLink to="/" exact className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-white')}>Home</NavLink>
          </li>
          <li className='p-4'>
            <NavLink to="/faq" className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-white')}>FAQ</NavLink>
          </li>
          <li className='p-4'>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-white')}>About</NavLink>
          </li>
          <li className='p-4'>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-white')}>Contact</NavLink>
          </li>
          <AuthButton setShowAuth={setShowAuth} />
        </ul>
        <div onClick={handleNav} className='block md:hidden cursor-pointer'>
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        <ul className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
          <Link to="/" onClick={handleNav}>
            <img src={logo} alt="glideprompt Logo" className='w-auto h-32 object-cover cursor-pointer' />
          </Link>
          <li className='p-4 border-b border-gray-600' onClick={handleNav}>
            <NavLink to="/" exact className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-white')}>Home</NavLink>
          </li>
          <li className='p-4 border-b border-gray-600' onClick={handleNav}>
            <NavLink to="/faq" className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-white')}>FAQ</NavLink>
          </li>
          <li className='p-4 border-b border-gray-600' onClick={handleNav}>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-white')}>About</NavLink>
          </li>
          <li className='p-4' onClick={handleNav}>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-white')}>Contact</NavLink>
          </li>
          <AuthButton setShowAuth={setShowAuth} />
        </ul>
      </div>

      {showAuth && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <Auth onClose={() => setShowAuth(false)} />
        <button onClick={() => setShowAuth(false)} className="absolute top-2 right-2 text-gray-700">X</button> 
        </div>
      </div>
      )}
    </div>
  );
};

export default Navbar;
