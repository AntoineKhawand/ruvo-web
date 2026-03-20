import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button, Chip } from "@heroui/react";
import { Link as RouterLink } from "react-router-dom";

const integrationFaqs = [
  { q: "Does continuous sync drain my smartwatch battery?", a: "Not at all. RUVO utilizes Bluetooth Low Energy (BLE) and bulk-data background transfers, which have a negligible impact on your device's battery life." },
  { q: "Can I import my historical running data?", a: "Yes. Once you authorize a platform like Garmin Connect or Apple Health, you can opt to backfill up to 5 years of historical training data into your RUVO profile." },
  { q: "What if my specific heart rate monitor isn't listed?", a: "If your heart rate monitor broadcasts over standard Bluetooth Smart (BLE) or ANT+ (on supported Android devices), it will natively pair with the RUVO mobile app regardless of the brand." }
];

function DeviceFaqItem({ faq }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button onClick={() => setIsOpen(!isOpen)} className="flex w-full items-center justify-between py-6 text-left transition-colors hover:text-[#dfff00]">
        <span className="font-bold text-lg text-white">{faq.q}</span>
        <motion.svg animate={{ rotate: isOpen ? 180 : 0 }} className="w-5 h-5 text-gray-400 shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

export default function DeviceIntegration() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const supportedDevices = [
    { 
      name: "Apple Watch", 
      desc: "Native watchOS app. Stream live metrics, heart rate, and GPS directly to your wrist without your phone.",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    },
    { 
      name: "Garmin", 
      desc: "Auto-sync workouts instantly via Garmin Connect. Send structured RUVO training plans directly to your watch.",
      icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    },
    { 
      name: "Coros", 
      desc: "Seamless integration with Coros EvoLab to combine your training load, fatigue, and recovery metrics.",
      icon: "M13 10V3L4 14h7v7l9-11h-7z"
    },
    { 
      name: "Suunto", 
      desc: "Export RUVO's custom routes to your Suunto watch for precise turn-by-turn wilderness navigation.",
      icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
    },
    { 
      name: "Polar", 
      desc: "High-fidelity biometric sync. Pull in precise ECG and optical heart rate data from Polar sensors.",
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    },
    { 
      name: "Oura & Whoop", 
      desc: "Combine sleep stage and HRV data to let RUVO's AI optimally adjust your daily running volume.",
      icon: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    }
  ];

  const dataMetrics = [
    { label: "Heart Rate Variability", value: "HRV", status: "Supported" },
    { label: "VO2 Max Estimation", value: "VO2", status: "Supported" },
    { label: "Running Power", value: "Watts", status: "Supported" },
    { label: "Ground Contact Time", value: "GCT", status: "Supported" },
    { label: "Vertical Oscillation", value: "Vert", status: "Supported" },
    { label: "Sleep & Recovery", value: "Sleep", status: "Supported" }
  ];

  return (
    <div className="relative px-6 pb-24 pt-16 overflow-hidden font-['Poppins'] min-h-[80vh]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#dfff00]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Hero Section */}
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-24 pt-8 max-w-4xl mx-auto">
          <Chip radius="full" size="sm" className="bg-[#dfff00]/10 text-[#dfff00] font-bold uppercase tracking-[0.2em] mb-6 border border-[#dfff00]/20 px-4 py-4">
            Universal Sync
          </Chip>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 text-white leading-none">
            Bring Your Own <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dfff00] to-lime-500">Device.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed mx-auto">
            RUVO is built to seamlessly aggregate data from your favorite hardware. Connect your smartwatches, heart rate monitors, and power meters to unleash the full potential of our AI coaching engine.
          </p>
        </motion.div>

        {/* Setup Steps */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-10 right-10 h-0.5 bg-gradient-to-r from-[#dfff00]/0 via-[#dfff00]/20 to-[#dfff00]/0 -translate-y-1/2 -z-10"></div>
          
          {[
            { step: "01", title: "Authorize", desc: "Link your accounts securely via OAuth in the RUVO Settings tab." },
            { step: "02", title: "Train", desc: "Run naturally. We automatically sync your data in the background." },
            { step: "03", title: "Analyze", desc: "Our AI processes the biometrics to adjust your recovery and pacing." }
          ].map((item, idx) => (
            <motion.div key={idx} variants={fadeInUp} className="h-full">
              <Card className="bg-[#111] border border-[#222] p-8 h-full rounded-[2rem] hover:border-[#dfff00]/40 transition-colors flex flex-col text-center relative overflow-hidden group">
                <div className="w-16 h-16 bg-[#0a0a0a] border border-[#222] group-hover:border-[#dfff00]/50 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors shadow-lg relative z-10">
                  <span className="text-[#dfff00] font-black text-xl">{item.step}</span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-3 tracking-tight">{item.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed relative z-10">{item.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Supported Devices Grid */}
        <div className="mb-32">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">Supported <span className="text-gray-500">Hardware.</span></h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">We integrate with over 50 of the world's leading endurance sports wearables and sensors.</p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {supportedDevices.map((device, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="h-full">
                <Card className="bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-[#222] p-8 rounded-3xl hover:border-[#dfff00]/30 hover:-translate-y-1 transition-all duration-500 group overflow-hidden relative flex flex-col h-full hover:shadow-[0_10px_40px_-10px_rgba(223,255,0,0.1)]">
                  <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#dfff00]/5 blur-[50px] rounded-full group-hover:bg-[#dfff00]/15 transition-all duration-700 pointer-events-none"></div>
                  
                  <div className="w-14 h-14 bg-[#222] rounded-2xl flex items-center justify-center mb-6 border border-white/5 group-hover:bg-[#dfff00] transition-colors duration-500 shadow-lg shrink-0">
                    <svg className="w-7 h-7 text-[#dfff00] group-hover:text-black transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={device.icon} />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-[#dfff00] transition-colors">{device.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed flex-grow">{device.desc}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Data Sync Capabilities (Bento Box style) */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-32 bg-[#111] border border-[#222] rounded-[3rem] overflow-hidden flex flex-col lg:flex-row">
          <div className="p-10 md:p-16 lg:w-1/2 flex flex-col justify-center relative">
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#dfff00]/5 blur-[80px] rounded-full pointer-events-none"></div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-6 relative z-10">
              Deep <span className="text-[#dfff00]">Telemetry.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8 relative z-10">
              We don't just track your route and pace. RUVO pulls deep biometric data from your connected devices to feed our advanced coaching algorithms, ensuring every insight is tailored to your exact physiological state.
            </p>
            <Button as={RouterLink} to="/features" radius="full" size="lg" className="bg-white/10 text-white font-bold w-fit border border-white/20 hover:bg-white/20 px-8">
              Explore AI Coaching
            </Button>
          </div>
          <div className="bg-[#0a0a0a] lg:w-1/2 p-10 md:p-16 border-l border-[#222]">
            <div className="space-y-4">
              {dataMetrics.map((metric, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-[#111] border border-[#222] rounded-2xl hover:border-[#dfff00]/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#dfff00]/10 flex items-center justify-center text-[#dfff00] font-bold text-[10px] tracking-widest shrink-0">
                      {metric.value}
                    </div>
                    <span className="text-gray-300 font-bold text-sm md:text-base">{metric.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest hidden sm:block">{metric.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Zero-Latency Sync Simulator */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-32 relative max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-4">
              Zero-Latency <span className="text-[#dfff00]">Sync.</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Watch your data flow in real-time. No manual uploads, no refreshing required. Your metrics appear on the dashboard the second you hit save.
            </p>
          </div>
          
          <div className="relative w-full rounded-[2.5rem] border border-white/10 bg-[#050505] p-10 md:p-20 overflow-hidden shadow-2xl flex flex-col items-center justify-center">
            {/* Minimal Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none"></div>
            
            {/* Center Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] md:w-3/4 md:h-3/4 bg-[#dfff00]/5 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center w-full justify-between gap-4 md:gap-0 max-w-4xl mx-auto">
              
              {/* Node 1: Smartwatch */}
              <div className="flex flex-col items-center relative group w-32 shrink-0">
                <div className="absolute inset-0 bg-white/5 rounded-[2rem] blur-xl group-hover:bg-white/10 transition-colors duration-500"></div>
                <div className="w-24 h-24 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-[2rem] flex items-center justify-center relative z-10 shadow-xl group-hover:border-white/30 transition-colors duration-500">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {/* Active Ping Indicator */}
                  <span className="absolute top-3 right-3 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#dfff00] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#dfff00]"></span>
                  </span>
                </div>
                <span className="mt-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Wearable</span>
              </div>

              {/* The Pipeline Track (Desktop) */}
              <div className="hidden md:flex flex-1 relative h-32 items-center justify-center px-6">
                <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                
                {/* Clean Data Packets */}
                {[
                  { label: "HR: 154", color: "text-[#dfff00]", dot: "bg-[#dfff00]", shadow: "shadow-[0_0_12px_#dfff00]", delay: 0 },
                  { label: "PWR: 320", color: "text-teal-400", dot: "bg-teal-400", shadow: "shadow-[0_0_12px_#2dd4bf]", delay: 0.8 },
                  { label: "CAD: 178", color: "text-purple-400", dot: "bg-purple-400", shadow: "shadow-[0_0_12px_#c084fc]", delay: 1.6 }
                ].map((packet, i) => (
                  <motion.div 
                    key={i}
                    animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }} 
                    transition={{ repeat: Infinity, duration: 2.4, delay: packet.delay, ease: "linear" }} 
                    className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center -ml-8"
                  >
                    <Chip size="sm" className={`bg-[#111]/90 backdrop-blur-md border border-[#333] ${packet.color} text-[10px] font-mono mb-3 shadow-lg px-2`}>{packet.label}</Chip>
                    <div className={`w-2 h-2 rounded-full ${packet.dot} ${packet.shadow}`}></div>
                  </motion.div>
                ))}
              </div>

              {/* The Pipeline Track (Mobile Fallback) */}
              <div className="flex md:hidden h-20 w-px relative items-center justify-center my-2">
                 <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                 <motion.div animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} className="w-2.5 h-2.5 rounded-full bg-[#dfff00] shadow-[0_0_12px_#dfff00] absolute"></motion.div>
              </div>

              {/* Node 2: RUVO Engine */}
              <div className="flex flex-col items-center relative group w-32 shrink-0">
                <div className="absolute inset-0 bg-[#dfff00]/10 rounded-[2rem] blur-2xl group-hover:bg-[#dfff00]/20 transition-colors duration-500"></div>
                <div className="w-24 h-24 bg-[#0a0a0a] border border-[#dfff00]/30 rounded-[2rem] flex flex-col items-center justify-center relative z-10 shadow-[inset_0_0_20px_rgba(223,255,0,0.1)] group-hover:border-[#dfff00]/60 transition-all duration-500">
                  <span className="text-4xl font-black text-[#dfff00] mb-2 drop-shadow-[0_0_10px_rgba(223,255,0,0.4)]">R</span>
                  <div className="flex items-end gap-1 h-3">
                    <motion.div animate={{ height: ["40%", "100%", "40%"] }} transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }} className="w-1 bg-[#dfff00] rounded-full"></motion.div>
                    <motion.div animate={{ height: ["100%", "30%", "100%"] }} transition={{ repeat: Infinity, duration: 1, ease: "easeInOut", delay: 0.2 }} className="w-1 bg-[#dfff00] rounded-full"></motion.div>
                    <motion.div animate={{ height: ["60%", "90%", "60%"] }} transition={{ repeat: Infinity, duration: 1, ease: "easeInOut", delay: 0.4 }} className="w-1 bg-[#dfff00] rounded-full"></motion.div>
                  </div>
                </div>
                <span className="mt-5 text-xs font-bold text-[#dfff00] uppercase tracking-widest">RUVO Engine</span>
              </div>

            </div>
          </div>
        </motion.div>

        {/* Hardware FAQ */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} className="max-w-4xl mx-auto mb-32">
          <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-8 text-center">Sync <span className="text-gray-500">FAQ.</span></h2>
          <div className="border-t border-white/10">
            {integrationFaqs.map((faq, idx) => (
              <DeviceFaqItem key={idx} faq={faq} />
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center pb-12">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-6">
            Ready to <span className="text-gray-500">Connect?</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
            Download the app, navigate to settings, and link your devices in seconds. Experience training analytics like never before.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button radius="full" size="lg" className="bg-[#dfff00] text-black font-bold px-10 py-7 text-base hover:scale-105 transition-transform shadow-[0_0_20px_rgba(223,255,0,0.15)] w-full sm:w-auto">
              Get the App
            </Button>
            <Button as={RouterLink} to="/support" variant="bordered" radius="full" size="lg" className="text-white border-white/20 font-bold px-10 py-7 text-base hover:bg-white/10 transition-colors w-full sm:w-auto">
              Sync Troubleshooting
            </Button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}