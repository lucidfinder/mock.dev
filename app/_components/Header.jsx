'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

function Header() {
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      {/* Logo */}
      <a href="/" className=" text-2xl font-bold hover-lift">Mock.<span className="text-blue-600">Dev</span></a>

      {/* Navigation Links */}
      <ul className="hidden md:flex gap-6">

       
        
      </ul>

      {/* User Profile Button */}
      <UserButton />
    </div>
  );
}

export default Header;
