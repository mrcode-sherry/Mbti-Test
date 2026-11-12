'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users, BookOpen, Award, TrendingUp, Target, CheckCircle,
  School, MapPin, Phone, Mail, MessageSquare, ChevronDown,
  ArrowRight, ShieldCheck, Star, Lightbulb, BarChart2, ClipboardList,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import WhatsAppButton from '@/components/WhatsAppButton';

// ─── Advantage Card ───────────────────────────────────────────────────────────
const AdvantageCard = ({ icon: Icon, title, desc }) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border-t-4 border-[#FDCA00] p-6 text-left">
    <div className="w-12 h-12 bg-[#F3F2ED] rounded-full flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-[#05503C]" />
    </div>
    <h3 className="text-lg font-semibold text-[#0B0F0E] mb-2">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
  </div>
);

// ─── Report Card ──────────────────────────────────────────────────────────────
const ReportCard = ({ icon: Icon, title }) => (
  <div className="bg-white rounded-xl p-4 flex flex-col items-center gap-2 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100">
    <div className="w-10 h-10 bg-[#F3F2ED] rounded-full flex items-center justify-center">
      <Icon className="h-5 w-5 text-[#05503C]" />
    </div>
    <p className="text-sm font-medium text-[#14442E]">{title}</p>
  </div>
);

