import React from 'react';
import { motion } from 'framer-motion';
import { Card, Button, Chip } from "@heroui/react";
import { Link as RouterLink } from "react-router-dom";

export default function Analytics() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="relative px-6 pb-24 pt-16 overflow-hidden font-['Poppins'] min-h-[80vh]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#dfff00]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Hero Section */}
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-16 pt-8 max-w-4xl mx-auto">
          <Chip radius="full" size="sm" className="bg-[#dfff00]/10 text-[#dfff00] font-bold uppercase tracking-[0.2em] mb-6 border border-[#dfff00]/20 px-4 py-4 shadow-[0_0_20px_rgba(223,255,0,0.2)]">
            Elite Analytics
          </Chip>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 text-white leading-none">
            Data-Driven <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dfff00] to-lime-500">Dominance.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed mx-auto max-w-2xl">
            Step inside the lab. We transform your raw biometric and GPS data into actionable, professional-grade insights.
          </p>
        </motion.div>

        {/* Large Image Hero Banner */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="w-full h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden relative mb-32 group shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1740&auto=format&fit=crop" 
            alt="Athlete running outdoors on road" 
            className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-[2s] ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
          
          {/* Floating Data Card */}
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:bottom-10 sm:left-10 md:bottom-16 md:left-16 bg-[#111]/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl sm:max-w-sm">
             <div className="flex items-center gap-3 mb-4">
               <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
               <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Live HR Zones</span>
             </div>
             <div className="flex items-end gap-1.5 h-16 w-full opacity-90">
               {[40, 55, 45, 80, 100, 85, 60, 45, 30].map((height, i) => (
                 <motion.div 
                   key={i} 
                   initial={{ height: "0%" }}
                   whileInView={{ height: `${height}%` }}
                   transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                   className={`w-full rounded-t-sm ${height > 80 ? 'bg-red-500' : height > 50 ? 'bg-yellow-500' : 'bg-[#dfff00]'}`}
                 ></motion.div>
               ))}
             </div>
             <div className="flex justify-between mt-3 text-white font-black text-xl">
               <span>Z2: 45m</span>
               <span className="text-red-500">Z5: 12m</span>
             </div>
          </div>

          {/* Second Floating Data Card (Enhancement) */}
          <div className="absolute top-10 right-10 md:top-16 md:right-16 bg-black/60 backdrop-blur-md border border-white/10 p-5 rounded-3xl shadow-2xl hidden sm:flex items-center gap-4 group-hover:-translate-y-2 transition-transform duration-[1.5s] ease-out">
            <div className="w-12 h-12 rounded-full border-[3px] border-[#dfff00] border-t-transparent flex items-center justify-center animate-[spin_3s_linear_infinite]">
              <div className="w-8 h-8 rounded-full border-[3px] border-white/30 border-b-transparent animate-[spin_2s_linear_infinite_reverse]"></div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Readiness</p>
              <p className="text-3xl font-black text-white leading-none mt-1">98<span className="text-[#dfff00] text-lg">%</span></p>
            </div>
          </div>
        </motion.div>

        {/* Core Metrics Bento Grid */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">Understand Your <span className="text-gray-500">Engine.</span></h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Go beyond pace and distance. Analyze the physiological metrics that dictate your true potential.</p>
          </div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Training Load */}
            <motion.div variants={fadeInUp} className="lg:col-span-2 h-full">
              <Card className="bg-[#111] border border-[#222] p-8 md:p-10 h-full rounded-[2.5rem] hover:border-[#dfff00]/30 transition-colors group flex flex-col justify-between overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#dfff00]/5 blur-[70px] rounded-full pointer-events-none group-hover:bg-[#dfff00]/10 transition-colors"></div>
                <div className="relative z-10 mb-12">
                  <div className="w-12 h-12 bg-[#222] rounded-2xl flex items-center justify-center mb-6 border border-white/5 text-[#dfff00]">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Acute Training Load</h3>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-md">Monitor your acute-to-chronic workload ratio (ACWR) to find the perfect balance between fitness gains and injury prevention.</p>
                </div>
                
                <div className="relative z-10 w-full h-32 flex items-end justify-between gap-2 px-2">
                  {[30, 40, 35, 60, 85, 70, 95].map((h, i) => (
                    <div key={i} className="w-full flex flex-col justify-end h-full gap-2 group/bar cursor-pointer">
                      <motion.div initial={{ height: 0 }} whileInView={{ height: `${h}%` }} transition={{ duration: 1, delay: i * 0.1 }} className="w-full bg-[#222] group-hover/bar:bg-[#dfff00] rounded-t-md transition-colors relative">
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity">{h * 12}</span>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Card 2: VO2 Max */}
            <motion.div variants={fadeInUp} className="h-full">
              <Card className="bg-gradient-to-br from-[#111] to-[#050505] border border-[#222] p-8 md:p-10 h-full rounded-[2.5rem] hover:border-cyan-400/30 transition-colors group flex flex-col justify-center items-center text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-cyan-400/5 blur-[50px] rounded-full group-hover:bg-cyan-400/10 transition-colors pointer-events-none"></div>
                <div className="relative w-40 h-40 flex items-center justify-center mb-6 z-10">
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="44" fill="none" stroke="#222" strokeWidth="6" />
                    <motion.circle cx="50" cy="50" r="44" fill="none" stroke="#22v" strokeWidth="6" className="stroke-cyan-400" strokeLinecap="round" strokeDasharray="276" initial={{ strokeDashoffset: 276 }} whileInView={{ strokeDashoffset: 276 - (276 * 0.92) }} transition={{ duration: 2, ease: "easeOut" }} />
                  </svg>
                  <div className="flex flex-col items-center">
                    <span className="text-5xl font-black text-white">58<span className="text-lg text-cyan-400">.2</span></span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Superior</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 relative z-10">VO2 Max Trend</h3>
                <p className="text-gray-400 text-sm relative z-10">Top 2% for your age group.</p>
              </Card>
            </motion.div>

            {/* Card 3: Critical Power */}
            <motion.div variants={fadeInUp} className="h-full">
              <Card className="bg-[#111] border border-[#222] p-8 md:p-10 h-full rounded-[2.5rem] hover:border-yellow-500/30 transition-colors group flex flex-col justify-between overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 blur-[70px] rounded-full pointer-events-none group-hover:bg-yellow-500/10 transition-colors"></div>
                <div className="relative z-10 mb-8">
                  <div className="w-12 h-12 bg-[#222] rounded-2xl flex items-center justify-center mb-6 border border-white/5 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.15)] group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Running Power</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">Your theoretical highest sustainable power output without fatiguing.</p>
                </div>
                <div className="mt-auto relative z-10">
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-5xl font-black text-white tracking-tighter">345</span>
                    <span className="text-yellow-500 font-bold">W</span>
                  </div>
                  <div className="w-full bg-[#222] h-2 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: "78%" }} transition={{ duration: 1.5, ease: "easeOut" }} className="bg-gradient-to-r from-yellow-600 to-yellow-400 h-full rounded-full shadow-[0_0_10px_rgba(234,179,8,0.5)]"></motion.div>
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-3">
                    <span>Zone 3</span>
                    <span className="text-white">Threshold</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Card 4: AI Race Predictor */}
            <motion.div variants={fadeInUp} className="lg:col-span-2 h-full">
              <Card className="bg-[#111] border border-[#222] p-8 md:p-10 h-full rounded-[2.5rem] hover:border-[#dfff00]/30 transition-colors group relative overflow-hidden flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#dfff00]/5 blur-[70px] rounded-full pointer-events-none group-hover:bg-[#dfff00]/10 transition-colors"></div>
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight relative z-10">AI Race Predictor</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-md relative z-10">Using your VO2 Max, training load, and historical endurance data, our engine simulates your optimal race times.</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                  {[
                    { label: "5K", time: "18:45", pace: "3:45 /km", color: "text-[#dfff00]", bg: "bg-[#dfff00]/10" },
                    { label: "10K", time: "39:12", pace: "3:55 /km", color: "text-cyan-400", bg: "bg-cyan-400/10" },
                    { label: "Half", time: "1:26:30", pace: "4:06 /km", color: "text-purple-400", bg: "bg-purple-400/10" },
                    { label: "Marathon", time: "2:59:45", pace: "4:15 /km", color: "text-red-400", bg: "bg-red-400/10" }
                  ].map((race, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 + 0.2 }} className="bg-[#0a0a0a] border border-[#222] rounded-2xl p-4 flex flex-col items-center text-center hover:border-[#333] transition-colors cursor-default">
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${race.color} ${race.bg} px-3 py-1.5 rounded-full mb-3`}>{race.label}</span>
                      <span className="text-xl md:text-2xl font-black text-white mb-1 tracking-tight">{race.time}</span>
                      <span className="text-xs text-gray-500 font-medium">{race.pace}</span>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

          </motion.div>
        </div>

        {/* Form Analysis & Shoe Image Section */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-32 bg-[#050505] border border-white/10 rounded-[3rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl">
          <div className="lg:w-1/2 relative min-h-[400px]">
             <img 
               src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
               alt="Runner on track focusing on form" 
               className="absolute inset-0 w-full h-full object-cover grayscale opacity-60"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent lg:bg-gradient-to-l"></div>
             
             {/* Floating HUD over image */}
             <div className="absolute top-1/2 left-10 md:left-16 -translate-y-1/2 z-10 space-y-4">
               <div className="bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-[#dfff00]/20 flex items-center justify-center text-[#dfff00]">
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                 </div>
                 <div>
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Vertical Oscillation</p>
                   <p className="text-xl font-black text-white">8.4 <span className="text-sm font-normal text-gray-500">cm</span></p>
                 </div>
               </div>
               <div className="bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center gap-4 ml-8">
                 <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                 </div>
                 <div>
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Ground Contact</p>
                   <p className="text-xl font-black text-white">210 <span className="text-sm font-normal text-gray-500">ms</span></p>
                 </div>
               </div>
             </div>
          </div>
          
          <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center relative bg-gradient-to-br from-[#111] to-[#0a0a0a]">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-6">
              Perfect Your <span className="text-[#dfff00]">Form.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Connect compatible foot pods or smartwatches to unlock advanced running dynamics. RUVO analyzes your cadence, stride length, and balance to detect form breakdown before it leads to injury.
            </p>
            <Button as={RouterLink} to="/device-integration" radius="full" size="lg" className="bg-white/10 text-white font-bold w-fit border border-white/20 hover:bg-white/20 px-8">
              Connect Hardware
            </Button>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center pb-12">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-6">
            Unlock The <span className="text-gray-500">Insights.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
            Upgrade to RUVO Elite to access all premium analytics, history comparisons, and AI training adjustments.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button radius="full" size="lg" className="bg-[#dfff00] text-black font-bold px-10 py-7 text-base hover:scale-105 transition-transform shadow-[0_0_20px_rgba(223,255,0,0.15)] w-full sm:w-auto">
              Start Free Trial
            </Button>
            <Button as={RouterLink} to="/features" variant="bordered" radius="full" size="lg" className="text-white border-white/20 font-bold px-10 py-7 text-base hover:bg-white/10 transition-colors w-full sm:w-auto">
              View All Features
            </Button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}