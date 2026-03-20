import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, Avatar, Button, Progress, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input, Textarea, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";

// --- STAR RATING COMPONENT ---
const StarRating = ({ count = 5 }) => (
  <div className="flex gap-1 text-[#dfff00]">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className={`w-4 h-4 fill-current ${i >= count ? 'opacity-30' : ''}`} viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

// --- INTERACTIVE STAR RATING COMPONENT ---
const InteractiveStarRating = ({ rating, setRating }) => (
  <div className="flex gap-2 text-[#dfff00]">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg key={star} onClick={() => setRating(star)} className={`w-8 h-8 cursor-pointer transition-transform hover:scale-110 fill-current ${star > rating ? 'opacity-30' : ''}`} viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

// --- MOCK DATA ---
const initialReviewsData = [
  {
    id: 1,
    name: "Elie Khoury",
    handle: "@elie_k",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    date: "2 days ago",
    content: "The pacing insights completely changed how I train for marathons. The UI is incredibly intuitive and the dark mode is gorgeous during early morning runs.",
    tags: ["Marathon Training", "UI/UX"],
    source: "app-store",
    verified: true,
    helpfulCount: 124
  },
  {
    id: 2,
    name: "Layal Saad",
    handle: "@layal_s",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    date: "1 week ago",
    content: "AI coaching that actually feels human. It adapted my plan when I missed a few days due to sickness. Never seen another app do this so flawlessly.",
    tags: ["AI Coaching", "Adaptive Plans"],
    source: "google-play",
    verified: true,
    helpfulCount: 89
  },
  {
    id: 3,
    name: "Ziad Haddad",
    handle: "@ziad_runs",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    rating: 4,
    date: "2 weeks ago",
    content: "Unreal GPS accuracy in the city. Usually tall buildings mess up my tracking, but RUVO locks on perfectly. Giving 4 stars only because I want more widget options.",
    tags: ["GPS", "Accuracy"],
    source: "app-store",
    verified: false,
    helpfulCount: 42
  },
  {
    id: 4,
    name: "Nour Abboud",
    handle: "@nour_a",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    date: "1 month ago",
    content: "Best community features in the game. The leaderboards are motivating without being toxic, and I love the route sharing feature!",
    tags: ["Community", "Routes"],
    source: "app-store",
    verified: true,
    helpfulCount: 215
  },
  {
    id: 5,
    name: "Rami Fares",
    handle: "@rami_fares",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 5,
    date: "1 month ago",
    content: "The dashboard is beautiful. Having all my elite analytics (VO2 Max, ground contact time) synced directly from my Garmin makes this my central hub.",
    tags: ["Analytics", "Garmin Sync"],
    source: "google-play",
    verified: true,
    helpfulCount: 156
  },
  {
    id: 6,
    name: "Yasmina Nasr",
    handle: "@yasmina_n",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    rating: 5,
    date: "2 months ago",
    content: "10x faster training progression. The personalized insights tell me exactly when to push and when to recover. Haven't had an injury since I started using it.",
    tags: ["Recovery", "Insights"],
    source: "google-play",
    verified: true,
    helpfulCount: 310
  },
  {
    id: 7,
    name: "Karim Chahine",
    handle: "@karim_c",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    rating: 5,
    date: "2 months ago",
    content: "Upgraded to Elite and never looked back. Exporting my workouts directly into my Coros watch seamlessly is a game changer.",
    tags: ["Elite", "Coros Integration"],
    source: "app-store",
    verified: true,
    helpfulCount: 78
  },
  {
    id: 8,
    name: "Rima Mansour",
    handle: "@rima_m",
    avatar: "https://randomuser.me/api/portraits/women/24.jpg",
    rating: 4,
    date: "3 months ago",
    content: "The gear tracker is fantastic. It literally reminded me to switch out my Alphaflys right before they lost their pop.",
    tags: ["Gear Tracker", "Shoes"],
    source: "google-play",
    verified: false,
    helpfulCount: 33
  },
  {
    id: 9,
    name: "Tarek Zakhour",
    handle: "@tarek_z",
    avatar: "https://randomuser.me/api/portraits/men/66.jpg",
    rating: 5,
    date: "3 months ago",
    content: "Finally, an app that doesn't drain my phone battery during a 3-hour long run. Incredible optimization.",
    tags: ["Battery Life", "Long Runs"],
    source: "app-store",
    verified: true,
    helpfulCount: 198
  },
  {
    id: 10,
    name: "Lea Karam",
    handle: "@lea_k",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    rating: 5,
    date: "4 months ago",
    content: "The custom plan builder is an absolute lifesaver. It automatically adjusted my mileage when I felt a slight twinge in my knee.",
    tags: ["Plan Builder", "Injury Prevention"],
    source: "app-store",
    verified: true,
    helpfulCount: 145
  },
  {
    id: 11,
    name: "Jad Aoun",
    handle: "@jad_a",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    rating: 5,
    date: "4 months ago",
    content: "Incredible integration with my Apple Health data. Everything syncs flawlessly in the background.",
    tags: ["Apple Health", "Sync"],
    source: "google-play",
    verified: true,
    helpfulCount: 67
  },
  {
    id: 12,
    name: "Maya Daher",
    handle: "@maya_d",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    rating: 4,
    date: "5 months ago",
    content: "Gorgeous interface and dark mode. I just wish there were slightly more social features for finding local running clubs.",
    tags: ["UI/UX", "Clubs"],
    source: "app-store",
    verified: false,
    helpfulCount: 22
  },
  {
    id: 13,
    name: "Omar Kanaan",
    handle: "@omar_k",
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    rating: 5,
    date: "5 months ago",
    content: "This app literally helped me qualify for Boston. The structured tempo workouts and audio cues are phenomenal.",
    tags: ["BQ", "Audio Cues"],
    source: "google-play",
    verified: true,
    helpfulCount: 305
  },
  {
    id: 14,
    name: "Celine Nader",
    handle: "@celine_n",
    avatar: "https://randomuser.me/api/portraits/women/56.jpg",
    rating: 5,
    date: "6 months ago",
    content: "Switched from Strava and couldn't be happier. The data analytics here are much deeper without feeling overwhelming.",
    tags: ["Analytics", "Migration"],
    source: "app-store",
    verified: true,
    helpfulCount: 184
  },
  {
    id: 15,
    name: "Fadi Rizk",
    handle: "@fadi_r",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 5,
    date: "6 months ago",
    content: "Never crashes, incredibly reliable tracking even when I'm deep in the woods on trail runs.",
    tags: ["Reliability", "Trails"],
    source: "google-play",
    verified: true,
    helpfulCount: 92
  }
];

export default function Reviews() {
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('ruvo_reviews_v6');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return initialReviewsData;
  });

  useEffect(() => {
    localStorage.setItem('ruvo_reviews_v6', JSON.stringify(reviews));
  }, [reviews]);

  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [visibleCounts, setVisibleCounts] = useState({
    'all': 6,
    'app-store': 6,
    'google-play': 6
  });
  const [voted, setVoted] = useState({});
  
  // Modal state for leaving a review
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newRating, setNewRating] = useState(5);
  const [newName, setNewName] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newAvatar, setNewAvatar] = useState("");

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  // Advanced Filtering & Sorting Logic
  let processedReviews = [...reviews];

  // 1. Filter by source (Tab)
  processedReviews = processedReviews.filter(r => activeFilter === "all" || r.source === activeFilter);

  // 3. Sort
  if (sortBy === "highest") {
    processedReviews.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "lowest") {
    processedReviews.sort((a, b) => a.rating - b.rating);
  } // "newest" keeps original prepended array order

  // Pagination
  const visibleCount = Math.min(visibleCounts[activeFilter], processedReviews.length);
  const displayedReviews = processedReviews.slice(0, visibleCount);
  const hasMore = visibleCount < processedReviews.length;

  const handleFilter = (filter) => {
    setActiveFilter(filter);
  };

  const handleHelpfulVote = (id) => {
    if (voted[id]) return; // Prevent multiple votes
    setReviews(reviews.map(r => r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r));
    setVoted(prev => ({ ...prev, [id]: true }));
  };

  const handleSubmitReview = (onClose) => {
    if (!newName || !newContent) return; // Simple validation
    const assignedSource = activeFilter === 'all' ? 'app-store' : activeFilter; // Auto-tag to current view

    const newReview = {
      id: Date.now(),
      name: newName,
      handle: "@" + newName.toLowerCase().replace(/\s+/g, ''),
      avatar: newAvatar || `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 90)}.jpg`, // Assign uploaded or random realistic avatar
      rating: newRating,
      date: "Just now",
      content: newContent,
      tags: ["Community", "Verified"],
      source: assignedSource,
      verified: true,
      helpfulCount: 0
    };
    setReviews([newReview, ...reviews]);
    setVisibleCounts(prev => ({
      ...prev,
      'all': prev['all'] + 1,
      [assignedSource]: prev[assignedSource] + 1
    }));
    onClose();
    // Reset form
    setNewName("");
    setNewContent("");
    setNewRating(5);
    setNewAvatar("");
  };

  return (
    <div className="relative px-6 pb-24 pt-12 overflow-hidden font-['Poppins']">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#dfff00]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div 
          initial="hidden" animate="visible" variants={fadeInUp}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16"
        >
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#dfff00]">Community</span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter mt-2 mb-6">
              Wall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-700">Love.</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Don't just take our word for it. See what thousands of athletes worldwide are saying about their training experience with RUVO.
            </p>
          </div>
          
          <div className="bg-[#111] border border-[#222] rounded-3xl p-6 flex items-center gap-8 w-full sm:w-auto sm:min-w-[300px] shadow-2xl">
            <div>
              <div className="text-5xl font-black text-white mb-2">4.9</div>
              <StarRating count={5} />
              <div className="text-sm text-gray-500 font-bold uppercase tracking-widest mt-2">Out of 5</div>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>5</span> <Progress value={92} size="sm" classNames={{ indicator: "bg-[#dfff00]", track: "bg-[#222]" }} />
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>4</span> <Progress value={6} size="sm" classNames={{ indicator: "bg-[#dfff00]", track: "bg-[#222]" }} />
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>3</span> <Progress value={1} size="sm" classNames={{ indicator: "bg-[#dfff00]", track: "bg-[#222]" }} />
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>2</span> <Progress value={0} size="sm" classNames={{ indicator: "bg-[#dfff00]", track: "bg-[#222]" }} />
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>1</span> <Progress value={1} size="sm" classNames={{ indicator: "bg-[#dfff00]", track: "bg-[#222]" }} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Bar */}
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10 border-b border-white/10 pb-6">
          <div className="flex flex-wrap gap-3">
            <Chip 
              radius="full" 
              variant={activeFilter === 'all' ? "solid" : "bordered"} 
              onClick={() => handleFilter('all')}
              className={`${activeFilter === 'all' ? 'bg-white text-black' : 'border-white/20 text-gray-400 hover:text-white hover:border-white/40'} font-bold cursor-pointer transition-colors`}
            >
              All Reviews
            </Chip>
            <Chip 
              radius="full" 
              variant={activeFilter === 'app-store' ? "solid" : "bordered"} 
              onClick={() => handleFilter('app-store')}
              className={`${activeFilter === 'app-store' ? 'bg-white text-black' : 'border-white/20 text-gray-400 hover:text-white hover:border-white/40'} font-bold cursor-pointer transition-colors`}
            >
              App Store
            </Chip>
            <Chip 
              radius="full" 
              variant={activeFilter === 'google-play' ? "solid" : "bordered"} 
              onClick={() => handleFilter('google-play')}
              className={`${activeFilter === 'google-play' ? 'bg-white text-black' : 'border-white/20 text-gray-400 hover:text-white hover:border-white/40'} font-bold cursor-pointer transition-colors`}
            >
              Google Play
            </Chip>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:flex-1 justify-end">
            <Dropdown classNames={{ content: "bg-[#111] border border-[#222] w-full min-w-[200px]" }}>
              <DropdownTrigger>
                  <Button variant="bordered" radius="full" size="sm" className="text-gray-300 border-white/20 hover:bg-white/5 hover:text-white transition-colors w-full sm:w-[180px] justify-between">
                  <span className="flex items-center gap-1">Sort: <span className="text-white font-bold">{sortBy === 'newest' ? 'Newest' : sortBy === 'highest' ? 'Highest Rated' : 'Lowest Rated'}</span></span>
                  <svg className="w-3 h-3 ml-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="Sort Options" 
                selectionMode="single"
                disallowEmptySelection
                selectedKeys={new Set([sortBy])}
                onSelectionChange={(keys) => setSortBy(Array.from(keys)[0])}
                itemClasses={{
                  base: "text-gray-300 data-[hover=true]:bg-white/10 data-[hover=true]:text-white",
                }}
              >
                <DropdownItem key="newest">Newest</DropdownItem>
                <DropdownItem key="highest">Highest Rated</DropdownItem>
                <DropdownItem key="lowest">Lowest Rated</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Button onPress={onOpen} radius="full" size="sm" className="bg-[#dfff00] text-black font-bold hover:scale-105 transition-transform px-5 w-full sm:w-auto shrink-0">
              Leave a Review
            </Button>
          </div>
        </motion.div>

            {/* Reviews Grid */}
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                {displayedReviews.map((review, idx) => (
                  <motion.div 
                    key={`${activeFilter}-${idx}`} 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true, margin: "-20px" }}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: (idx % 6) * 0.1, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    className="h-full"
                  >
                    <Card className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-[#222] p-8 h-full hover:border-[#dfff00]/30 transition-all duration-500 rounded-3xl group hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(223,255,0,0.1)] flex flex-col">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-4">
                          <Avatar src={review.avatar} className="border-2 border-[#222] group-hover:border-[#dfff00]/50 transition-colors" />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="font-bold text-white text-sm">{review.name}</h4>
                              {review.verified && (
                                <svg className="w-3.5 h-3.5 text-[#dfff00]" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <p className="text-xs text-gray-500">{review.handle}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <StarRating count={review.rating} />
                          <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{review.date}</span>
                        </div>
                      </div>

                      <p className="text-gray-300 text-[15px] leading-relaxed mb-8 flex-grow">
                        "{review.content}"
                      </p>

                      <div className="flex justify-between items-center mt-auto pt-6 border-t border-white/5">
                        <div className="flex flex-wrap gap-2">
                          {review.tags.map((tag, i) => (
                            <Chip key={i} size="sm" className="bg-white/5 border border-white/10 text-gray-400 text-[10px] font-bold uppercase tracking-wider group-hover:border-white/20 transition-colors">
                              {tag}
                            </Chip>
                          ))}
                        </div>
                        <button 
                          onClick={() => handleHelpfulVote(review.id)}
                          className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${voted[review.id] ? 'text-[#dfff00]' : 'text-gray-500 hover:text-white'}`}
                        >
                          <svg className="w-4 h-4" fill={voted[review.id] ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg>
                          {review.helpfulCount}
                        </button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
              
              {/* Black fade overlay at the bottom if there are more reviews to load */}
              {hasMore && (
                <div className="absolute -bottom-6 left-0 right-0 h-48 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent pointer-events-none z-20"></div>
              )}
            </div>

            {/* Load More CTA */}
            {processedReviews.length === 0 ? (
              <div className="text-center text-gray-500 py-12 font-medium">No reviews found matching your search.</div>
            ) : hasMore && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mt-12 text-center relative z-30">
                <Button onPress={() => setVisibleCounts(prev => ({ ...prev, [activeFilter]: prev[activeFilter] + 6 }))} radius="full" size="lg" variant="bordered" className="text-white border-white/20 font-bold px-12 hover:bg-white/10 transition-colors">
                  Load More Reviews
                </Button>
              </motion.div>
            )}

          </div>

          {/* Write a Review Modal */}
          <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} placement="center" classNames={{ base: "bg-[#111] border border-[#333] text-white font-['Poppins']" }}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Write a Review</ModalHeader>
                  <ModalBody>
                    <div className="flex flex-col gap-5 mt-2">
                      <div>
                        <p className="text-sm font-bold text-gray-400 mb-2">Overall Rating</p>
                        <InteractiveStarRating rating={newRating} setRating={setNewRating} />
                      </div>
                      <Input 
                        label="Your Name" 
                        placeholder="e.g. John Doe" 
                        value={newName} 
                        onValueChange={setNewName}
                        classNames={{ inputWrapper: "bg-[#222] group-data-[focus=true]:bg-[#333]" }} 
                      />
                      <div className="flex flex-col gap-1.5">
                        <span className="text-sm font-bold text-gray-400">Profile Picture (Optional)</span>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => setNewAvatar(reader.result);
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#dfff00]/10 file:text-[#dfff00] hover:file:bg-[#dfff00]/20 cursor-pointer bg-[#222] p-1.5 rounded-2xl border border-[#333] transition-colors hover:border-[#444]"
                        />
                      </div>
                      <Textarea 
                        label="Your Review" 
                        placeholder="How has RUVO changed your training?" 
                        minRows={4} 
                        value={newContent} 
                        onValueChange={setNewContent}
                        classNames={{ inputWrapper: "bg-[#222] group-data-[focus=true]:bg-[#333]" }} 
                      />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>Cancel</Button>
                    <Button className="bg-[#dfff00] text-black font-bold" onPress={() => handleSubmitReview(onClose)} isDisabled={!newName || !newContent}>
                      Post Review
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      );
    }
