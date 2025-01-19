"use client";
import { HomeIcon, BookOpenIcon, FileTextIcon, UsersIcon, Laptop } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React, { useState } from 'react';

const navItems = [
  { icon: HomeIcon, label: "Home", href: "/" },
  { icon: UsersIcon, label: "Interview", href: "/interview" },
  { icon: Laptop, label: "Practice", href: "/practice" },
  { icon: FileTextIcon, label: "Resume Analysis", href: "/resume" },

];

export const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="md:hidden p-2 focus:outline-none absolute top-4 left-4 z-50"
      >
        <svg
          className="h-6 w-6 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
      <nav
        className={cn(
          "fixed md:static top-0 left-0 w-64 md:w-64 border-r border-gray-200 min-h-[calc(100vh-4rem)] transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          pathname === "/practice" ? "bg-gray-800" : "bg-white",
          "z-40",
          "md:block hidden"
        )}
      >
        <div className="p-4 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors",
                pathname === "/practice" ? "text-gray-200" : "text-gray-600",
                pathname === item.href && "bg-primary/10 text-primary"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className={cn(pathname === "/practice" && item.href === "/practice" && "text-primary")}>{item.label}</span>
            </a>
          ))}
        </div>
      </nav>
    </>
  );
};
