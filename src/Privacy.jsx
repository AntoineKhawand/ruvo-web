import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Button } from "@heroui/react";
import { Link as RouterLink } from "react-router-dom";
import { useScrollSpy, slugify } from './useScrollSpy';

export default function Privacy() {
  const { scrollYProgress } = useScroll();

  const sections = [
    "Information We Collect",
    "How We Use Your Data",
    "Data Storage and Security",
    "Data Sharing",
    "Privacy Zones",
    "Your Rights & Controls",
    "Contact Us"
  ];

  const activeSection = useScrollSpy(sections, 300);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="relative px-4 md:px-6 pb-20 md:pb-32 pt-10 md:pt-16 font-['Poppins'] min-h-[80vh]">
      
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
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-6 text-white">
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dfff00] to-lime-500">Policy.</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            At RUVO, we believe your biometric and location data belongs to you. We are transparent about how we collect, use, and protect your information.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-gray-300">
            <svg className="w-4 h-4 text-[#dfff00]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Last Updated: October 12, 2026
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
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="flex-grow max-w-3xl prose prose-invert font-['Poppins'] max-w-none text-gray-300 leading-relaxed space-y-8 md:space-y-12 text-base md:text-lg">
            
            <div id={slugify(sections[0])} className="scroll-mt-32">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4 md:mb-6 tracking-tight">{sections[0]}</h2>
              <p>We collect information you provide directly to us when creating an account, pairing a smartwatch, or logging a workout. This includes:</p>
              <ul className="list-disc list-outside space-y-3 ml-4 mt-4 bg-[#111] p-6 rounded-3xl border border-[#222]">
                <li><strong className="text-white font-bold">Account Data:</strong> Name, email address, age, gender, and profile picture.</li>
                <li><strong className="text-white font-bold">Health & Biometric Data:</strong> We access health data through integrations with services like Apple Health and Google Health Connect, as well as directly from your paired devices. This includes heart rate, VO2 Max, stride length, and sleep metrics.</li>
                <li><strong className="text-white font-bold">Location Data:</strong> When you record an activity, we collect precise GPS data, including your route, elevation, and speed, to map your run and calculate performance metrics. This collection only happens when you are actively recording a workout.</li>
              </ul>
            </div>

            <div id={slugify(sections[1])} className="scroll-mt-32">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4 md:mb-6 tracking-tight border-t border-white/10 pt-8 md:pt-12">{sections[1]}</h2>
              <p>The primary purpose of collecting your data is to power the core RUVO experience. Your data trains your personalized AI coaching models, generates recovery insights, and powers the community leaderboards.</p>
            </div>

            <div id={slugify(sections[2])} className="scroll-mt-32">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4 md:mb-6 tracking-tight border-t border-white/10 pt-8 md:pt-12">{sections[2]}</h2>
              <p>Your data is stored securely on Google's Firebase platform, utilizing Firestore for database management. All sensitive health and geolocation data is encrypted in transit and at rest using industry-standard AES-256 encryption. Our engineering team utilizes secure cloud functions and database rules to ensure your data is shielded from unauthorized access.</p>
            </div>

            <div id={slugify(sections[3])} className="scroll-mt-32">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4 md:mb-6 tracking-tight border-t border-white/10 pt-8 md:pt-12">{sections[3]}</h2>
              <p>We want to be unequivocally clear: <strong className="text-white">we do not and will not sell your personal or biometric data to third-party advertisers.</strong> Your privacy is not for sale. We may share anonymized, aggregated data with sports research institutions to advance the science of endurance training, but this data cannot be linked back to you individually.</p>
            </div>

            <div id={slugify(sections[4])} className="scroll-mt-32">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4 md:mb-6 tracking-tight border-t border-white/10 pt-8 md:pt-12">{sections[4]}</h2>
              <div className="bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-[#222] p-8 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#dfff00]/10 blur-[40px] rounded-full group-hover:bg-[#dfff00]/20 transition-colors"></div>
                <svg className="w-8 h-8 text-[#dfff00] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                <h4 className="text-xl font-bold text-white mb-2 relative z-10">Protecting your home</h4>
                <p className="text-sm m-0 relative z-10 text-gray-400">You have full control over what you share. Using our "Privacy Zones" feature, you can automatically hide the start and end points of your routes (like your home or workplace) from the public leaderboards.</p>
              </div>
            </div>

            <div id={slugify(sections[5])} className="scroll-mt-32">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4 md:mb-6 tracking-tight border-t border-white/10 pt-8 md:pt-12">{sections[5]}</h2>
              <p>You reserve the right to download all your data in a portable format (GPX, TCX, JSON) at any time. You may also request complete deletion of your account and all associated biometric data via the RUVO app settings.</p>
            </div>

            <div id={slugify(sections[6])} className="scroll-mt-32">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4 md:mb-6 tracking-tight border-t border-white/10 pt-8 md:pt-12">{sections[6]}</h2>
              <p>If you have questions or comments about this Privacy Policy, our Data Protection Officer is ready to help.</p>
              <Button as="a" href="mailto:privacy@ruvo.run" radius="full" className="bg-white/10 text-white font-bold border border-white/20 hover:bg-white/20 mt-4 px-8">
                Contact Privacy Team
              </Button>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
