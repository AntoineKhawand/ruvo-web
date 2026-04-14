import React from 'react';
import { motion } from 'framer-motion';
import { Card, Button, Chip } from "@heroui/react";
import { Link as RouterLink } from "react-router-dom";
import { usePageMeta } from './usePageMeta';

export default function Press() {
  usePageMeta(
    "Press | RUVO — Media Kit & News",
    "RUVO press resources: brand assets, product screenshots, and contact details for media enquiries.",
    "/press",
    {"@context":"https://schema.org","@type":"WebPage","url":"https://ruvo.app/press","name":"Press | RUVO — Media Kit & News","isPartOf":{"@id":"https://ruvo.app/#website"},"breadcrumb":{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://ruvo.app/"},{"@type":"ListItem","position":2,"name":"Press","item":"https://ruvo.app/press"}]}}
  );

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="relative px-4 md:px-6 pb-20 md:pb-32 pt-16 md:pt-24 overflow-hidden font-['Poppins'] min-h-[80vh] flex flex-col items-center">
      
      {/* Advanced Background Design */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#dfff00_0%,transparent_30%)] opacity-5 pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#dfff00]/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10 w-full mt-10">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#dfff00] tracking-[0.2em] uppercase mb-8">
            <span className="w-2 h-2 rounded-full bg-[#dfff00] animate-pulse"></span>
            Press & Media
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter text-white mb-6 leading-none">
            RUVO <span className="text-gray-500">Newsroom.</span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            For press inquiries, interview requests, or to get more information about the technology powering RUVO, please reach out to our media relations team.
          </p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Contact Card */}
            <Card className="bg-[#111] border border-[#222] p-8 md:p-14 rounded-[2rem] md:rounded-[3rem] hover:border-[#dfff00]/40 transition-colors duration-500 flex flex-col justify-center items-center md:items-start text-center md:text-left group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#dfff00]/5 blur-[50px] rounded-full pointer-events-none group-hover:bg-[#dfff00]/10 transition-colors duration-500"></div>
              
              <div className="w-16 h-16 bg-[#222] rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:bg-[#dfff00] transition-colors duration-500 shadow-lg">
                <svg className="w-8 h-8 text-[#dfff00] group-hover:text-black transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">Media Inquiries</h3>
              <p className="text-gray-400 mb-8 md:mb-10 leading-relaxed text-base md:text-lg">Are you a journalist or creator looking to cover RUVO? We'd love to chat with you about our mission.</p>
              <Button as="a" href="mailto:press@ruvo.run" radius="full" size="lg" variant="bordered" className="text-white border-white/20 hover:bg-white/10 font-bold w-full text-base py-6">
                press@ruvo.run
              </Button>
            </Card>

            {/* Brand Kit Card */}
            <Card className="bg-gradient-to-br from-[#161616] to-[#0a0a0a] border border-[#222] p-8 md:p-14 rounded-[2rem] md:rounded-[3rem] hover:border-[#dfff00]/40 transition-colors relative overflow-hidden flex flex-col justify-center items-center md:items-start text-center md:text-left group duration-500">
              <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#dfff00]/10 blur-[70px] rounded-full pointer-events-none group-hover:bg-[#dfff00]/20 transition-colors duration-500"></div>
              
              <div className="w-16 h-16 bg-[#dfff00]/10 rounded-2xl flex items-center justify-center mb-8 border border-[#dfff00]/20 relative z-10">
                <svg className="w-8 h-8 text-[#dfff00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10 tracking-tight">Brand Assets</h3>
              <p className="text-gray-400 mb-8 md:mb-10 relative z-10 leading-relaxed text-base md:text-lg">Download official RUVO logos, app screenshots, lifestyle photography, and guidelines.</p>
              <Button radius="full" size="lg" className="bg-[#dfff00] text-black font-bold w-full relative z-10 shadow-[0_0_20px_rgba(223,255,0,0.15)] group-hover:shadow-[0_0_30px_rgba(223,255,0,0.25)] transition-all text-base py-6">
                Download Media Kit
              </Button>
            </Card>
        </motion.div>
      </div>
    </div>
  );
}