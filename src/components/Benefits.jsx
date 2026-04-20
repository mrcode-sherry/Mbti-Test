import React from "react";
import {
  Target,
  Share2,
  ClipboardList,
  BookOpen,
  ShieldCheck,
  Users
} from "lucide-react";

const benefits = [
  {
    icon: Target,
    title: "Choose the Right Stream",
    desc: "Get clarity for FSC (Pre Med/Pre Engl/ICS/I.Com) or A Levels based on your natural strengths.",
  },
  {
    icon: Share2,
    title: "Top Career Matches",
    desc: "See which fields fit you most (Medical, IT, Business, Engineering, Design and more).",
  },
  {
    icon: ClipboardList,
    title: "Entry Test Direction",
    desc: "Know whether you should focus on MDCAT, ECAT, CS tests, business admissions—or alternative paths.",
  },
  {
    icon: BookOpen,
    title: "Study Plan That Suits You",
    desc: "Simple study tips that match how you learn—so marks improve without burnout.",
  },
  {
    icon: ShieldCheck,
    title: "Avoid Wrong Admissions",
    desc: "Reduce the risk of wasting years and fee money by choosing the right path earlier.",
  },
  {
    icon: Users,
    title: "Explainable Results for Parents",
    desc: "A clear report you can show at home to discuss career choices without conflict.",
  },
];

const Benefits = () => {
  return (
    <section className="py-16 md:px-16 px-8 bg-[#F3F2ED]">
      <div className="text-center">
        {/* Title */}
        <h2 className="text-[29px] md:text-4xl font-bold text-[#05503C] mb-4">
          Career Direction in 10 Minutes
        </h2>
        
        {/* Subtitle */}
        <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
          Get a clear report that helps you choose the right subjects, field, and next step—based on your strengths, interests, and study style.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border-t-4 border-[#FDCA00] p-6 text-left"
            >
              <div className="flex justify-start mb-4">
                <div className="w-12 h-12 bg-[#F3F2ED] rounded-full flex items-center justify-center">
                  <item.icon className="h-6 w-6 text-[#05503C]" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-[#0B0F0E] mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;