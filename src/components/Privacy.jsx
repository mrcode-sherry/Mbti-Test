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
            Your confidence is our top priority at Aptitude Counsel. When you use our website and
            services, we gather, utilize, and safeguard your information as described in this privacy
            policy. You consent to the practices outlined here by using Aptitude Counsel.
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
            • Improve the quality of our services and research trends (always anonymous). <br />
            We never sell, rent, or misuse your data.
          </p>

          <h2 className="mb-3 font-semibold text-[18px]">3. Data Protection</h2>
          <p>
            • All data is stored securely with restricted access. <br />
            • Reports are shared directly with the student/parent only. <br />
            • Sensitive information is never disclosed to third parties without your consent.
          </p>

          <h2 className="mb-3 font-semibold text-[18px]">4. Consent & Control</h2>
          <p>
            • By using our services, you consent to data collection and usage as described here. <br />
            • If you are under 18, parental/guardian consent is required. <br />
            • You may request your data to be corrected or deleted at any time by contacting us.
          </p>

          <h2 className="mb-3 font-semibold text-[18px]">5. Cookies & Tracking</h2>
          <p>
            Our website may use cookies to improve your browsing experience. These cookies do not
            store personal details; they only help us understand user preferences.
          </p>

          <h2 className="mb-3 font-semibold text-[18px]">6. International Compliance</h2>
          <p>
            Our privacy standards follow not only the laws of Pakistan but also align with global
            privacy principles (GDPR, COPPA, etc.) to ensure your information is always respected.
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
            • Necessary to protect the safety of students or the public. <br />
            • With your explicit consent (e.g., when collaborating with career counselors/partners).
          </p>

          <h2 className="mb-3 font-semibold text-[18px]">9. Changes to Privacy Policy</h2>
          <p>
            Aptitude Counsel may update this policy to reflect improvements in service or legal
            requirements. Updated policies will always be posted here.
          </p>

          <h2 className="mb-3 font-semibold text-[18px]">10. Contact Us</h2>
          <p>
            For questions or concerns about your privacy, please reach out through our official
            contact page. We value your trust and will respond with transparency and care.
          </p>

          <h2 className="mb-3 font-semibold text-[18px]">Trust Note for Students & Parents</h2>
          <p>
            We understand how important your personal information is. At Aptitude Counsel, we
            protect it as if it were our own. You can focus on building your future while we ensure
            your privacy remains safe.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Privacy
