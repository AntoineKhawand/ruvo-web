import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, Avatar, Button } from "@heroui/react";
import { Link as RouterLink } from "react-router-dom";
import { usePageMeta } from './usePageMeta';

export default function Leaderboard() {
  usePageMeta(
    "Leaderboard | RUVO — Global Running Rankings",
    "Compete on the RUVO global leaderboard. See weekly and all-time rankings across distance, speed, and challenges.",
    "/leaderboard",
    {"@context":"https://schema.org","@type":"WebPage","url":"https://ruvo.app/leaderboard","name":"Leaderboard | RUVO — Global Running Rankings","isPartOf":{"@id":"https://ruvo.app/#website"},"breadcrumb":{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://ruvo.app/"},{"@type":"ListItem","position":2,"name":"Leaderboard","item":"https://ruvo.app/leaderboard"}]}}
  );

  const [category, setCategory] = useState("Global");
  const [timeframe, setTimeframe] = useState("This Month");

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const allUsers = [
    { name: "Charbel K.", avatar: "https://i.pravatar.cc/150?img=13" },
    { name: "Nour A.", avatar: "https://i.pravatar.cc/150?img=5" },
    { name: "Jad H.", avatar: "https://i.pravatar.cc/150?img=60" },
    { name: "Yara M.", avatar: "https://i.pravatar.cc/150?img=9" },
    { name: "Elie S.", avatar: "https://i.pravatar.cc/150?img=14" },
    { name: "Maya N.", avatar: "https://i.pravatar.cc/150?img=32" },
    { name: "Anthony B.", avatar: "https://i.pravatar.cc/150?img=11" },
    { name: "Celine D.", avatar: "https://i.pravatar.cc/150?img=16" },
    { name: "Tarek F.", avatar: "https://i.pravatar.cc/150?img=33" },
    { name: "Lea R.", avatar: "https://i.pravatar.cc/150?img=20" },
    { name: "Ziad H.", avatar: "https://i.pravatar.cc/150?img=53" },
    { name: "Rita A.", avatar: "https://i.pravatar.cc/150?img=24" },
    { name: "Karim Z.", avatar: "https://i.pravatar.cc/150?img=59" },
    { name: "Yasmina S.", avatar: "https://i.pravatar.cc/150?img=42" },
    { name: "Georges K.", avatar: "https://i.pravatar.cc/150?img=68" }
  ];

  // Dynamically generate data based on active filters
  const leaderboardData = useMemo(() => {
    let seed = category.charCodeAt(0) + timeframe.charCodeAt(0);
    
    let filteredUsers = [...allUsers];
    if (category === "Local") filteredUsers = allUsers.slice(2, 12);
    if (category === "Following") filteredUsers = allUsers.filter((_, i) => i % 2 === 0);

    let data = filteredUsers.map((u, i) => {
      const rand = Math.sin(seed + i) * 10000;
      const pseudoRand = rand - Math.floor(rand);
      
      let multiplier = 1;
      if (timeframe === "This Week") multiplier = 0.25;
      if (timeframe === "All Time") multiplier = 8.5;

      const basePoints = 9000 + (pseudoRand * 6000);
      const points = Math.floor(basePoints * multiplier);
      const distance = Math.floor((points / 35) + (pseudoRand * 20));
      
      const trends = ["up", "down", "same"];
      const trend = trends[Math.floor(pseudoRand * 3)];

      return { ...u, points: points.toLocaleString(), rawPoints: points, distance: `${distance} km`, trend };
    });

    data.sort((a, b) => b.rawPoints - a.rawPoints);
    return data.slice(0, 10).map((u, i) => ({ ...u, rank: i + 1 }));
  }, [category, timeframe]);

  // Data partitioning
  const top3 = leaderboardData.slice(0, 3);
  const restOfUsers = leaderboardData.slice(3);
  
  // Current User stats logic based on filters
  const currentUser = useMemo(() => {
    let multiplier = 1;
    if (timeframe === "This Week") multiplier = 0.25;
    if (timeframe === "All Time") multiplier = 8.5;

    const baseRank = category === "Global" ? 48 : category === "Local" ? 12 : 5;
    return { rank: baseRank, name: "You", points: Math.floor(4500 * multiplier).toLocaleString(), distance: `${Math.floor(120 * multiplier)} km`, avatar: "https://i.pravatar.cc/150?img=8", trend: "up" };
  }, [category, timeframe]);

  return (
    <div className="relative px-6 pb-32 pt-16 overflow-hidden font-['Poppins'] min-h-[80vh]">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#dfff00]/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="max-w-3xl mx-auto relative z-10">
        
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-16 pt-8">
          <RouterLink to="/challenges" className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-[#dfff00] transition-colors mb-6">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Challenges
          </RouterLink>
          
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-white leading-none">
            Leader<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dfff00] to-lime-500">board.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed mx-auto">
            The current top runners across the global RUVO network.
          </p>
        </motion.div>

        {/* Interactive Filters */}
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="flex items-center gap-1 bg-[#111] p-1.5 rounded-full border border-[#222] shadow-inner w-full md:w-auto overflow-x-auto no-scrollbar">
            {["Global", "Local", "Following"].map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${category === cat ? 'bg-[#dfff00] text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 bg-[#111] p-1.5 rounded-full border border-[#222] shadow-inner w-full md:w-auto overflow-x-auto no-scrollbar">
            {["This Week", "This Month", "All Time"].map(time => (
              <button
                key={time}
                onClick={() => setTimeframe(time)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${timeframe === time ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
              >
                {time}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Podium Section */}
        <motion.div key={`podium-${category}-${timeframe}`} initial="hidden" animate="visible" variants={staggerContainer} className="flex justify-center items-end gap-2 sm:gap-6 mb-12 pt-8">
           {/* 2nd Place */}
           <motion.div variants={fadeInUp} className="flex flex-col items-center pb-4 sm:pb-8 relative z-0">
              <div className="relative mb-3">
                 <Avatar src={top3[1].avatar} className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-gray-300 shadow-[0_0_20px_rgba(209,213,219,0.2)]" />
                 <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-black font-black text-xs border-2 border-[#0a0a0a]">2</div>
              </div>
              <div className="bg-gradient-to-t from-[#111] to-[#1a1a1a] border border-[#333] rounded-t-2xl p-3 sm:p-4 text-center w-24 sm:w-32 flex flex-col items-center shadow-lg">
                 <span className="text-white font-bold text-sm truncate w-full">{top3[1].name}</span>
                 <span className="text-gray-300 text-xs font-mono font-bold mt-1">{top3[1].points} XP</span>
              </div>
           </motion.div>

           {/* 1st Place */}
           <motion.div variants={fadeInUp} className="flex flex-col items-center relative z-10">
              <div className="absolute -top-10 text-yellow-400">
                 <svg className="w-8 h-8 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.4L22 9.4l-5.6 5.4 1.3 7.8L12 19.6l-5.7 3 1.3-7.8L2 9.4l7.6-.1L12 2z"/></svg>
              </div>
              <div className="relative mb-3">
                 <Avatar src={top3[0].avatar} className="w-20 h-20 sm:w-28 sm:h-28 border-4 border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.4)]" />
                 <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-black text-sm border-2 border-[#0a0a0a]">1</div>
              </div>
              <div className="bg-gradient-to-t from-yellow-500/20 to-yellow-400/5 border border-yellow-400/30 rounded-t-2xl p-4 sm:p-6 text-center w-28 sm:w-40 flex flex-col items-center shadow-[0_-10px_40px_-15px_rgba(250,204,21,0.25)]">
                 <span className="text-white font-black text-base truncate w-full">{top3[0].name}</span>
                 <span className="text-yellow-400 text-sm font-mono font-black mt-1">{top3[0].points} XP</span>
                 <span className="text-gray-400 text-[10px] uppercase tracking-widest mt-2 hidden sm:block">{top3[0].distance}</span>
              </div>
           </motion.div>

           {/* 3rd Place */}
           <motion.div variants={fadeInUp} className="flex flex-col items-center pb-2 sm:pb-6 relative z-0">
              <div className="relative mb-3">
                 <Avatar src={top3[2].avatar} className="w-14 h-14 sm:w-16 sm:h-16 border-4 border-amber-600 shadow-[0_0_20px_rgba(217,119,6,0.2)]" />
                 <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center text-white font-black text-xs border-2 border-[#0a0a0a]">3</div>
              </div>
              <div className="bg-gradient-to-t from-[#111] to-[#1a1a1a] border border-[#333] rounded-t-2xl p-3 sm:p-4 text-center w-24 sm:w-28 flex flex-col items-center shadow-lg">
                 <span className="text-white font-bold text-sm truncate w-full">{top3[2].name}</span>
                 <span className="text-amber-500 text-xs font-mono font-bold mt-1">{top3[2].points} XP</span>
              </div>
           </motion.div>
        </motion.div>

        {/* Rest of the Leaderboard */}
        <motion.div key={`list-${category}-${timeframe}`} variants={staggerContainer} initial="hidden" animate="visible">
          <div className="flex flex-col gap-3">
            {restOfUsers.map((user, i) => (
              <motion.div key={i} variants={fadeInUp} className="flex items-center justify-between bg-[#111] hover:bg-[#161616] border border-[#222] hover:border-white/10 p-4 md:p-5 rounded-2xl transition-all duration-300 group cursor-default shadow-sm hover:shadow-md">
                <div className="flex items-center gap-4 md:gap-6">
                  <span className="font-black text-lg md:text-xl w-6 text-center text-gray-500">{user.rank}</span>
                  <Avatar src={user.avatar} size="sm" className="border border-[#333] group-hover:border-white/20 transition-colors" />
                  <div className="flex flex-col">
                    <span className="font-bold text-white group-hover:text-[#dfff00] transition-colors">{user.name}</span>
                    <span className="text-xs text-gray-500">{user.distance}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Trend Indicator */}
                  <div className="hidden sm:flex items-center justify-center w-6">
                    {user.trend === 'up' && <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>}
                    {user.trend === 'down' && <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>}
                    {user.trend === 'same' && <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 12h14" /></svg>}
                  </div>
                  <div className="flex items-baseline gap-1 bg-[#222] px-3 py-1.5 rounded-full border border-white/5">
                    <span className="text-sm md:text-base font-mono font-bold text-white">{user.points}</span>
                    <span className="text-[10px] font-bold text-gray-500">XP</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mt-10">
           <Button radius="full" variant="bordered" className="text-white border-white/20 font-bold px-10 py-6 hover:bg-white/10 transition-colors">
             Load More Results
           </Button>
        </motion.div>

        {/* Current User Sticky Bar */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 20 }} className="sticky bottom-6 mt-12 z-50">
          <div className="bg-[#111]/80 backdrop-blur-2xl border border-[#dfff00]/30 shadow-[0_15px_40px_-10px_rgba(223,255,0,0.25)] p-4 md:p-5 rounded-2xl flex items-center justify-between group">
            <div className="flex items-center gap-4 md:gap-6">
               <span className="font-black text-xl w-6 text-center text-[#dfff00]">{currentUser.rank}</span>
               <div className="relative">
                 <Avatar src={currentUser.avatar} size="sm" className="border-2 border-[#dfff00]" />
                 <span className="absolute -top-1 -right-1 flex h-3 w-3">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#dfff00] opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-3 w-3 bg-[#dfff00]"></span>
                 </span>
               </div>
               <div className="flex flex-col">
                 <span className="font-bold text-[#dfff00] text-base md:text-lg leading-tight">{currentUser.name}</span>
                 <span className="text-[10px] md:text-xs text-gray-400">{currentUser.distance} total</span>
               </div>
            </div>
            
            <div className="flex items-center gap-4">
               <div className="hidden sm:flex items-center justify-center w-6">
                 <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
               </div>
               <div className="flex items-baseline gap-1 bg-[#dfff00] px-4 py-2 rounded-full shadow-[0_0_15px_rgba(223,255,0,0.4)] hover:scale-105 transition-transform cursor-pointer">
                 <span className="text-sm md:text-base font-mono font-bold text-black leading-none">{currentUser.points}</span>
                 <span className="text-[10px] font-bold text-black/70 leading-none">XP</span>
               </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}