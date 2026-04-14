import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Chip } from "@heroui/react";

export default function NotFound() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="relative px-6 pb-24 pt-16 overflow-hidden font-['Poppins'] min-h-[80vh] flex flex-col items-center justify-center">
      
      {/* Abstract Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      {/* Animated Background Glow */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[400px] md:h-[500px] bg-[#dfff00]/10 blur-[120px] rounded-full pointer-events-none"
      />

      {/* Giant Background 404 Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] md:text-[25rem] font-black text-white/[0.02] select-none pointer-events-none tracking-tighter">
        404
      </div>

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col items-center">
          <motion.div variants={fadeInUp}>
            <Chip radius="full" size="sm" className="bg-[#dfff00]/10 text-[#dfff00] font-bold uppercase tracking-[0.2em] mb-8 border border-[#dfff00]/20 px-4 py-4 shadow-[0_0_20px_rgba(223,255,0,0.2)]">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#dfff00] animate-pulse"></span>
                Signal Lost
              </span>
            </Chip>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-tighter mb-6 text-white leading-none">
              Off The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dfff00] to-lime-500 drop-shadow-[0_0_30px_rgba(223,255,0,0.3)]">Route.</span>
            </h1>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed mx-auto max-w-xl mb-12">
              It looks like you've run off the trail. The page you're looking for doesn't exist, has been moved, or is currently unavailable.
            </p>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            <Button as={RouterLink} to="/" radius="full" size="lg" className="bg-[#dfff00] text-black font-bold px-10 py-7 text-base hover:scale-105 transition-transform shadow-[0_0_20px_rgba(223,255,0,0.15)] w-full sm:w-auto flex items-center gap-2 group">
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7-7h18" />
              </svg>
              Back to Homepage
            </Button>
            <Button as={RouterLink} to="/support" variant="bordered" radius="full" size="lg" className="text-white border-white/20 font-bold px-10 py-7 text-base hover:bg-white/10 transition-colors w-full sm:w-auto">
              Contact Support
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
