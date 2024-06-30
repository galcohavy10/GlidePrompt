import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <div className='max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300'>
      <div>
        <Link to="/">
          <img src={logo} alt="glideprompt Logo" className='w-auto h-32 object-cover cursor-pointer' />
        </Link>
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
          <Link className='py-1 text-sm' to="/">Home</Link>
          {/* <Link className='py-1 text-sm' to="/roadmap">Roadmap</Link> */}
          <Link className='py-1 text-sm' to="/faq">FAQ</Link>
          <Link className='py-1 text-sm' to="/about">About</Link>
          <Link className='py-1 text-sm' to="/contact">Contact</Link>
          <Link className='py-1 text-sm' to="/privacyPolicy">Privacy</Link>
          <Link className='py-1 text-sm' to="/tos">Terms of Service</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;

