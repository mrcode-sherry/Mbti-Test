import React from 'react'
import CategoryPage from '@/components/CategoryPage'

const EntrepreneurshipPage = () => {
  const entrepreneurshipData = {
    title: "Is Entrepreneurship Right for You?",
    subtitle: "Discover your aptitude for a career in Pakistan's business and entrepreneurship sectors.",
    heroImage: "/hero/engineer.png"
  };

  return <CategoryPage {...entrepreneurshipData} />
}

export default EntrepreneurshipPage