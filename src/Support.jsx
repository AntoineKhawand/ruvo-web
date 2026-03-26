import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button, Input, Textarea } from "@heroui/react";
import emailjs from '@emailjs/browser';

function FaqItem({ faq }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-6 text-left transition-colors hover:text-[#dfff00]"
      >
        <span className="font-bold text-lg text-white">{faq.q}</span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="w-5 h-5 text-gray-400 shrink-0 ml-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-400 leading-relaxed">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const faqs = [
  { q: "How do I pair my Garmin or Apple Watch?", a: "Navigate to Settings > Connected Devices in the RUVO app and follow the on-screen instructions to authorize data sync." },
  { q: "How do I cancel my Elite subscription?", a: "You can manage your subscription directly through the App Store or Google Play Store settings on your device." },
  { q: "Why is my GPS tracking inaccurate?", a: "Ensure RUVO has 'Always On' location permissions and that you are not in battery-saving mode, which can restrict background location updates." },
  { q: "Can I switch my training plan midway?", a: "Yes, head to your Active Plan and select 'Modify Plan'. Our AI will adjust the remaining weeks based on your new goals." }
];

const topics = [
  { title: "Getting Started", categoryId: "other", icon: "M13 10V3L4 14h7v7l9-11h-7z", desc: "Setting up your profile, finding routes, and your first run." },
  { title: "Account & Billing", categoryId: "account", icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z", desc: "Manage your Elite subscription and account settings." },
  { title: "Device Sync", categoryId: "devices", icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z", desc: "Troubleshooting Apple Watch, Garmin, and Coros connections." },
  { title: "Training Plans", categoryId: "workouts", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01", desc: "How AI coaching works and modifying active schedules." }
];

export default function Support() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const [formStatus, setFormStatus] = useState("idle");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const formRef = useRef(null);

  const filteredFaqs = faqs.filter(faq => 
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTopicClick = (categoryId) => {
    setSelectedCategory(categoryId);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("submitting");

    const templateParams = {
      from_name: name,
      reply_to: email,
      category: selectedCategory || 'General Inquiry',
      message: message,
    };

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ).then(() => {
        setFormStatus("success");
        setName("");
        setEmail("");
        setMessage("");
        setSelectedCategory("");
    }).catch((error) => {
        console.error('EmailJS Error:', error);
        setFormStatus("idle");
        alert("Failed to send message. Please try again.");
    });
  };

  return (
    <div className="relative px-4 md:px-6 pb-16 md:pb-24 pt-8 md:pt-12 overflow-hidden font-['Poppins']">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#dfff00]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-20 max-w-3xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#dfff00]">Support Center</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mt-2 mb-6">
            How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dfff00] to-lime-500">help?</span>
          </h1>
          <div className="relative max-w-xl mx-auto mt-8">
            <svg className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for articles, guides, or troubleshooting..." 
              className="w-full bg-[#111] border border-[#222] rounded-full py-5 pl-14 pr-6 text-white placeholder-gray-500 focus:outline-none focus:border-[#dfff00]/50 focus:ring-1 focus:ring-[#dfff00]/50 transition-all shadow-xl"
            />
          </div>
        </motion.div>

        {/* Topics Grid */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-24">
          {topics.map((topic, idx) => (
            <motion.div key={idx} variants={fadeInUp} className="h-full" onClick={() => handleTopicClick(topic.categoryId)}>
              <Card className="bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-[#222] p-6 md:p-8 h-full rounded-3xl hover:border-[#dfff00]/40 transition-all duration-500 group cursor-pointer hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(223,255,0,0.1)]">
                <div className="w-12 h-12 bg-[#222] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#dfff00] transition-colors duration-500 shadow-lg">
                    <svg className="w-6 h-6 text-[#dfff00] group-hover:text-black transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={topic.icon} />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-[#dfff00] transition-colors">{topic.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{topic.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form & FAQ Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16" ref={formRef}>
          
          {/* Contact Form */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <div className="mb-6 md:mb-8 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4 text-white">Submit a <span className="text-[#dfff00]">Request.</span></h2>
              <p className="text-gray-400 leading-relaxed">Fill out the form below and our dedicated athlete support team will get back to you within 2-4 hours.</p>
            </div>
            
            <Card className="bg-[#111] border border-[#222] p-6 md:p-10 rounded-3xl shadow-2xl">
              {formStatus === "success" ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                  <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400">We've received your request and will be in touch shortly.</p>
                  <Button onPress={() => setFormStatus("idle")} className="mt-8 bg-white/10 text-white font-bold px-8 hover:bg-white/20" radius="full">Send Another</Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input isRequired label="Your Name" value={name} onValueChange={setName} placeholder="e.g. John Doe" classNames={{ inputWrapper: "bg-[#222] group-data-[focus=true]:bg-[#333] border-none", label: "text-gray-400 font-bold" }} />
                    <Input isRequired type="email" label="Email Address" value={email} onValueChange={setEmail} placeholder="runner@example.com" classNames={{ inputWrapper: "bg-[#222] group-data-[focus=true]:bg-[#333] border-none", label: "text-gray-400 font-bold" }} />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">How can we help?</label>
                    <div className="relative">
                      <select 
                        required 
                        value={selectedCategory} 
                        onChange={(e) => setSelectedCategory(e.target.value)} 
                        className="w-full bg-[#222] hover:bg-[#2a2a2a] text-white text-sm rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#dfff00]/50 appearance-none cursor-pointer transition-colors border border-transparent"
                      >
                        <option value="" disabled hidden>Select an issue...</option>
                        <option value="account">Account & Billing</option>
                        <option value="devices">Device Integration</option>
                        <option value="workouts">Workouts & Analytics</option>
                        <option value="bug">Report a Bug</option>
                        <option value="other">Other Inquiry</option>
                      </select>
                      <svg className="w-5 h-5 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>

                  <Textarea isRequired label="Message" value={message} onValueChange={setMessage} placeholder="Please provide as much detail as possible..." minRows={5} classNames={{ inputWrapper: "bg-[#222] group-data-[focus=true]:bg-[#333] border-none", label: "text-gray-400 font-bold" }} />
                  
                  <Button type="submit" isLoading={formStatus === "submitting"} radius="full" size="lg" className="bg-[#dfff00] text-black font-bold mt-2 w-full text-base shadow-[0_0_20px_rgba(223,255,0,0.2)] hover:scale-[1.02] transition-transform">
                    {formStatus === "submitting" ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </Card>
          </motion.div>

          {/* Quick FAQ */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <div className="mb-6 md:mb-8 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4 text-white">Popular <span className="text-gray-500">Answers.</span></h2>
              <p className="text-gray-400 leading-relaxed">Quick solutions to our most frequently asked questions.</p>
            </div>
            <div className="border-t border-white/10">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, idx) => (
                  <FaqItem key={idx} faq={faq} />
                ))
              ) : (
                <p className="text-gray-500 py-6 text-sm">No articles found matching "{searchQuery}". Try another term or submit a request using the form.</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}