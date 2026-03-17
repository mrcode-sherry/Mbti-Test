import React from 'react'
import CategoryPage from '@/components/CategoryPage'

const NGOCommunityPage = () => {
  const ngoData = {
    title: "Is Social Impact Work Right for You?",
    subtitle: "Discover your aptitude for a career in Pakistan's NGO and community service sectors.",
    heroImage: "/hero/doctor.png"
  };

  return <CategoryPage {...ngoData} />
}

export default NGOCommunityPage