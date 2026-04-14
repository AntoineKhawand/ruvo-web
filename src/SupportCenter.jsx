import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Button, Chip } from "@heroui/react";
import { Link as RouterLink } from "react-router-dom";

export const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

export const kbCategories = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    articles: [
      "Creating your RUVO account",
      "Connecting your first smartwatch",
      "Understanding the main dashboard",
      "Finding and saving local running routes"
    ]
  },
  {
    id: "training-ai",
    title: "Training & AI Coaching",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    articles: [
      "How dynamic AI pacing works",
      "Customizing your active training plan",
      "Understanding your VO2 Max & Recovery metrics",
      "Audio cues and live coaching setup"
    ]
  },
  {
    id: "integrations",
    title: "Devices & Integrations",
    icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
    articles: [
      "Syncing with Apple Health & Google Fit",
      "Troubleshooting Garmin auto-export",
      "Connecting external Heart Rate monitors",
      "Exporting data to TrainingPeaks"
    ]
  },
  {
    id: "account-billing",
    title: "Account & Billing",
    icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    articles: [
      "Upgrading to RUVO Elite",
      "Managing or canceling your subscription",
      "Changing your privacy and telemetry settings",
      "Requesting a refund"
    ]
  },
  {
    id: "community",
    title: "Community & Challenges",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    articles: [
      "How to join and create running clubs",
      "Participating in monthly global challenges",
      "Sharing routes securely with friends",
      "Leaderboard rules and guidelines"
    ]
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    articles: [
      "Fixing GPS accuracy issues on Android",
      "App crashing during long runs",
      "Battery optimization settings",
      "Missing run data after a workout"
    ]
  }
];

export default function SupportCenter() {
  const [searchQuery, setSearchQuery] = useState("");

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="relative px-6 pb-24 pt-12 overflow-hidden font-['Poppins']">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#dfff00]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Header & Search */}
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-20 max-w-4xl mx-auto pt-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-gray-300 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            All Systems Operational
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
            Knowledge <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dfff00] to-lime-500">Base.</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Find guides, tutorials, and troubleshooting steps to get the most out of your RUVO experience.
          </p>

          {/* Big Search Bar */}
          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute inset-0 bg-[#dfff00]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <svg className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for articles (e.g., 'Apple Watch Sync')" 
              className="w-full bg-[#111] border-2 border-[#222] hover:border-[#333] rounded-full py-6 pl-16 pr-8 text-white placeholder-gray-500 focus:outline-none focus:border-[#dfff00]/50 transition-all shadow-2xl text-lg relative z-10"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors z-20">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            )}
          </div>
        </motion.div>

        {/* Categories Grid */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {kbCategories.map((category, idx) => {
            // Filter articles inside category if search query exists
            const filteredArticles = category.articles.filter(article => 
              article.toLowerCase().includes(searchQuery.toLowerCase())
            );

            // If searching and no articles match in this category, don't render the card
            if (searchQuery && filteredArticles.length === 0) return null;

            return (
              <motion.div key={category.id} variants={fadeInUp} className="h-full">
                <Card className="bg-[#111] border border-[#222] p-8 h-full rounded-3xl hover:border-[#dfff00]/30 transition-colors duration-500 flex flex-col group">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-[#dfff00]/10 transition-colors">
                      <svg className="w-6 h-6 text-gray-300 group-hover:text-[#dfff00] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={category.icon} />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">{category.title}</h3>
                  </div>
                  
                  <ul className="space-y-4 flex-grow">
                    {(searchQuery ? filteredArticles : category.articles).map((article, i) => (
                      <li key={i}>
                        <RouterLink to={`/support-center/article/${slugify(article)}`} className="text-sm text-gray-400 hover:text-[#dfff00] transition-colors flex items-start gap-2 leading-relaxed">
                          <svg className="w-4 h-4 mt-0.5 shrink-0 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                          {article}
                        </RouterLink>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-6 border-t border-white/5">
                    <RouterLink to={`/support-center/category/${category.id}`} className="text-xs font-bold text-white uppercase tracking-widest hover:text-[#dfff00] transition-colors flex items-center gap-1">
                      View All {category.title} Articles
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </RouterLink>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA to existing Support Contact Form */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-gradient-to-br from-[#161616] to-[#0a0a0a] border border-[#222] rounded-[3rem] p-12 text-center max-w-5xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[#dfff00]/5 blur-[80px] rounded-full pointer-events-none"></div>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4 relative z-10">Can't find what you're <span className="text-gray-500">looking for?</span></h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto relative z-10">Our dedicated athlete support team is ready to help you resolve any issues so you can get back to your training.</p>
          <Button as={RouterLink} to="/support" radius="full" size="lg" className="bg-[#dfff00] text-black font-bold px-10 py-6 text-base hover:scale-105 transition-transform shadow-[0_0_30px_rgba(223,255,0,0.15)] relative z-10">
            Contact Support Team
          </Button>
        </motion.div>

      </div>
    </div>
  );
}