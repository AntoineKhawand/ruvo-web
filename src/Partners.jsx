import React from 'react';
import { motion } from 'framer-motion';
import { Card, Button, Chip } from "@heroui/react";
import { Link as RouterLink } from "react-router-dom";
import { usePageMeta } from './usePageMeta';

export default function Partners() {
  usePageMeta(
    "Partnerships | RUVO — Partner with Us",
    "Partner with RUVO to reach millions of active runners. Explore brand, retail, and technology partnership opportunities.",
    "/partners",
    {"@context":"https://schema.org","@type":"WebPage","url":"https://ruvo.app/partners","name":"Partnerships | RUVO — Partner with Us","isPartOf":{"@id":"https://ruvo.app/#website"},"breadcrumb":{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://ruvo.app/"},{"@type":"ListItem","position":2,"name":"Partnerships","item":"https://ruvo.app/partners"}]}}
  );

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="relative px-4 md:px-6 pb-16 md:pb-24 pt-10 md:pt-16 overflow-hidden font-['Poppins'] min-h-[80vh]">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-24 pt-8">
          <Chip radius="full" size="sm" className="bg-purple-500/10 text-purple-400 font-bold uppercase tracking-[0.2em] mb-6 border border-purple-500/20 px-4 py-4">
            B2B & Ambassadors
          </Chip>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-6 text-white leading-none">
            Partner With <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">RUVO.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed mx-auto max-w-2xl">
            Whether you are a local health brand wanting to reach dedicated athletes, or an elite runner looking to represent our mission, there's a place for you here.
          </p>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-24 md:mb-32">
          
          {/* Brand Partner Card */}
          <motion.div variants={fadeInUp} className="h-full">
            <Card className="bg-[#111] border border-[#222] p-8 md:p-14 rounded-[2rem] md:rounded-[3rem] h-full relative overflow-hidden group hover:border-purple-500/40 transition-all duration-500 text-center md:text-left flex flex-col items-center md:items-start">
               <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 blur-[50px] rounded-full group-hover:bg-purple-500/20 transition-colors"></div>
               <div className="w-16 h-16 bg-[#222] rounded-2xl flex items-center justify-center mb-8 border border-white/5 relative z-10 shadow-lg group-hover:scale-110 transition-transform">
                 <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
               </div>
               <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight relative z-10">For Brands</h3>
               <p className="text-gray-400 leading-relaxed mb-8 md:mb-10 text-base md:text-lg relative z-10">List your products and services on the RUVO Rewards store. Drive highly targeted foot traffic and sales by allowing athletes to redeem their RUVO Coins at your business.</p>
               <div className="mt-auto relative z-10 w-full">
                 <Button as="a" href="mailto:partners@ruvo.run" radius="full" size="lg" className="w-full bg-white text-black font-bold py-6 text-sm md:text-base hover:bg-gray-200">
                   Apply as a Merchant
                 </Button>
               </div>
            </Card>
          </motion.div>

          {/* Ambassador Card */}
          <motion.div variants={fadeInUp} className="h-full">
            <Card className="bg-gradient-to-br from-[#161616] to-[#0a0a0a] border border-[#222] p-8 md:p-14 rounded-[2rem] md:rounded-[3rem] h-full relative overflow-hidden group hover:border-[#dfff00]/40 transition-all duration-500 text-center md:text-left flex flex-col items-center md:items-start">
               <div className="absolute top-0 right-0 w-48 h-48 bg-[#dfff00]/5 blur-[50px] rounded-full group-hover:bg-[#dfff00]/10 transition-colors"></div>
               <div className="w-16 h-16 bg-[#222] rounded-2xl flex items-center justify-center mb-8 border border-white/5 relative z-10 shadow-lg group-hover:scale-110 transition-transform">
                 <svg className="w-8 h-8 text-[#dfff00]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
               </div>
               <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight relative z-10">For Athletes</h3>
               <p className="text-gray-400 leading-relaxed mb-8 md:mb-10 text-base md:text-lg relative z-10">Are you a running coach, influencer, or professional athlete? Join our ambassador program to get free access to RUVO Elite, exclusive merch, and referral bonuses.</p>
               <div className="mt-auto relative z-10 w-full">
                 <Button as="a" href="mailto:ambassadors@ruvo.run" radius="full" size="lg" className="w-full bg-[#dfff00] text-black font-bold py-6 text-sm md:text-base shadow-[0_0_20px_rgba(223,255,0,0.15)] hover:scale-105 transition-transform">
                   Become an Ambassador
                 </Button>
               </div>
            </Card>
          </motion.div>

        </motion.div>

      </div>
    </div>
  );
}