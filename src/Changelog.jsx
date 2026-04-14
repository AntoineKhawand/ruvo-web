import React from 'react';
import { motion } from 'framer-motion';
import { Card, Chip } from "@heroui/react";

export default function Changelog() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const releases = [
    {
      version: "v2.1.0", date: "Oct 18, 2026", tag: "Major Update",
      notes: [
        "Introduced the AI Race Predictor tool.",
        "Added deep integration with Coros EvoLab.",
        "Fixed a bug where GPS tracking occasionally paused during incoming calls."
      ]
    },
    {
      version: "v2.0.4", date: "Sep 30, 2026", tag: "Enhancement",
      notes: [
        "New physical rewards added to the RUVO store (Mint Basil & Class Sport).",
        "Improved the battery efficiency of the Apple Watch native app by 15%."
      ]
    },
    {
      version: "v2.0.0", date: "Aug 15, 2026", tag: "Major Update",
      notes: [
        "Completely redesigned the analytics dashboard.",
        "Added support for tracking gear (e.g., shoe mileage).",
        "Launched the Global Leaderboard with filtering options."
      ]
    }
  ];

  return (
    <div className="relative px-6 pb-24 pt-16 overflow-hidden font-['Poppins'] min-h-[80vh]">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-24 pt-8">
          <Chip radius="full" size="sm" className="bg-cyan-500/10 text-cyan-400 font-bold uppercase tracking-[0.2em] mb-6 border border-cyan-500/20 px-4 py-4">
            Release Notes
          </Chip>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 text-white leading-none">
            What's <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">New.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed mx-auto max-w-2xl">
            We are constantly improving RUVO. Here is a log of the latest features, enhancements, and bug fixes.
          </p>
        </motion.div>

        <div className="relative border-l border-white/10 ml-4 md:ml-0 md:pl-8 space-y-16">
          {releases.map((release, idx) => (
            <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="relative">
              <div className="absolute -left-[41px] md:-left-[49px] top-0 w-5 h-5 rounded-full bg-[#111] border-4 border-cyan-500 z-10"></div>
              <div className="mb-4">
                <span className="text-cyan-400 font-black text-2xl tracking-tight mr-4">{release.version}</span>
                <span className="text-gray-500 font-bold uppercase tracking-widest text-sm">{release.date}</span>
              </div>
              <Card className="bg-[#111] border border-[#222] p-8 rounded-3xl">
                <Chip size="sm" className="bg-white/5 text-white mb-6 border border-white/10">{release.tag}</Chip>
                <ul className="space-y-4">
                  {release.notes.map((note, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <svg className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                      {note}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}