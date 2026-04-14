import React, { useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, Button } from "@heroui/react";
import { kbCategories, slugify } from './SupportCenter.jsx';

export default function SupportCategory() {
  const { categoryId } = useParams();
  const category = kbCategories.find(c => c.id === categoryId);
  const [copiedArticleSlug, setCopiedArticleSlug] = useState(null);

  const handleCopyLink = (articleSlug) => {
    const url = `${window.location.origin}/support-center/article/${articleSlug}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedArticleSlug(articleSlug);
      setTimeout(() => {
        setCopiedArticleSlug(null);
      }, 2000);
    });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

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
                <Card className="bg-[#111] border border-[#222] p-4 pr-2 rounded-2xl transition-all duration-300 group">
                  <div className="flex flex-row items-center justify-between">
                    <RouterLink to={`/support-center/article/${slugify(article)}`} className="flex-grow p-2">
                      <h3 className="text-lg font-bold text-gray-200 group-hover:text-[#dfff00] transition-colors">{article}</h3>
                    </RouterLink>
                    <Button 
                      variant="flat" 
                      size="sm" 
                      onPress={() => handleCopyLink(slugify(article))}
                      className="bg-[#1a1a1a] hover:bg-[#222] text-gray-400 font-bold border border-[#333] ml-4 shrink-0"
                    >
                      {copiedArticleSlug === slugify(article) ? 'Copied!' : 'Copy Link'}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}