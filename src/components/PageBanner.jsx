'use client';

import React from 'react';
import Link from 'next/link';

const PageBanner = ({ title, backgroundImage }) => {
  return (
    <div
      className="relative h-48 md:h-64 flex items-center justify-center text-white text-center"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 58, 38, 0.5), rgba(15, 58, 38, 0.5)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
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
