import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Button, Chip, Avatar, AvatarGroup, Progress, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Link as RouterLink } from "react-router-dom";

export default function Challenges() {
  const [selectedRegion, setSelectedRegion] = useState("All Regions");

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const activeEvents = [
    {
      title: "Lebanon Coast-to-Coast",
      desc: "Run a total of 150km anywhere along the Lebanese coastline this month.",
      region: "Anywhere",
      progress: 68,
      joined: "12.4K",
      timeLeft: "12d left",
      image: "https://images.unsplash.com/photo-1550492370-84c39aa3aff5?q=80&w=2218&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      color: "from-blue-500/40 to-cyan-500/40",
      border: "hover:border-cyan-500/40",
      tagColor: "bg-cyan-500/10 text-cyan-400"
    },
    {
      title: "Beirut Marathon Prep",
      desc: "Complete 4 long runs (15km+) before race day to earn the exclusive digital badge.",
      region: "Beirut",
      progress: 50,
      joined: "8.2K",
      timeLeft: "5d left",
      image: "https://images.unsplash.com/photo-1667917796503-b1dbf8abced0?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      color: "from-red-500/40 to-orange-500/40",
      border: "hover:border-orange-500/40",
      tagColor: "bg-orange-500/10 text-orange-400"
    },
    {
      title: "Chouf Mountain Trail",
      desc: "Accumulate 2,000m of elevation gain in the Chouf mountains.",
      region: "Mount Lebanon",
      progress: 30,
      joined: "4.1K",
      timeLeft: "20d left",
      image: "https://images.unsplash.com/photo-1643892492756-ffc3d71f8cd1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      color: "from-green-500/40 to-emerald-500/40",
      border: "hover:border-emerald-500/40",
      tagColor: "bg-emerald-500/10 text-emerald-400"
    },
    {
      title: "RUVO Monthly 50K",
      desc: "Join the monthly membership challenge. Run 50K cumulative to earn 500 bonus RUVO coins.",
      region: "Anywhere",
      progress: 15,
      joined: "22.1K",
      timeLeft: "8d left",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1000&q=80",
      color: "from-yellow-500/40 to-amber-500/40",
      border: "hover:border-yellow-500/40",
      tagColor: "bg-yellow-500/10 text-yellow-400"
    },
    {
      title: "Batroun Sunset Dash",
      desc: "A fast-paced 5K route across the Batroun coast. Average under 4:30/km to win.",
      region: "North",
      progress: 42,
      joined: "18.5K",
      timeLeft: "25d left",
      image: "https://images.unsplash.com/flagged/photo-1556746834-1cb5b8fabd54?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      color: "from-indigo-500/40 to-purple-500/40",
      border: "hover:border-indigo-500/40",
      tagColor: "bg-indigo-500/10 text-indigo-400"
    },
    {
      title: "Baalbek Endurance",
      desc: "Log a 20km continuous run in the Bekaa valley to unlock the historic badge.",
      region: "Bekaa",
      progress: 88,
      joined: "45.2K",
      timeLeft: "3d left",
      image: "https://images.unsplash.com/photo-1771166388723-7b418d91e734?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      color: "from-pink-500/40 to-rose-500/40",
      border: "hover:border-pink-500/40",
      tagColor: "bg-pink-500/10 text-pink-400"
    }
  ];

  const regions = ["All Regions", "Anywhere", "Beirut", "Mount Lebanon", "North", "Bekaa"];
  
  const filteredEvents = selectedRegion === "All Regions" 
    ? activeEvents 
    : activeEvents.filter(e => e.region === selectedRegion);

  return (
    <div className="relative px-6 pb-24 pt-16 overflow-hidden font-['Poppins'] min-h-[80vh]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#dfff00]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Hero Section */}
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-32 pt-8 max-w-4xl mx-auto">
          <Chip radius="full" size="sm" className="bg-[#dfff00]/10 text-[#dfff00] font-bold uppercase tracking-[0.2em] mb-6 border border-[#dfff00]/20 px-4 py-4 shadow-[0_0_20px_rgba(223,255,0,0.2)]">
            Global & Local Events
          </Chip>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 text-white leading-none">
            Push Your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dfff00] to-lime-500">Limits.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed mx-auto max-w-2xl">
            Join thousands of runners in community-driven events. Complete challenges, climb the leaderboards, and unlock exclusive digital badges and bonus XP.
          </p>
        </motion.div>

        {/* Active Challenges Grid */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-2">Active <span className="text-gray-500">Events.</span></h2>
              <p className="text-gray-400 text-lg">Join these challenges before they expire.</p>
            </div>
            
            <Dropdown classNames={{ content: "bg-[#111] border border-[#222] min-w-[200px]" }}>
              <DropdownTrigger>
                <Button radius="full" variant="flat" className="bg-white/5 text-white font-bold hover:bg-white/10 border border-white/10">
                  {selectedRegion === "All Regions" ? "Filter by Region" : selectedRegion}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="Filter by Region" 
                selectionMode="single"
                disallowEmptySelection
                selectedKeys={new Set([selectedRegion])}
                onSelectionChange={(keys) => setSelectedRegion(Array.from(keys)[0])}
                itemClasses={{ base: "text-gray-300 data-[hover=true]:bg-white/10 data-[hover=true]:text-white" }}
              >
                {regions.map(r => (
                  <DropdownItem key={r}>{r}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>

          <motion.div key={selectedRegion} variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {filteredEvents.length === 0 ? (
               <div className="col-span-full text-center py-20 text-gray-500 font-medium">No active challenges found in {selectedRegion}.</div>
            ) : filteredEvents.map((event, idx) => (
              <motion.div key={event.title} variants={fadeInUp} className="h-full">
                <Card className={`bg-[#111] border border-[#222] ${event.border} transition-colors duration-500 group flex flex-col rounded-[2.5rem] overflow-hidden h-full cursor-pointer shadow-lg hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)]`}>
                  
                  {/* Image Header */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <img src={event.image} alt={event.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out" />
                    <div className={`absolute inset-0 bg-gradient-to-tr ${event.color}`}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/5 to-transparent"></div>
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                      <Chip size="sm" className={`${event.tagColor} border-none font-bold uppercase tracking-widest text-[10px]`}>{event.timeLeft}</Chip>
                      <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10">
                        {event.joined} Joined
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-black text-white tracking-tight mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">{event.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">{event.desc}</p>
                    
                    <div className="mt-auto">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Your Progress</span>
                        <span className="text-sm font-bold text-white">{event.progress}%</span>
                      </div>
                      <Progress value={event.progress} size="sm" classNames={{ indicator: "bg-gradient-to-r from-white to-gray-400", track: "bg-[#222]" }} />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Leaderboard Snippet */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-32 max-w-4xl mx-auto">
          <Card className="bg-[#050505] border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-[#dfff00]/5 blur-[70px] rounded-full pointer-events-none"></div>
            
            <div className="md:w-1/2 relative z-10 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-4">
                Global <span className="text-[#dfff00]">Leaderboard.</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                See how you stack up against your friends and the rest of the RUVO community. Compete for the top spot every month.
              </p>
            <Button as={RouterLink} to="/leaderboard" radius="full" className="bg-white/10 text-white font-bold border border-white/20 hover:bg-white/20 transition-colors px-8">
                View Full Leaderboard
              </Button>
            </div>
            
            <div className="md:w-1/2 w-full relative z-10">
              <div className="bg-[#111] border border-[#222] rounded-3xl p-4 flex flex-col gap-2 shadow-inner">
                {[
                  { rank: 1, name: "Tarek Z.", points: "14,250 XP", avatar: "https://i.pravatar.cc/150?img=33", color: "text-yellow-500" },
                  { rank: 2, name: "Sarah J.", points: "13,800 XP", avatar: "https://i.pravatar.cc/150?img=5", color: "text-gray-300" },
                  { rank: 3, name: "Elie K.", points: "12,100 XP", avatar: "https://i.pravatar.cc/150?img=14", color: "text-amber-600" },
                  { rank: 48, name: "You", points: "4,500 XP", avatar: "https://i.pravatar.cc/150?img=8", color: "text-[#dfff00]", isYou: true }
                ].map((user, i) => (
                  <div key={i} className={`flex items-center justify-between p-3 rounded-2xl ${user.isYou ? 'bg-[#dfff00]/10 border border-[#dfff00]/30' : 'hover:bg-[#1a1a1a] border border-transparent'} transition-colors`}>
                    <div className="flex items-center gap-4">
                      <span className={`font-black w-4 text-center ${user.color}`}>{user.rank}</span>
                      <Avatar src={user.avatar} size="sm" className="border border-[#333]" />
                      <span className={`font-bold ${user.isYou ? 'text-[#dfff00]' : 'text-white'}`}>{user.name}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-gray-400">{user.points}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center pb-12">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-6">
            Are You <span className="text-gray-500">Ready?</span>
          </h2>
          <div className="flex justify-center items-center">
            <Button radius="full" size="lg" className="bg-[#dfff00] text-black font-bold px-12 py-8 text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(223,255,0,0.15)]">
              Get the App to Join
            </Button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}