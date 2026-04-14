import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button, Chip } from "@heroui/react";
import { Link as RouterLink } from "react-router-dom";

export default function DeviceSync() {
  const [logIndex, setLogIndex] = useState(0);

  const terminalLogs = [
    { time: "08:14:22", msg: "Establishing secure BLE connection...", status: "info" },
    { time: "08:14:23", msg: "Device identified: Wearable Pro v4", status: "success" },
    { time: "08:14:23", msg: "Requesting biometric payload...", status: "info" },
    { time: "08:14:24", msg: "Parsing 14,200 telemetry points (HR, GCT)", status: "info" },
    { time: "08:14:25", msg: "Data verified. Signature valid.", status: "success" },
    { time: "08:14:26", msg: "Running RUVO AI Analysis...", status: "warning" },
    { time: "08:14:28", msg: "Recovery Updated: 84% (Optimal)", status: "highlight" },
    { time: "08:14:29", msg: "Pushing new pace targets to device...", status: "info" },
    { time: "08:14:30", msg: "Sync Complete. Zero packet loss.", status: "success" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex((prev) => (prev < terminalLogs.length ? prev + 1 : 1));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const ecosystemIntegrations = [
    { name: "Garmin Connect", type: "Biometric Pull", icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z", color: "text-blue-500", border: "hover:border-blue-500/40" },
    { name: "Apple Health", type: "Health Sync", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", color: "text-pink-500", border: "hover:border-pink-500/40" },
    { name: "Coros EvoLab", type: "Biometric Pull", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", color: "text-gray-300", border: "hover:border-gray-500/40" },
    { name: "TrainingPeaks", type: "Plan Export", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", color: "text-green-500", border: "hover:border-green-500/40" },
    { name: "Oura & Whoop", type: "Recovery Sync", icon: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z", color: "text-purple-400", border: "hover:border-purple-500/40" }
  ];

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
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#dfff00]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Hero Section */}
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-32 pt-8 max-w-4xl mx-auto">
          <Chip radius="full" size="sm" className="bg-[#dfff00]/10 text-[#dfff00] font-bold uppercase tracking-[0.2em] mb-6 border border-[#dfff00]/20 px-4 py-4 shadow-[0_0_20px_rgba(223,255,0,0.2)]">
            Universal Sync Engine
          </Chip>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 text-white leading-none">
            Your Data. <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dfff00] to-lime-500">Everywhere.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed mx-auto max-w-2xl">
            Experience real-time, bi-directional synchronization. Push AI-generated workouts to your watch, and instantly pull deep telemetry data back into RUVO.
          </p>
        </motion.div>

        {/* Sync Animation Section */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-5xl mx-auto mb-32">
          <div className="relative w-full rounded-[2.5rem] border border-white/10 bg-[#050505] p-10 md:p-20 overflow-hidden shadow-2xl flex flex-col items-center justify-center">
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] md:w-3/4 md:h-3/4 bg-[#dfff00]/5 blur-[100px] rounded-full pointer-events-none"></div>
             
             <div className="relative z-10 flex flex-col md:flex-row items-center w-full justify-between gap-4 md:gap-0 max-w-4xl mx-auto">
               
               {/* Left Node: Watch */}
               <div className="flex flex-col items-center relative group w-32 shrink-0">
                 <div className="absolute inset-0 bg-white/5 rounded-[2rem] blur-xl group-hover:bg-white/10 transition-colors duration-500"></div>
                 <div className="w-24 h-24 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-[2rem] flex items-center justify-center relative z-10 shadow-xl group-hover:border-white/30 transition-colors duration-500">
                   <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 </div>
                 <span className="mt-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Wearable</span>
               </div>

               {/* Track 1 (Pull) */}
               <div className="hidden md:flex flex-1 relative h-32 items-center justify-center px-4">
                 <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                 <motion.div animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center -ml-8">
                   <Chip size="sm" className="bg-[#111]/90 backdrop-blur-md border border-[#333] text-[#dfff00] text-[10px] font-mono mb-3 shadow-lg px-2">Biometrics</Chip>
                   <div className="w-2 h-2 rounded-full bg-[#dfff00] shadow-[0_0_12px_#dfff00]"></div>
                 </motion.div>
               </div>
               <div className="flex md:hidden h-16 w-px relative items-center justify-center my-2">
                  <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
               </div>

               {/* Node 2: RUVO Engine */}
               <div className="flex flex-col items-center relative group w-32 shrink-0">
                 <div className="absolute inset-0 bg-[#dfff00]/10 rounded-[2rem] blur-2xl group-hover:bg-[#dfff00]/20 transition-colors duration-500"></div>
                 <div className="w-28 h-28 bg-[#0a0a0a] border-2 border-[#dfff00]/30 rounded-[2.5rem] flex flex-col items-center justify-center relative z-10 shadow-[inset_0_0_20px_rgba(223,255,0,0.1)] group-hover:border-[#dfff00]/60 transition-all duration-500">
                   <span className="text-4xl font-black text-[#dfff00] drop-shadow-[0_0_10px_rgba(223,255,0,0.4)]">R</span>
                 </div>
                 <span className="mt-5 text-xs font-bold text-[#dfff00] uppercase tracking-widest">RUVO Engine</span>
               </div>

               {/* Track 2 (Push) */}
               <div className="hidden md:flex flex-1 relative h-32 items-center justify-center px-4">
                 <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                 <motion.div animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "linear", delay: 0.5 }} className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center -ml-8">
                   <Chip size="sm" className="bg-[#111]/90 backdrop-blur-md border border-[#333] text-cyan-400 text-[10px] font-mono mb-3 shadow-lg px-2">AI Plan</Chip>
                   <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_cyan]"></div>
                 </motion.div>
               </div>
               <div className="flex md:hidden h-16 w-px relative items-center justify-center my-2">
                  <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
               </div>

               {/* Node 3: 3rd Party */}
               <div className="flex flex-col items-center relative group w-32 shrink-0">
                 <div className="absolute inset-0 bg-white/5 rounded-[2rem] blur-xl group-hover:bg-cyan-400/10 transition-colors duration-500"></div>
                 <div className="w-24 h-24 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-[2rem] flex items-center justify-center relative z-10 shadow-xl group-hover:border-cyan-400/40 transition-colors duration-500">
                   <svg className="w-10 h-10 text-white group-hover:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                 </div>
                 <span className="mt-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">External<br/>Platforms</span>
               </div>

             </div>
          </div>
        </motion.div>

        {/* Terminal & Security Bento */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-5xl mx-auto mb-32 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Security Text */}
          <div className="bg-[#111] border border-[#222] rounded-[3rem] p-10 md:p-14 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 blur-[80px] rounded-full group-hover:bg-green-500/10 transition-colors pointer-events-none"></div>
            <div className="w-14 h-14 bg-[#222] rounded-2xl flex items-center justify-center mb-8 border border-white/5 shadow-lg">
              <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-4">Military-Grade <br/><span className="text-green-500">Security.</span></h3>
            <p className="text-gray-400 leading-relaxed text-lg mb-6">
              Your biometric data is deeply personal. RUVO utilizes AES-256 encryption and strictly OAuth 2.0 protocols. We never store your passwords, and your data is never sold to third parties.
            </p>
            <div className="flex gap-3">
              <Chip className="bg-white/5 border border-white/10 text-gray-400 font-bold uppercase tracking-widest text-[10px]">AES-256</Chip>
              <Chip className="bg-white/5 border border-white/10 text-gray-400 font-bold uppercase tracking-widest text-[10px]">OAuth 2.0</Chip>
              <Chip className="bg-white/5 border border-white/10 text-gray-400 font-bold uppercase tracking-widest text-[10px]">End-to-End</Chip>
            </div>
          </div>

          {/* Terminal Simulator */}
          <div className="bg-[#050505] border border-[#222] rounded-[3rem] p-8 flex flex-col relative overflow-hidden h-[400px] shadow-2xl">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#222]">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-xs font-mono text-gray-500">ruvo-sync-daemon v2.4.1</span>
              <div className="ml-auto flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Online</span>
              </div>
            </div>
            <div className="flex-1 overflow-hidden flex flex-col justify-end space-y-3 font-mono text-[11px] md:text-xs">
              <AnimatePresence>
                {terminalLogs.slice(0, logIndex).map((log, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex gap-3 whitespace-nowrap">
                    <span className="text-gray-600 shrink-0">[{log.time}]</span>
                    <span className={`${log.status === 'success' ? 'text-green-400' : log.status === 'warning' ? 'text-yellow-400' : log.status === 'highlight' ? 'text-[#dfff00] font-bold' : 'text-gray-300'} truncate`}>
                      {log.msg}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
              {/* Blinking cursor */}
              <div className="flex gap-3 items-center h-4 mt-1">
                <span className="text-gray-600">[{new Date().toLocaleTimeString('en-US', {hour12: false})}]</span>
                <span className="w-2 h-3 bg-gray-400 animate-pulse"></span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Ecosystem Matrix */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-5xl mx-auto mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">Native <span className="text-gray-500">Integrations.</span></h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Connect with the platforms you already love. No complicated exports—just link your account and let RUVO handle the rest.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {ecosystemIntegrations.map((app, idx) => (
               <Card key={idx} className={`bg-[#111] border border-[#222] p-6 rounded-3xl ${app.border} transition-all duration-300 group hover:-translate-y-1`}>
                 <div className="flex flex-col items-center text-center">
                   <div className="w-12 h-12 bg-[#0a0a0a] rounded-full flex items-center justify-center mb-4 border border-[#333] group-hover:bg-[#222] transition-colors shadow-lg">
                      <svg className={`w-6 h-6 ${app.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={app.icon} />
                      </svg>
                   </div>
                   <h4 className="text-white font-bold tracking-tight mb-1">{app.name}</h4>
                   <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{app.type}</span>
                 </div>
               </Card>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          {[
            { title: "Auto-Upload", desc: "Finish your run and save it on your watch. It appears in RUVO instantly, with all advanced analytics computed automatically.", icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" },
            { title: "Plan Injection", desc: "RUVO's AI generates your daily workout and pushes it directly to your Garmin or Apple Watch calendar.", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
            { title: "Third-Party Exports", desc: "Prefer to keep a backup? Automatically forward all your RUVO activities to Strava, TrainingPeaks, or Apple Health.", icon: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" }
          ].map((feature, idx) => (
            <motion.div key={idx} variants={fadeInUp} className="h-full">
              <Card className="bg-[#111] border border-[#222] p-8 h-full rounded-[2rem] hover:border-[#dfff00]/30 transition-colors flex flex-col group relative overflow-hidden">
                <div className="w-14 h-14 bg-[#222] rounded-2xl flex items-center justify-center mb-6 border border-white/5 group-hover:bg-[#dfff00] transition-colors duration-500 shadow-lg relative z-10">
                  <svg className="w-7 h-7 text-[#dfff00] group-hover:text-black transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-[#dfff00] transition-colors relative z-10">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed relative z-10">{feature.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center pb-12">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-6">
            Never Miss A <span className="text-gray-500">Metric.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
            Connect your devices once and let our engine handle the rest. Your data flows securely and instantly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button radius="full" size="lg" className="bg-[#dfff00] text-black font-bold px-10 py-7 text-base hover:scale-105 transition-transform shadow-[0_0_20px_rgba(223,255,0,0.15)] w-full sm:w-auto">
              Configure Sync
            </Button>
            <Button as={RouterLink} to="/device-integration" variant="bordered" radius="full" size="lg" className="text-white border-white/20 font-bold px-10 py-7 text-base hover:bg-white/10 transition-colors w-full sm:w-auto">
              View Supported Devices
            </Button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}