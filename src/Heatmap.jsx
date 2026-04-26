import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Chip } from "@heroui/react";
import { usePageMeta } from './usePageMeta';

export default function Heatmap() {
  usePageMeta(
    "Global Heatmap | RUVO — See Where Runners Go",
    "Explore the RUVO global run heatmap. Discover popular running routes contributed by millions of runners.",
    "/heatmap",
    {"@context":"https://schema.org","@type":"WebPage","url":"https://ruvo.app/heatmap","name":"Global Heatmap | RUVO — See Where Runners Go","isPartOf":{"@id":"https://ruvo.app/#website"},"breadcrumb":{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://ruvo.app/"},{"@type":"ListItem","position":2,"name":"Heatmap","item":"https://ruvo.app/heatmap"}]}}
  );

  const [exploreMode, setExploreMode] = useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="relative px-6 pb-0 pt-16 overflow-hidden font-['Poppins'] min-h-screen flex flex-col">
      
      {/* Dynamic Interactive Outline Map */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${exploreMode ? 'opacity-100' : 'opacity-30'} pointer-events-auto`}>
         <iframe 
            title="Interactive Map"
            width="100%" 
            height="100%" 
            frameBorder="0" 
            src="https://www.openstreetmap.org/export/embed.html?bbox=35.485,33.875,35.515,33.905&layer=mapnik&marker=33.89,35.50" 
            style={{ filter: "invert(100%) hue-rotate(180deg) brightness(80%) contrast(120%) grayscale(100%)" }}
         ></iframe>
      </div>
      <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_80%)] z-0 pointer-events-none transition-opacity duration-700 ${exploreMode ? 'opacity-0' : 'opacity-100'}`}></div>

      {exploreMode && (
         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="absolute top-24 left-1/2 -translate-x-1/2 z-50">
            <Button onClick={() => setExploreMode(false)} radius="full" className="bg-[#111] text-white border border-[#333] shadow-2xl px-8 font-bold">
               Exit Map View
            </Button>
         </motion.div>
      )}

      <div className={`max-w-7xl mx-auto relative z-10 w-full flex-grow flex flex-col transition-opacity duration-500 ${exploreMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center pt-8 mb-auto">
          <Chip radius="full" size="sm" className="bg-[#dfff00]/10 text-[#dfff00] font-bold uppercase tracking-[0.2em] mb-6 border border-[#dfff00]/20 px-4 py-4 backdrop-blur-md">
            Coming Soon
          </Chip>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-white leading-none drop-shadow-lg">
            RUVO <span className="text-[#dfff00]">Heatmap.</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed mx-auto max-w-2xl drop-shadow-md">
            We are building the world's most private and precise activity map. Explore millions of kilometers while maintaining total control over your data.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="mt-auto pb-24 flex justify-center w-full">
            <div className="bg-[#111]/80 backdrop-blur-2xl border border-white/10 p-6 md:p-8 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row items-center gap-8 max-w-4xl w-full">
                <div className="flex-1 flex gap-6">
                    <div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Total Distance</p>
                        <p className="text-3xl font-black text-white">15.2M <span className="text-sm font-normal text-gray-500">km</span></p>
                    </div>
                    <div className="w-px h-12 bg-white/10"></div>
                    <div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Active Routes</p>
                        <p className="text-3xl font-black text-white">840K+</p>
                    </div>
                </div>
                <div className="shrink-0 w-full md:w-auto">
                    <Button onClick={() => setExploreMode(true)} radius="full" size="lg" className="w-full bg-[#dfff00] text-black font-bold px-10 shadow-[0_0_20px_rgba(223,255,0,0.2)] hover:scale-105 transition-transform">
                        Explore Local Map
                    </Button>
                </div>
            </div>
        </motion.div>
      </div>
    </div>
  );
}