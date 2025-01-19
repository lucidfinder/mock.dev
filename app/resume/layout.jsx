"use client";
import React, { useState } from 'react';
import { Sidebar } from '../_components/sidebar';
import Header from '../_components/Header';



function page({ children }) {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1'>
        <Header />
        <div>{children}</div>
      </div>
    </div>
  );
}

export default page;
