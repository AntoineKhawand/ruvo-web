import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, Button } from "@heroui/react";
import { kbCategories, slugify } from './SupportCenter.jsx';

export default function SupportCategory() {
  const { categoryId } = useParams();
  // Find the category via the ID passed in the URL parameter
  const category = kbCategories.find(c => c.id === categoryId);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  // Fallback in case the category URL doesn't match our data
  if (!category) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl font-black text-white mb-4">Category Not Found</h2>
        <Button as={RouterLink} to="/support-center" className="bg-[#dfff00] text-black font-bold">Back to Support Center</Button>
      </div>
    );
  }

  return (
    <div className="relative px-6 pb-24 pt-12 overflow-hidden font-['Poppins'] min-h-[80vh]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#dfff00]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          
          <RouterLink to="/support-center" className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-[#dfff00] transition-colors mb-10">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Knowledge Base
          </RouterLink>

          <div className="flex items-center gap-5 mb-12">
            <div className="w-16 h-16 bg-[#111] border border-[#222] rounded-2xl flex items-center justify-center shadow-lg shrink-0">
              <svg className="w-8 h-8 text-[#dfff00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={category.icon} />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white">{category.title}</h1>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {category.articles.map((article, idx) => (
              <motion.div key={idx} variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: idx * 0.05 }}>
                <Card as={RouterLink} to={`/support-center/article/${slugify(article)}`} className="bg-[#111] border border-[#222] p-6 rounded-2xl hover:border-[#dfff00]/50 transition-all duration-300 group flex flex-row items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h3 className="text-lg font-bold text-gray-200 group-hover:text-[#dfff00] transition-colors">{article}</h3>
                  </div>
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-[#dfff00] transform group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}