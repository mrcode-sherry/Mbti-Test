'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users, BookOpen, Award, TrendingUp, Target, CheckCircle,
  School, MapPin, Phone, Mail, MessageSquare, ChevronDown,
  ArrowRight, ShieldCheck, Star, Lightbulb, BarChart2, ClipboardList
} from 'lucide-react';

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
      <section
        className="relative min-h-[85vh] bg-cover bg-center bg-no-repeat text-white flex items-center"
        style={{ backgroundImage: "url('/Banners/about-banner.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/55 to-black/65" />

        {/* Animated blobs */}
        <div className="absolute top-16 left-8 w-32 h-32 bg-emerald-400/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-24 right-12 w-40 h-40 bg-[#FDCA00]/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 py-20">
          <div className="max-w-2xl space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#FDCA00]/20 border border-[#FDCA00]/30 rounded-full px-5 py-2">
              <div className="w-2 h-2 bg-[#FDCA00] rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-[#FDCA00] tracking-wide uppercase">RAAH for Schools</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight drop-shadow-2xl">
              Build a <span className="text-[#FDCA00]">Future‑Ready</span><br />School with RAAH
            </h1>

            <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light">
              Empower your students to understand themselves, explore opportunities
              and plan a successful future — with confidence and clarity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={scrollToForm}
                className="group relative bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 text-white font-bold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-emerald-500/30 hover:scale-105 transition-all duration-300 text-lg overflow-hidden border border-emerald-400/30 flex items-center justify-center gap-2"
              >
                Partner with RAAH Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 pt-4">
              {['Trusted by Schools', 'Expert Guidance', 'Secure & Confidential', 'Brighter Future for Every Student'].map(t => (
                <div key={t} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-white/90">
                  <CheckCircle className="w-4 h-4 text-[#FDCA00]" />
                  {t}
                </div>
              ))}
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

      {/* ── REPORTS ──────────────────────────────────────────────────────── */}
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
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
            ].map((r, i) => <ReportCard key={i} icon={r.icon} title={r.title} />)}
          </div>
        </div>
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
            <p className="text-2xl md:text-3xl font-bold italic text-[#FDCA00] mb-6">
              "Because every student deserves a RAAH."
            </p>
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 bg-[#FDCA00] text-[#14442E] font-bold px-8 py-3 rounded-2xl hover:scale-105 hover:shadow-2xl transition-all duration-300 shadow-xl"
            >
              Get in Touch Today
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
