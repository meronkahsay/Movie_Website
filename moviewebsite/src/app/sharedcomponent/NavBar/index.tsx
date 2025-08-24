"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '../Button';
import Link from 'next/link';
import SearchBar from '../SearchBar';
import { usePathname } from 'next/navigation';

interface Props {
  onSearch: (query: string) => void;
}

const NavBar: React.FC<Props> = ({ onSearch }) => {
  const pathName = usePathname();
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/signin');
  };

  return (
    <div>
      <nav className="text-xl w-full h-15 bg-gray-800 text-white flex justify-around items-center px-8">
        <div className="text-4xl">
          M<span className="text-yellow-600">oo</span>vie
        </div>
        <SearchBar onSearch={onSearch} />
        <Link href="/home" className={pathName === '/home' ? 'text-yellow-500 font-bold border-b' : 'text-white'}>
          Home
        </Link>
        <Link href="/favorites" className={pathName === '/favorites' ? 'text-yellow-600 font-bold border-b-yellow-600' : 'text-white'}>
          Favorites
        </Link>
        <Button text="Sign In" onClick={handleSignIn} variant="filled" classname="px-9 py-2 rounded-2xl" />
      </nav>
    </div>
  );
};

export default NavBar;