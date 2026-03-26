import React from 'react';
import { motion } from 'framer-motion';
import { Card, Button, Chip, Progress } from "@heroui/react";
import { Link as RouterLink } from "react-router-dom";

export default function Rewards() {
  const [showAllRewards, setShowAllRewards] = React.useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const storeItems = [
    { brand: "Nike Lebanon", offer: "20% Off Sportswear", coins: 1800, color: "from-neutral-800 to-neutral-900", logo: "https://s2.googleusercontent.com/s2/favicons?domain=nike.com&sz=128", progress: 85, featured: true },
    { brand: "Adidas Lebanon", offer: "25% Off Sportswear", coins: 2000, color: "from-gray-800 to-black", logo: "/Adidas Logo.png", progress: 60, featured: true },
    { brand: "Decathlon Lebanon", offer: "15% Off Sportswear", coins: 900, color: "from-sky-900 to-sky-950", logo: "/Decathlon-Logo.jpg", progress: 100, featured: true, imgClass: "scale-150" },
    { brand: "Mike Sport", offer: "25% Off Footwear", coins: 1500, color: "from-gray-800 to-black", logo: "https://s2.googleusercontent.com/s2/favicons?domain=mikesport.com&sz=128", progress: 20 },
    { brand: "Beirut Marathon", offer: "Free Race Entry", coins: 3000, color: "from-neutral-800 to-neutral-900", logo: "https://s2.googleusercontent.com/s2/favicons?domain=beirutmarathon.org&sz=128", progress: 100 },
    { brand: "CrossFit", offer: "20% Off Sportswear", coins: 800, color: "from-zinc-800 to-zinc-950", logo: "/Crossfit Logo.webp", progress: 40, imgClass: "scale-[2]" },
    { brand: "Capelli Sport", offer: "$50 Store Voucher", coins: 1200, color: "from-blue-900 to-blue-950", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Capelli_Sport_Logo.svg", progress: 75, imgClass: "brightness-0 scale-125" },
    { isAction: true, offer: "Become a Partner", desc: "Are you a local health or sports brand? Contact us via email to apply and feature your products here.", buttonText: "Email Us", actionHref: "mailto:partners@ruvo.run" }
  ];

  const displayedItems = showAllRewards ? storeItems : storeItems.slice(0, 4);

  return (
    <div className="relative px-4 md:px-6 pb-16 md:pb-24 pt-8 md:pt-16 overflow-hidden font-['Poppins'] min-h-[80vh]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-yellow-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Hero Section */}
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-24 md:mb-32 pt-8 max-w-4xl mx-auto">
          <Chip radius="full" size="sm" className="bg-yellow-500/10 text-yellow-500 font-bold uppercase tracking-[0.2em] mb-6 border border-yellow-500/20 px-4 py-4 shadow-[0_0_20px_rgba(234,179,8,0.2)]">
            Gamified Fitness
          </Chip>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-6 text-white leading-none">
            Sweat. Earn. <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Redeem.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed mx-auto max-w-2xl">
            Stop running for nothing. As the first endurance app born in the Middle East, RUVO turns your kilometers into digital currency. Level up your profile, earn coins, and unlock physical rewards exclusively from Lebanese local health and fitness brands.
          </p>
        </motion.div>

        {/* The Currency Explainer (Bento Box) */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-5xl mx-auto mb-24 md:mb-32">
          <div className="bg-[#050505] border border-[#222] rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 flex flex-col md:flex-row items-center gap-8 md:gap-12 relative overflow-hidden shadow-2xl">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,#ffffff05_1px,transparent_100%)] pointer-events-none"></div>
             
             {/* Interactive Coin Visual */}
             <div className="md:w-1/2 flex justify-center relative z-10 w-full">
               <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center group">
                 <div className="absolute inset-0 bg-yellow-500/20 blur-[60px] rounded-full group-hover:bg-yellow-500/30 transition-colors duration-700"></div>
                 
                 {/* Animated Rings */}
                 <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} className="absolute w-[110%] h-[110%] border-2 border-dashed border-yellow-500/30 rounded-full"></motion.div>
                 <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }} className="absolute w-[130%] h-[130%] border border-yellow-500/10 rounded-full flex items-center justify-center">
                   <div className="w-3 h-3 bg-yellow-400 rounded-full absolute -top-1.5 shadow-[0_0_15px_rgba(250,204,21,0.8)]"></div>
                 </motion.div>

                 {/* 3D Coin Core */}
                 <div className="w-28 h-28 md:w-40 md:h-40 bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 rounded-full flex items-center justify-center shadow-[inset_0_-10px_20px_rgba(0,0,0,0.4),0_10px_30px_rgba(234,179,8,0.3)] relative z-10 group-hover:scale-105 transition-transform duration-500">
                   <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-yellow-300/50 flex items-center justify-center bg-gradient-to-tl from-yellow-600 to-yellow-400">
                     <svg className="w-12 h-12 md:w-16 md:h-16 text-yellow-100 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                   </div>
                 </div>
               </div>
             </div>

             <div className="md:w-1/2 relative z-10 text-center md:text-left">
               <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-6">
                 The RUVO <span className="text-yellow-500">Economy.</span>
               </h2>
               <p className="text-gray-400 text-lg leading-relaxed mb-8">
                 Every verified activity generates two powerful metrics. XP builds your runner's legacy and unlocks higher tiers, while Coins act as a liquid currency you can spend directly in our partner store.
               </p>
               <div className="space-y-4">
                 <div className="bg-[#111] border border-[#222] p-4 rounded-2xl flex items-center text-left gap-4">
                   <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 font-black text-xl shrink-0 border border-blue-500/20">XP</div>
                   <div>
                     <h4 className="text-white font-bold tracking-tight">Experience Points</h4>
                     <p className="text-sm text-gray-500">Determines your global rank and tier.</p>
                   </div>
                 </div>
                 <div className="bg-[#111] border border-[#222] p-4 rounded-2xl flex items-center text-left gap-4">
                   <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-500 font-black text-xl shrink-0 border border-yellow-500/20">RC</div>
                   <div>
                     <h4 className="text-white font-bold tracking-tight">RUVO Coins</h4>
                     <p className="text-sm text-gray-500">Spendable currency for physical rewards.</p>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </motion.div>

        {/* Steps / Mechanics */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-24 md:mb-32">
          {[
            { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "1. Log Your Run", desc: "Use the RUVO app or sync from your smartwatch. We use anti-cheat algorithms to verify the effort." },
            { icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", title: "2. Earn Currency", desc: "Distance, pace, and elevation are calculated to reward you with a fair payout of XP and Coins." },
            { icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z", title: "3. Go Shopping", desc: "Head to the built-in marketplace and exchange your hard-earned coins for digital vouchers." }
          ].map((step, idx) => (
            <motion.div key={idx} variants={fadeInUp} className="h-full">
              <Card className="bg-[#111] border border-[#222] p-6 md:p-8 h-full rounded-[2rem] hover:border-yellow-500/30 transition-colors flex flex-col group relative overflow-hidden items-center text-center md:items-start md:text-left">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-yellow-500/5 blur-[40px] rounded-full pointer-events-none group-hover:bg-yellow-500/10 transition-colors"></div>
                <div className="w-14 h-14 bg-[#222] rounded-2xl flex items-center justify-center mb-6 border border-white/5 group-hover:bg-yellow-500 transition-colors duration-500 shadow-lg relative z-10">
                  <svg className="w-7 h-7 text-yellow-500 group-hover:text-black transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={step.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight relative z-10">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed relative z-10">{step.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* The Store Preview */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-24 md:mb-32 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-8 md:mb-12 border-b border-white/10 pb-6 gap-4 md:gap-6 text-center md:text-left">
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-2">Health & Lifestyle <span className="text-gray-500">Store.</span></h2>
              <p className="text-gray-400 text-lg">A sneak peek at what your kilometers can buy from local wellness brands.</p>
            </div>
            <div className="bg-[#111] border border-yellow-500/30 rounded-full px-5 py-2.5 flex items-center gap-3 shadow-[0_0_15px_rgba(234,179,8,0.15)]">
              <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-inner">
                 <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <span className="font-mono text-yellow-500 font-bold text-lg leading-none pt-0.5">14,250</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {displayedItems.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: (i % 4) * 0.1 }} className="h-full">
                {item.isAction ? (
                  <Card className="bg-[#0a0a0a] border border-dashed border-white/20 p-6 md:p-8 rounded-[2rem] hover:-translate-y-2 hover:border-yellow-500/50 transition-all duration-500 relative overflow-hidden group h-full shadow-lg flex flex-col items-center justify-center text-center cursor-pointer">
                    <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"></div>
                    <div className="relative z-10 flex flex-col items-center h-full w-full justify-center">
                      <div className="w-16 h-16 bg-[#111] rounded-2xl flex items-center justify-center mb-6 border border-[#333] group-hover:bg-yellow-500 transition-colors duration-500 shadow-sm">
                        <svg className="w-8 h-8 text-yellow-500 group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-black text-white leading-tight tracking-tight mb-3 group-hover:text-yellow-400 transition-colors">{item.offer}</h3>
                      <p className="text-gray-400 text-xs leading-relaxed mb-6 flex-grow">{item.desc}</p>
                      <Button as="a" href={item.actionHref} radius="full" size="sm" className="bg-white text-black hover:bg-gray-200 font-bold tracking-wide shadow-md h-10 px-6 w-full">
                        {item.buttonText}
                      </Button>
                    </div>
                  </Card>
                ) : (
                  <Card className={`bg-[#0a0a0a] border border-white/5 p-6 md:p-8 rounded-[2rem] hover:-translate-y-2 hover:border-yellow-500/30 transition-all duration-500 relative overflow-hidden group cursor-pointer h-full shadow-lg hover:shadow-[0_20px_40px_-15px_rgba(234,179,8,0.15)] flex flex-col`}>
                    {/* Subtle Background Glow on Hover */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br ${item.color} transition-opacity duration-700 pointer-events-none z-0`}></div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Top: Logo & Featured Tag */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center p-2 shadow-sm overflow-hidden border border-[#222] group-hover:scale-110 transition-transform duration-500 shrink-0">
                          <img src={item.logo} alt={item.brand} className={`w-full h-full object-contain ${item.imgClass || ""}`} onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex'; }} />
                          <span className="hidden text-black font-black text-2xl uppercase w-full h-full items-center justify-center">{item.brand.charAt(0)}</span>
                        </div>
                        {item.featured && (
                          <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 shadow-sm">Featured</span>
                        )}
                      </div>
                      
                      {/* Middle: Info */}
                      <div className="mb-8 flex-grow">
                        <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px] block mb-2">{item.brand}</span>
                        <h3 className="text-2xl font-black text-white leading-tight tracking-tight group-hover:text-yellow-400 transition-colors">{item.offer}</h3>
                      </div>
  
                      {/* Bottom: Cost & Progress */}
                      <div className="pt-5 border-t border-white/5 relative overflow-hidden h-14">
                        {/* Default View */}
                        <div className="absolute inset-0 flex flex-col justify-center transform group-hover:-translate-y-full transition-transform duration-500 ease-in-out">
                          <div className="flex justify-between items-end mb-2">
                            <div className="flex items-center gap-1.5">
                              <svg className="w-3.5 h-3.5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                              <span className="text-white font-mono font-bold text-sm">{item.coins}</span>
                            </div>
                            <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">
                              {item.progress === 100 ? 'Available' : `${Math.floor(item.coins * (item.progress / 100))} / ${item.coins}`}
                            </span>
                          </div>
                          <Progress value={item.progress} size="sm" classNames={{ indicator: item.progress === 100 ? "bg-gradient-to-r from-yellow-500 to-yellow-300 shadow-[0_0_10px_rgba(234,179,8,0.5)]" : "bg-white/20", track: "bg-[#111]" }} />
                        </div>
                        
                        {/* Hover View */}
                        <div className="absolute inset-0 flex items-center justify-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                          <Button radius="full" size="sm" className="w-full bg-yellow-500 text-black font-bold tracking-wide shadow-[0_0_15px_rgba(234,179,8,0.4)] hover:bg-yellow-400 transition-colors h-10">
                             Redeem Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12 flex flex-col items-center gap-6">
            {!showAllRewards && (
              <Button onPress={() => setShowAllRewards(true)} radius="full" variant="bordered" className="text-white border-white/20 font-bold px-10 py-6 hover:bg-white/10 transition-colors w-full sm:w-auto">
                View All Local Rewards
              </Button>
            )}
            <p className="text-sm text-gray-500 italic">* Reward inventory is updated monthly and is exclusive to participating Lebanese physical stores.</p>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center pb-8 md:pb-12">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-6">
            Start <span className="text-gray-500">Earning.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
            Download the app today, record your first run, and instantly receive a 500 Coin welcome bonus.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button radius="full" size="lg" className="bg-yellow-500 text-black font-bold px-10 py-7 text-base hover:scale-105 transition-transform shadow-[0_0_20px_rgba(234,179,8,0.2)] w-full sm:w-auto">
              Get the App
            </Button>
            <Button as={RouterLink} to="/features" variant="bordered" radius="full" size="lg" className="text-white border-white/20 font-bold px-10 py-7 text-base hover:bg-white/10 transition-colors w-full sm:w-auto">
              Explore Features
            </Button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}