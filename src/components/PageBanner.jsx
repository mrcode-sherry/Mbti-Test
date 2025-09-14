'use client';

import React from 'react';
import Link from 'next/link';

const PageBanner = ({ title }) => {
  return (
    <div
      className="relative h-48 md:h-64 flex items-center justify-center text-white text-center"
      style={{
        backgroundColor: '#14442E', // solid green background (change if needed)
      }}
    >
      <div>
        <h1 className="text-3xl md:text-[50px] mb-2">{title}</h1>
        <p className="text-sm">
          <Link href="/" className="hover:underline text-white">
            HOME
          </Link>{' '}
          / {title.toUpperCase()}
        </p>
      </div>
    </div>
  );
};

export default PageBanner;
