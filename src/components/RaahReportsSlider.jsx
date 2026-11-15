'use client';

import {
  Target, Users, BookOpen, ArrowRight, Star, MessageSquare,
  BarChart2, Award, Lightbulb, ClipboardList, ShieldCheck, TrendingUp,
} from 'lucide-react';

const reports = [
  { icon: Target,        title: 'Career Clarity Report' },
  { icon: Users,         title: 'Personality Profile Report' },
  { icon: BookOpen,      title: 'Learning Style Report' },
  { icon: ArrowRight,    title: 'Educational Pathway Report' },
  { icon: Star,          title: 'Strength & Potential Report' },
  { icon: MessageSquare, title: 'Parent Guidance Report' },
  { icon: BarChart2,     title: 'Class Summary Report' },
  { icon: Award,         title: 'Academic Support Report' },
  { icon: Lightbulb,     title: 'Career Interest Report' },
  { icon: ClipboardList, title: 'Subject Preference Report' },
  { icon: ShieldCheck,   title: 'Life Skills Readiness Report' },
  { icon: TrendingUp,    title: 'Future Readiness Report' },
];

export default function RaahReportsSlider() {
  return (
    <section className="py-16 md:px-16 px-8 bg-[#F3F2ED]">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FDCA00]/20 to-[#FDCA00]/10 rounded-full px-6 py-3">
              <div className="w-2 h-2 bg-[#FDCA00] rounded-full"></div>
              <span className="text-sm font-semibold text-[#05503C]">Report Features</span>
            </div>
          </div>
          <h2 className="text-[29px] md:text-4xl font-bold text-[#14442E] mb-2">
            Powerful Insights with 12+ Types of Reports
          </h2>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            Get comprehensive insights about your personality, strengths, and career recommendations in a detailed report
          </p>
        </div>

        {/* Two-column layout: grid + image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — 3×4 report grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {reports.map((r, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 flex flex-col items-center gap-3 text-center shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-[#FDCA00] hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-[#F3F2ED] rounded-full flex items-center justify-center">
                  <r.icon className="h-6 w-6 text-[#05503C]" />
                </div>
                <p className="text-sm font-semibold text-[#14442E] leading-snug">{r.title}</p>
              </div>
            ))}
          </div>

          {/* Right — raah.png image */}
          <div className="flex justify-center">
            <div className="relative">
              <img
                src="/raahstudent/raah.png"
                alt="RAAH Report Preview"
                className="w-full max-w-sm md:max-w-md rounded-2xl shadow-xl"
              />
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-[#FDCA00] to-[#f0c000] rounded-full shadow-lg animate-bounce" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-[#05503C] to-[#044029] rounded-full shadow-lg" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
