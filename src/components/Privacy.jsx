import React from 'react'
import PageBanner from './PageBanner'

const Privacy = () => {
  return (
    <div className="bg-white text-[#14442E]">
      <PageBanner title="Privacy Policy" backgroundImage="/Banners/about-banner.jpg" />

      {/* Section 1: About Info */}
      <section className="py-16 md:px-16 px-8 text-center">
        {/* Top Heading */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-12 h-px bg-[#14442E] opacity-40" />
          <p className="uppercase text-sm tracking-widest text-[#14442E] font-medium">Privacy Policy</p>
          <div className="w-12 h-px bg-[#14442E] opacity-40" />
        </div>

        <h2 className="text-[29px] md:text-4xl font-bold mb-4 text-[#14442E]">
          Aptitude Counsel's Privacy Policy
        </h2>

        <div className="text-gray-600 max-w-3xl text-left mx-auto mb-12 text-sm sm:text-base space-y-4">
          <p>
            Your confidence is our top priority at Aptitude Counsel. When you use our website and services, we gather, utilize, and safeguard your information as described in this privacy policy. You consent to the practices outlined here by using Aptitude Counsel.
          </p>

          <h2 className="mb-3 font-semibold text-[18px]">1. Information We Collect</h2>
          <p>
            To provide accurate career guidance, we may collect: <br />
            • Basic details (name, age, gender, education level). <br />
            • Test responses for MBTI-based assessments. <br />
            • Contact information (email/phone) for communication. <br />
            • Optional feedback to improve our services.
          </p>

          <h2 className="mb-3 font-semibold text-[18px]">2. How We Use Your Information</h2>
          <p>
            Your information is used only to: <br />
            • Generate personalized MBTI-based career reports. <br />
            • Share guidance, resources, or updates about your results. <br />
            • We use your feedback only to make our services better and to study future trends always keeping it anonymous. Your data is safe with us, never sold or misused.
          </p>

          <h2 className="mb-3 font-semibold text-[18px]">3. Data Protection</h2>
          <p>
            • All data is stored securely with restricted access. <br />
            • Reports are shared directly with the student/parent only. <br />
            • Sensitive information is never disclosed to third parties without your consent.
          </p>

          <h2 className="mb-3 font-semibold text-[18px]">4. Consent & Control</h2>
          <p>
            • When you use our services, it mean you agree we keep your info safe and use it in good way. <br />
            • If you are under 18, make sure your parents or guardian say yes before you use our services. <br />
            • Anytime you want, you can ask us to change or delete your info. Just message us, we will help you happy.
          </p>

          <h2 className="mb-3 font-semibold text-[18px]">5. Cookies & Tracking</h2>
          <p>
            We use cookies to make your visit smoother and more useful. They don’t keep any personal details — they just help us understand what you like, so we can serve you better.
          </p>

          <h2 className="mb-3 font-semibold text-[18px]">6. International Compliance</h2>
          <p>
            We respect your personal information with care. We care for your data and keep it safe. Our rules follow Pakistan law and also big world rules like COPPA and GDPR. We respect you and protect your privacy.
          </p>

          <h2 className="mb-3 font-semibold text-[18px]">7. Data Retention</h2>
          <p>
            • Your test data is retained for as long as necessary to provide services. <br />
            • You may request deletion of your data by contacting us.
          </p>

          <h2 className="mb-3 font-semibold text-[18px]">8. Sharing of Information</h2>
          <p>
            We may share data only when: <br />
            • Required by law. <br />
            • Only when it is truly important to keep students or the community safe. <br />
            • Only if you give us clear permission, like when we connect you with career counselors or trusted partners.
          </p>

          <h2 className="mb-3 font-semibold text-[18px]">9. Changes to Privacy Policy</h2>
          <p>
            Aptitude Counsel may update this policy to reflect improvements in service or legal requirements. Updated policies will always be posted here.
          </p>

          <h2 className="mb-3 font-semibold text-[18px]">10. Contact Us</h2>
          <p>
            Please use our official page to contact us if you have any questions at all regarding your privacy. We value your trust and pledge to act with integrity and consideration.
          </p>

          <h2 className="mb-3 font-semibold text-[18px]">Trust Note for Students & Parents</h2>
          <p>
            We know how precious your personal details are. At Aptitude Counsel, we care for your information like it is our own. We keep your privacy safe and secure, so you can stay relaxed and think about your future.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Privacy
