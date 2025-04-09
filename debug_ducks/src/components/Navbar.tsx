'use client';
// This is from my Nextjs resources, Navbar_basic
import Image from 'next/image';
import logo from '../assets/UGAlogo_Arch_1in.png';
import {useState} from 'react';
import Link from 'next/link';
// import profileDefault from '@/assets/images/profile.png';

const Navbar = () => {


  const [isLoggedIn,setIsLoggedIn ] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(prev => !prev);

  }

  return (
    <nav className='bg-white border-b border-gray-200 shadow-sm'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-20 items-center justify-between'>

          {/* Mobile Menu Button */}
          <div className='absolute inset-y-0 left-0 flex items-center md:hidden'>
            <button
              type='button'
              id='mobile-dropdown-button'
              className='inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black'
              aria-controls='mobile-menu'
              aria-expanded='false'
            >
              <svg
                className='block h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h16' />
              </svg>
            </button>
          </div>

          {/* Logo & Site Title */}
          <Link className='flex items-center' href='/'>
            <span className='hidden md:block text-teal-600 text-3xl font-bold ml-2'>
              ClassClips
            </span>
          </Link>

          {/* Desktop Links */}
          <div className='hidden md:ml-6 md:flex space-x-4'>
            <Link href='/' className='text-black hover:underline px-3 py-2'>
              Home
            </Link>
            <Link href='/about' className='text-black hover:underline px-3 py-2'>
              About
            </Link>
            
            <Link href='/show-items' className='text-black hover:underline px-3 py-2'>
              Content
            </Link>
          </div>

          {/* Auth Button */}
          <div className="hidden md:flex space-x-4">
            <button
              onClick={handleLogin}
              className='px-4 py-1.5 bg-orange-500 text-white border border-black rounded-md hover:bg-orange-600 transition'
            >
              {isLoggedIn ? 'Logout' : 'Login | Register'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className='md:hidden hidden' id='mobile-menu'>
        <div className='space-y-1 px-2 pb-3 pt-2'>
          <Link href='/' className='block text-black rounded-md px-3 py-2 text-base font-medium'>
            Home
          </Link>
          <Link href='/about' className='block text-black rounded-md px-3 py-2 text-base font-medium'>
            About
          </Link>
          <Link href='/show-items' className='block text-black rounded-md px-3 py-2 text-base font-medium'>
            Content
          </Link>
          <button
            onClick={handleLogin}
            className='w-full text-left text-black border border-black px-3 py-2 rounded-md mt-2 hover:bg-black hover:text-white transition'
          >
            {isLoggedIn ? 'Logout' : 'Login or Register'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



// const [isLoggedIn, setIsLoggedIn] = useState(false);
//   // let isLoggedIn = false;

//   const handleLogin = () => {
//     setIsLoggedIn(prev=>!prev);
//   }


