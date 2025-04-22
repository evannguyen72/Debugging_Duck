'use client';
// This is from my Nextjs resources, Navbar_basic
import Image from 'next/image';
import logo from '../assets/UGAlogo_Arch_1in.png';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import { Session } from "next-auth";
import { doLogout } from "../app/actions/index";

interface Session {
  user?: {
    name?: string;
    email?: string;
    image?: string;
  };
}
interface NavbarProps {
  session: Session | null;
}

const Navbar = ({ session }: NavbarProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!session?.user);
 
  useEffect(() => {
    setIsLoggedIn(!!session?.user);
  }, [session]);

  const handleLogout = () => {
    doLogout();
    setIsLoggedIn(!!session?.user);
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
  
          {/* Left - Logo + nav links */}
          <div className="flex items-center space-x-6">
            <Link className="flex items-center" href="/">
              <span className="hidden md:block text-teal-900 text-2xl font-bold ml-2">ClassClips</span>
            </Link>
  
            <div className="hidden md:flex space-x-4 ml-4">
              <Link href="/" className="text-teal-800 hover:text-orange-600 font-medium px-3 py-2 rounded transition">Home</Link>
              <Link href="/show-items" className="text-teal-800 hover:text-orange-600 font-medium px-3 py-2 rounded transition">Content</Link>
            </div>
          </div>
  
          {/* Right - Auth status */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn && session?.user ? (
              <>
                <span className="text-teal-900 font-medium">Welcome, {session.user?.name || session.user?.email}</span>
                <button
                  onClick={handleLogout}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition">
                <Link href="/login" className="mr-1">Login</Link> | <Link href="/signup" className="ml-1">Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;