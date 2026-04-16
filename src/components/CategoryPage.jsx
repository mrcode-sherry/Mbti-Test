'use client';

import React from 'react';
import { CheckCircle, Users, Target, BookOpen, Award, TrendingUp, GraduationCap, Heart, UsersRound, HandHeart, Search, Megaphone, MessageCircle, Settings, Building2 } from 'lucide-react';

const CategoryPage = ({ 
  title = "Career Guidance Program",
  subtitle = "Discover your aptitude for a career in this field",
  heroImage = "/hero/programmer8.png",
  targetAudience = [
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
  assessmentChecks,
  pathways,
  reportFeatures = [
    "Personalized Aptitude Profile",
    "Recommended Roles",
    "Skills Gap Analysis",
    "Actionable Steps"
  ],
  realityCheck = [
    "Not just about passion, requires specific skills",
    "Can be emotionally demanding",
    "Long hours are common"
  ],
  howItWorks = [
    { icon: Target, title: "Take test", subtitle: "Complete assessment" },
    { icon: BookOpen, title: "Get report", subtitle: "Receive detailed analysis" },
    { icon: TrendingUp, title: "Follow roadmap", subtitle: "Implement recommendations" }
  ],
  ctaTitle = "Ready to discover your career path?",
  ctaSubtitle = "Take the first step towards your future with our comprehensive career assessment",
  ctaButtonText = "Start NGO Test",
  pricingSection = null, // New prop for pricing section
  statusSection = null, // New prop for status section
  onStartTestClick = null // New prop for handling start test button clicks
}) => {
  // Set default values only if not explicitly passed
  const finalAssessmentChecks = assessmentChecks !== undefined ? assessmentChecks : [
    { icon: Heart, title: "Empathy", color: "text-[#05503C]" },
    { icon: MessageCircle, title: "Communication", color: "text-[#05503C]" },
    { icon: Settings, title: "Resilience", color: "text-[#05503C]" },
    { icon: Users, title: "Teamwork", color: "text-[#05503C]" },
    { icon: Building2, title: "Field-Office", color: "text-[#05503C]" }
  ];

  const finalPathways = pathways !== undefined ? pathways : [
    { icon: GraduationCap, title: "Education Programs", status: "Hot demand", color: "bg-[#FDCA00]" },
    { icon: Heart, title: "Health Outreach", status: "Fast-based", color: "bg-[#FDCA00]" },
    { icon: UsersRound, title: "Community Development", status: "Fast-based | Office-based", color: "bg-[#FDCA00]" },
    { icon: HandHeart, title: "Child Welfare", status: "Hot demand", color: "bg-[#FDCA00]" },
    { icon: Search, title: "Research/M&E", status: "Office-based", color: "bg-[#FDCA00]" },
    { icon: Megaphone, title: "Fundraising & Comms", status: "Office-based", color: "bg-[#FDCA00]" }
  ];

  return (
    <div className="min-h-screen bg-[#F3F2ED]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white via-[#fefefe] to-[#f9f9f9] py-20 px-4 md:px-16 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-[#FDCA00]/10 to-[#FDCA00]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-[#05503C]/10 to-[#05503C]/5 rounded-full blur-2xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FDCA00]/20 to-[#FDCA00]/10 rounded-full px-4 py-2 mb-6">
                <div className="w-2 h-2 bg-[#FDCA00] rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-[#05503C]">Career Assessment</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-[#05503C] mb-6 leading-tight">
                {title}
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                {subtitle}
              </p>
              
              {/* Feature Pills */}
              <div className="grid grid-cols-2 gap-4 mb-10 max-w-md">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-5 py-4 flex items-center gap-3 shadow-lg border border-[#FDCA00]/20 hover:shadow-xl transition-all duration-300">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#FDCA00] to-[#f0c000] flex items-center justify-center shadow-sm">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-700 font-semibold">10-12 minutes</span>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-5 py-4 flex items-center gap-3 shadow-lg border border-[#FDCA00]/20 hover:shadow-xl transition-all duration-300">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#FDCA00] to-[#f0c000] flex items-center justify-center shadow-sm">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-700 font-semibold">Instant report</span>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-5 py-4 flex items-center gap-3 shadow-lg border border-[#FDCA00]/20 hover:shadow-xl transition-all duration-300">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#FDCA00] to-[#f0c000] flex items-center justify-center shadow-sm">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-700 font-semibold">All fields covered</span>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-5 py-4 flex items-center gap-3 shadow-lg border border-[#FDCA00]/20 hover:shadow-xl transition-all duration-300">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#FDCA00] to-[#f0c000] flex items-center justify-center shadow-sm">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-700 font-semibold">Parent-friendly</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={onStartTestClick}
                  className="bg-gradient-to-r from-[#05503C] to-[#044029] text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  Start Future Fit Test
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex justify-center">
              <div className="relative">
                <img 
                  src={heroImage} 
                  alt={title}
                  className="w-full max-w-xl md:max-w-2xl lg:max-w-4xl h-auto"
                />
                {/* Floating decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-[#FDCA00] to-[#f0c000] rounded-full shadow-lg animate-bounce"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-[#05503C] to-[#044029] rounded-full shadow-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Inserted after hero */}
      {pricingSection}

      {/* Status Section - Inserted after pricing */}
      {statusSection}

      {/* Who This Is For Section */}
      <section className="py-20 px-4 md:px-16 relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F3F2ED]/30 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FDCA00]/20 to-[#FDCA00]/10 rounded-full px-6 py-3 mb-6">
              <div className="w-2 h-2 bg-[#FDCA00] rounded-full"></div>
              <span className="text-sm font-semibold text-[#05503C]">Target Audience</span>
            </div>
            <h2 className="text-4xl font-bold text-[#05503C] mb-4">
              Who this is for
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Designed for students, young adults, and parents seeking career guidance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {targetAudience.map((audience, index) => {
              const IconComponent = audience.icon;
              return (
                <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center shadow-xl border border-[#FDCA00]/20 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#F3F2ED] to-[#FDCA00]/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <IconComponent size={36} className="text-[#05503C]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B0F0E] mb-3">
                    {audience.title}
                  </h3>
                  {audience.subtitle && (
                    <p className="text-gray-600 font-medium">
                      {audience.subtitle}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Assessment Checks Section */}
      {finalAssessmentChecks && finalAssessmentChecks.length > 0 && (
        <section className="py-20 px-4 md:px-16 bg-gradient-to-br from-white via-[#fefefe] to-[#f9f9f9] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-[#05503C]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-32 h-32 bg-gradient-to-br from-[#FDCA00]/10 to-transparent rounded-full blur-2xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FDCA00]/20 to-[#FDCA00]/10 rounded-full px-6 py-3 mb-6">
              <div className="w-2 h-2 bg-[#FDCA00] rounded-full"></div>
              <span className="text-sm font-semibold text-[#05503C]">Assessment Features</span>
            </div>
            <h2 className="text-4xl font-bold text-[#05503C] mb-4">
              What the assessment checks
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive evaluation of key skills and traits essential for success
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Assessment Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {finalAssessmentChecks.map((check, index) => {
                const IconComponent = check.icon;
                return (
                  <div key={index} className="group bg-white/80 backdrop-blur-sm border border-[#FDCA00]/20 rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                    <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-gradient-to-br from-[#F3F2ED] to-[#FDCA00]/20 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <IconComponent size={32} className={`${check.color}`} />
                    </div>
                    <p className="text-sm font-bold text-[#0B0F0E]">
                      {check.title}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Right Side - Professional Image */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-96 h-96 bg-gradient-to-br from-[#F3F2ED] via-white to-[#FDCA00]/10 rounded-3xl overflow-hidden shadow-2xl border border-[#FDCA00]/20">
                  <img 
                    src="/hero/programmer8.png" 
                    alt="Professional with laptop"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating elements */}
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-[#FDCA00] to-[#f0c000] rounded-2xl shadow-xl rotate-12 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-[#05503C] to-[#044029] rounded-full shadow-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Pathways Section */}
      {finalPathways && finalPathways.length > 0 && (
        <section className="py-20 px-4 md:px-16 relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F3F2ED]/20 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FDCA00]/20 to-[#FDCA00]/10 rounded-full px-6 py-3 mb-6">
              <div className="w-2 h-2 bg-[#FDCA00] rounded-full"></div>
              <span className="text-sm font-semibold text-[#05503C]">Career Opportunities</span>
            </div>
            <h2 className="text-4xl font-bold text-[#05503C] mb-4">
              Pathways in Pakistan
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore diverse career opportunities and growth paths available in the field
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {finalPathways.map((pathway, index) => {
              const IconComponent = pathway.icon;
              return (
                <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl text-center border border-[#FDCA00]/20 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#F3F2ED] to-[#FDCA00]/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <IconComponent size={36} className="text-[#05503C]" />
                  </div>
                  <h3 className="font-bold text-[#0B0F0E] mb-4 text-xl">
                    {pathway.title}
                  </h3>
                  <span className={`inline-block px-6 py-3 rounded-full text-sm font-bold text-[#0B0F0E] ${pathway.color} shadow-lg`}>
                    {pathway.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* What You Get Section */}
      <section className="py-20 px-4 md:px-16 bg-gradient-to-br from-white via-[#fefefe] to-[#f9f9f9] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-[#FDCA00]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-[#05503C]/10 to-transparent rounded-full blur-2xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FDCA00]/20 to-[#FDCA00]/10 rounded-full px-6 py-3 mb-6">
              <div className="w-2 h-2 bg-[#FDCA00] rounded-full"></div>
              <span className="text-sm font-semibold text-[#05503C]">Report Features</span>
            </div>
            <h2 className="text-4xl font-bold text-[#05503C] mb-6">
              What you get in the report
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get comprehensive insights about your personality, strengths, and career recommendations in a detailed report
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Report Features */}
            <div className="space-y-6">
              {reportFeatures.map((feature, index) => (
                <div key={index} className="group flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl hover:shadow-xl transition-all duration-300 hover:bg-white border border-[#FDCA00]/20 hover:border-[#FDCA00]/40 hover:scale-105">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-[#05503C] to-[#044029] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0B0F0E] text-lg">
                      {feature}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Report Preview */}
            <div className="relative flex items-center justify-center min-h-full">
              <div className="bg-gradient-to-br from-[#F3F2ED] via-white to-[#FDCA00]/10 rounded-3xl p-10 shadow-2xl border border-[#FDCA00]/30">
                {/* Header Card */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-xl border-l-4 border-[#05503C]">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-4 h-4 bg-gradient-to-r from-[#05503C] to-[#044029] rounded-full animate-pulse shadow-sm"></div>
                    <div className="h-5 bg-gradient-to-r from-[#05503C] to-[#044029] rounded-lg flex-1 max-w-[240px] shadow-sm"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded-lg w-full"></div>
                    <div className="h-4 bg-gray-200 rounded-lg w-3/4"></div>
                  </div>
                </div>

                {/* Chart Card */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#FDCA00] to-[#f0c000] rounded-lg shadow-sm"></div>
                      <div className="h-4 bg-gray-300 rounded-lg w-24"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#05503C] to-[#044029] rounded-lg shadow-sm"></div>
                      <div className="h-4 bg-gray-300 rounded-lg w-20"></div>
                    </div>
                  </div>
                  
                  {/* Mini Chart */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-[#05503C] to-[#044029] rounded-full shadow-sm"></div>
                      <div className="h-3 bg-gray-200 rounded-lg flex-1"></div>
                      <div className="h-3 bg-gradient-to-r from-[#FDCA00] to-[#f0c000] rounded-lg w-20 shadow-sm"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-[#05503C] to-[#044029] rounded-full shadow-sm"></div>
                      <div className="h-3 bg-gray-200 rounded-lg flex-1"></div>
                      <div className="h-3 bg-gradient-to-r from-[#FDCA00] to-[#f0c000] rounded-lg w-24 shadow-sm"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-[#05503C] to-[#044029] rounded-full shadow-sm"></div>
                      <div className="h-3 bg-gray-200 rounded-lg flex-1"></div>
                      <div className="h-3 bg-gradient-to-r from-[#FDCA00] to-[#f0c000] rounded-lg w-16 shadow-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reality Check Section */}
      <section className="py-20 px-4 md:px-16 relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F3F2ED]/30 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FDCA00]/20 to-[#FDCA00]/10 rounded-full px-6 py-3 mb-6">
              <div className="w-2 h-2 bg-[#FDCA00] rounded-full"></div>
              <span className="text-sm font-semibold text-[#05503C]">Important Considerations</span>
            </div>
            <h2 className="text-4xl font-bold text-[#05503C] mb-6">
              Before you choose, know this
            </h2>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-[#FDCA00]/20">
            {/* Reality Check Points */}
            <ul className="space-y-6 mb-16">
              {realityCheck.map((point, index) => (
                <li key={index} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-[#F3F2ED]/50 transition-all duration-300">
                  <div className="w-3 h-3 bg-gradient-to-r from-[#05503C] to-[#044029] rounded-full mt-3 flex-shrink-0 shadow-sm"></div>
                  <span className="text-[#0B0F0E] text-xl font-medium">{point}</span>
                </li>
              ))}
            </ul>

            {/* Career Progression Timeline */}
            <div className="bg-gradient-to-r from-[#F3F2ED] to-[#FDCA00]/10 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-[#05503C] text-center mb-8">Career Progression Path</h3>
              <div className="flex items-center justify-center max-w-5xl mx-auto">
                {/* Test */}
                <div className="flex items-center min-w-max">
                  <div className="w-5 h-5 bg-gradient-to-r from-[#FDCA00] to-[#f0c000] rounded-full shadow-lg"></div>
                  <span className="ml-2 font-bold text-[#0B0F0E] text-base whitespace-nowrap">Test</span>
                </div>
                
                {/* Arrow 1 */}
                <div className="flex items-center mx-4">
                  <div className="w-12 h-1 bg-gradient-to-r from-[#05503C] to-[#044029] rounded-full shadow-sm"></div>
                  <div className="w-0 h-0 border-l-[6px] border-l-[#05503C] border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent"></div>
                </div>
                
                {/* Report */}
                <div className="flex items-center min-w-max">
                  <div className="w-5 h-5 bg-gradient-to-r from-[#FDCA00] to-[#f0c000] rounded-full shadow-lg"></div>
                  <span className="ml-2 font-bold text-[#0B0F0E] text-base whitespace-nowrap">Report</span>
                </div>
                
                {/* Arrow 2 */}
                <div className="flex items-center mx-4">
                  <div className="w-12 h-1 bg-gradient-to-r from-[#05503C] to-[#044029] rounded-full shadow-sm"></div>
                  <div className="w-0 h-0 border-l-[6px] border-l-[#05503C] border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent"></div>
                </div>
                
                {/* Shortlist 3 */}
                <div className="flex items-center min-w-max">
                  <div className="w-5 h-5 bg-gradient-to-r from-[#FDCA00] to-[#f0c000] rounded-full shadow-lg"></div>
                  <span className="ml-2 font-bold text-[#0B0F0E] text-base whitespace-nowrap">Shortlist 3</span>
                </div>
                
                {/* Arrow 3 */}
                <div className="flex items-center mx-4">
                  <div className="w-12 h-1 bg-gradient-to-r from-[#05503C] to-[#044029] rounded-full shadow-sm"></div>
                  <div className="w-0 h-0 border-l-[6px] border-l-[#05503C] border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent"></div>
                </div>
                
                {/* Explore */}
                <div className="flex items-center min-w-max">
                  <div className="w-5 h-5 bg-gradient-to-r from-[#FDCA00] to-[#f0c000] rounded-full shadow-lg"></div>
                  <span className="ml-2 font-bold text-[#0B0F0E] text-base whitespace-nowrap">Explore</span>
                </div>
                
                {/* Arrow 4 */}
                <div className="flex items-center mx-4">
                  <div className="w-12 h-1 bg-gradient-to-r from-[#05503C] to-[#044029] rounded-full shadow-sm"></div>
                  <div className="w-0 h-0 border-l-[6px] border-l-[#05503C] border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent"></div>
                </div>
                
                {/* Decide */}
                <div className="flex items-center min-w-max">
                  <div className="w-5 h-5 bg-gradient-to-r from-[#FDCA00] to-[#f0c000] rounded-full shadow-lg"></div>
                  <span className="ml-2 font-bold text-[#0B0F0E] text-base whitespace-nowrap">Decide</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 md:px-16 bg-gradient-to-br from-white via-[#fefefe] to-[#f9f9f9] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-[#05503C]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-32 h-32 bg-gradient-to-br from-[#FDCA00]/10 to-transparent rounded-full blur-2xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FDCA00]/20 to-[#FDCA00]/10 rounded-full px-6 py-3 mb-6">
              <div className="w-2 h-2 bg-[#FDCA00] rounded-full"></div>
              <span className="text-sm font-semibold text-[#05503C]">Simple Process</span>
            </div>
            <h2 className="text-4xl font-bold text-[#05503C] mb-4">
              How it works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Three simple steps to discover your career path and get personalized recommendations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {howItWorks.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#F3F2ED] to-[#FDCA00]/20 rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-300 border border-[#FDCA00]/30">
                      <IconComponent size={40} className="text-[#05503C]" />
                    </div>
                    {/* Step number */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#FDCA00] to-[#f0c000] rounded-full flex items-center justify-center text-sm font-bold text-[#05503C] shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-[#0B0F0E] mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {step.subtitle}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 px-4 md:px-16 relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F3F2ED]/20 to-transparent"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FDCA00]/20 to-[#FDCA00]/10 rounded-full px-6 py-3 mb-6">
              <div className="w-2 h-2 bg-[#FDCA00] rounded-full"></div>
              <span className="text-sm font-semibold text-[#05503C]">Common Questions</span>
            </div>
            <h2 className="text-4xl font-bold text-[#05503C] mb-4">
              FAQs
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to frequently asked questions about our assessment
            </p>
          </div>
          
          <div className="space-y-4">
            {[
              "Is this for Matric/O-Levels?",
              "Will it recommend one career only?",
              "Does it guarantee admission/job?",
              "Can parents view the report?",
              "How long does it take?",
              "Is my data private?"
            ].map((question, index) => (
              <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#FDCA00]/20 hover:border-[#FDCA00]/40">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-[#0B0F0E] text-lg group-hover:text-[#05503C] transition-colors duration-300">{question}</h3>
                  <div className="w-10 h-10 bg-gradient-to-r from-[#05503C] to-[#044029] rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                    +
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-16 bg-gradient-to-br from-[#05503C] via-[#044029] to-[#05503C] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-[#FDCA00]/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
            <div className="w-2 h-2 bg-[#FDCA00] rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-white">Get Started Today</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
            {ctaTitle}
          </h2>
          
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            {ctaSubtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={onStartTestClick}
              className="bg-gradient-to-r from-[#FDCA00] to-[#f0c000] text-[#0B0F0E] px-12 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl"
            >
              {ctaButtonText}
            </button>
            <button className="border-2 border-white text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-[#05503C] transition-all duration-300 bg-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl">
              WhatsApp for help
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;