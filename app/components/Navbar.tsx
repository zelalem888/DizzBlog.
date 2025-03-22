"use client";
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const{status, data: session}= useSession()

  return (
    <nav className="w-full h-20 bg-[#000d1e] flex justify-between items-center px-4 lg:px-[10%] rounded-b-lg shadow-lg">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-[35px] h-px bg-[#f2994a] rotate-90"></div>
        <div className="text-white text-2xl font-['Montserrat'] hover:text-[#f2994a] transition-colors duration-300">
          <Link href="/">DizzNews.</Link>
        </div>
      </div>

      {/* Toggle Button (Mobile Only) */}
      <button
        className="lg:hidden text-white focus:outline-none"
        onClick={toggleMenu}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
          />
        </svg>
      </button>

      {/* Menu Items */}
      <div
        className={`${isMenuOpen ? 'block' : 'hidden'} lg:flex lg:items-center lg:gap-8 absolute lg:static top-20 left-0 w-full bg-[#000d1e] lg:bg-transparent z-10 rounded-b-lg lg:rounded-none shadow-lg lg:shadow-none`}
      >
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 p-4 lg:p-0 lg:ml-auto">
        {
          status === 'authenticated' && <div className="text-white text-sm cursor-pointer hover:text-[#f2994a] transition-colors duration-300">
            <Link href="/pages/blog/create/">Create Blog</Link>
          </div>
        }
          <div className="text-white text-sm cursor-pointer hover:text-[#f2994a] transition-colors duration-300">
            <Link href="/pages/about/">About Us</Link>
          </div>
          <div className="text-white text-sm cursor-pointer hover:text-[#f2994a] transition-colors duration-300">
            <Link href="/pages/contact/">Contact Us</Link>
           
          </div>
          {status === 'loading' && <div className="text-white text-sm cursor-pointer hover:text-[#f2994a] transition-colors duration-300">
            loading...
          </div> }
          {
            status=== 'unauthenticated' && <div className="text-white text-sm cursor-pointer hover:text-[#f2994a] transition-colors duration-300">
            <Link href="/pages/login">Login</Link>
          </div>
          }
          {status === 'authenticated' &&  <div className="text-white text-sm cursor-pointer hover:text-[#f2994a] transition-colors duration-300">
            <Link href="/pages/">My Page</Link>
           
          </div>}
          {status === 'authenticated' && <div className="text-white text-sm">
            {session.user?.name}
            
          </div>
          }
          {status ==='authenticated' && <div className="text-white text-sm">
            <Link href={'/api/auth/signout'}>SingOut</Link>
            
          </div>}
          
        </div>
      </div>
    </nav>
  );
}