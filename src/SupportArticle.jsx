import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@heroui/react";
import { kbCategories, slugify } from './SupportCenter.jsx';

// Lightweight Zero-Dependency Markdown Renderer
const formatText = (text) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={idx} className="text-white font-bold">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const renderMarkdown = (text) => {
  const lines = text.trim().split('\n');
  const elements = [];
  let listItems = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(<ul key={`ul-${elements.length}`} className="list-disc list-inside space-y-3 ml-4 mb-6">{[...listItems]}</ul>);
      listItems = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    if (line.startsWith('## ')) {
      flushList();
      const title = line.replace('## ', '');
      elements.push(<h2 key={i} id={slugify(title)} className="text-2xl font-bold text-white mt-12 mb-6 scroll-mt-32">{title}</h2>);
    } else if (line.startsWith('> ')) {
       flushList();
       elements.push(
         <div key={i} className="bg-[#111] border-l-4 border-[#dfff00] p-6 rounded-r-2xl my-10">
           <p className="text-sm m-0 text-gray-300">{formatText(line.replace('> ', ''))}</p>
         </div>
       );
    } else if (line.startsWith('- ') || line.startsWith('* ') || /^\d+\./.test(line)) {
      const liText = line.replace(/^[-*]\s|^\d+\.\s/, '');
      listItems.push(<li key={i} className="text-gray-300 leading-relaxed">{formatText(liText)}</li>);
    } else {
      flushList();
      elements.push(<p key={i} className="text-gray-300 leading-relaxed mb-6 text-lg">{formatText(line)}</p>);
    }
  }
  flushList();
  return elements;
};

