import React from "react";
import {
  Sparkles,
  AlertCircle,
  Briefcase,
  BookOpenCheck,
  Clock,
  Smile,
  Globe,
  Users,
  Award, 
  Map
} from "lucide-react";

const benefits = [
  {
    icon: Sparkles,
    title: "Discover Your Strengths",
    desc: "You find out what you do best and what feels natural for you.",
  },
  {
    icon: AlertCircle,
    title: "Understand Your Weaknesses",
    desc: "You know where you get stuck, so you can work better.",
  },
  {
    icon: Briefcase,
    title: "Clarity About Career Choices",
    desc: "No more guessing. Test shows which career fit you.",
  },
  {
    icon: BookOpenCheck,
    title: "Personal Success Rules",
    desc: "Simple rules for you, how you can do best in study and life.",
  },
  {
    icon: Clock,
    title: "Save Time Effort and Finance",
    desc: "Don’t waste years in wrong path. Start right direction early.",
  },
  {
    icon: Smile,
    title: "Boost Your Confidence",
    desc: "You feel sure, not confused, about your future.",
  },
  {
    icon: Globe,
    title: "Internationally Trusted Tool",
    desc: "This is used all over world by schools and companies.",
  },
  {
    icon: Users,
    title: "Better Conversations with Parents",
    desc: 'Easy to show parents: “See, this career fits me.”',
  },
  {
    icon: Award,
    title: "Scholarships national and international",
    desc: 'Fully funded, partially funded and talent based scholarships',
  },
  {
    icon: Map,
    title: "Career Roadmap",
    desc: 'Get a complete custom career road map”',
  },
];

const Benefits = () => {
  return (
    <section className="py-16 md:px-16 px-8 bg-white">
      <div className="text-center">
        {/* Title */}
        <h2 className="text-[29px] md:text-4xl font-bold text-[#14442E] mb-12">
          Benefits of Taking the Test
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl shadow-md hover:shadow-lg transition bg-gray-100"
            >
              <div className="flex justify-center mb-4">
                <item.icon className="h-10 w-10 text-[#14442E]" />
              </div>
              <h3 className="text-lg font-semibold text-[#14442E] mb-2">
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
