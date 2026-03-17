import React from 'react'
import CategoryPage from '@/components/CategoryPage'

const FutureFitPage = () => {
  const futureFitData = {
    title: "Is Future Fit Career Right for You?",
    subtitle: "Discover your aptitude for a career in future-ready fields and emerging technologies.",
    heroImage: "/hero/programmer8.png"
  };

  return <CategoryPage {...futureFitData} />
}

export default FutureFitPage