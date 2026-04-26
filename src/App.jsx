import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { JsonLd } from "./JsonLd";
gsap.registerPlugin(ScrollTrigger);
import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button,
  Card, Progress, Avatar, AvatarGroup, Chip, Image,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input, Textarea
} from "@heroui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

// --- DYNAMIC COUNTER COMPONENT ---
function AnimatedNumber({ value, suffix = "", decimals = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(0, value, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = latest.toFixed(decimals) + suffix;
          }
        }
      });
    }
  }, [isInView, value, decimals, suffix]);

  return <span ref={ref} className="font-black">0{suffix}</span>;
}

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

// --- INFINITE MARQUEE ROW COMPONENT ---
const TestimonialRow = ({ items, direction = 1, speed = 40 }) => {
  return (
    <div className="flex overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <motion.div
        className="flex gap-3 w-max py-2 pr-3"
        animate={{ x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
      >
        {[...items, ...items, ...items, ...items, ...items, ...items].map((test, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] pl-1.5 pr-5 py-1.5 rounded-full w-max shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] hover:border-[#dfff00]/30 transition-colors"
          >
            <Avatar src={test.img} size="sm" className="shrink-0 border border-[#dfff00]/20" />
            <p className="text-[13px] text-[#d4d4d4] font-medium whitespace-nowrap">
              {test.text}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// --- DEVICE LOGOS MARQUEE ---
const DeviceMarquee = ({ items, direction = 1, speed = 40 }) => {
  return (
    <div className="flex overflow-hidden w-full relative">
      <motion.div
        className="flex gap-12 items-center w-max py-4 pr-12"
        animate={{ x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
      >
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center justify-center gap-3 min-w-[140px] h-14 transition-colors px-6 py-2 group">
            <img
              src={item.logoUrl}
              alt={item.name}
              className={`${item.imgClass || 'h-8'} w-auto object-contain brightness-0 invert opacity-70 group-hover:opacity-100 transition-all duration-300 drop-shadow-md`}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            {item.showText && (
              <span className="text-xl font-bold text-white opacity-70 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md tracking-tight">
                {item.name}
              </span>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// --- FAQ DATA & COMPONENT ---
const faqs = [
  { question: "Is RUVO free to download?", answer: "Yes! RUVO is completely free to download and use with core features including GPS tracking, basic analytics, and community access. For advanced features like AI coaching, detailed performance analytics, and custom training plans, you can upgrade to RUVO Pro." },
  { question: "Can I track my runs using just my phone?", answer: "Absolutely. You can record activities directly in the RUVO app using your phone's GPS. When you are ready, just tap the record button, choose your activity type, and start running. For enhanced accuracy, you can also pair a smartwatch or external GPS device." },
  { question: "Which devices does RUVO support?", answer: "RUVO integrates seamlessly with Apple Watch and Health Connect on Android. This means you can sync data from any wearable that supports Apple Health or Google Health, including Garmin, Fitbit, Samsung Galaxy Watch, Polar, Suunto, Coros, and WHOOP." },
  { question: "How accurate is the GPS tracking?", answer: "RUVO utilizes high-precision GPS tracking (GPS, GLONASS, Galileo) combined with signal filtering to deliver reliable pacing and distance data. When paired with a compatible smartwatch, accuracy is further enhanced by leveraging wrist-based positioning sensors." },
  { question: "Can I follow custom training plans?", answer: "Yes. RUVO offers AI-powered training plans that adapt to your goals, fitness level, and schedule. Choose from pre-built plans for 5K, 10K, Half Marathon, Marathon, and Ultra distances, or build a fully custom plan with our Plan Builder tool." },
  { question: "Who can see my activities and data?", answer: "You control your privacy on RUVO. You can share runs with the community, keep them visible only to followers, or set your entire profile to private. You can also hide specific details like pace, location start/end points, and heart rate data from individual activities." },
  { question: "What makes RUVO different from Strava or Nike Run Club?", answer: "RUVO combines the best of both worlds: the data-driven analytics and social features of Strava with the editorial, motivational design of Nike. Plus, we add AI-powered coaching, customizable training plans, and health integration that adapts to your unique physiology and goals." },
];

function FaqItem({ faq, index }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);
  const chevronRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (open) {
      gsap.set(el, { height: "auto", overflow: "hidden" });
      gsap.from(el, { height: 0, duration: 0.4, ease: "power3.out" });
    } else {
      gsap.to(el, { height: 0, duration: 0.35, ease: "power3.in", overflow: "hidden" });
    }
    gsap.to(chevronRef.current, { rotation: open ? 180 : 0, duration: 0.35, ease: "power2.inOut" });
  }, [open]);

  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-6 text-left transition-colors hover:text-[#dfff00]"
      >
        <span className="text-base font-bold text-white sm:text-lg">{faq.question}</span>
        <svg ref={chevronRef} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 w-5 h-5 ${open ? "text-[#dfff00]" : "text-gray-400"}`}>
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div ref={contentRef} className="overflow-hidden" style={{ height: 0 }}>
        <p className="pb-6 text-sm leading-relaxed text-gray-400 sm:text-base sm:leading-relaxed">
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

// --- MAIN APP COMPONENT ---
export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  // Modal states
  const { isOpen: isPlanOpen, onOpen: onPlanOpen, onOpenChange: onPlanOpenChange } = useDisclosure();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Pause Lenis when the modal is open so scroll doesn't fight the overlay
  useEffect(() => {
    if (isPlanOpen) {
      window.lenis?.stop();
    } else {
      window.lenis?.start();
    }
  }, [isPlanOpen]);

  // Lazy-load hero video after page is interactive to keep it off the critical path
  useEffect(() => {
    if (!videoRef.current) return;
    const vid = videoRef.current;
    const load = () => { if (!vid.src) { vid.src = '/video.mp4'; vid.load(); } };
    if (document.readyState === 'complete') {
      load();
    } else {
      window.addEventListener('load', load, { once: true });
      return () => window.removeEventListener('load', load);
    }
  }, []);

  // GSAP hero entrance timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.12,
        delay: 0.2,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // GSAP ScrollTrigger batch — handles all scroll-reveal elements
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch("[data-gsap-reveal]", {
        onEnter: (els) =>
          gsap.from(els, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
          }),
        once: true,
        start: "top 88%",
      });

      // GSAP bar chart animation
      const barsContainer = document.querySelector("[data-gsap-bars]");
      if (barsContainer) {
        const bars = barsContainer.querySelectorAll("[data-gsap-bar-height]");
        gsap.to(bars, {
          height: (i, el) => el.getAttribute("data-gsap-bar-height"),
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: barsContainer,
            start: "top 85%",
            once: true,
          },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  // Premium, buttery-smooth custom easing curve for UI elements
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const drawChart = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1, opacity: 1,
      transition: { pathLength: { duration: 2.5, ease: "easeInOut", delay: 0.2 }, opacity: { duration: 0.8 } }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  };

  const featuresList = [
    {
      title: "Precision Tracking", desc: "High-precision GPS with real-time signal filtering. Live pace, elevation, and cadence on every run.", stat: "High", statLabel: "GPS PRECISION",
      iconPath: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></>
    },
    {
      title: "Advanced Analytics", desc: "Visual performance breakdowns with VO2 max estimates, training load, and recovery insights.", stat: "50+", statLabel: "DATA METRICS",
      iconPath: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></>
    },
    {
      title: "Community", desc: "Join challenges, share routes, and celebrate PRs with a global network of runners.", stat: "2M+", statLabel: "RUNNERS",
      iconPath: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></>
    },
    {
      title: "Smart Coaching", desc: "AI-driven training plans that adapt to your performance and recovery patterns.", stat: "24/7", statLabel: "ADAPTIVE",
      iconPath: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></>
    },
    {
      title: "Health Sync", desc: "Seamless integration with Apple Health, Google Fit, and Garmin for complete health data.", stat: "100+", statLabel: "DEVICES",
      iconPath: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></>
    },
    {
      title: "Gamified Rewards", desc: "Earn XP and Coins after every run. Redeem them for physical rewards exclusively at local Lebanese health brands and fitness stores.", stat: "Local", statLabel: "REWARDS",
      iconPath: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></>
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer }
    }))
  };

  const homePageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://ruvo.app/#webpage",
    "url": "https://ruvo.app/",
    "name": "RUVO | AI Running Coach & Gamified Fitness",
    "description": "Redefine your limits with RUVO. AI coaching, precise GPS tracking, and a gamified reward system. Earn XP and coins for real discounts at local health brands.",
    "isPartOf": { "@id": "https://ruvo.app/#website" },
    "about": { "@id": "https://ruvo.app/#app" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://ruvo.app/" }]
    }
  };

  return (
    <>
      <JsonLd schema={faqSchema} />
      <JsonLd schema={homePageSchema} />

      <div className="min-h-screen bg-[#050505] text-white font-['Poppins'] overflow-x-hidden selection:bg-[#dfff00] selection:text-black">

        {/* --- HERO SECTION --- */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden pt-24 pb-12">
          <div className="absolute inset-0 z-0 bg-[#050505] overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              width="1920"
              height="1080"
              className="w-full h-full object-cover scale-[2.1] grayscale opacity-40 z-0 pointer-events-none"
            />
            <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black via-black/50 to-transparent z-10 pointer-events-none"></div>
          </div>
          <div ref={heroRef} className="relative z-20 max-w-5xl mx-auto flex flex-col items-center w-full">
            <Chip radius="full" className="bg-[#dfff00]/10 backdrop-blur-md border border-[#dfff00]/30 text-[#dfff00] font-bold mb-6 px-4 py-2" size="lg">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#dfff00]"></span>
                </span>
                Now Available
              </div>
            </Chip>
            <h1 className="text-5xl sm:text-6xl md:text-[6.5rem] font-black tracking-tighter leading-[0.9] mb-6 uppercase drop-shadow-2xl">
              Redefine Your <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dfff00] to-lime-500">Limits.</span>
            </h1>
            <p className="text-[#dfff00] text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-6 drop-shadow-md">The first app of its kind from the Middle East</p>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-medium mb-12 leading-relaxed drop-shadow-lg">
              AI coaching, precise heart rate tracking, and a gamified reward system. Designed from concept to context in Lebanon. Earn XP and coins to unlock physical discounts at local health brands.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-md mx-auto mb-16">
              <Button as={RouterLink} to="/waitlist" radius="full" size="lg" className="bg-white text-black font-bold px-10 py-8 text-base hover:scale-105 transition-transform flex items-center gap-4 w-full sm:w-auto">
                <svg viewBox="0 0 384 512" fill="currentColor" className="w-5 h-5"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" /></svg>
                <div className="flex flex-col items-start leading-none text-left">
                  <span className="text-[10px] uppercase font-semibold text-gray-600">Download on the</span>
                  <span className="text-sm">App Store</span>
                </div>
              </Button>
              <Button as={RouterLink} to="/waitlist" radius="full" size="lg" variant="bordered" className="text-white border-white/20 backdrop-blur-md font-bold px-10 py-8 text-base hover:bg-white/10 transition-colors flex items-center gap-4 w-full sm:w-auto">
                <svg viewBox="0 0 512 512" fill="currentColor" className="w-5 h-5 text-[#dfff00]"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" /></svg>
                <div className="flex flex-col items-start leading-none text-left">
                  <span className="text-[10px] uppercase font-semibold text-gray-400">Get it on</span>
                  <span className="text-sm">Google Play</span>
                </div>
              </Button>
            </div>

            <button
              onClick={() => window.lenis?.scrollTo("#reviews", { offset: -80, duration: 1.4 })}
              className="mt-8 opacity-50 hover:opacity-100 transition-opacity flex flex-col items-center gap-2 cursor-pointer"
              aria-label="Scroll to reviews"
            >
              <p className="text-[10px] uppercase font-black tracking-[0.4em] text-gray-400">Explore</p>
              <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
            </button>
          </div>
        </section>

        {/* --- REVIEWS (INFINITE MARQUEE) --- */}
        <section id="reviews" className="relative z-10 py-24 bg-[#050505] overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mb-16">
              <div className="flex items-center gap-4">
                <StarRating count={5} />
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-white"><AnimatedNumber value={4.9} decimals={1} /></span>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">on App Store</span>
                </div>
              </div>
              <div className="hidden md:block h-8 w-px bg-white/10"></div>
              <div className="flex items-center gap-4">
                <StarRating count={5} />
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-white"><AnimatedNumber value={4.8} decimals={1} /></span>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">on Google Play</span>
                </div>
              </div>
              <div className="hidden md:block h-8 w-px bg-white/10"></div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-white"><AnimatedNumber value={76} suffix="K+" /></span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">ratings worldwide</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full mt-10">
            <TestimonialRow
              speed={150} direction={1}
              items={[
                { text: "Pacing insights saved my marathon PR.", img: "https://i.pravatar.cc/150?img=11" },
                { text: "AI coaching that actually feels human.", img: "https://i.pravatar.cc/150?img=12" },
                { text: "Unreal GPS accuracy in the city.", img: "https://i.pravatar.cc/150?img=33" },
                { text: "Best community features in the game.", img: "https://i.pravatar.cc/150?img=44" },
                { text: "The UI is so smooth and elegant.", img: "https://i.pravatar.cc/150?img=55" },
                { text: "10x faster training progression.", img: "https://i.pravatar.cc/150?img=60" }
              ]}
            />
            <TestimonialRow
              speed={180} direction={-1}
              items={[
                { text: "Understand my effort levels much better.", img: "https://i.pravatar.cc/150?img=68" },
                { text: "Leaderboards keep everyone motivated.", img: "https://i.pravatar.cc/150?img=69" },
                { text: "Cashing out XP for real gear feels incredible.", img: "https://i.pravatar.cc/150?img=70" },
                { text: "Flawless sync with my Garmin watch.", img: "https://i.pravatar.cc/150?img=18" },
                { text: "The only running app I will ever use.", img: "https://i.pravatar.cc/150?img=32" },
                { text: "Smart gear tracker saved me from injury.", img: "https://i.pravatar.cc/150?img=47" }
              ]}
            />
          </div>
        </section>

        {/* --- "EVERYTHING YOU NEED" SECTION --- */}
        <section id="features" className="relative z-10 py-32 bg-[#050505] border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8">
              <div className="max-w-3xl">
                <div data-gsap-reveal>
                  <Chip radius="full" size="sm" className="bg-[#dfff00]/10 text-[#dfff00] font-bold uppercase tracking-[0.2em] mb-6 border border-[#dfff00]/20 px-3 py-4">
                    The Ecosystem
                  </Chip>
                </div>
                <h2 data-gsap-reveal className="text-4xl sm:text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-6">
                  Everything You Need.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-500">Nothing You Don't.</span>
                </h2>
                <p data-gsap-reveal className="text-lg text-gray-400 max-w-xl leading-relaxed">
                  From real-time tracking to AI coaching, RUVO puts the power of professional-grade analytics directly in your pocket.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {featuresList.map((feature, idx) => {
                let statContent = feature.stat;
                if (feature.stat === "High") statContent = "High";
                else if (feature.stat === "50+") statContent = <AnimatedNumber value={50} suffix="+" />;
                else if (feature.stat === "2M+") statContent = <AnimatedNumber value={2} suffix="M+" />;
                else if (feature.stat === "100+") statContent = <AnimatedNumber value={100} suffix="+" />;
                else if (feature.stat === "500K+") statContent = <AnimatedNumber value={500} suffix="K+" />;

                return (
                  <div key={idx} data-gsap-reveal className="group h-full">
                    <Card className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-[#222] hover:border-[#dfff00]/40 p-8 h-full flex flex-col justify-between rounded-3xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_10px_40px_-10px_rgba(223,255,0,0.15)] relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-[#dfff00]/0 blur-[70px] rounded-full -mr-20 -mt-20 transition-all duration-700 group-hover:bg-[#dfff00]/15 pointer-events-none"></div>
                      <div className="relative z-10">
                        <div className="mb-8 p-4 bg-[#222] group-hover:bg-gradient-to-br group-hover:from-[#dfff00] group-hover:to-lime-400 rounded-2xl w-max inline-block transition-all duration-500 group-hover:scale-110">
                          <svg className="w-6 h-6 text-[#dfff00] group-hover:text-black transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {feature.iconPath}
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#dfff00] transition-colors duration-300">{feature.title}</h3>
                        <p className="text-gray-400 leading-relaxed text-[15px]">{feature.desc}</p>
                      </div>
                      <div className="mt-12 relative z-10 border-t border-white/5 pt-6 group-hover:border-white/10 transition-colors duration-500">
                        <div className="flex flex-row items-baseline gap-3 whitespace-nowrap">
                          <span className="text-4xl font-black text-[#dfff00] tracking-tight">
                            {statContent}
                          </span>
                          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                            {feature.statLabel}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* --- ECOSYSTEM SECTION --- */}
        <section id="ecosystem" className="py-32 bg-[#050505] border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div data-gsap-reveal className="text-center mb-16">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#dfff00]">Ecosystem</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mt-2 mb-4">
                Pair Your Favorite <span className="text-gray-500">Devices.</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                Get even more stats. Connect your wearables and sensors for a complete picture.
              </p>
            </div>

            <div className="mb-16 relative">
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>
              <DeviceMarquee
                speed={50}
                direction={1}
                items={[
                  { name: "Apple", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", showText: true },
                  { name: "Garmin", logoUrl: "/garmin_logo_icon_145264.png", showText: true, imgClass: "h-6" },
                  { name: "Fitbit", logoUrl: "https://web-assets.strava.com/assets/landing-pages/_next/static/media/logo_fitbit.b355ddf7.svg" },
                  { name: "Samsung", logoUrl: "https://web-assets.strava.com/assets/landing-pages/_next/static/media/logo_samsung.bf609d5b.svg" },
                  { name: "Whoop", logoUrl: "https://cdn.simpleicons.org/whoop/ffffff", showText: true }
                ]}
              />
              <div className="h-4"></div>
              <DeviceMarquee
                speed={55}
                direction={-1}
                items={[
                  { name: "Apple", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", showText: true },
                  { name: "Garmin", logoUrl: "/garmin_logo_icon_145264.png", showText: true, imgClass: "h-6" },
                  { name: "Fitbit", logoUrl: "https://web-assets.strava.com/assets/landing-pages/_next/static/media/logo_fitbit.b355ddf7.svg" },
                  { name: "Samsung", logoUrl: "https://web-assets.strava.com/assets/landing-pages/_next/static/media/logo_samsung.bf609d5b.svg" },
                  { name: "Whoop", logoUrl: "https://cdn.simpleicons.org/whoop/ffffff", showText: true }
                ]}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { count: "50+", title: "Smartwatches", desc: "Live workout display with pace, heart rate, and distance on your wrist." },
                { count: "12", title: "Health Apps", desc: "Sync with Apple Health, Google Fit, and Samsung Health automatically." },
                { count: "3", title: "Audio", desc: "Integrated voice coaching with Spotify and Apple Music playlist control." }
              ].map((item, idx) => (
                <div key={idx} data-gsap-reveal>
                  <Card className="bg-[#111111] border border-[#222] p-8 h-full rounded-3xl">
                    <p className="text-5xl font-black text-white tracking-tighter mb-4">
                      <AnimatedNumber value={parseInt(item.count)} suffix={item.count.includes('+') ? '+' : ''} />
                    </p>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- TRAINING PLANS SECTION --- */}
        <section id="plans" className="relative z-10 py-32 bg-[#050505] border-t border-white/10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#dfff00]/5 to-transparent opacity-50"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">

            <div data-gsap-reveal className="text-center mb-16">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#dfff00]">Training Plans</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mt-2 mb-4">
                Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-700">Perfect</span> Plan.
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                Personalized running plans powered by AI, customized to your goals, schedule, and ability. Your first week is on us.
              </p>
            </div>

            <div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {[
                  { iconText: "5K", title: "5K Improvement Plan", duration: "8 weeks", distance: "5 km", level: "BEGINNER", desc: "Whether you are aiming for a 5K PB or wanting to run your first, this plan builds speed and confidence." },
                  { iconText: "10K", title: "10K PR Smasher", duration: "10 weeks", distance: "10 km", level: "INTERMEDIATE", desc: "Step up your distance and crush your current 10K personal record with advanced pacing strategies." },
                  { iconText: "21K", title: "Half Marathon", duration: "12 weeks", distance: "21 km", level: "ADVANCED", desc: "Prepare your body for the 13.1-mile distance. Focuses on endurance, tempo runs, and race-day nutrition." },
                  { iconText: "42K", title: "Ultra Endurance", duration: "16 weeks", distance: "42+ km", level: "ELITE", desc: "For the ultimate challenge. High-volume weeks, back-to-back long runs, and extreme mental toughness conditioning." }
                ].map((plan, idx) => (
                  <div key={idx} data-gsap-reveal className="h-full">
                    <Card className="bg-[#111111] border border-[#222] p-6 h-full hover:border-[#dfff00]/40 transition-all duration-500 cursor-pointer group flex flex-col rounded-3xl hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(223,255,0,0.1)]">
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-6">
                          <div className="h-12 w-12 rounded-xl bg-[#dfff00]/10 flex items-center justify-center text-lg font-black text-[#dfff00]">
                            {plan.iconText}
                          </div>
                          <Chip size="sm" className="bg-white/5 text-gray-400 font-bold border-none uppercase tracking-widest text-[10px]">
                            {plan.level}
                          </Chip>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#dfff00] transition-colors">{plan.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400 font-medium mb-4">
                          <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <span>{plan.duration}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                            <span>{plan.distance}</span>
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-8">
                          {plan.desc}
                        </p>
                      </div>
                      <div className="mt-auto">
                        <span className="text-[#dfff00] font-bold flex items-center gap-2 text-sm group-hover:translate-x-1 transition-transform">
                          Start Plan
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </span>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>

              {/* CUSTOM PLAN BUILDER BANNER */}
              <div data-gsap-reveal>
                <Card className="bg-gradient-to-r from-[#111111] to-[#161616] border border-[#222] p-8 md:p-10 rounded-3xl hover:border-[#dfff00]/40 transition-all duration-500 group cursor-pointer hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(223,255,0,0.1)] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-64 h-64 bg-[#dfff00]/0 blur-[80px] rounded-full transition-all duration-700 group-hover:bg-[#dfff00]/10 pointer-events-none"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="h-12 w-12 rounded-2xl bg-[#222] group-hover:bg-[#dfff00]/10 flex items-center justify-center transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#dfff00]">
                          <path fillRule="evenodd" d="M17.834 6.166a8.25 8.25 0 1 0 0 11.668.75.75 0 0 1 1.06 1.06c-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788 3.807-3.808 9.98-3.808 13.788 0A9.722 9.722 0 0 1 21.75 12c0 .975-.296 1.887-.809 2.571-.514.685-1.28 1.179-2.191 1.179-.904 0-1.666-.487-2.18-1.164a5.25 5.25 0 1 1-.82-6.26V8.25a.75.75 0 0 1 1.5 0V12c0 .682.208 1.27.509 1.671.3.401.659.579.991.579.332 0 .69-.178.991-.579.3-.4.509-.99.509-1.671a8.222 8.222 0 0 0-2.416-5.834ZM15.75 12a3.75 3.75 0 1 0-7.5 0 3.75 3.75 0 0 0 7.5 0Z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-[#dfff00] transition-colors">Custom Plan Builder</h3>
                    </div>
                    <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-3xl md:ml-[4rem]">
                      Got a specific race date or distance in mind? Build a custom plan from 6-26 weeks for any distance from 5-50km.
                    </p>
                  </div>
                  <Button onPress={onPlanOpen} radius="full" size="lg" className="relative z-10 shrink-0 font-bold bg-white/5 text-white group-hover:bg-gradient-to-r group-hover:from-[#dfff00] group-hover:to-lime-400 group-hover:text-black transition-all border border-white/10 group-hover:border-transparent w-full md:w-auto px-8 py-8 text-lg">
                    Build Your Plan
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* --- NEW ELITE DASHBOARD BENTO GRID --- */}
        <section id="dashboard" className="relative z-10 py-32 max-w-7xl mx-auto px-6 border-t border-white/10">
          <div data-gsap-reveal className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#dfff00]">Elite Analytics</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mt-2 mb-4">More Than A <br /><span className="text-gray-500">Running Tracker.</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-10">From your first 5K steps to ultra-marathon dominance, take your training to the next level with professional-grade diagnostics and AI-driven insights.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* 1. COMPARE PROGRESS (Col Span 2 - Thin Curved Line Chart) */}
            <div data-gsap-reveal className="lg:col-span-2 h-full">
              <Card className="bg-[#111111] border border-[#222] p-6 md:p-8 h-full hover:border-[#f97316]/40 transition-colors duration-700 group relative overflow-visible flex flex-col justify-between rounded-3xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#f97316]/0 blur-[80px] rounded-full transition-all duration-700 group-hover:bg-[#f97316]/10 pointer-events-none"></div>

                <div className="flex flex-col md:flex-row justify-between items-start mb-6 relative z-10">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Compare Progress</h3>
                    <p className="text-gray-400 text-sm">Overlay current training cycles against past peaks.</p>
                  </div>
                  <div className="mt-4 md:mt-0 flex gap-4 text-sm font-bold">
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#f97316]"></span><span className="text-white">Current</span></div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#2dd4bf]"></span><span className="text-gray-500">Previous</span></div>
                  </div>
                </div>

                {/* SVG Smooth BÃƒÂ©zier Line Chart (Refined Thickness & Solid Dots) */}
                <div className="relative w-full h-56 mt-auto flex items-end">
                  <svg viewBox="0 0 400 160" className="w-full h-full drop-shadow-lg overflow-visible" preserveAspectRatio="none">
                    <defs>
                      {/* Background Fills */}
                      <linearGradient id="chartFillOrange" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#c2410c" stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id="chartFillTeal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#0f766e" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Grid Lines */}
                    <path d="M 0 40 L 400 40" stroke="#333" strokeWidth="1" strokeDasharray="4 4" />
                    <path d="M 0 80 L 400 80" stroke="#333" strokeWidth="1" strokeDasharray="4 4" />
                    <path d="M 0 120 L 400 120" stroke="#333" strokeWidth="1" strokeDasharray="4 4" />

                    {/* Orange Current Fill */}
                    <path d="M 20 120 C 50 120, 50 90, 80 90 C 110 90, 110 110, 140 110 C 170 110, 170 60, 200 60 C 230 60, 230 70, 260 70 C 290 70, 290 40, 320 40 C 350 40, 350 30, 380 30 L 380 160 L 20 160 Z" fill="url(#chartFillOrange)" />

                    {/* Teal Previous Fill (Crosses below Orange) */}
                    <path d="M 20 70 C 50 70, 50 60, 80 60 C 110 60, 110 100, 140 100 C 170 100, 170 90, 200 90 C 230 90, 230 110, 260 110 C 290 110, 290 80, 320 80 C 350 80, 350 120, 380 120 L 380 160 L 20 160 Z" fill="url(#chartFillTeal)" />

                    {/* Teal Line (Ultra-Thin, Smooth Curve) */}
                    <motion.path
                      d="M 20 70 C 50 70, 50 60, 80 60 C 110 60, 110 100, 140 100 C 170 100, 170 90, 200 90 C 230 90, 230 110, 260 110 C 290 110, 290 80, 320 80 C 350 80, 350 120, 380 120"
                      fill="none" stroke="#2dd4bf" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                      initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2.5, ease: "easeInOut" }}
                    />

                    {/* Orange Line (Ultra-Thin, Smooth Curve) */}
                    <motion.path
                      d="M 20 120 C 50 120, 50 90, 80 90 C 110 90, 110 110, 140 110 C 170 110, 170 60, 200 60 C 230 60, 230 70, 260 70 C 290 70, 290 40, 320 40 C 350 40, 350 30, 380 30"
                      fill="none" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                      initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2.5, delay: 0.2, ease: "easeInOut" }}
                    />

                    {/* Dots Teal (Solid, Small r=2) */}
                    {[[20, 70], [80, 60], [140, 100], [200, 90], [260, 110], [320, 80], [380, 120]].map((pt, i) => (
                      <g key={`t-${i}`}>
                        {/* Add gentle glow only to the last node */}

                        <circle cx={pt[0]} cy={pt[1]} r="2" fill="#2dd4bf" />
                      </g>
                    ))}

                    {/* Dots Orange (Solid, Small r=2) */}
                    {[[20, 120], [80, 90], [140, 110], [200, 60], [260, 70], [320, 40], [380, 30]].map((pt, i) => (
                      <g key={`o-${i}`}>
                        {/* Add gentle glow only to the peak node */}

                        <circle cx={pt[0]} cy={pt[1]} r="2" fill="#f97316" />
                      </g>
                    ))}
                  </svg>
                </div>
                {/* Perfect 7-Day Labels mapped directly under the 7 dots */}
                <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-4 relative z-10 px-1">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </Card>
            </div>

            {/* 2. LIVE HEART RATE (Col Span 1) */}
            <div data-gsap-reveal className="lg:col-span-1 h-full">
              <Card className="bg-[#111111] border border-[#222] p-6 md:p-8 h-full flex flex-col justify-between rounded-3xl hover:border-red-500/40 transition-colors duration-700">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-white">Heart Rate</h3>
                    <div className="relative flex h-2.5 w-2.5 mt-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2 mb-1 mt-1">
                    <span className="text-4xl font-black text-white">40-189</span>
                    <span className="text-gray-400 font-bold">bpm</span>
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">10 - 17 Sep 2026</p>
                </div>

                {/* Vertical Pill Chart — animated by GSAP ScrollTrigger */}
                <div className="flex justify-between items-end h-32 mt-6 mb-4 px-1 border-b border-[#222] pb-4" data-gsap-bars>
                  <div className="flex flex-col items-center gap-1.5 h-full justify-end">
                    <div className="w-6 bg-gradient-to-t from-red-400 to-red-500 rounded-full" style={{ height: 0 }} data-gsap-bar-height="60%"></div>
                    <span className="text-[10px] text-gray-500 font-bold">Mo</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 h-full justify-end">
                    <div className="w-6 bg-gradient-to-t from-red-400 to-red-500 rounded-full" style={{ height: 0 }} data-gsap-bar-height="90%"></div>
                    <span className="text-[10px] text-gray-500 font-bold">Tu</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 h-full justify-end">
                    <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                    <div className="w-6 bg-gradient-to-t from-red-400 to-red-500 rounded-full" style={{ height: 0 }} data-gsap-bar-height="30%"></div>
                    <span className="text-[10px] text-gray-500 font-bold">We</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 h-full justify-end">
                    <div className="w-6 bg-gradient-to-t from-red-400 to-red-500 rounded-full" style={{ height: 0 }} data-gsap-bar-height="40%"></div>
                    <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                    <span className="text-[10px] text-gray-500 font-bold">Th</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 h-full justify-end">
                    <div className="w-6 bg-gradient-to-t from-red-400 to-red-500 rounded-full" style={{ height: 0 }} data-gsap-bar-height="50%"></div>
                    <span className="text-[10px] text-gray-500 font-bold">Fr</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 h-full justify-end">
                    <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                    <div className="w-6 bg-gradient-to-t from-red-400 to-red-500 rounded-full" style={{ height: 0 }} data-gsap-bar-height="60%"></div>
                    <span className="text-[10px] text-gray-500 font-bold">Sa</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 h-full justify-end">
                    <div className="w-6 bg-gradient-to-t from-red-400 to-red-500 rounded-full" style={{ height: 0 }} data-gsap-bar-height="75%"></div>
                    <span className="text-[10px] text-gray-500 font-bold">Su</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-xs text-gray-400 font-medium"><span>Today (14:00)</span><span className="text-white font-bold">125</span></div>
                  <div className="flex justify-between text-xs text-gray-400 font-medium"><span>Today (13:00)</span><span className="text-white font-bold">110</span></div>
                </div>
              </Card>
            </div>

            {/* 3. VO2 MAX (Col Span 1 - Continuous Solid Loop) */}
            <div data-gsap-reveal className="lg:col-span-1 h-full">
              <Card className="bg-[#111111] border border-[#222] p-8 h-full flex flex-col items-center justify-center text-center rounded-3xl hover:border-[#ea580c]/50 transition-colors duration-700 relative overflow-hidden">
                <h3 className="text-xl font-bold text-white">V02 Max</h3>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-6 mt-1">12 - 19 January 2026</p>

                {/* Continuous Solid Circle Progress (Smoothest animation) */}
                <div className="relative w-52 h-52 flex items-center justify-center mb-2">
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="44" fill="none" stroke="#222" strokeWidth="4" />
                    <motion.circle
                      cx="50" cy="50" r="44" fill="none" stroke="#ea580c" strokeWidth="5" strokeLinecap="round"
                      initial={{ pathLength: 0 }} whileInView={{ pathLength: 0.95 }} transition={{ duration: 2, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="flex flex-col items-center">
                    <span className="text-6xl font-black text-white"><AnimatedNumber value={95} decimals={0} /></span>
                    <span className="text-sm font-bold text-white mt-1">Elite</span>
                  </div>
                </div>

                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  Your Vo2 Max is in the <span className="text-[#ea580c] font-bold">Top 1%</span><br />for your age and gender
                </p>

                <div className="mt-6 w-12 h-12 bg-gradient-to-br from-[#ea580c] to-orange-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(234,88,12,0.4)]">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" /></svg>
                </div>
              </Card>
            </div>

            {/* 4. GEAR TRACKER (Optimized Height, Floating Shoe) */}
            <div data-gsap-reveal className="lg:col-span-1 h-full">
              <Card className="bg-[#111111] border border-[#222] h-full flex flex-col rounded-3xl hover:border-[#2dd4bf]/40 transition-colors duration-700 overflow-hidden relative group/shoe">

                <div className="absolute inset-0 bg-gradient-to-b from-[#161616] to-[#0a0a0a] z-0"></div>

                <div className="p-6 flex flex-col h-full relative z-10">
                  {/* Header */}
                  <div className="flex justify-between items-start w-full mb-2">
                    <div>
                      <p className="text-[10px] text-[#2dd4bf] font-bold uppercase tracking-widest mb-1">Your Gear</p>
                      <h3 className="text-xl font-bold text-white">Running Shoes</h3>
                    </div>
                  </div>

                  {/* Big Centered Floating Shoe PNG */}
                  <div className="relative w-full flex-grow flex items-center justify-center my-4">
                    <div className="absolute w-32 h-32 bg-[#2dd4bf]/10 blur-3xl rounded-full group-hover/shoe:bg-[#2dd4bf]/20 transition-colors duration-700"></div>
                    <div className="absolute bottom-2 w-32 h-6 bg-black/80 blur-xl rounded-[100%] group-hover/shoe:w-28 group-hover/shoe:opacity-60 transition-all duration-700"></div>
                    <Image
                      removeWrapper
                      src="https://static.vecteezy.com/system/resources/previews/060/283/800/non_2x/floating-white-sneakers-free-png.png"
                      className="w-48 md:w-56 max-w-none h-auto relative z-10 -rotate-[10deg] group-hover/shoe:-translate-y-3 group-hover/shoe:rotate-[-5deg] transition-transform duration-[1000ms] ease-out drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]"
                    />
                  </div>

                  {/* Bottom Panel (Simplified to one clear Distance bar) */}
                  <div className="w-full bg-[#161616] rounded-2xl p-5 border border-[#2a2a2a] shadow-inner mt-auto">
                    <p className="text-white font-black text-base mb-1 text-center tracking-wide">NIKE ALPHAFLY 3</p>
                    <p className="text-[#dfff00] text-[10px] font-bold uppercase tracking-widest text-center mb-6">Primary Race Shoe</p>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                        <span><span className="text-white">380</span> km run</span>
                        <span><span className="text-gray-500">500</span> km max</span>
                      </div>
                      <Progress value={76} classNames={{ indicator: "bg-gradient-to-r from-[#2dd4bf] to-[#dfff00]", track: "bg-[#222]" }} size="md" />
                      <p className="text-center text-[10px] text-gray-500 font-medium mt-3">You have approx. 120 km left before replacement.</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* 5. AI INSIGHTS (Col Span 1) */}
            <div data-gsap-reveal className="lg:col-span-1 h-full">
              <Card className="bg-gradient-to-br from-[#0a0a0a] to-[#111111] border border-[#222] p-6 md:p-8 h-full flex flex-col justify-between rounded-3xl hover:border-purple-500/40 transition-colors duration-700 relative overflow-hidden group/ai">
                {/* Decorative background glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 blur-[60px] rounded-full pointer-events-none"></div>

                <div className="mb-6 relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center relative shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                      <svg className="w-5 h-5 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" /></svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">RUVO Intelligence</h3>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Active Analysis</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1a1a1a]/80 backdrop-blur-md border border-white/5 rounded-2xl rounded-tl-sm p-6 mt-auto relative z-10 shadow-lg">
                  <div className="flex gap-1.5 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-bounce delay-200"></span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Your ground contact time has decreased by <span className="text-indigo-400 font-bold">12ms</span>. This correlates with a <span className="text-purple-400 font-bold">4% increase</span> in running economy. Keep up the high-cadence drills!
                  </p>
                </div>
              </Card>
            </div>

          </div>

          {/* EXPLORE ELITE CTA BUTTON */}
          
        </section>

        {/* --- GAMIFIED CHALLENGES --- */}
        <section id="challenges" className="relative z-10 py-32 max-w-7xl mx-auto px-6 border-t border-white/10">
          <div data-gsap-reveal className="flex flex-col lg:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#dfff00]">Challenges</span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mt-2 mb-4">Stay Motivated With <span className="text-gray-500">Challenges.</span></h2>
              <p className="text-gray-400 text-lg">Take on monthly goals, compete with friends, and earn badges. From 5Ks to 100Ks and everything in between.</p>
            </div>
            <Button as={RouterLink} to="/challenges" radius="full" className="mt-6 lg:mt-0 bg-white/10 text-white font-bold backdrop-blur-md border border-white/20 px-8 py-6 hover:bg-white/20 transition-colors">
              See All Challenges
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "February 100K", desc: "Run 100 kilometers this month", progress: 67, joined: "42.3K", timeLeft: "17d left" },
              { title: "Speed Demon", desc: "Complete a run under 4:30/km pace", progress: 0, joined: "18.7K", timeLeft: "17d left" },
              { title: "Trail Blazer", desc: "Log 50km on trail routes this month", progress: 34, joined: "12.1K", timeLeft: "17d left" },
              { title: "Social Runner", desc: "Complete 10 group runs this month", progress: 50, joined: "28.9K", timeLeft: "17d left" }
            ].map((challenge, idx) => (
              <div key={idx} data-gsap-reveal>
                <Card className="bg-white/5 border border-white/10 p-6 h-full hover:border-[#dfff00]/50 transition-colors cursor-pointer group flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <Chip size="sm" radius="full" className="bg-[#dfff00]/10 text-[#dfff00] font-bold border-none">{challenge.timeLeft}</Chip>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest px-2 py-1 bg-white/5 rounded-full">
                        {challenge.joined} Joined
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{challenge.title}</h3>
                    <p className="text-sm text-gray-400 mb-6">{challenge.desc}</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Progress</span>
                      <span className={`text-sm font-bold ${challenge.progress === 100 ? 'text-[#dfff00]' : 'text-white'}`}>
                        {isLoaded ? <AnimatedNumber value={challenge.progress} suffix="%" /> : "0%"}
                      </span>
                    </div>
                    <Progress size="sm" value={isLoaded ? challenge.progress : 0} classNames={{ indicator: "bg-gradient-to-r from-[#dfff00] to-lime-500", track: "bg-white/10" }} className="mb-4" />
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* --- FAQ SECTION --- */}
        <section className="relative py-32 bg-[#050505]" data-gsap-reveal>
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-16 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#dfff00]">
                  FAQ
                </span>
                <h2 className="mb-6 text-4xl font-black uppercase leading-none tracking-tight text-white sm:text-5xl text-balance">
                  Got <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dfff00] to-lime-500">Questions?</span>
                </h2>
                <p className="max-w-sm text-lg leading-relaxed text-gray-400">
                  Everything you need to know about RUVO. Can{"'"}t find what you{"'"}re looking for? Reach out to our support team.
                </p>
                <Button as={RouterLink} to="/support" radius="full" className="mt-8 inline-flex bg-white/10 border border-white/20 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-white/20 hover:scale-105">
                  Contact Support
                </Button>
              </div>
              <div className="lg:col-span-3">
                <div className="border-t border-white/10">
                  {faqs.map((faq, i) => (
                    <FaqItem key={faq.question} faq={faq} index={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- RUNNING CLUBS & COMMUNITY --- */}
        <section id="clubs" className="relative z-10 py-32 bg-black border-y border-white/10">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div data-gsap-reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#dfff00]">Global Network</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mt-2 mb-6">Join Millions Of Runners <br /><span className="text-gray-500">Worldwide.</span></h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">There are over 300,000 active running clubs on RUVO. Whether you are looking for a local weekend group or a global ultra-marathon team, find your people.</p>
              <div className="flex flex-col items-center justify-center">
                <AvatarGroup isBordered max={5} className="mb-6 scale-125">
                  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                  <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
                </AvatarGroup>
                <Button as={RouterLink} to="/waitlist" radius="full" size="lg" className="bg-white text-black font-bold px-10 py-6 mt-4 hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  Download Ruvo now
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* MODALS */}

        {/* 1. Build Plan Modal */}
        <Modal backdrop="blur" isOpen={isPlanOpen} onOpenChange={onPlanOpenChange} placement="center" classNames={{ base: "bg-[#111] border border-[#333] text-white" }}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Custom Plan Builder</ModalHeader>
                <ModalBody>
                  <p className="text-gray-400 mb-4">Let's build your perfect training cycle. What are you training for?</p>
                  <div className="flex flex-col gap-4">
                    <Input isDisabled label="Target Distance" placeholder="e.g., Half Marathon" classNames={{ inputWrapper: "bg-[#222] group-data-[focus=true]:bg-[#333]" }} />
                    <Input isDisabled type="date" label="Race Date" classNames={{ inputWrapper: "bg-[#222] group-data-[focus=true]:bg-[#333]" }} />
                  </div>
                  <Chip color="warning" variant="dot" className="mt-2 border-none p-0">Feature unlocking in v2.0</Chip>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>Close</Button>
                  <Button className="bg-[#dfff00] text-black font-bold" onPress={onClose}>Generate Plan</Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

      </div>
    </>
  );
}
