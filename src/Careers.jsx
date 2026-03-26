import React from 'react';
import { motion } from 'framer-motion';
import { Card, Button, Chip } from "@heroui/react";
import { Link as RouterLink } from "react-router-dom";

export default function Careers() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const departments = ["Engineering", "Product Design", "AI Research", "Marketing", "Community"];

  return (
    <div className="relative px-4 md:px-6 pb-20 md:pb-32 pt-16 md:pt-24 overflow-hidden font-['Poppins'] min-h-[80vh] flex flex-col items-center">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>
      
      {/* Advanced Background Design */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#dfff00]/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10 w-full mt-10">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-20">
          <div className="w-20 h-20 bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-[#222] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(223,255,0,0.1)] relative group">
            <div className="absolute inset-0 bg-[#dfff00]/10 rounded-3xl blur-xl group-hover:bg-[#dfff00]/20 transition-all duration-500"></div>
            <svg className="w-10 h-10 text-[#dfff00] relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-6">
            Join The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dfff00] to-lime-500">Team.</span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            We are on a mission to redefine endurance sports through precision tracking and AI. We're looking for visionary engineers, designers, and athletes to help us build the future.
          </p>

          {/* Departments Tag Cloud */}
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {departments.map((dept, idx) => (
              <span key={idx} className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-gray-300 text-sm font-bold tracking-wide hover:bg-[#dfff00]/10 hover:text-[#dfff00] hover:border-[#dfff00]/30 transition-all cursor-default shadow-sm">
                {dept}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-4xl mx-auto w-full">
          <Card className="bg-gradient-to-br from-[#161616] to-[#0a0a0a] border border-[#222] p-6 md:p-16 rounded-[2rem] md:rounded-[3rem] text-center relative overflow-hidden group hover:border-[#dfff00]/30 transition-all duration-700">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#dfff00]/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-[#dfff00]/10 transition-colors duration-700"></div>
            
            <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight mb-4 relative z-10">Open <span className="text-gray-500">Application</span></h3>
            <p className="text-gray-400 text-base md:text-lg mb-10 max-w-xl mx-auto relative z-10 leading-relaxed">
              While we don't have specific roles posted right now, we are always eager to meet exceptional talent. Send us your resume and tell us how you can make an impact.
            </p>
            
            <Button as="a" href="mailto:careers@ruvo.run" radius="full" size="lg" className="bg-[#dfff00] text-black font-bold px-8 md:px-12 py-6 md:py-7 text-base md:text-lg relative z-10 hover:scale-105 transition-transform shadow-[0_0_30px_rgba(223,255,0,0.15)] group-hover:shadow-[0_0_40px_rgba(223,255,0,0.25)] w-full sm:w-auto">
              Submit Your Portfolio
            </Button>
          </Card>
        </motion.div>
          
      </div>
    </div>
  );
}