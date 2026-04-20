'use client';

import React from 'react'
import CategoryPage from '@/components/CategoryPage'

const ITCareerPage = () => {
  const itData = {
    title: "Is IT Career Right for You?",
    subtitle: "Discover your aptitude for a career in Pakistan's technology and IT sectors.",
    heroImage: "/hero/programmer8.png"
  };

  return <CategoryPage {...itData} />
}

export default ITCareerPage