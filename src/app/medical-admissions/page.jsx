import React from 'react'
import CategoryPage from '@/components/CategoryPage'

const MedicalAdmissionsPage = () => {
  const medicalData = {
    title: "Is Medical Career Right for You?",
    subtitle: "Discover your aptitude for a career in Pakistan's medical and healthcare sectors.",
    heroImage: "/hero/doctor.png"
  };

  return <CategoryPage {...medicalData} />
}

export default MedicalAdmissionsPage