// ─── Step Card ────────────────────────────────────────────────────────────────
const StepCard = ({ number, title, desc }) => (
  <div className="flex flex-col items-center text-center">
    <div className="w-14 h-14 bg-[#14442E] text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 shadow-lg">
      {number}
    </div>
    <h3 className="text-base font-semibold text-[#14442E] mb-2">{title}</h3>
    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function RaahForSchoolsPage() {
  const formRef = useRef(null);
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    schoolName: '',
    city: '',
    address: '',
    contactNo: '+92 ',
    applicantName: '',
    email: '',
    preferredContact: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Slider state
  const [sliderIndex, setSliderIndex] = useState(0);
  const sliderTimer = useRef(null);
  const VISIBLE = 4;

  const reports = [
    { icon: Target, title: 'Career Clarity Report' },
    { icon: Users, title: 'Personality Profile Report' },
    { icon: BookOpen, title: 'Learning Style Report' },
    { icon: ArrowRight, title: 'Educational Pathway Report' },
    { icon: Star, title: 'Strength & Potential Report' },
    { icon: MessageSquare, title: 'Parent Guidance Report' },
    { icon: BarChart2, title: 'Class Summary Report' },
    { icon: Award, title: 'Academic Support Report' },
    { icon: Lightbulb, title: 'Career Interest Report' },
    { icon: ClipboardList, title: 'Subject Preference Report' },
    { icon: ShieldCheck, title: 'Life Skills Readiness Report' },
    { icon: TrendingUp, title: 'Future Readiness Report' },
  ];

  const totalSlides = reports.length;

  const nextSlide = useCallback(() => {
    setSliderIndex(prev => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = () => {
    setSliderIndex(prev => (prev - 1 + totalSlides) % totalSlides);
  };

  const startTimer = useCallback(() => {
    if (sliderTimer.current) clearInterval(sliderTimer.current);
    sliderTimer.current = setInterval(nextSlide, 5000);
  }, [nextSlide]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(sliderTimer.current);
  }, [startTimer]);

  const handlePrev = () => { prevSlide(); startTimer(); };
  const handleNext = () => { nextSlide(); startTimer(); };

  // Get 4 visible cards (circular)
  const visibleReports = Array.from({ length: VISIBLE }, (_, i) => reports[(sliderIndex + i) % totalSlides]);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
        setFormData(prev => ({ ...prev, email: parsed.email || '' }));
      } catch {}
    }
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'contactNo') {
      if (!value.startsWith('+92 ')) {
        setFormData(prev => ({ ...prev, contactNo: '+92 ' }));
        return;
      }
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      router.push('/login');
      return;
    }
    setLoading(true);
    setFeedback(null);
    try {
      const res = await fetch('/api/school-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFeedback({ type: 'success', message: data.message });
        setFormData({
          schoolName: '', city: '', address: '', contactNo: '+92 ',
          applicantName: '', email: user?.email || '', preferredContact: '', message: '',
        });
      } else {
        setFeedback({ type: 'error', message: data.message || 'Something went wrong.' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Failed to submit. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-white via-[#fefefe] to-[#f9f9f9] py-20 px-4 md:px-16 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-[#FDCA00]/10 to-[#FDCA00]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-[#05503C]/10 to-[#05503C]/5 rounded-full blur-2xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Right Image */}
            <div className="flex justify-center order-1 lg:order-2">
              <div className="relative">
                <img
                  src="/Banners/about-banner.jpg"
                  alt="RAAH for Schools"
                  className="w-full max-w-xl md:max-w-2xl lg:max-w-4xl h-auto rounded-2xl shadow-xl"
                />
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-[#FDCA00] to-[#f0c000] rounded-full shadow-lg animate-bounce" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-[#05503C] to-[#044029] rounded-full shadow-lg" />
              </div>
            </div>

            {/* Left Content */}
            <div className="order-2 lg:order-1 space-y-6">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FDCA00]/20 to-[#FDCA00]/10 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-[#FDCA00] rounded-full animate-pulse" />
                <span className="text-sm font-medium text-[#05503C]">RAAH for Schools</span>
              </div>

              {/* Big RAAH + subtitle */}
              <div>
                <h1 className="text-5xl md:text-7xl font-black text-[#14442E] leading-none tracking-tight">
                  RAAH
                </h1>
                <p className="text-lg md:text-xl font-semibold text-[#14442E] mt-2 leading-snug">
                  Roadmap for Aspirations,<br />Ambitions &amp; Horizons
                </p>
              </div>

              {/* Bold statement */}
              <div>
                <p className="text-base md:text-lg font-bold text-gray-800 leading-snug">
                  Every year, thousands of students<br />choose their future blindly.
                </p>
                <p className="text-sm md:text-base text-gray-500 italic mt-1">
                  Will your school guide them — or let them guess?
                </p>
              </div>

              {/* CTA button — yellow style matching RAAH page */}
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-3 bg-[#FDCA00] text-[#14442E] font-bold px-7 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 text-base"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Partner with RAAH Today →
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ── FORM ─────────────────────────────────────────────────────────── */}
      <section ref={formRef} className="py-16 md:px-16 px-8 bg-[#F3F2ED]">
        <div className="max-w-3xl mx-auto">
          {/* Section label */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-[#14442E] opacity-40" />
            <p className="uppercase text-sm tracking-widest text-[#14442E] font-medium">Partner With Us</p>
            <div className="w-12 h-px bg-[#14442E] opacity-40" />
          </div>
          <h2 className="text-[29px] md:text-4xl font-bold text-[#14442E] text-center mb-2">
            Get in Touch Today
          </h2>
          <p className="text-gray-500 text-center mb-10 text-sm">
            Fill the form below and our team will contact you to discuss how RAAH can benefit your school.
          </p>

          {!user && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md mb-6 text-yellow-800 text-sm font-medium">
              ⚠️ Please{' '}
              <button onClick={() => router.push('/login')} className="underline font-bold cursor-pointer">
                log in
              </button>{' '}
              to submit this form.
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* School Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">School Name *</label>
                <div className="relative">
                  <School className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text" name="schoolName" value={formData.schoolName}
                    onChange={handleChange} required placeholder="e.g. Govt. High School, Lahore"
                    className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#14442E] focus:border-[#14442E] transition-colors"
                  />
                </div>
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text" name="city" value={formData.city}
                    onChange={handleChange} required placeholder="e.g. Lahore"
                    className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#14442E] focus:border-[#14442E] transition-colors"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">School Address *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                  <input
                    type="text" name="address" value={formData.address}
                    onChange={handleChange} required placeholder="e.g. Street 5, Model Town, Lahore"
                    className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#14442E] focus:border-[#14442E] transition-colors"
                  />
                </div>
              </div>

              {/* Contact No */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel" name="contactNo" value={formData.contactNo}
                    onChange={handleChange} required
                    className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#14442E] focus:border-[#14442E] transition-colors"
                  />
                </div>
              </div>

              {/* Applicant Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name of Applicant *</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text" name="applicantName" value={formData.applicantName}
                    onChange={handleChange} required placeholder="e.g. Muhammad Ahmed"
                    className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#14442E] focus:border-[#14442E] transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email" name="email" value={formData.email}
                    onChange={handleChange} required placeholder="school@example.com"
                    className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#14442E] focus:border-[#14442E] transition-colors"
                  />
                </div>
              </div>

              {/* Preferred Contact Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Contact Method *</label>
                <div className="relative">
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <select
                    name="preferredContact" value={formData.preferredContact}
                    onChange={handleChange} required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#14442E] focus:border-[#14442E] transition-colors appearance-none bg-white"
                  >
                    <option value="">Select preferred contact</option>
                    <option value="Available 24 hours – Contact Number">Available 24 hours – Contact Number</option>
                    <option value="Available 24 hours – Email">Available 24 hours – Email</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                  <textarea
                    name="message" value={formData.message}
                    onChange={handleChange} rows={4}
                    placeholder="Tell us about your school, number of students, or any specific requirements..."
                    className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#14442E] focus:border-[#14442E] transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit" disabled={loading || !user}
              className="w-full bg-[#14442E] text-white py-3 rounded-lg font-semibold hover:bg-[#0c2f1e] hover:scale-[1.01] duration-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? 'Submitting...' : (
                <>
                  Submit Inquiry
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {feedback && (
              <p className={`text-sm font-medium text-center pt-1 ${feedback.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {feedback.type === 'success' ? '✅ ' : '❌ '}{feedback.message}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* ── WHY SCHOOLS NEED RAAH + THE RAAH JOURNEY ────────────────────── */}
      <section className="py-16 md:px-16 px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* LEFT — Why Schools Need RAAH */}
          <div className="bg-[#F3F2ED] rounded-2xl p-8">
            {/* Section title with green left border */}
            <div className="flex items-start gap-3 mb-2">
              <div className="w-1 h-10 bg-[#14442E] rounded-full mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-xl md:text-2xl font-black text-[#14442E]">Why Schools Need RAAH?</h2>
                <p className="text-gray-500 text-sm mt-1">Because every student deserves the right direction.</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {[
                { icon: '🎓', text: 'Students choose streams without proper guidance' },
                { icon: '🧠', text: 'Career decisions are based on pressure, not self-awareness' },
                { icon: '🏫', text: 'Schools lack a structured guidance system' },
                { icon: '📈', text: 'Parents want future-focused schools' },
                { icon: '🤝', text: 'RAAH helps students choose the right path with confidence' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-white rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-x-1"
                >
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <p className="text-gray-700 text-sm font-medium leading-snug">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Bottom quote card */}
            <div className="mt-6 bg-[#14442E] rounded-xl px-5 py-4 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#FDCA00] flex-shrink-0 mt-0.5" />
              <p className="text-white text-sm font-semibold leading-snug">
                The right guidance today prevents a lifetime of regret tomorrow.
              </p>
            </div>
          </div>

          {/* RIGHT — The RAAH Journey */}
          <div className="bg-[#F3F2ED] rounded-2xl p-8">
            <div className="flex items-start gap-3 mb-2">
              <div className="w-1 h-10 bg-[#14442E] rounded-full mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-xl md:text-2xl font-black text-[#14442E]">The RAAH Journey</h2>
                <p className="text-gray-500 text-sm mt-1">A simple, structured path to a brighter future.</p>
              </div>
            </div>

            <div className="mt-6 space-y-3 relative">
              {/* Vertical line */}
              <div className="absolute left-5 top-4 bottom-4 w-0.5 bg-[#14442E]/20 z-0" />

              {[
                { num: '01', title: 'CLASS 6: DISCOVER', sub: 'What Am I Naturally Good At?', highlight: false },
                { num: '02', title: 'CLASS 7: UNDERSTAND', sub: 'What Kind of Person Am I?', highlight: false },
                { num: '03', title: 'CLASS 8: EXPLORE', sub: 'What Career World Is Calling Me?', highlight: true, badge: 'Most Critical Decision Year' },
                { num: '04', title: 'CLASS 9: COMMIT', sub: 'Why Do I Want This and How Do I Hold It?', highlight: false },
                { num: '05', title: 'CLASS 10: LAUNCH', sub: 'What Kind of Future Is Built for Me?', highlight: false },
              ].map((step, i) => (
                <div
                  key={i}
                  className={`relative z-10 flex items-start gap-4 rounded-xl px-4 py-3 transition-all duration-300 hover:scale-[1.02] ${
                    step.highlight
                      ? 'bg-[#FDCA00] shadow-md border-2 border-[#FDCA00]'
                      : 'bg-white shadow-sm hover:shadow-md'
                  }`}
                >
                  {/* Number circle */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0 shadow ${
                    step.highlight ? 'bg-[#14442E] text-white' : 'bg-[#14442E] text-white'
                  }`}>
                    {step.num}
                  </div>

                  <div className="flex-1 min-w-0">
                    {step.badge && (
                      <span className="inline-block bg-[#14442E] text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-1">
                        {step.badge}
                      </span>
                    )}
                    <p className={`font-bold text-sm leading-tight ${step.highlight ? 'text-[#14442E]' : 'text-[#14442E]'}`}>
                      {step.title}
                    </p>
                    <p className={`text-xs mt-0.5 ${step.highlight ? 'text-[#14442E]/80' : 'text-gray-500'}`}>
                      {step.sub}
                    </p>
                  </div>

                  {/* Right icon */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.highlight ? 'bg-[#14442E]' : 'bg-[#F3F2ED]'
                  }`}>
                    <span className={`text-sm ${step.highlight ? 'text-[#FDCA00]' : 'text-[#14442E]'}`}>
                      {['⭐', '👤', '🧭', '🎯', '🚀'][i]}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom note */}
            <div className="mt-5 bg-white rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm">
              <span className="text-2xl">📅</span>
              <p className="text-[#14442E] text-sm font-semibold italic">
                From discovery to decision —<br />a complete 5-year transformation.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── RAAH ADVANTAGE ───────────────────────────────────────────────── */}
      <section className="py-16 md:px-16 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-px bg-[#14442E] opacity-40" />
              <p className="uppercase text-sm tracking-widest text-[#14442E] font-medium">Why RAAH</p>
              <div className="w-12 h-px bg-[#14442E] opacity-40" />
            </div>
            <h2 className="text-[29px] md:text-4xl font-bold text-[#14442E] mb-3">The RAAH Advantage for Schools</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm">More insight. Better guidance. Greater value for your institution.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AdvantageCard icon={ClipboardList} title="Guidance Without Extra Teacher Workload" desc="A structured system that supports your team without adding burden to teachers." />
            <AdvantageCard icon={Users} title="Deeper Understanding of Every Student" desc="Know interests, strengths and learning needs of each student individually." />
            <AdvantageCard icon={MessageSquare} title="More Meaningful Parent-Teacher Meetings" desc="Move beyond marks to discuss real future plans with data-backed insights." />
            <AdvantageCard icon={Award} title="Stronger School Reputation & Differentiation" desc="Stand out with a future-focused approach that sets your school apart." />
            <AdvantageCard icon={ShieldCheck} title="Stronger Parent & Student Confidence" desc="Build trust through clarity and care, backed by professional assessments." />
            <AdvantageCard icon={TrendingUp} title="Data-Driven Career Planning" desc="Equip students with a clear roadmap from Matric to career using proven methods." />
          </div>
        </div>
      </section>

      {/* ── REPORTS SLIDER ───────────────────────────────────────────────── */}
      <section className="py-16 md:px-16 px-8 bg-[#F3F2ED]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-px bg-[#14442E] opacity-40" />
              <p className="uppercase text-sm tracking-widest text-[#14442E] font-medium">Reports</p>
              <div className="w-12 h-px bg-[#14442E] opacity-40" />
            </div>
            <h2 className="text-[29px] md:text-4xl font-bold text-[#14442E] mb-2">Powerful Insights with 12+ Types of Reports</h2>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto">Choose the reports that best fit your school's needs.</p>
          </div>

          {/* Slider */}
          <div className="relative">
            {/* Left button */}
            <button
              onClick={handlePrev}
              className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-[#14442E] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#0c2f1e] hover:scale-110 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 overflow-hidden">
              {visibleReports.map((r, i) => (
                <div
                  key={`${sliderIndex}-${i}`}
                  className="bg-white rounded-xl p-6 flex flex-col items-center gap-3 text-center shadow-sm hover:shadow-md transition-all duration-500 border border-gray-100 hover:border-[#FDCA00] hover:-translate-y-1"
                  style={{
                    animation: `fadeSlideIn 0.4s ease forwards`,
                    animationDelay: `${i * 60}ms`,
                    opacity: 0
                  }}
                >
                  <div className="w-12 h-12 bg-[#F3F2ED] rounded-full flex items-center justify-center group-hover:bg-[#14442E] transition-colors duration-300">
                    <r.icon className="h-6 w-6 text-[#05503C]" />
                  </div>
                  <p className="text-sm font-semibold text-[#14442E] leading-snug">{r.title}</p>
                </div>
              ))}
            </div>

            {/* Right button */}
            <button
              onClick={handleNext}
              className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-[#14442E] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#0c2f1e] hover:scale-110 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {reports.map((_, i) => (
              <button
                key={i}
                onClick={() => { setSliderIndex(i); startTimer(); }}
                className={`rounded-full transition-all duration-300 ${
                  i === sliderIndex
                    ? 'w-6 h-2 bg-[#14442E]'
                    : 'w-2 h-2 bg-gray-300 hover:bg-[#14442E]/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Keyframe style */}
        <style jsx>{`
          @keyframes fadeSlideIn {
            from { opacity: 0; transform: translateX(20px); }
            to   { opacity: 1; transform: translateX(0); }
          }
        `}</style>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="py-16 md:px-16 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-px bg-[#14442E] opacity-40" />
              <p className="uppercase text-sm tracking-widest text-[#14442E] font-medium">How It Works</p>
              <div className="w-12 h-px bg-[#14442E] opacity-40" />
            </div>
            <h2 className="text-[29px] md:text-4xl font-bold text-[#14442E] mb-2">A Simple 4-Step Journey for Your School</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <StepCard number="1" title="On-Campus Data Collection" desc="A professional assessment session conducted at your school." />
            <StepCard number="2" title="Aptitude Counsel Reports" desc="Personalized, easy-to-understand reports for every student." />
            <StepCard number="3" title="PTM for Report Discussion" desc="Meaningful sessions with students and parents to discuss results." />
            <StepCard number="4" title="Plan Future & Take Decision" desc="Guide students towards the right educational and career path." />
          </div>
        </div>
      </section>

      {/* ── TOP TRUSTED ASSESSMENT TOOLS ─────────────────────────────────── */}
      <section className="py-16 md:px-16 px-8 bg-[#F3F2ED]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* LEFT — Tools list */}
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-[#14442E] mb-8 leading-tight">
                The Top, Most Trusted<br />Assessment Tools
              </h2>

              <div className="space-y-3">
                {[
                  { emoji: '🔷', name: 'The Holland Code (RIASEC)' },
                  { emoji: '🧠', name: 'Myers-Briggs Type Indicator (MBTI)' },
                  { emoji: '📊', name: 'CliftonStrengths (Gallup)' },
                  { emoji: '🌀', name: 'The Enneagram' },
                  { emoji: '🌐', name: 'The Big Five (OCEAN)' },
                ].map((tool, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 bg-white rounded-xl px-5 py-4 shadow-sm border border-gray-100 hover:border-[#FDCA00] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <span className="text-2xl flex-shrink-0">{tool.emoji}</span>
                    <span className="text-gray-800 font-semibold text-sm md:text-base">{tool.name}</span>
                  </div>
                ))}
              </div>

              <p className="text-gray-500 text-sm mt-6 italic">
                Used by global universities, Fortune 500 companies, and leadership organizations.
              </p>
            </div>

            {/* RIGHT — Visual callout */}
            <div className="flex flex-col gap-6">
              {/* Big stat card */}
              <div className="bg-[#14442E] rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FDCA00]/10 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl" />
                <div className="relative z-10">
                  <p className="text-5xl md:text-6xl font-black text-[#FDCA00] mb-2">5</p>
                  <p className="text-lg font-bold text-white mb-1">World-Class Frameworks</p>
                  <p className="text-white/70 text-sm">Combined into one powerful assessment for Pakistani students.</p>
                </div>
              </div>

              {/* Two smaller cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center hover:shadow-md hover:border-[#FDCA00] transition-all duration-300">
                  <p className="text-3xl font-black text-[#14442E] mb-1">48</p>
                  <p className="text-xs text-gray-500 font-medium">Research-based Questions</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center hover:shadow-md hover:border-[#FDCA00] transition-all duration-300">
                  <p className="text-3xl font-black text-[#14442E] mb-1">16</p>
                  <p className="text-xs text-gray-500 font-medium">Personality Types Identified</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center hover:shadow-md hover:border-[#FDCA00] transition-all duration-300">
                  <p className="text-3xl font-black text-[#14442E] mb-1">12+</p>
                  <p className="text-xs text-gray-500 font-medium">Report Types Available</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center hover:shadow-md hover:border-[#FDCA00] transition-all duration-300">
                  <p className="text-3xl font-black text-[#14442E] mb-1">100%</p>
                  <p className="text-xs text-gray-500 font-medium">Confidential & Secure</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── VISION CTA ───────────────────────────────────────────────────── */}
      <section className="py-16 md:px-16 px-8 bg-[#14442E] text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Vision</h2>
            <p className="text-white/80 leading-relaxed text-sm">
              To help schools develop a generation of young people who understand themselves,
              make informed life decisions, and move towards{' '}
              <span className="text-[#FDCA00] font-semibold">self-sufficiency by the age of 18.</span>
            </p>
          </div>
          <div className="text-center md:text-right">
            <div className="border-l-4 border-[#FDCA00] pl-5 text-left">
              <h3 className="text-xl md:text-2xl font-black text-white mb-2">
                Bring RAAH to Your School This Academic Year
              </h3>
              <p className="text-white/80 text-sm mb-1">
                RAAH Career Guidance Program / An Initiative by Aptitude Counsel
              </p>
              <p className="text-white/70 text-sm">
                Website: aptitudecounsel.com &nbsp;|&nbsp; Email: aptitudecounsel@gmail.com
              </p>
            </div>
            <div className="mt-6">
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 bg-[#FDCA00] text-[#14442E] font-bold px-8 py-3 rounded-2xl hover:scale-105 hover:shadow-2xl transition-all duration-300 shadow-xl"
              >
                Get in Touch Today
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppButton />
    </div>
  );
}
