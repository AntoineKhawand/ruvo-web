import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Card, Button } from "@heroui/react";
import { Link as RouterLink } from "react-router-dom";

const enforcementSteps = [
  { step: "01", title: "Report Submitted", desc: "Our community team receives the report and securely logs the flagged activity, route, or behavior." },
  { step: "02", title: "Investigation", desc: "Automated systems and human moderators review the GPS data, chat logs, or user profiles involved." },
  { step: "03", title: "Action Taken", desc: "If a violation is confirmed, we issue warnings, shadowbans, or permanent account deletions based on severity." },
  { step: "04", title: "Appeals", desc: "Users have 14 days to appeal a decision by providing counter-evidence or additional context to our support team." }
];

const commonQuestions = [
  { q: "What should I do if someone is following my private routes?", a: "Immediately utilize the 'Block User' feature on their profile and report them under 'Harassment'. Your private routes will instantly disappear from their feed." },
  { q: "Can I use an e-bike to capture a segment?", a: "No. Using motorized vehicles to capture running segments is a violation of our Digital Doping policy and will result in the immediate removal of your effort and a potential permanent ban." },
  { q: "How do I set up a Privacy Zone?", a: "Go to Settings > Privacy > Privacy Zones. You can hide the start and end points of your runs (e.g., around your home or workplace) from the public and leaderboards." }
];

