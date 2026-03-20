import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Chip, Button, Avatar, AvatarGroup } from "@heroui/react";
import { Link as RouterLink } from "react-router-dom";

function FeatureFaqItem({ faq }) {
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
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-400 leading-relaxed">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Features() {
  const [activeTab, setActiveTab] = useState(0);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const showcaseTabs = [
    { id: 'pacing', title: 'Dynamic Pacing', desc: 'Real-time pace adjustments based on elevation and past performance.' },
    { id: 'recovery', title: 'AI Recovery', desc: 'Biometric analysis to tell you exactly when to push and when to rest.' },
    { id: 'rewards', title: 'Sweat & Earn', desc: 'Convert your runs into XP and Coins to unlock discounts at Nike, Decathlon, and more.' },
    { id: 'analytics', title: 'Elite Analytics', desc: 'VO2 Max, ground contact time, and vertical oscillation tracking.' },
  ];

  const comparisonFeatures = [
    { name: "Multi-constellation GPS Tracking", free: true, pro: true },
    { name: "Basic Pace & Distance Analytics", free: true, pro: true },
    { name: "Global Community & Leaderboards", free: true, pro: true },
    { name: "Third-party Device Sync (Apple, Garmin)", free: true, pro: true },
    { name: "AI Smart Coaching", free: false, pro: true },
    { name: "Advanced Biometrics (VO2 Max)", free: false, pro: true },
    { name: "Custom AI Training Plans", free: false, pro: true },
    { name: "Live Telemetry Sharing", free: true, pro: true },
    { name: "Gear Wear Tracking", free: true, pro: true },
  ];

  const integrations = [
    { name: "Apple Watch", delay: 0 },
    { name: "Garmin", delay: 0.2 },
    { name: "Coros", delay: 0.4 },
    { name: "Suunto", delay: 0.1 },
    { name: "Oura Ring", delay: 0.5 },
    { name: "Whoop", delay: 0.6 },
    { name: "Polar", delay: 0.25 },
    { name: "Fitbit", delay: 0.45 },
  ];

  const faqs = [
    { q: "Do I need a smartwatch to use RUVO?", a: "No, you can use your phone's native GPS to track runs perfectly. However, connecting a smartwatch unlocks advanced biometrics like live heart rate and VO2 max." },
    { q: "Can I cancel my Elite subscription anytime?", a: "Yes, you can easily cancel or pause your Elite tier at any moment directly from your account settings with no hidden fees." },
    { q: "How accurate is the AI recovery analysis?", a: "Our AI model uses your heart rate variability (HRV), sleep stages, and past performance data to provide highly accurate recovery scores, designed alongside clinical sports scientists." },
    { q: "Can I export my data to other platforms?", a: "Absolutely. RUVO supports automatic background syncing and manual exports to TrainingPeaks, Apple Health, and Google Fit." },
  ];

  return (
    <div className="relative px-6 pb-0 pt-12 overflow-hidden font-['Poppins']">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#dfff00]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-20 max-w-3xl mx-auto">
          <Chip radius="full" size="sm" className="bg-[#dfff00]/10 text-[#dfff00] font-bold tracking-[0.2em] uppercase mb-6 border border-[#dfff00]/20 px-4 py-4">
            Pro Features
          </Chip>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
            Engineered for <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dfff00] to-lime-500">Performance.</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Discover the tools that power world-class athletes. From dynamic AI coaching to sub-meter GPS precision, every feature is built to help you shatter your limits.
          </p>
        </motion.div>

        {/* Top Feature Highlights (2 Cols) */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Feature 1 */}
            <motion.div variants={fadeInUp} className="h-full">
              <Card className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-[#222] p-10 h-full rounded-3xl hover:border-[#dfff00]/40 transition-colors duration-500 group overflow-hidden relative flex flex-col">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#dfff00]/10 blur-[70px] rounded-full group-hover:bg-[#dfff00]/20 transition-all duration-700 pointer-events-none"></div>
                
                <div className="w-14 h-14 bg-[#222] rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:bg-[#dfff00] transition-colors duration-500 shadow-lg">
                    <svg className="w-7 h-7 text-[#dfff00] group-hover:text-black transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">AI Smart Coaching</h3>
                <p className="text-gray-400 leading-relaxed mb-10 text-lg">Our proprietary AI adapts to your biometric data in real-time, dynamically adjusting your training schedule to maximize gains and prevent injury.</p>
                
                <div className="mt-auto bg-black/50 rounded-2xl p-5 border border-white/5">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Recovery Status</span>
                        <span className="text-xs text-[#dfff00] font-black uppercase tracking-widest">Optimal</span>
                    </div>
                    <div className="w-full bg-[#222] h-2.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-[#dfff00] to-lime-500 h-full w-[85%] rounded-full shadow-[0_0_10px_rgba(223,255,0,0.5)]"></div>
                    </div>
                </div>
              </Card>
            </motion.div>

            {/* Feature 2 */}
            <motion.div variants={fadeInUp} className="h-full">
              <Card className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-[#222] p-10 h-full rounded-3xl hover:border-blue-500/40 transition-colors duration-500 group overflow-hidden relative flex flex-col">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/10 blur-[70px] rounded-full group-hover:bg-blue-500/20 transition-all duration-700 pointer-events-none"></div>
                
                <div className="w-14 h-14 bg-[#222] rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:bg-blue-500 transition-colors duration-500 shadow-lg">
                    <svg className="w-7 h-7 text-blue-500 group-hover:text-white transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Precision Routing</h3>
                <p className="text-gray-400 leading-relaxed mb-10 text-lg">Multi-constellation GPS support combined with elevation mapping gives you the most accurate route data possible, even in dense urban environments.</p>
                
                <div className="mt-auto">
                    <div className="flex flex-wrap gap-3">
                        {['GPS', 'GLONASS', 'GALILEO'].map(sys => (
                            <span key={sys} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[11px] font-bold text-gray-400 tracking-widest">{sys}</span>
                        ))}
                    </div>
                </div>
              </Card>
            </motion.div>
        </motion.div>

        {/* Bottom Feature Highlights (3 Cols) */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
                { title: "Advanced Biometrics", desc: "Sync with heart rate monitors and power meters for deep physiological insights.", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", color: "text-red-500", hoverBorder: "hover:border-red-500/40" },
                { title: "Gear Tracking", desc: "Automatically track mileage on your shoes and get notified when it's time to replace them.", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", color: "text-teal-400", hoverBorder: "hover:border-teal-400/40" },
                { title: "Real-World Rewards", desc: "Every run earns you XP and Coins. Cash them out for discounts at Nike, Decathlon, and partner gyms.", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "text-yellow-400", hoverBorder: "hover:border-yellow-400/40" }
            ].map((item, idx) => (
                <motion.div key={idx} variants={fadeInUp} className="h-full">
                    <Card className={`bg-[#111] border border-[#222] p-8 h-full rounded-3xl ${item.hoverBorder} transition-colors duration-500 group flex flex-col`}>
                        <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                          <svg className={`w-6 h-6 ${item.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                          </svg>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-3 tracking-tight">{item.title}</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                    </Card>
                </motion.div>
            ))}
        </motion.div>

        {/* Pro Athlete Testimonial */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="mt-32 mb-20 max-w-5xl mx-auto text-center px-6">
          <div className="inline-flex items-center justify-center gap-4 mb-10">
            <Avatar src="https://randomuser.me/api/portraits/women/44.jpg" size="lg" className="border-2 border-[#dfff00]" />
            <div className="text-left">
              <h4 className="text-white font-bold tracking-tight text-lg">Sarah Jenkins</h4>
              <p className="text-[#dfff00] text-[10px] font-bold uppercase tracking-widest">Verified Ultra-Marathoner</p>
            </div>
          </div>
          <h2 className="text-2xl md:text-4xl font-light text-gray-300 italic leading-tight">
            "The AI coaching helped me prep for my ultra-marathons, but cashing out my XP for new gear at Decathlon was the real game changer. It's literally an app that pays you to run."
          </h2>
        </motion.div>

        {/* Interactive Feature Showcase */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="py-24 border-t border-white/10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">See It In <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dfff00] to-lime-500">Action.</span></h2>
            <p className="text-gray-400 text-lg">Select a feature below to see how RUVO analyzes your performance.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-4">
              {showcaseTabs.map((tab, idx) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(idx)}
                  className={`text-left p-6 rounded-3xl border transition-all duration-300 ${activeTab === idx ? 'bg-white/10 border-[#dfff00]/50 shadow-[0_0_30px_rgba(223,255,0,0.1)]' : 'bg-[#111] border-[#222] hover:bg-white/5'}`}
                >
                  <h3 className={`text-xl font-bold mb-2 transition-colors ${activeTab === idx ? 'text-[#dfff00]' : 'text-white'}`}>{tab.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{tab.desc}</p>
                </button>
              ))}
            </div>
            
            {/* Abstract Phone Mockup */}
            <div className="relative w-full max-w-[320px] h-[650px] mx-auto bg-black border-[8px] border-[#222] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col">
              {/* Phone Notch */}
              <div className="absolute top-0 inset-x-0 h-6 bg-[#222] rounded-b-3xl w-40 mx-auto z-20"></div>
              
              <div className="p-6 pt-16 flex-grow flex flex-col relative z-10 bg-gradient-to-b from-[#111] to-black">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeTab}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-4 h-full"
                  >
                    {activeTab === 0 && (
                      <>
                        {/* Pacing Mockup */}
                        <div className="w-12 h-12 bg-[#dfff00]/20 rounded-full flex items-center justify-center mb-2">
                          <div className="w-6 h-6 bg-[#dfff00] rounded-full animate-pulse"></div>
                        </div>
                        <h4 className="text-white font-bold text-2xl tracking-tight">{showcaseTabs[activeTab].title}</h4>
                        
                        <div className="bg-[#222] rounded-2xl p-4 mt-4 shadow-inner">
                          <div className="h-2 w-1/3 bg-gray-600 rounded-full mb-4"></div>
                          <div className="h-16 w-full bg-gradient-to-r from-[#dfff00] to-lime-500 rounded-xl mb-3 opacity-90"></div>
                          <div className="flex gap-2">
                            <div className="h-8 flex-1 bg-gray-700 rounded-lg"></div>
                            <div className="h-8 flex-1 bg-gray-700 rounded-lg"></div>
                          </div>
                        </div>
                        
                        <div className="mt-auto space-y-3">
                          <div className="h-12 w-full bg-[#333] rounded-xl flex items-center px-4 gap-3">
                            <div className="w-6 h-6 rounded-full bg-[#dfff00]"></div>
                            <div className="h-2 w-1/2 bg-gray-500 rounded-full"></div>
                          </div>
                          <div className="h-12 w-full bg-[#333] rounded-xl flex items-center px-4 gap-3">
                            <div className="w-6 h-6 rounded-full bg-[#dfff00]/40"></div>
                            <div className="h-2 w-1/3 bg-gray-500 rounded-full"></div>
                          </div>
                        </div>
                      </>
                    )}
                    {activeTab === 1 && (
                      <>
                        {/* Recovery Mockup */}
                        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-2">
                          <div className="w-6 h-6 bg-blue-500 rounded-full animate-pulse"></div>
                        </div>
                        <h4 className="text-white font-bold text-2xl tracking-tight">{showcaseTabs[activeTab].title}</h4>
                        
                        <div className="flex-1 flex flex-col items-center justify-center mt-4 border border-[#333] rounded-2xl bg-[#1a1a1a]">
                          <div className="relative w-32 h-32 rounded-full border-[6px] border-[#222] border-t-blue-500 border-r-blue-500 animate-[spin_3s_linear_infinite] flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                            <div className="absolute inset-0 w-full h-full rounded-full border-[6px] border-transparent border-b-blue-400 animate-[spin_2s_linear_infinite_reverse]"></div>
                            <div className="font-black text-3xl text-white tracking-tighter absolute rotate-0 animate-none">94%</div>
                          </div>
                          <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Fully Recovered</span>
                        </div>
                      </>
                    )}
                    {activeTab === 2 && (
                      <>
                        {/* Rewards Mockup */}
                        <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                          <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h4 className="text-white font-bold text-2xl tracking-tight">{showcaseTabs[activeTab].title}</h4>
                        
                        <div className="mt-6 space-y-4">
                            <div className="flex justify-between items-center bg-[#222] border border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.15)] p-4 rounded-xl hover:bg-[#2a2a2a] transition-colors cursor-pointer">
                                <div>
                                  <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Nike Outlet</span>
                                  <span className="block text-lg font-black text-white leading-none">-20% Discount</span>
                                </div>
                                <span className="bg-yellow-500 text-black text-xs font-black px-3 py-1.5 rounded-full">500 Coins</span>
                            </div>
                            <div className="flex justify-between items-center bg-[#222] border border-white/5 p-4 rounded-xl hover:bg-[#2a2a2a] transition-colors cursor-pointer">
                                <div>
                                  <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Decathlon</span>
                                  <span className="block text-lg font-black text-white leading-none">$50 Voucher</span>
                                </div>
                                <span className="bg-yellow-500 text-black text-xs font-black px-3 py-1.5 rounded-full">1200 Coins</span>
                            </div>
                            <div className="flex justify-between items-center bg-[#222] border border-white/5 p-4 rounded-xl hover:bg-[#2a2a2a] transition-colors cursor-pointer">
                                <div>
                                  <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Equinox Gym</span>
                                  <span className="block text-lg font-black text-white leading-none">Free Month</span>
                                </div>
                                <span className="bg-yellow-500 text-black text-xs font-black px-3 py-1.5 rounded-full">2500 Coins</span>
                            </div>
                        </div>
                      </>
                    )}
                    {activeTab === 3 && (
                      <>
                        {/* Analytics Mockup */}
                        <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mb-2">
                          <div className="w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
                        </div>
                        <h4 className="text-white font-bold text-2xl tracking-tight">{showcaseTabs[activeTab].title}</h4>
                        
                        <div className="flex items-end justify-between gap-1 h-32 mt-6 border-b border-[#333] pb-2 px-2">
                            <div className="w-full bg-red-500/30 rounded-t-sm h-[30%]"></div>
                            <div className="w-full bg-red-500/50 rounded-t-sm h-[50%] hover:bg-red-500 transition-colors"></div>
                            <div className="w-full bg-red-500/70 rounded-t-sm h-[75%] hover:bg-red-500 transition-colors"></div>
                            <div className="w-full bg-red-500 rounded-t-sm h-[100%] shadow-[0_0_15px_rgba(239,68,68,0.5)]"></div>
                            <div className="w-full bg-red-500/60 rounded-t-sm h-[65%] hover:bg-red-500 transition-colors"></div>
                            <div className="w-full bg-red-500/40 rounded-t-sm h-[45%] hover:bg-red-500 transition-colors"></div>
                        </div>
                        
                        <div className="mt-auto grid grid-cols-2 gap-3">
                            <div className="bg-[#222] p-4 rounded-xl flex flex-col items-center justify-center text-center">
                                <span className="text-2xl font-black text-white">58.2</span>
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">VO2 Max</span>
                            </div>
                            <div className="bg-[#222] p-4 rounded-xl flex flex-col items-center justify-center text-center">
                                <span className="text-2xl font-black text-white">210</span>
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">GCT (ms)</span>
                            </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Free vs. Elite Comparison Table */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">Choose Your <span className="text-gray-500">Tier.</span></h2>
            <p className="text-gray-400 text-lg">Start for free, upgrade to Elite when you are ready to get serious.</p>
          </div>

          <div className="max-w-7xl w-full mx-auto bg-[#111] border border-[#222] rounded-3xl overflow-x-auto shadow-2xl">
            <div className="min-w-[600px]">
              <div className="grid grid-cols-3 bg-[#0a0a0a] border-b border-[#222]">
                <div className="p-6 font-bold text-gray-400 uppercase tracking-widest text-xs flex items-center">Features</div>
                <div className="p-6 text-center border-l border-[#222]">
                  <h3 className="text-xl font-bold text-white mb-1">Basic</h3>
                  <p className="text-sm text-gray-500 font-medium">Free Forever</p>
                </div>
                <div className="p-6 text-center border-l border-[#222] relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#dfff00]/5 pointer-events-none"></div>
                  <h3 className="text-xl font-black text-[#dfff00] mb-1 relative z-10">Elite</h3>
                  <p className="text-sm text-gray-400 font-medium relative z-10">$4.99 / mo</p>
                </div>
              </div>
              
              <div className="divide-y divide-[#222]">
                {comparisonFeatures.map((feature, idx) => (
                  <div key={idx} className="grid grid-cols-3 hover:bg-[#161616] transition-colors">
                    <div className="p-5 flex items-center text-sm font-medium text-gray-300">{feature.name}</div>
                    <div className="p-5 border-l border-[#222] flex items-center justify-center">
                      {feature.free ? <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg> : <div className="w-4 h-[2px] bg-[#333] rounded-full"></div>}
                    </div>
                    <div className="p-5 border-l border-[#222] flex items-center justify-center bg-[#dfff00]/[0.02]">
                      {feature.pro ? <svg className="w-5 h-5 text-[#dfff00]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg> : <div className="w-4 h-[2px] bg-[#333] rounded-full"></div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hardware & App Integrations Cloud */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="py-24 border-t border-white/10 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#dfff00] mb-4 block">Seamless Sync</span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-12 text-white">Plays Well With <span className="text-gray-500">Others.</span></h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {integrations.map((item, idx) => (
              <motion.div 
                key={idx} 
                animate={{ y: [0, -8, 0] }} 
                transition={{ duration: 3, repeat: Infinity, delay: item.delay, ease: "easeInOut" }}
              >
                <div className="bg-[#111] border border-[#222] text-gray-300 font-bold px-8 py-4 rounded-2xl shadow-xl hover:border-[#dfff00]/40 hover:text-white transition-colors cursor-default">
                  {item.name}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Data Privacy & Security Block */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="py-12 mb-12">
          <Card className="bg-gradient-to-br from-[#0a0a0a] to-[#111] border border-[#222] p-10 md:p-16 max-w-5xl mx-auto rounded-[3rem] text-center relative overflow-hidden group">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-green-500/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-green-500/10 transition-colors duration-700"></div>
            <div className="w-20 h-20 bg-[#222] rounded-full flex items-center justify-center mx-auto mb-8 relative z-10 border border-white/5 shadow-lg group-hover:border-green-500/50 transition-colors">
              <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6 relative z-10">Your Data is <span className="text-green-500">Yours.</span></h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed relative z-10">
              We believe elite performance tracking shouldn't come at the cost of your privacy. All your biometric and location data is end-to-end encrypted and we will <strong className="text-white">never</strong> sell it to third parties.
            </p>
          </Card>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="py-32 border-t border-white/10 max-w-7xl mx-auto px-6">
          <div className="grid gap-16 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#dfff00]">
                FAQ
              </span>
              <h2 className="mb-6 text-4xl font-black uppercase leading-none tracking-tight text-white sm:text-5xl text-balance">
                Got <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dfff00] to-lime-500">Questions?</span>
              </h2>
              <p className="max-w-sm text-lg leading-relaxed text-gray-400">
                Everything you need to know about RUVO. Can{"'"}t find what you{"'"}re looking for? Reach out to our support team.
              </p>
              <Button as={RouterLink} to="/support" radius="full" className="mt-8 inline-flex bg-white/10 border border-white/20 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-white/20 hover:scale-105">
                Contact Support
              </Button>
            </div>
            <div className="lg:col-span-3">
              <div className="border-t border-white/10">
                {faqs.map((faq, idx) => (
                  <FeatureFaqItem key={idx} faq={faq} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA Banner */}
        <section className="relative z-10 py-32 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#dfff00]">Join The Movement</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mt-2 mb-6">
                Ready to <span className="text-[#dfff00]">Shatter</span><br /> Your Limits?
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
                Join over 2 million athletes worldwide who have already redefined their training with RUVO. Download the app today.
              </p>
              <div className="flex flex-col items-center justify-center">
                <AvatarGroup isBordered max={5} className="mb-6 scale-125">
                  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                  <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
                </AvatarGroup>
                <Button radius="full" size="lg" className="bg-white text-black font-bold px-10 py-6 mt-4 hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  Download RUVO App
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </div>
  );
}