import React from 'react';
import { motion } from 'framer-motion';
import { Card } from "@heroui/react";
import { Link as RouterLink } from "react-router-dom";

const services = [
  { name: "RUVO Mobile App", status: "Operational", uptime: "99.99%" },
  { name: "Web Dashboard", status: "Operational", uptime: "99.98%" },
  { name: "GPS Data Sync & Export", status: "Operational", uptime: "100%" },
  { name: "AI Coaching Models", status: "Operational", uptime: "99.95%" },
  { name: "Community Leaderboards", status: "Operational", uptime: "99.99%" }
];

export default function SystemStatus() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="relative px-6 pb-32 pt-20 overflow-hidden font-['Poppins'] min-h-[80vh]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="mb-16">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-6 flex items-center gap-4">
            System <span className="text-gray-500">Status.</span>
          </h1>
          
          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 flex items-center gap-4 shadow-[0_0_30px_rgba(34,197,94,0.15)]">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center shrink-0">
              <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,1)]"></div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-green-500">All Systems Operational</h2>
              <p className="text-sm text-gray-400 mt-1">Last updated: Just now</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4 mb-16">
          {services.map((service, idx) => (
            <motion.div key={idx} variants={fadeInUp}>
              <Card className="bg-[#111] border border-[#222] p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-green-500/30 transition-colors">
                <div>
                  <h3 className="text-lg font-bold text-white">{service.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{service.uptime} uptime over the last 90 days</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-500 text-xs font-bold uppercase tracking-widest w-fit">
                  <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                  {service.status}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center bg-[#0a0a0a] border border-[#222] rounded-3xl p-8">
            <p className="text-gray-400 mb-4 text-sm">Experiencing issues not listed here?</p>
            <RouterLink to="/support" className="text-[#dfff00] font-bold hover:underline">
              Contact Support
            </RouterLink>
        </motion.div>

      </div>
    </div>
  );
}