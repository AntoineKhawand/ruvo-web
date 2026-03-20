import React from 'react';
import { motion } from 'framer-motion';
import { Card } from "@heroui/react";
import { Link as RouterLink } from "react-router-dom";

export default function About() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const coreValues = [
    { title: "Precision", desc: "Uncompromising accuracy in every metric, from sub-meter GPS to advanced biomechanics.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
    { title: "Privacy", desc: "Your data belongs to you. End-to-end encrypted and never sold to third parties.", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
    { title: "Community", desc: "Pushing each other to new limits through shared challenges and fierce support.", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" }
  ];

  const timeline = [
    { date: "Q1 2026", title: "The Vision", desc: "The concept for RUVO is born out of frustration with existing running apps." },
    { date: "Q2 2026", title: "First Prototype", desc: "Successfully tested our proprietary AI pacing algorithm on the track." },
    { date: "Q3 2026", title: "Public Launch", desc: "RUVO v1.0 hits the App Store and Google Play with full smartwatch integration." },
    { date: "Q4 2026", title: "Rapid Growth", desc: "Surpassed 2 million active runners and expanded global leaderboards." }
  ];

  return (
    <div className="relative px-6 pb-24 pt-16 overflow-hidden font-['Poppins'] min-h-[80vh]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#dfff00]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-24">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#dfff00] mb-4 block">Our Story</span>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 text-white leading-none">
            Built by <span className="text-gray-500">Athletes.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-5xl mx-auto">
            RUVO was established with a singular vision: to bridge the gap between elite sports science and everyday athletes. We engineered a platform that not only delivers uncompromising precision, advanced AI coaching, heart rate tracking, and gear monitoring, but also fundamentally changes how you stay motivated. With RUVO, every drop of sweat translates into XP and Coins, unlocking physical rewards like discounts at Nike, Decathlon, and premium gym memberships.
          </p>
        </motion.div>

        {/* Company Stats */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          {[
            { label: "Founded", value: "2026", desc: "Launched with a commitment to redefine athletic tracking." },
            { label: "Active Runners", value: "2M+", desc: "A rapidly growing global community of dedicated athletes." },
            { label: "Routes Logged", value: "15M+", desc: "Kilometers tracked across cities, trails, and tracks worldwide." }
          ].map((stat, idx) => (
            <motion.div key={idx} variants={fadeInUp} className="h-full">
              <Card className="bg-[#111] border border-[#222] p-8 h-full rounded-3xl hover:border-[#dfff00]/30 transition-colors flex flex-col text-center">
                <h3 className="text-5xl font-black text-[#dfff00] mb-4 tracking-tighter">{stat.value}</h3>
                <h4 className="text-lg font-bold text-white mb-2 uppercase tracking-widest">{stat.label}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{stat.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Core Values */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-32">
          <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-12 text-center">Our Core <span className="text-gray-500">Values.</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((val, idx) => (
              <Card key={idx} className="bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-[#222] p-8 rounded-3xl hover:border-[#dfff00]/40 transition-colors duration-500 group">
                <div className="w-12 h-12 bg-[#222] rounded-2xl flex items-center justify-center mb-6 border border-white/5 group-hover:bg-[#dfff00] transition-colors duration-500 shadow-lg">
                  <svg className="w-6 h-6 text-[#dfff00] group-hover:text-black transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={val.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-[#dfff00] transition-colors">{val.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{val.desc}</p>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* The Technology */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-32 bg-[#111] border border-[#222] rounded-[3rem] p-10 md:p-16 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#dfff00]/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-[#dfff00]/10 transition-colors duration-700"></div>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-6 relative z-10">The <span className="text-[#dfff00]">Technology.</span></h2>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl relative z-10">
            RUVO isn't just a GPS tracker; it's a comprehensive ecosystem for your fitness journey. We utilize advanced AI coaching models to dynamically adjust your training, precise heart rate and gear tracking to monitor your equipment and body, and a proprietary gamification engine that converts your physical milestones into tangible, real-world rewards.
          </p>
        </motion.div>

        {/* Journey / Timeline */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-32 max-w-3xl mx-auto">
          <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-16 text-center">The <span className="text-gray-500">Journey.</span></h2>
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            {timeline.map((item, idx) => (
              <div key={idx} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}>
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#111] bg-[#222] group-hover:bg-[#dfff00] text-white group-hover:text-black shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(223,255,0,0)] group-hover:shadow-[0_0_15px_rgba(223,255,0,0.3)] transition-all duration-500 z-10">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
                </div>
                <Card className="bg-[#111] border border-[#222] p-6 w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] rounded-2xl group-hover:border-[#dfff00]/30 transition-colors">
                  <span className="text-[#dfff00] text-xs font-bold uppercase tracking-widest mb-2 block">{item.date}</span>
                  <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </Card>
              </div>
            ))}
          </div>
        </motion.div>

        {/* The Founder Full-Width Section */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="w-[100vw] relative left-1/2 -translate-x-1/2 h-[80vh] min-h-[600px] mt-32 group overflow-hidden cursor-pointer bg-[#050505]">
          
          {/* ⚠️ BACKGROUND IMAGE HERE ⚠️ */}
          <img src="/drew-darby-2BTaFPEO5YU-unsplash.jpg" alt="Antoine El Khawand" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-transform duration-[1.5s] ease-out group-hover:scale-105 opacity-60 group-hover:opacity-100" />
          
          {/* Overlay Gradient for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent opacity-100 transition-opacity duration-1000 pointer-events-none"></div>

          {/* Content Overlay */}
          <div className="relative z-10 h-full max-w-5xl mx-auto px-6 flex flex-col justify-end pb-16 md:pb-24">
            <span className="text-[#dfff00] text-sm md:text-base uppercase tracking-widest font-bold mb-4 block translate-y-4 group-hover:translate-y-0 transition-transform duration-700 opacity-80 group-hover:opacity-100">Founder & CEO</span>
            <h3 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase leading-none translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-75">
              Antoine <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 group-hover:from-gray-200 group-hover:to-white transition-colors duration-700">El Khawand</span>
            </h3>
            
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-150">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light italic max-w-2xl border-l-4 border-[#dfff00] pl-6 drop-shadow-lg">
                "I built RUVO because I believe runners should be rewarded for their sweat. We combine elite-level tracking and AI coaching with a system that actually gives back to you. Hitting your goals shouldn't just feel good—it should earn you real-world rewards."
              </p>
              
              <div className="flex items-center gap-4">
                <a href="https://www.linkedin.com/in/antoine-el-khawand-8b3bb9114/" aria-label="LinkedIn" className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#dfff00] hover:text-black hover:border-[#dfff00] hover:-translate-y-1 transition-all duration-300 shadow-lg">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="https://www.instagram.com/antoine_khawand/" aria-label="Instagram" className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-gradient-to-tr hover:from-pink-500 hover:via-red-500 hover:to-yellow-400 hover:text-white hover:border-transparent hover:-translate-y-1 transition-all duration-300 shadow-lg">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mt-24 text-center border-t border-white/10 pt-16">
            <p className="text-gray-400 mb-6 text-lg">Want to help us shape the future of endurance sports?</p>
            <RouterLink to="/careers" className="inline-flex items-center justify-center bg-[#dfff00] text-black font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(223,255,0,0.15)]">
              View Open Positions
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </RouterLink>
        </motion.div>

      </div>
    </div>
  );
}