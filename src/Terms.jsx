import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Button } from "@heroui/react";

export const slugify = (text) => text ? text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : '';

export default function Terms() {
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState("");

  const sections = [
    "Acceptance of Terms",
    "User Accounts & Security",
    "Acceptable Use Policy",
    "Subscription & Billing",
    "Gamified Rewards Program",
    "Intellectual Property",
    "Limitation of Liability",
    "Governing Law",
    "Contact Information"
  ];

  useEffect(() => {
    const handleScroll = () => {
      let current = "";
      for (const heading of sections) {
        const el = document.getElementById(slugify(heading));
        if (el) {
          const rect = el.getBoundingClientRect();
          // Threshold 300px below the fixed navbar
          if (rect.top <= 300) {
            current = slugify(heading);
          }
        }
      }
      if (current === "" && sections.length > 0) current = slugify(sections[0]);
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="relative px-6 pb-32 pt-16 font-['Poppins'] min-h-[80vh]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>
      
      {/* Reading Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#dfff00] to-lime-500 origin-left z-[100]" 
        style={{ scaleX: scrollYProgress }} 
      />

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#dfff00]/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-20 max-w-3xl mx-auto pt-10">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#dfff00] mb-4 block">Legal & Security</span>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-6 text-white">
            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dfff00] to-lime-500">Service.</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            These Terms of Service govern your use of the RUVO application, platform, and connected services. Please read them carefully.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-gray-300">
            <svg className="w-4 h-4 text-[#dfff00]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Last Updated: March 20, 2026
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar TOC */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-32">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Contents</h4>
              <ul className="space-y-4">
                {sections.map((heading, idx) => {
                  const id = slugify(heading);
                  const isActive = activeSection === id;
                  return (
                    <li key={idx}>
                      <a
                        href={`#${id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById(id);
                          if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' });
                        }}
                        className={`block text-sm transition-all duration-300 border-l-2 pl-4 py-1 ${
                          isActive
                            ? 'border-[#dfff00] text-[#dfff00] font-bold'
                            : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
                        }`}
                      >
                        {heading}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="flex-grow max-w-3xl prose prose-invert font-['Poppins'] max-w-none text-gray-300 leading-relaxed space-y-12 text-lg">
            
            <div id={slugify(sections[0])} className="scroll-mt-32">
              <h2 className="text-3xl font-black text-white mb-6 tracking-tight">{sections[0]}</h2>
              <p>By downloading, accessing, or using the RUVO mobile application, website, or associated services (collectively, the "Services"), you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use the Services.</p>
            </div>

            <div id={slugify(sections[1])} className="scroll-mt-32">
              <h2 className="text-3xl font-black text-white mb-6 tracking-tight border-t border-white/10 pt-12">{sections[1]}</h2>
              <p>To access certain features of RUVO, such as AI coaching and leaderboards, you must register for an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
              <ul className="list-disc list-inside space-y-3 ml-4 mt-4 bg-[#111] p-6 rounded-3xl border border-[#222]">
                <li>You must provide accurate and complete information during registration.</li>
                <li>You must be at least 13 years old to use the Services (or the minimum legal age in your jurisdiction).</li>
                <li>You must immediately notify us of any unauthorized use of your account.</li>
              </ul>
            </div>

            <div id={slugify(sections[2])} className="scroll-mt-32">
              <h2 className="text-3xl font-black text-white mb-6 tracking-tight border-t border-white/10 pt-12">{sections[2]}</h2>
              <p>You agree to use RUVO strictly for lawful purposes and in accordance with our Community Guidelines. You agree not to:</p>
              <ul className="list-disc list-inside space-y-3 ml-4 mt-4 bg-[#111] p-6 rounded-3xl border border-[#222]">
                <li>Use motorized vehicles, GPS spoofing, or data manipulation (Digital Doping) to falsely claim segments or leaderboard rankings.</li>
                <li>Upload routes that trespass on private property or restricted areas.</li>
                <li>Harass, abuse, or harm other users within the community.</li>
                <li>Interfere with or disrupt the integrity or performance of the Services.</li>
              </ul>
            </div>

            <div id={slugify(sections[3])} className="scroll-mt-32">
              <h2 className="text-3xl font-black text-white mb-6 tracking-tight border-t border-white/10 pt-12">{sections[3]}</h2>
              <p>RUVO offers an optional premium subscription ("RUVO Elite") that unlocks advanced AI coaching, deeper analytics, and partner integrations. By subscribing, you agree to our recurring billing terms.</p>
              <ul className="list-disc list-inside space-y-3 ml-4 mt-4 bg-[#111] p-6 rounded-3xl border border-[#222]">
                <li>Subscriptions automatically renew unless canceled at least 24 hours before the end of the current billing period.</li>
                <li>You can manage or cancel your subscription through your Apple App Store or Google Play account settings.</li>
                <li>Refunds are subject to the policies of the respective app store where the purchase was made.</li>
              </ul>
            </div>

            <div id={slugify(sections[4])} className="scroll-mt-32">
              <h2 className="text-3xl font-black text-white mb-6 tracking-tight border-t border-white/10 pt-12">{sections[4]}</h2>
              <div className="bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-[#222] p-8 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#dfff00]/10 blur-[40px] rounded-full group-hover:bg-[#dfff00]/20 transition-colors"></div>
                <svg className="w-8 h-8 text-[#dfff00] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <h4 className="text-xl font-bold text-white mb-2 relative z-10">XP and Coins</h4>
                <p className="text-sm m-0 relative z-10 text-gray-400">RUVO rewards users with digital currency (Coins) and experience points (XP) for completing verified workouts. These virtual items have no cash value and cannot be exchanged for fiat currency. RUVO reserves the right to modify the conversion rate, availability of physical rewards, or terminate the program at any time without prior notice.</p>
              </div>
            </div>

            <div id={slugify(sections[5])} className="scroll-mt-32">
              <h2 className="text-3xl font-black text-white mb-6 tracking-tight border-t border-white/10 pt-12">{sections[5]}</h2>
              <p>The Services and their original content, features, and functionality are and will remain the exclusive property of RUVO Inc. and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of RUVO.</p>
              <p className="mt-4">You retain ownership of the biometric and route data you generate while using the app, but you grant RUVO a worldwide, royalty-free license to use, host, and display this data to provide the Services to you and the community.</p>
            </div>

            <div id={slugify(sections[6])} className="scroll-mt-32">
              <h2 className="text-3xl font-black text-white mb-6 tracking-tight border-t border-white/10 pt-12">{sections[6]}</h2>
              <p>RUVO provides tools to track fitness, but we do not provide medical advice. Always consult a physician before beginning any new exercise program.</p>
              <p className="mt-4 font-bold text-white">To the maximum extent permitted by law, RUVO Inc. shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including any injuries or damages sustained while engaging in physical activities tracked by our Services.</p>
            </div>

            <div id={slugify(sections[7])} className="scroll-mt-32">
              <h2 className="text-3xl font-black text-white mb-6 tracking-tight border-t border-white/10 pt-12">{sections[7]}</h2>
              <p>These Terms shall be governed and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.</p>
            </div>

            <div id={slugify(sections[8])} className="scroll-mt-32">
              <h2 className="text-3xl font-black text-white mb-6 tracking-tight border-t border-white/10 pt-12">{sections[8]}</h2>
              <p>If you have any questions or concerns about these Terms, please contact our legal team.</p>
              <Button as="a" href="mailto:legal@ruvo.app" radius="full" className="bg-white/10 text-white font-bold border border-white/20 hover:bg-white/20 mt-4 px-8">
                Contact Legal Team
              </Button>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}