export default function SupportArticle() {
  const { articleSlug } = useParams();
  const [feedback, setFeedback] = useState(null);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Search through all categories to find the matching article by its slug
  let currentArticle = null;
  let currentCategory = null;

  for (const cat of kbCategories) {
    const match = cat.articles.find(a => slugify(a) === articleSlug);
    if (match) {
      currentArticle = match;
      currentCategory = cat;
      break;
    }
  }

  // Reset states and scroll to top when the article changes
  useEffect(() => {
    setFeedback(null);
    setCopied(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [articleSlug]);

  const relatedArticles = currentCategory ? currentCategory.articles.filter(a => a !== currentArticle).slice(0, 2) : [];

  // Simulated Markdown Content (You can eventually fetch this from an API)
  const currentArticleMarkdown = currentArticle ? `
Welcome to the official guide on **${currentArticle}**. This article will walk you through the necessary steps to ensure you have a seamless experience using RUVO and all of our elite training tools.

## Initial Setup
Before you begin, ensure your device is fully updated to the latest OS and firmware. This prevents sync mismatches and connection drops when actively logging a workout.

## Step by Step Instructions
1. Navigate to the **Settings** tab located in the bottom right corner of your RUVO app.
2. Select the option relevant to this guide and toggle the switch to "Enabled".
3. If prompted, grant the necessary permissions (such as Location tracking or Bluetooth access) to allow the app to gather biometric data properly.

> **Pro Tip**
> If you are experiencing sync delays, try restarting your Bluetooth connection. Most synchronization issues are easily resolved by simply toggling your device's connection off and on.

## Troubleshooting
If you followed the steps above and are still encountering issues, please ensure that you are not running any battery-saver modes that might restrict background processes. Our AI coaching models and GPS tracking systems require active background permissions during a workout to be completely accurate.
  ` : "";

  const headings = currentArticleMarkdown.match(/^##\s+(.*)/gm)?.map(h => h.replace('## ', '')) || [];

  // Handle Scroll for ToC
  useEffect(() => {
    const handleScroll = () => {
      let current = "";
      for (const heading of headings) {
        const el = document.getElementById(slugify(heading));
        if (el) {
          const rect = el.getBoundingClientRect();
          // Threshold 250px below the fixed navbar
          if (rect.top <= 250) {
            current = slugify(heading);
          }
        }
      }
      if (current === "" && headings.length > 0) {
        current = slugify(headings[0]); // Default to first if we are at the very top
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings.join(',')]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  if (!currentArticle) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl font-black text-white mb-4">Article Not Found</h2>
        <Button as={RouterLink} to="/support-center" className="bg-[#dfff00] text-black font-bold">Back to Support Center</Button>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative px-6 pb-32 pt-12 overflow-hidden font-['Poppins'] min-h-[80vh]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>
      <div className="max-w-6xl mx-auto relative z-10 flex flex-col lg:flex-row gap-16">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="flex-grow max-w-3xl">
          
          {/* Breadcrumbs */}
          <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-gray-500 mb-10">
            <RouterLink to="/support-center" className="hover:text-[#dfff00] transition-colors">Support Center</RouterLink>
            <span>/</span>
            <RouterLink to={`/support-center/category/${currentCategory.id}`} className="hover:text-[#dfff00] transition-colors">{currentCategory.title}</RouterLink>
            <span>/</span>
            <span className="text-gray-300 truncate max-w-[200px] md:max-w-xs">{currentArticle}</span>
          </div>

          {/* Article Header */}
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6 leading-tight">
            {currentArticle}
          </h1>
          
          <div className="flex items-center gap-4 mb-12 pb-8 border-b border-white/10">
             <div className="flex -space-x-2 shrink-0">
                <img className="w-10 h-10 rounded-full border-2 border-black" src="https://i.pravatar.cc/150?img=11" alt="Author" />
                <img className="w-10 h-10 rounded-full border-2 border-black" src="https://i.pravatar.cc/150?img=12" alt="Author" />
             </div>
             <div className="text-sm text-gray-400 flex-grow">
               Written by <span className="text-white font-bold">RUVO Support Team</span><br />
               <span className="text-xs">Updated 2 days ago &bull; 3 min read</span>
             </div>
             
             {/* Copy Link Action */}
             <div className="shrink-0">
               <Button onPress={handleCopy} size="sm" radius="full" variant="flat" className="bg-white/5 text-gray-300 font-bold hover:bg-white/10 transition-colors">
                 {copied ? (
                   <span className="text-[#dfff00]">Copied!</span>
                 ) : (
                   <><svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg> Copy Link</>
                 )}
               </Button>
             </div>
          </div>

          {/* Rendered Markdown Content */}
          <div className="font-['Poppins'] max-w-none">
            {renderMarkdown(currentArticleMarkdown)}
          </div>

          {/* Feedback Section */}
          <div className="mt-20 pt-12 border-t border-white/10 text-center">
            <h4 className="text-xl font-bold text-white mb-6">Was this article helpful?</h4>
            {feedback ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-[#dfff00] font-bold bg-[#dfff00]/10 py-3 px-8 rounded-full inline-block">
                Thanks for your feedback! It helps us improve.
              </motion.div>
            ) : (
              <div className="flex items-center justify-center gap-4">
                <Button onPress={() => setFeedback('yes')} radius="full" variant="bordered" className="text-white border-white/20 hover:bg-white/10 font-bold px-10 py-6 text-base">
                  <svg className="w-5 h-5 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg> Yes
                </Button>
                <Button onPress={() => setFeedback('no')} radius="full" variant="bordered" className="text-white border-white/20 hover:bg-white/10 font-bold px-10 py-6 text-base">
                  <svg className="w-5 h-5 mr-1 text-red-500 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg> No
                </Button>
              </div>
            )}
          </div>

          {/* Contact Support Escalation */}
          <div className="mt-12 bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-[#222] rounded-3xl p-8 text-center flex flex-col items-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[#dfff00]/5 blur-[60px] pointer-events-none"></div>
            <h4 className="text-xl font-black text-white mb-2 relative z-10">Still need help?</h4>
            <p className="text-gray-400 text-sm mb-6 max-w-sm relative z-10">Our dedicated support team is always ready to assist you directly.</p>
            <Button as={RouterLink} to="/support" radius="full" className="bg-white/10 text-white font-bold border border-white/20 hover:bg-white/20 hover:scale-105 transition-all relative z-10">
              Open Support Ticket
            </Button>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-16 pt-12 border-t border-white/10">
              <h3 className="text-2xl font-black tracking-tight text-white mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedArticles.map((article, idx) => (
                  <RouterLink key={idx} to={`/support-center/article/${slugify(article)}`} className="bg-[#111] border border-[#222] p-6 rounded-2xl hover:border-[#dfff00]/50 transition-colors group flex items-center justify-between">
                    <h4 className="text-gray-300 font-bold group-hover:text-[#dfff00] transition-colors text-sm pr-4">{article}</h4>
                    <svg className="w-5 h-5 text-gray-600 group-hover:text-[#dfff00] transform group-hover:translate-x-1 transition-all shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                  </RouterLink>
                ))}
              </div>
            </div>
          )}

        </motion.div>

        {/* Right Sidebar - Animated ToC */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-32">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">On this page</h4>
            <ul className="space-y-3">
              {headings.map((heading, idx) => {
                const id = slugify(heading);
                const isActive = activeSection === id;
                return (
                  <li key={idx}>
                    <a
                      href={`#${id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(id);
                          if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
                      }}
                      className={`block text-sm transition-all duration-300 border-l-2 pl-4 py-1 ${
                        isActive
                          ? 'border-[#dfff00] text-[#dfff00] font-bold'
                          : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {heading}
                    </a>
                  </li>
                );
              })}
            </ul>
            
            {/* Sidebar Help Widget */}
            <div className="mt-12 bg-[#111] border border-[#222] rounded-2xl p-6 text-center">
              <svg className="w-8 h-8 text-[#dfff00] mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              <h5 className="text-sm font-bold text-white mb-2">Need more help?</h5>
              <p className="text-xs text-gray-400 mb-4 leading-relaxed">Our support team is online and ready to assist.</p>
              <Button as={RouterLink} to="/support" size="sm" radius="full" className="bg-white/10 text-white font-bold w-full hover:bg-white/20 transition-colors">Contact Support</Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}