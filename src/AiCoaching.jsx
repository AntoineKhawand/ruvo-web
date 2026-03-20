import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button, Chip } from "@heroui/react";
import { Link as RouterLink } from "react-router-dom";

export default function AiCoaching() {
  const [activePrompt, setActivePrompt] = useState(0);
  const [fiveKTime, setFiveKTime] = useState("22:30");
  const [predictedTime, setPredictedTime] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const prompts = [
    {
      user: "My HRV dropped and I only slept 4 hours.",
      ai: "I noticed that. I've automatically adjusted today's 10k tempo run to an easy 30-minute Zone 2 recovery jog. Let's focus on resting up.",
      tag: "Poor Sleep / Low HRV"
    },
    {
      user: "I felt amazing on yesterday's long run!",
      ai: "Great work! You kept your heart rate strictly in Zone 2. Your aerobic engine is adapting perfectly. I'm bumping up your weekend long run distance by 10%.",
      tag: "Feeling Great"
    },
    {
      user: "My left knee feels slightly stiff today.",
      ai: "Thanks for logging that. I've swapped tomorrow's high-impact track session for a low-impact cycling cross-training day. Let's protect that knee.",
      tag: "Injury Prevention"
    }
  ];

  const features = [
    {
      title: "Predictive Pacing",
      desc: "Get real-time audio cues during your race. The AI calculates exactly what pace you need to hold to hit your target finish time.",
      icon: "M13 10V3L4 14h7v7l9-11h-7z"
    },
    {
      title: "Form Correction",
      desc: "Using ground contact time and vertical oscillation data, RUVO detects form breakdown and provides actionable tips to fix it.",
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    },
    {
      title: "Injury Prevention",
      desc: "By monitoring acute-to-chronic workload ratios, the AI spots early warning signs of overtraining before they become injuries.",
      icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    }
  ];

  const handleCalculate = (e) => {
    e.preventDefault();
    setIsCalculating(true);
    setPredictedTime(null);
    setTimeout(() => {
      // Safely extract all numbers from the input string
      const matches = fiveKTime.match(/\d+/g);
      
      if (!matches || matches.length === 0) {
        setPredictedTime("Invalid Input");
        setIsCalculating(false);
        return;
      }

      const nums = matches.map(Number);
      let totalSeconds = 0;

      if (nums.length >= 3) {
        totalSeconds = (nums[0] * 3600) + (nums[1] * 60) + nums[2];
      } else if (nums.length === 2) {
        totalSeconds = (nums[0] * 60) + nums[1];
      } else {
        totalSeconds = nums[0] * 60; // Assume single number is minutes
      }

      if (totalSeconds < 600 || totalSeconds > 7200) {
        setPredictedTime("Check 5K Time");
      } else {
        const marathonSeconds = Math.floor(totalSeconds * 8.8); // AI-optimized Riegel formula
        const h = Math.floor(marathonSeconds / 3600);
        const m = Math.floor((marathonSeconds % 3600) / 60);
        setPredictedTime(`${h}h ${m}m`);
      }
      setIsCalculating(false);
    }, 1000);
  };

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
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-32 pt-8 max-w-4xl mx-auto">
          <Chip radius="full" size="sm" className="bg-[#dfff00]/10 text-[#dfff00] font-bold uppercase tracking-[0.2em] mb-6 border border-[#dfff00]/20 px-4 py-4 shadow-[0_0_20px_rgba(223,255,0,0.2)]">
            RUVO Intelligence
          </Chip>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 text-white leading-none">
            Meet Your New <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dfff00] to-lime-500">Head Coach.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed mx-auto max-w-2xl">
            Go beyond generic templates. Our advanced AI engine analyzes your biometrics, fatigue levels, and performance history to build a dynamic training plan that adapts to you daily.
          </p>
        </motion.div>

        {/* AI Chat / Insight Simulator */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-5xl mx-auto mb-32">
          <div className="relative w-full rounded-[2.5rem] border border-white/10 bg-[#050505] p-6 md:p-12 overflow-hidden shadow-2xl flex flex-col md:flex-row items-center gap-12">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,#ffffff05_1px,transparent_100%)] pointer-events-none"></div>
            
            <div className="md:w-1/2 relative z-10 flex flex-col gap-6">
              {/* Interactive Prompt Selection */}
              <div className="flex gap-3 mb-2 flex-wrap">
                {prompts.map((p, i) => (
                  <button key={i} onClick={() => setActivePrompt(i)} className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow-lg ${activePrompt === i ? 'bg-[#dfff00] text-black shadow-[0_0_15px_rgba(223,255,0,0.4)] scale-105' : 'bg-[#222] text-gray-400 hover:text-white border border-[#333] hover:border-[#555]'}`}>
                    {p.tag}
                  </button>
                ))}
              </div>
              
              {/* Animated Chat Display */}
              <div className="flex flex-col gap-6 min-h-[220px]">
                 <AnimatePresence mode="wait">
                   <motion.div key={`user-${activePrompt}`} initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }} transition={{ duration: 0.2 }} className="flex items-end gap-4 self-end flex-row-reverse">
                     <div className="w-10 h-10 rounded-full bg-[#222] shrink-0 flex items-center justify-center border-2 border-[#111]">
                       <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                     </div>
                     <div className="bg-[#222] border border-[#333] p-5 rounded-3xl rounded-br-sm shadow-lg max-w-[90%]">
                       <p className="text-sm text-gray-300 leading-relaxed font-medium">{prompts[activePrompt].user}</p>
                     </div>
                   </motion.div>
                 </AnimatePresence>

                 <AnimatePresence mode="wait">
                   <motion.div key={`ai-${activePrompt}`} initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }} transition={{ duration: 0.2, delay: 0.2 }} className="flex items-end gap-4">
                     <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#dfff00] to-lime-500 shrink-0 flex items-center justify-center border-2 border-[#111] shadow-[0_0_15px_rgba(223,255,0,0.3)]">
                       <span className="text-black font-black text-lg">R</span>
                     </div>
                     <div className="bg-[#1a1a1a] border border-[#dfff00]/20 p-5 rounded-3xl rounded-bl-sm shadow-[inset_0_0_20px_rgba(223,255,0,0.05)] max-w-[90%]">
                       <p className="text-sm text-gray-300 leading-relaxed font-medium">{prompts[activePrompt].ai}</p>
                     </div>
                   </motion.div>
                 </AnimatePresence>
              </div>
            </div>

            <div className="md:w-1/2 relative z-10">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-6">
                Always <span className="text-[#dfff00]">Listening.</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                RUVO's AI doesn't just give you a PDF to follow. It actively listens to your body through your wearable data, making micro-adjustments to your schedule to ensure you're always training optimally, never overtraining.
              </p>
              <div className="flex flex-wrap gap-3">
                {['HRV Analysis', 'Sleep Quality', 'Workout Load', 'Readiness Score'].map((tag, i) => (
                  <Chip key={i} className="bg-white/5 border border-white/10 text-gray-300 text-xs font-bold uppercase tracking-widest px-3 py-4">{tag}</Chip>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          {features.map((feature, idx) => (
            <motion.div key={idx} variants={fadeInUp} className="h-full">
              <Card className="bg-[#111] border border-[#222] p-8 h-full rounded-[2rem] hover:border-[#dfff00]/30 transition-colors flex flex-col group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#dfff00]/5 blur-[40px] rounded-full pointer-events-none group-hover:bg-[#dfff00]/10 transition-colors"></div>
                <div className="w-14 h-14 bg-[#222] rounded-2xl flex items-center justify-center mb-6 border border-white/5 group-hover:bg-[#dfff00] transition-colors duration-500 shadow-lg relative z-10">
                  <svg className="w-7 h-7 text-[#dfff00] group-hover:text-black transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-[#dfff00] transition-colors relative z-10">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed relative z-10">{feature.desc}</p>
                {feature.interactiveNode && (
                  <div className="mt-auto relative z-10">
                    {feature.interactiveNode}
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* AI Pace Calculator Tool */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-32 bg-gradient-to-br from-[#111] to-[#050505] border border-[#222] rounded-[3rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl relative max-w-5xl mx-auto">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#dfff00]/5 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="p-10 md:p-16 lg:w-1/2 flex flex-col justify-center relative z-10 border-r border-[#222]">
            <Chip className="bg-white/5 border border-white/10 text-gray-300 text-xs font-bold uppercase tracking-widest mb-6 px-4 py-2">Prediction Engine</Chip>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-6">
              Unlock Your <span className="text-[#dfff00]">Potential.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Curious what 12 weeks of AI-optimized coaching could do for your race day? Enter your current 5K time, and our model will predict your marathon potential.
            </p>

            <form onSubmit={handleCalculate} className="flex flex-col gap-5">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Current 5K Time (MM:SS)</label>
                <input
                  type="text"
                  value={fiveKTime}
                  onChange={(e) => setFiveKTime(e.target.value)}
                  placeholder="22:30"
                  className="w-full bg-[#0a0a0a] border border-[#333] rounded-2xl px-6 py-4 text-white font-mono text-xl focus:outline-none focus:border-[#dfff00] transition-colors shadow-inner"
                />
              </div>
              <Button type="submit" isLoading={isCalculating} radius="full" size="lg" className="bg-[#dfff00] text-black font-bold text-lg w-full py-7 shadow-[0_0_20px_rgba(223,255,0,0.15)] hover:scale-[1.02] transition-transform">
                {isCalculating ? "Running Simulation..." : "Predict Marathon Time"}
              </Button>
            </form>
          </div>

          <div className="lg:w-1/2 p-10 md:p-16 bg-[#0a0a0a] flex flex-col items-center justify-center relative z-10 min-h-[300px]">
            {predictedTime ? (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Estimated Finish Time</p>
                <div className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-6 drop-shadow-lg">{predictedTime}</div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#dfff00]/10 border border-[#dfff00]/30 text-[#dfff00] text-xs font-bold shadow-[0_0_15px_rgba(223,255,0,0.1)]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  Based on 12-week AI Plan
                </div>
              </motion.div>
            ) : (
              <div className="text-center opacity-40 flex flex-col items-center">
                <svg className="w-20 h-20 text-gray-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg font-bold text-gray-400 uppercase tracking-widest">Awaiting Data...</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center pb-12">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-6">
            Train <span className="text-gray-500">Smarter.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
            Unlock the full power of RUVO Intelligence by upgrading to Elite. Get your first 7 days entirely free.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button radius="full" size="lg" className="bg-[#dfff00] text-black font-bold px-10 py-7 text-base hover:scale-105 transition-transform shadow-[0_0_20px_rgba(223,255,0,0.15)] w-full sm:w-auto">
              Start Free Trial
            </Button>
            <Button as={RouterLink} to="/features" variant="bordered" radius="full" size="lg" className="text-white border-white/20 font-bold px-10 py-7 text-base hover:bg-white/10 transition-colors w-full sm:w-auto">
              Explore All Features
            </Button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}