function GuidelineFaq({ faq }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-6 text-left transition-colors hover:text-[#dfff00]"
      >
        <span className="font-bold text-lg text-white">{faq.q}</span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="w-5 h-5 text-gray-400 shrink-0 ml-4"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="pb-6 text-gray-400 leading-relaxed">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CommunityGuidelines() {
  const { scrollYProgress } = useScroll();

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const values = [
    {
      title: "Respect Every Athlete",
      desc: "We are a global community of diverse runners. Treat everyone with respect, regardless of their pace, distance, or experience level. Hate speech, bullying, and harassment have zero tolerance here.",
      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    },
    {
      title: "Keep It Safe",
      desc: "Do not post routes that trespass on private property, encourage dangerous behavior, or compromise the safety of others. Protect your own privacy by using our Privacy Zones feature.",
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    },
    {
      title: "Fair Play on Leaderboards",
      desc: "Our leaderboards represent honest effort. Do not use vehicles, manipulate GPS data, or submit fraudulent workouts to gain an unfair advantage. Keep the competition pure.",
      icon: "M13 10V3L4 14h7v7l9-11h-7z"
    },
    {
      title: "Support & Motivate",
      desc: "Kudos, comments, and route sharing are meant to uplift the community. Encourage your fellow runners, celebrate their PRs, and help out newcomers.",
      icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    }
  ];

  return (
    <div className="relative px-6 pb-24 pt-12 overflow-hidden font-['Poppins']">
      
      {/* Reading Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#dfff00] to-lime-500 origin-left z-[100]" 
        style={{ scaleX: scrollYProgress }} 
      />

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#dfff00]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Hero Section */}
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-24 pt-10">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#dfff00] mb-4 block">RUVO Network</span>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-6 text-white">
            Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dfff00] to-lime-500">Guidelines.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            We are building the most supportive and fiercely competitive running community on the planet. Here is how we run together.
          </p>
        </motion.div>

        {/* Core Values Grid */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">Our Core <span className="text-gray-500">Values.</span></h2>
          </div>
          <motion.div 
            variants={staggerContainer} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {values.map((val, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="h-full">
                <Card className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-[#222] p-10 h-full rounded-3xl hover:border-[#dfff00]/40 transition-all duration-500 group overflow-hidden relative flex flex-col hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(223,255,0,0.1)]">
                  <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#dfff00]/5 blur-[50px] rounded-full group-hover:bg-[#dfff00]/20 transition-all duration-700 pointer-events-none"></div>
                  
                  <div className="w-14 h-14 bg-[#222] rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:bg-[#dfff00] transition-colors duration-500 shadow-lg shrink-0">
                      <svg className="w-7 h-7 text-[#dfff00] group-hover:text-black transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={val.icon} />
                      </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-[#dfff00] transition-colors duration-300">{val.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-base">{val.desc}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Detailed Rules / Policy */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={fadeInUp}
          className="max-w-4xl mx-auto bg-[#111] border border-[#222] rounded-[3rem] p-8 md:p-16 mb-32 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#dfff00] to-lime-500"></div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-8">Zero Tolerance Policy</h2>
          
          <div className="space-y-8 text-gray-300 leading-relaxed font-light">
            <p>
              To maintain the integrity of the RUVO ecosystem, we enforce a strict zero-tolerance policy against specific behaviors. Violation of these rules will result in immediate suspension or permanent deletion of your account.
            </p>
            
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                </div>
                <div>
                  <strong className="text-white font-bold block mb-1">Digital Doping & Data Manipulation</strong>
                  Do not upload GPX files generated by software, alter timestamps, or use motorized transport to falsely claim segments on the leaderboard.
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                </div>
                <div>
                  <strong className="text-white font-bold block mb-1">Harassment & Discrimination</strong>
                  We do not tolerate abusive language, threats, or any form of discrimination based on race, gender, sexual orientation, religion, or ability.
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                </div>
                <div>
                  <strong className="text-white font-bold block mb-1">Spam & Commercial Solicitation</strong>
                  Do not use the club forums or comments to post repetitive content, unauthorized advertisements, or malicious links.
                </div>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Animated Enforcement Timeline */}
        <div className="mb-32 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">How We <span className="text-gray-500">Enforce.</span></h2>
          </div>
          <div className="relative">
            {/* Center Line for Desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2"></div>
            
            <div className="space-y-12 relative z-10">
              {enforcementSteps.map((step, idx) => (
                <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`md:w-1/2 flex ${idx % 2 === 0 ? 'md:justify-end' : 'md:justify-start'} w-full`}>
                    <Card className="bg-[#111] border border-[#222] p-8 max-w-sm w-full rounded-3xl hover:border-[#dfff00]/30 transition-colors group">
                      <div className="text-[#dfff00] font-black text-4xl mb-4 opacity-30 group-hover:opacity-100 transition-opacity">{step.step}</div>
                      <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                    </Card>
                  </div>
                  <div className="hidden md:flex w-12 h-12 rounded-full bg-[#111] border-4 border-[#222] items-center justify-center shrink-0 relative z-10 text-[#dfff00] shadow-[0_0_15px_rgba(223,255,0,0.15)]">
                    <div className="w-3 h-3 bg-[#dfff00] rounded-full animate-pulse"></div>
                  </div>
                  <div className="hidden md:block md:w-1/2 w-full"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Common Scenarios / FAQ Accordion */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} className="max-w-4xl mx-auto mb-32">
          <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-8 text-center">Common <span className="text-gray-500">Scenarios.</span></h2>
          <div className="border-t border-white/10">
            {commonQuestions.map((faq, idx) => (
              <GuidelineFaq key={idx} faq={faq} />
            ))}
          </div>
        </motion.div>

        {/* Reporting CTA */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={fadeInUp} 
          className="text-center bg-gradient-to-br from-[#161616] to-[#0a0a0a] border border-[#222] rounded-[3rem] p-12 max-w-4xl mx-auto relative overflow-hidden"
        >
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#dfff00]/10 blur-[80px] rounded-full pointer-events-none"></div>
          <svg className="w-12 h-12 text-[#dfff00] mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
          </svg>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4 relative z-10">See Something <span className="text-gray-500">Wrong?</span></h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto relative z-10">
            Help us keep RUVO safe and fair. If you spot a suspicious activity or a violation of these guidelines, please report it immediately.
          </p>
          <Button as={RouterLink} to="/support" radius="full" size="lg" className="bg-[#dfff00] text-black font-bold px-10 py-6 text-base hover:scale-105 transition-transform shadow-[0_0_30px_rgba(223,255,0,0.15)] relative z-10">
            Report a Violation
          </Button>
        </motion.div>

      </div>
    </div>
  );
}