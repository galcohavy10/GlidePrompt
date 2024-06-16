import React from 'react';
// import {
//   FaGithubSquare,
//   FaInstagram,
//   FaTwitterSquare,
// } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Footer = ({ setCurrentPage }) => {

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll smoothly to the top of the device screen
  };

  return (
    <div className='max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300'>
      <div>
      <img src={logo} alt="NEXAFLOW Logo" className='w-auto h-32 object-cover cursor-pointer' onClick={() => setCurrentPage('home')} />
        <p className='py-4'>Building tools to enable AI builders.</p>
        {/* <div className='flex justify-between md:w-[75%] my-6'>
            <a href="https://www.instagram.com/ustockapp/" target="_blank" rel="noreferrer"><FaInstagram size={30} /></a>
            <a href="https://www.twitter.com/CohavyGal" target="_blank" rel="noreferrer"><FaTwitterSquare size={30} /></a>
            <a href="https://www.github.com/galcohavy10" target="_blank" rel="noreferrer"><FaGithubSquare size={30} /></a>
        </div> */}
      </div>
      <div className='lg:col-span-2 flex flex-col items-start mt-6'>
        <h6 className='font-medium text-gray-400 mb-2'>LINKS</h6>
        <div className='flex flex-wrap space-x-4 md:space-x-8'>
            <button className='py-1 text-sm' onClick={() => handlePageChange('home')}>Home</button>
            {/* <button className='py-1 text-sm' onClick={() => handlePageChange('roadmap')}>Roadmap</button> */}
            <button className='py-1 text-sm' onClick={() => handlePageChange('faq')}>FAQ</button>
            <button className='py-1 text-sm' onClick={() => handlePageChange('about')}>About</button>
            <button className='py-1 text-sm' onClick={() => handlePageChange('contact')}>Contact</button>
            <button className='py-1 text-sm' onClick={() => handlePageChange('privacyPolicy')}>Privacy</button>
            <button className='py-1 text-sm' onClick={() => handlePageChange('tos')}>Terms of Service</button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
