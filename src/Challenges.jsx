import React from 'react';
import { motion } from 'framer-motion';
import { Card, Button, Chip, Avatar, AvatarGroup, Progress } from "@heroui/react";
import { Link as RouterLink } from "react-router-dom";

export default function Challenges() {
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
      progress: 68,
      joined: "12.4K",
      timeLeft: "12d left",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
      color: "from-blue-500/40 to-cyan-500/40",
      border: "hover:border-cyan-500/40",
      tagColor: "bg-cyan-500/10 text-cyan-400"
    },
    {
      title: "Beirut Marathon Prep",
      desc: "Complete 4 long runs (15km+) before race day to earn the exclusive digital badge.",
      progress: 50,
      joined: "8.2K",
      timeLeft: "5d left",
      image: "https://images.unsplash.com/photo-1530549387722-41480f83ae89?auto=format&fit=crop&w=1000&q=80",
      color: "from-red-500/40 to-orange-500/40",
      border: "hover:border-orange-500/40",
      tagColor: "bg-orange-500/10 text-orange-400"
    },
    {
      title: "Mountain Goat: Chouf",
      desc: "Accumulate 2,000m of elevation gain in the Chouf mountains.",
      progress: 30,
      joined: "4.1K",
      timeLeft: "20d left",
      image: "https://images.unsplash.com/photo-1452626022479-bfae86c47141?auto=format&fit=crop&w=1000&q=80",
      color: "from-green-500/40 to-emerald-500/40",
      border: "hover:border-emerald-500/40",
      tagColor: "bg-emerald-500/10 text-emerald-400"
    }
  ];

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
            <Button radius="full" variant="flat" className="bg-white/5 text-white font-bold hover:bg-white/10 border border-white/10">
              Filter by Region
            </Button>
          </div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {activeEvents.map((event, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="h-full">
                <Card className={`bg-[#111] border border-[#222] ${event.border} transition-colors duration-500 group flex flex-col rounded-[2.5rem] overflow-hidden h-full cursor-pointer shadow-xl hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.8)]`}>
                  
                  {/* Image Header */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <img src={event.image} alt={event.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out" />
                    <div className={`absolute inset-0 bg-gradient-to-tr ${event.color}`}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/20 to-transparent"></div>
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
              <Button radius="full" className="bg-white/10 text-white font-bold border border-white/20 hover:bg-white/20 transition-colors px-8">
                View Full Leaderboard
              </Button>
            </div>
            
            <div className="md:w-1/2 w-full relative z-10">
              <div className="bg-[#111] border border-[#222] rounded-3xl p-4 flex flex-col gap-2 shadow-inner">
                {[
                  { rank: 1, name: "Tarek Z.", points: "14,250 XP", avatar: "https://i.pravatar.cc/150?u=1", color: "text-yellow-500" },
                  { rank: 2, name: "Sarah J.", points: "13,800 XP", avatar: "https://i.pravatar.cc/150?u=2", color: "text-gray-300" },
                  { rank: 3, name: "Elie K.", points: "12,100 XP", avatar: "https://i.pravatar.cc/150?u=3", color: "text-amber-600" },
                  { rank: 48, name: "You", points: "4,500 XP", avatar: "https://i.pravatar.cc/150?u=4", color: "text-[#dfff00]", isYou: true }
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
              Join Your First Challenge
            </Button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}