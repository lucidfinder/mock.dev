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
      <div className="text-blue-600 text-2xl font-bold hover-lift">mock.dev</div>

      {/* Navigation Links */}
      <ul className="hidden md:flex gap-6">
        <Link href="/">
          <li
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path === '/interview/' && 'text-primary font-bold'
            }`}
          >
            Dashboard
          </li>
        </Link>
        <Link href="/resume">
          <li
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path === '/resume/' && 'text-primary font-bold'
            }`}
          >
            Resume
          </li>
        </Link>
      </ul>

      {/* User Profile Button */}
      <UserButton />
    </div>
  );
}

export default Header;
