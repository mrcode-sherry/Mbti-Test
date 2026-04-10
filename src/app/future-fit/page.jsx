'use client';

import React from 'react'
import CategoryPage from '@/components/CategoryPage'
import { Users, BookOpen, Award, Target, TrendingUp } from 'lucide-react'

const FutureFitPage = () => {
  const futureFitData = {
    title: "Find Your Best Career Fit",
    subtitle: "A short assessment that helps you choose the right stream, subjects, and career direction after Matric, Inter, or A-Levels.",
    heroImage: "/future/hero.webp",
    targetAudience: [
      { 
        icon: Users, 
        title: "Matric / O-Levels students", 
        subtitle: "Helping you choose the right stream and subjects for your next big step." 
      },
      { 
        icon: BookOpen, 
        title: "Inter / A-Levels students", 
        subtitle: "Guiding your university and career choices with clarity and confidence." 
      },
      { 
        icon: Award, 
        title: "Parents", 
        subtitle: "Giving you insights to support your child's future with data-driven advice." 
      }
    ],
    assessmentChecks: [], // Hide this section
    pathways: [], // Hide this section
    reportFeatures: [
      "Top 5 career fields",
      "Stream/subject guidance (FSC/A-Levels)",
      "Career environment fit",
      "Study plan tips",
      "4-8 week roadmap",
      "Parent-friendly summary"
    ],
    realityCheck: [
      "Your interests and strengths evolve.",
      "Career paths are rarely linear.",
      "Exploration is key to success."
    ],
    howItWorks: [
      { icon: Target, title: "Take the test", subtitle: "Complete the 10-12 minute online assessment." },
      { icon: BookOpen, title: "Get your report", subtitle: "Receive a comprehensive, instant career report." },
      { icon: TrendingUp, title: "Follow your roadmap", subtitle: "Use the actionable steps to plan your future." }
    ],
    ctaTitle: "Ready to discover your Future Fit?",
    ctaSubtitle: "Take the first step towards your future with our comprehensive career assessment",
    ctaButtonText: "Start Future Fit Test"
  };

  return <CategoryPage {...futureFitData} />
}

export default FutureFitPage