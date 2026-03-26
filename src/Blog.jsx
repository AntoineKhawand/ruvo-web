import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button, Chip, Avatar } from "@heroui/react";
import { Link as RouterLink } from "react-router-dom";
 
const articles = [
  { 
    title: "Carbon-Plated Shoes: Science or Hype?", 
    category: "Product", 
    date: "Oct 29, 2026", 
    readTime: "5 min read",
    alt: "Close-up of carbon-plated running shoes on a track",
    title: "Carbon-Plated Shoes: Science or Hype? - Performance Footwear Analysis",
    author: "Antoine El Khawand",
    avatar: "https://i.pravatar.cc/150?img=12",
    excerpt: "Exploring the biomechanics behind 'super shoes' and how they impact your running economy and recovery.",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000",
    content: {
      overview: "Since 2017, carbon-plated running shoes have completely rewritten the record books. But how do they actually work? It's not just the plate—it's the combination of a stiff carbon fiber lever and ultra-responsive, lightweight foam.",
      quote: "Super shoes don't run the race for you, but they do preserve your legs for the final 10 kilometers.",
      deepDive: "The carbon plate acts as a stabilizing element that guides the foot through the stride, reducing the workload on your calves and ankles. Meanwhile, the high-stack PEBA foam returns significantly more energy than traditional EVA foam. In RUVO, we've noticed athletes wearing these shoes report a 3-4% drop in heart rate at their threshold pace. However, relying on them for every daily run can lead to foot weakness, so rotate them wisely.",
      takeaways: ["Save super shoes for race day and key speed workouts.", "Rotate with standard trainers to maintain foot and Achilles strength.", "Track your gear mileage in RUVO to know when the foam loses its bounce."]
    }
  },
  { 
    title: "Zone 2 Training: The Secret to Going Faster", 
    category: "Training", 
    date: "Oct 22, 2026", 
    readTime: "7 min read",
    alt: "Runner in a park at sunrise, demonstrating Zone 2 training",
    title: "Zone 2 Training: The Secret to Going Faster - Endurance Strategy",
    author: "Antoine El Khawand",
    avatar: "https://i.pravatar.cc/150?img=12",
    excerpt: "Why slowing down might be the most effective way to break your next personal record.",
    img: "https://images.unsplash.com/photo-1665502089396-0f5b9864bf1d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: {
      overview: "It sounds counterintuitive, but the world's best endurance athletes spend 80% of their training time at a conversational pace. This low-intensity effort, known as Zone 2, builds your aerobic base and mitochondrial density without accumulating excess fatigue.",
      quote: "To run fast, you must first learn to run slow. Zone 2 is where the physiological magic happens.",
      deepDive: "Zone 2 training primarily utilizes fat as a fuel source rather than carbohydrates. By spending hours in this zone, you teach your body to become highly efficient at fat oxidation. When you sync your heart rate monitor with RUVO, our AI ensures you don't accidentally drift into Zone 3, a common mistake that turns a recovery run into 'junk miles'.",
      takeaways: ["Keep your heart rate between 60-70% of your maximum.", "If you can't hold a conversation, you're going too fast.", "Aim for at least 80% of your weekly volume in this zone."]
    }
  },
  { 
    title: "Understanding VO2 Max: Your Ultimate Guide", 
    category: "Science", 
    date: "Oct 15, 2026", 
    readTime: "6 min read",
    alt: "Athlete undergoing a VO2 Max test with a mask and heart rate monitor",
    title: "Understanding VO2 Max: Your Ultimate Guide - Aerobic Fitness Explained",
    author: "Antoine El Khawand",
    avatar: "https://i.pravatar.cc/150?img=12",
    excerpt: "Discover how measuring your maximum oxygen uptake can completely transform your endurance training.",
    img: "https://images.unsplash.com/photo-1709601414405-db08d323a87a?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Vk8yJTIwTWF4fGVufDB8MHwwfHx8Mg%3D%3D",
    content: {
      overview: "VO2 Max is the defining metric of aerobic fitness. It represents the maximum volume of oxygen your body can process during intense exercise. In this guide, we break down why it matters and how to track it accurately.",
      quote: "Training isn't just about pushing harder; it's about pushing smarter. Let the data guide your rest days as fiercely as it guides your race pace.",
      deepDive: "At a cellular level, a higher VO2 Max indicates greater mitochondrial density and capillary network efficiency. When you track this in RUVO via your smartwatch, we look for sustained heart rate outputs relative to pace. A rising VO2 Max means your engine is getting larger.",
      takeaways: ["Incorporate 1-2 VO2 Max interval sessions per week.", "Track your metric over a 6-month macrocycle.", "Don't ignore recovery—cellular adaptation happens at rest."]
    }
  },
  { 
    title: "The Perfect 5K Pacing Strategy", 
    category: "Training", 
    date: "Oct 10, 2026", 
    readTime: "4 min read",
    alt: "Runner crossing the finish line of a 5K race",
    title: "The Perfect 5K Pacing Strategy - Race Day Tactics",
    author: "Antoine El Khawand",
    avatar: "https://i.pravatar.cc/150?img=12",
    excerpt: "Stop burning out in the first kilometer. Learn the negative split strategy used by elite runners.",
    img: "https://images.unsplash.com/photo-1766970096504-145331b0b2cc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: {
      overview: "The 5K is a delicate balance of speed and endurance. Most beginners make the mistake of starting too fast. The secret to a personal best is pacing—specifically, the negative split.",
      quote: "The race doesn't start until the 3rd kilometer. Everything before that is just setting the stage.",
      deepDive: "A negative split means running the second half of the race faster than the first. To achieve this, you need to deliberately hold back in kilometers 1 and 2. RUVO's AI pacing audio cues are designed to keep your early splits 5-10 seconds slower than your target average pace, saving your glycogen stores for a massive final push.",
      takeaways: ["Start 5-10 seconds slower than goal pace.", "Focus on relaxed form for the first 3K.", "Use RUVO's audio cues to stay disciplined."]
    }
  },
  { 
    title: "Nutrition for Ultra-Marathons", 
    category: "Nutrition", 
    date: "Sep 28, 2026", 
    readTime: "8 min read",
    alt: "Table with various energy gels, drinks, and snacks for ultra-marathon fueling",
    title: "Nutrition for Ultra-Marathons - Fueling Beyond the Marathon",
    author: "Antoine El Khawand",
    avatar: "https://i.pravatar.cc/150?img=12",
    excerpt: "Fueling for a 50K requires more than just gels. Explore a comprehensive guide to ultra-endurance nutrition.",
    img: "https://images.unsplash.com/photo-1644704170910-a0cdf183649b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: {
      overview: "When you cross the marathon distance into ultra territory, nutrition becomes just as important as your training. You are no longer just fueling the run; you are actively preventing systemic depletion.",
      quote: "An ultra-marathon is essentially an eating and drinking contest with a little bit of running thrown in.",
      deepDive: "The human body can only process about 60-90 grams of carbohydrates per hour. Trying to consume more will lead to GI distress. It's crucial to mix complex and simple carbs, and ensure adequate sodium intake (500-1000mg/hour) to prevent hyponatremia. Training your gut during long runs is mandatory.",
      takeaways: ["Aim for 60-90g of carbs per hour.", "Drink to thirst but monitor sodium closely.", "Practice your race-day nutrition plan repeatedly."]
    }
  },
  { 
    title: "How RUVO's AI Adapts to Your HRV", 
    category: "Product", 
    date: "Sep 15, 2026", 
    readTime: "5 min read",
    alt: "Smartwatch displaying heart rate variability (HRV) data",
    title: "How RUVO's AI Adapts to Your HRV - Personalized Training with Data",
    author: "Antoine El Khawand",
    avatar: "public/Gemini_Generated_Image_cajbu9cajbu9cajb.png",
    excerpt: "A look under the hood at how our intelligence engine alters your training based on your daily Heart Rate Variability.",
    img: "https://images.unsplash.com/photo-1682706841289-9d7ddf5eb999?q=80&w=1050&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: {
      overview: "Heart Rate Variability (HRV) is the variance in time between the beats of your heart. It's the most accurate non-invasive indicator of your nervous system's recovery state. Here is how RUVO uses it.",
      quote: "Listen to your body, but let the data translate what it's saying.",
      deepDive: "When you sync an Oura ring, Whoop, or Apple Watch to RUVO, we analyze your overnight HRV. If your HRV drops significantly below your 30-day baseline, it indicates sympathetic nervous system dominance (stress). Our AI automatically scales back the intensity of your scheduled workout, swapping VO2 Max intervals for Zone 2 recovery runs.",
      takeaways: ["Wear your tracker to bed for accurate readings.", "Trust the AI when it suggests a rest day.", "Consistency in data collection yields the best plans."]
    }
  },
];
export default function Blog() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const categories = ["All", "Science", "Training", "Nutrition", "Product"];
  
  const filteredArticles = useMemo(() => {
    if (activeCategory === "All") {
      return articles;
    }
    return articles.filter(a => a.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    // Set meta title and description
    if (selectedArticle) {
      document.title = selectedArticle.title;
      let metaDescription = document.querySelector("meta[name='description']");
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.getElementsByTagName('head')[0].appendChild(metaDescription);
      }
      metaDescription.content = selectedArticle.excerpt;
    } else {
      document.title = "RUVO Blog - Stories & Science for Endurance Athletes";
      let metaDescription = document.querySelector("meta[name='description']");
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.getElementsByTagName('head')[0].appendChild(metaDescription);
      }
      metaDescription.content = "Deep dives into endurance training, sports science, and the technology powering your next personal best with RUVO.";
    }
  }, [selectedArticle]);

  const handleShareArticle = () => {
    if (navigator.share && selectedArticle) {
      navigator.share({
        title: selectedArticle.title,
        text: selectedArticle.excerpt,
        url: window.location.href,
      }).then(() => {
        console.log('Thanks for sharing!');
      }).catch(console.error);
    } else {
      alert('Web Share API is not supported in your browser or no article is selected.');
      console.log('Share functionality not available or no article selected.');
    }
  };

  return (
    <div className="relative px-6 pb-24 pt-16 overflow-hidden font-['Poppins'] min-h-[80vh]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#dfff00]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {selectedArticle ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto pt-8">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
               <Button 
                 onPress={() => { 
                   setSelectedArticle(null); 
                   setActiveCategory("All"); 
                   window.scrollTo({top: 0, behavior: 'smooth'}) 
                 }} 
                 variant="light" 
                 className="text-gray-400 hover:text-white -ml-4 w-fit"
               >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7-7h18" /></svg>
                  Back to The Track
               </Button>
               <Button radius="full" size="sm" variant="bordered" className="text-gray-300 border-white/20 hover:bg-white/10 w-fit" onPress={handleShareArticle}>
                 <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                 Share Article
               </Button>
             </div>
             
             <header className="mb-12">
               <Chip size="sm" className="bg-[#dfff00] text-black font-bold uppercase tracking-widest border-none mb-6">{selectedArticle.category}</Chip>
               <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8 tracking-tight">{selectedArticle.title}</h1>
               
               <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-l-2 border-[#dfff00] pl-4">
                 <div className="flex items-center gap-3">
                    <Avatar src={selectedArticle.avatar} size="md" className="border border-white/10" />
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-sm">{selectedArticle.author}</span>
                      <div className="flex items-center gap-2 text-xs text-gray-500 font-bold uppercase tracking-widest mt-0.5">
                        <span>{selectedArticle.date}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                        <span>{selectedArticle.readTime}</span>
                      </div>
                    </div>
                 </div>
               </div>
             </header>

             <img src={selectedArticle.img} alt={selectedArticle.alt} title={selectedArticle.title} className="w-full h-[300px] md:h-[500px] object-cover rounded-[2rem] mb-16 border border-[#222] shadow-2xl" />
             
             {/* SEO Optimized Content Body */}
             <article className="prose prose-invert max-w-none prose-lg text-gray-300 leading-relaxed font-light">
                <section className="mb-16">
                  <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">Overview</h2>
                  <p className="text-xl">{selectedArticle.content.overview}</p>
                  <div className="bg-gradient-to-r from-[#111] to-transparent border-l-4 border-[#dfff00] p-8 rounded-r-2xl my-12 text-lg italic text-gray-400 shadow-lg">
                    "{selectedArticle.content.quote}"
                  </div>
                </section>
                
                <section className="mb-16">
                  <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">Deep Dive</h2>
                  <p>{selectedArticle.content.deepDive}</p>
                </section>
                
                <section className="mb-12 border-t border-white/10 pt-12">
                  <h3 className="text-2xl font-bold text-white mb-8 tracking-tight">Key Takeaways</h3>
                  <ul className="list-disc list-outside space-y-4 text-gray-300 marker:text-[#dfff00] ml-6">
                    {selectedArticle.content.takeaways.map((item, i) => (
                      <li key={i} className="pl-2">{item}</li>
                    ))}
                  </ul>
                </section>
             </article>
          </motion.div >
        ) : (
        <>
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-24 pt-8">
          <Chip radius="full" size="sm" className="bg-[#dfff00]/10 text-[#dfff00] font-bold uppercase tracking-[0.2em] mb-6 border border-[#dfff00]/20 px-4 py-4">
            The Track
          </Chip>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 text-white leading-none">
            Stories & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dfff00] to-lime-500">Science.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed mx-auto max-w-2xl">
            Deep dives into endurance training, sports science, and the technology powering your next personal best.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <Button 
              key={cat}
              onPress={() => setActiveCategory(cat)}
              variant={activeCategory === cat ? "solid" : "bordered"}
              radius="full"
              className={activeCategory === cat ? "bg-[#dfff00] text-black font-bold" : "text-gray-400 border-white/10 hover:border-white/30 hover:text-white transition-colors"}
            >
              {cat}
            </Button>
          ))}
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {filteredArticles.map((article, idx) => (
            <motion.div key={article.title} variants={fadeInUp} className="group cursor-pointer" onClick={() => { setSelectedArticle(article); window.scrollTo({top: 0, behavior: 'smooth'}) }}>
              <Card className="bg-[#111] border border-[#222] rounded-[2.5rem] overflow-hidden hover:border-[#dfff00]/40 transition-all duration-500 h-full flex flex-col hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(223,255,0,0.15)]">
                <div className="h-64 w-full overflow-hidden relative shrink-0" title={article.title}>
                  <img src={article.img} alt={article.title} className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent"></div>
                  <Chip size="sm" className="absolute top-6 left-6 bg-[#dfff00] text-black font-bold uppercase tracking-widest border-none z-10">{article.category}</Chip>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{article.date}</p>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{article.readTime}</p>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#dfff00] transition-colors leading-tight tracking-tight">{article.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">{article.excerpt}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                    <div className="flex items-center gap-3">
                       <Avatar src={article.avatar} size="sm" className="border border-white/10" />
                       <span className="text-sm font-bold text-gray-300">{article.author}</span>
                    </div>
                    <div className="text-sm font-black text-[#dfff00] flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                      Read <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}