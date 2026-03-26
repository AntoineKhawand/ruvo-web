import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@heroui/react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Layout() {
    const { pathname } = useLocation();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
        window.scrollTo(0, 0); // Scroll to top on route change
        setIsMenuOpen(false);

        // 1. Google Analytics Pageview Tracking
        if (typeof window !== "undefined" && window.gtag) {
            window.gtag('config', 'G-F3H97VCE0F', { page_path: pathname });
        }

        // 2. Dynamic SEO Titles & Meta Descriptions
        const seoData = {
            '/': { title: 'RUVO | AI Running Coach & Gamified Fitness', desc: 'Redefine your limits with RUVO. AI coaching, precise heart rate tracking, and a gamified reward system. Earn XP and coins to unlock physical discounts.' },
            '/features': { title: 'Pro Features | RUVO AI Coach', desc: 'Discover dynamic AI coaching, precision routing, and elite analytics to power your marathon training.' },
            '/analytics': { title: 'Elite Analytics | RUVO', desc: 'Track your VO2 Max, running power, and ground contact time with RUVO\'s advanced biometric analytics.' },
            '/rewards': { title: 'Gamified Rewards | RUVO', desc: 'Convert your runs into XP and Coins to unlock discounts at local Lebanese health brands and fitness stores.' },
            '/challenges': { title: 'Global Running Challenges | RUVO', desc: 'Push your limits. Join thousands of runners in global and local community-driven running challenges.' },
            '/device-integration': { title: 'Universal Device Sync | RUVO', desc: 'Sync your Apple Watch, Garmin, Coros, and Oura Ring. Zero-latency biometric data aggregation.' },
            '/shop': { title: 'Official Merch Shop | RUVO', desc: 'Premium running apparel designed for performance. Shop the official RUVO x Healing Makers collection.' },
            '/blog': { title: 'The Track - Running Blog | RUVO', desc: 'Deep dives into endurance training, sports science, and the technology powering your next personal best.' },
            '/support-center': { title: 'Knowledge Base | RUVO Support', desc: 'Find guides, tutorials, and troubleshooting steps to get the most out of your RUVO experience.' }
        };

        const currentSEO = seoData[pathname] || { title: 'RUVO | AI Running App', desc: 'The ultimate AI running coach and gamified fitness app.' };
        
        document.title = currentSEO.title;
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = "description";
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = currentSEO.desc;
    }, [pathname]);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
            `}</style>
            <div className="min-h-screen bg-[#050505] text-white font-['Poppins'] overflow-x-hidden selection:bg-[#dfff00] selection:text-black flex flex-col">

                {/* --- NAVIGATION --- */}
            <Navbar isBlurred isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} className="bg-[#050505]/80 border-b border-white/10 backdrop-blur-2xl fixed w-full top-0 py-2 z-50">
                <NavbarContent className="lg:hidden" justify="start">
                    <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
                </NavbarContent>
                <NavbarBrand className="justify-center lg:justify-start">
                    <Link to="/" className="flex items-center gap-3">
                        <img src="/Ruvo Logo Original.png" alt="Ruvo Logo" className="h-8 sm:h-9" />
                    </Link>
                </NavbarBrand>
                    <NavbarContent className="hidden lg:flex gap-8" justify="center">
                        <NavbarItem><Link to="/reviews" className={`text-sm font-semibold transition-colors ${pathname === '/reviews' ? 'text-[#dfff00]' : 'text-gray-300 hover:text-[#dfff00]'}`}>Reviews</Link></NavbarItem>
                        <NavbarItem><Link to="/features" className={`text-sm font-semibold transition-colors ${pathname === '/features' ? 'text-[#dfff00]' : 'text-gray-300 hover:text-[#dfff00]'}`}>Features</Link></NavbarItem>
                        <NavbarItem><Link to="/analytics" className={`text-sm font-semibold transition-colors ${pathname === '/analytics' ? 'text-[#dfff00]' : 'text-gray-300 hover:text-[#dfff00]'}`}>Analytics</Link></NavbarItem>
                        <NavbarItem><Link to="/rewards" className={`text-sm font-semibold transition-colors ${pathname === '/rewards' ? 'text-[#dfff00]' : 'text-gray-300 hover:text-[#dfff00]'}`}>Rewards</Link></NavbarItem>
                        <NavbarItem><Link to="/challenges" className={`text-sm font-semibold transition-colors ${pathname === '/challenges' ? 'text-[#dfff00]' : 'text-gray-300 hover:text-[#dfff00]'}`}>Challenges</Link></NavbarItem>
                    </NavbarContent>
                    <NavbarContent justify="end">
                    <Button radius="full" className="hidden sm:flex bg-gradient-to-r from-[#dfff00] to-lime-400 text-black font-bold px-8 shadow-[0_0_20px_rgba(223,255,0,0.3)] hover:scale-105 transition-transform">
                            Get the App
                        </Button>
                    </NavbarContent>
                <NavbarMenu className="bg-[#050505]/95 backdrop-blur-3xl border-t border-white/10 pt-8 gap-6 z-50">
                    <NavbarMenuItem><Link to="/reviews" className="w-full text-2xl font-black uppercase tracking-tight text-white hover:text-[#dfff00] block transition-colors">Reviews</Link></NavbarMenuItem>
                    <NavbarMenuItem><Link to="/features" className="w-full text-2xl font-black uppercase tracking-tight text-white hover:text-[#dfff00] block transition-colors">Features</Link></NavbarMenuItem>
                    <NavbarMenuItem><Link to="/analytics" className="w-full text-2xl font-black uppercase tracking-tight text-white hover:text-[#dfff00] block transition-colors">Analytics</Link></NavbarMenuItem>
                    <NavbarMenuItem><Link to="/rewards" className="w-full text-2xl font-black uppercase tracking-tight text-white hover:text-[#dfff00] block transition-colors">Rewards</Link></NavbarMenuItem>
                    <NavbarMenuItem><Link to="/challenges" className="w-full text-2xl font-black uppercase tracking-tight text-white hover:text-[#dfff00] block transition-colors">Challenges</Link></NavbarMenuItem>
                    <NavbarMenuItem className="mt-4"><Button radius="full" size="lg" className="w-full bg-gradient-to-r from-[#dfff00] to-lime-400 text-black font-bold">Get the App</Button></NavbarMenuItem>
                </NavbarMenu>
                </Navbar>

                {/* --- PAGE CONTENT INJECTED HERE --- */}
                <AnimatePresence mode="wait">
                    <motion.main
                        key={pathname}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="flex-grow pt-[80px]"
                    >
                        <Outlet />
                    </motion.main>
                </AnimatePresence>

                {/* --- SCROLL TO TOP BUTTON --- */}
                <button
                    onClick={scrollToTop}
                    className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 bg-[#dfff00] text-black p-3 md:p-4 rounded-full shadow-[0_0_20px_rgba(223,255,0,0.4)] hover:shadow-[0_0_30px_rgba(223,255,0,0.6)] transition-all duration-500 ease-in-out hover:scale-110 flex items-center justify-center ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
                    aria-label="Scroll to top"
                >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                </button>

                {/* --- FOOTER --- */}
                <footer className="relative bg-[#000] border-t border-white/10 pt-32 pb-12 overflow-hidden mt-auto">
                    {/* Subtle logo background in footer */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30rem] font-black text-white/[0.02] select-none pointer-events-none tracking-tighter">
                        RUVO
                    </div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10">

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-20">
                            <div className="lg:col-span-2">
                                <div className="flex items-center gap-3 mb-6">
                                    <img src="/Ruvo Logo Original.png" alt="Ruvo Logo" className="h-16" />
                                </div>
                                <p className="text-sm text-gray-400 mb-8 leading-relaxed pr-4">Redefine your limits with precision tracking and elite analytics built for athletes who never settle.</p>
                                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                                    <Button as="a" href="#" radius="full" className="bg-white/5 text-white font-bold border border-white/10 hover:bg-white/10 hover:border-white/30 px-6 transition-all w-fit">
                                        <svg viewBox="0 0 384 512" fill="currentColor" className="w-4 h-4"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" /></svg>
                                        App Store
                                    </Button>
                                    <Button as="a" href="#" radius="full" className="bg-white/5 text-white font-bold border border-white/10 hover:bg-white/10 hover:border-white/30 px-6 transition-all w-fit">
                                        <svg viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4 text-[#dfff00]"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" /></svg>
                                        Google Play
                                    </Button>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Features</h4>
                                <ul className="space-y-4 text-sm text-gray-500 font-medium">
                                    <li><Link to="/ai-coaching" className="hover:text-[#dfff00] transition-colors">AI Smart Coaching</Link></li>
                                    <li><Link to="/device-integration" className="hover:text-[#dfff00] transition-colors">Device Integration</Link></li>
                                    <li><Link to="/analytics" className="hover:text-[#dfff00] transition-colors">Elite Analytics</Link></li>
                                    <li><Link to="/rewards" className="hover:text-[#dfff00] transition-colors">Gamified Rewards</Link></li>
                                    <li><Link to="/heatmap" className="hover:text-[#dfff00] transition-colors">Global Heatmap</Link></li>
                                    <li><Link to="/shop" className="hover:text-[#dfff00] transition-colors">Merch Shop</Link></li>
                                </ul>
                            </div>
                            <div className="col-span-1">
                                <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Resources</h4>
                                <ul className="space-y-4 text-sm text-gray-500 font-medium">
                                    <li><Link to="/support" className="hover:text-[#dfff00] transition-colors">Contact Support</Link></li>
                                    <li><Link to="/support-center" className="hover:text-[#dfff00] transition-colors">Support Center</Link></li>
                                    <li><Link to="/community-guidelines" className="hover:text-[#dfff00] transition-colors">Community Guidelines</Link></li>
                                    <li><Link to="/blog" className="hover:text-[#dfff00] transition-colors">The Track (Blog)</Link></li>
                                </ul>
                            </div>
                            <div className="col-span-1">
                                <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Company</h4>
                                <ul className="space-y-4 text-sm text-gray-500 font-medium">
                                    <li><Link to="/about" className="hover:text-[#dfff00] transition-colors">About Us</Link></li>
                                    <li><Link to="/careers" className="hover:text-[#dfff00] transition-colors">Careers</Link></li>
                                    <li><Link to="/press" className="hover:text-[#dfff00] transition-colors">Press</Link></li>
                                    <li><Link to="/changelog" className="hover:text-[#dfff00] transition-colors">Changelog</Link></li>
                                    <li><Link to="/partners" className="hover:text-[#dfff00] transition-colors">Partnerships</Link></li>
                                </ul>
                            </div>
                            <div className="col-span-1">
                                <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Follow us</h4>
                                <div className="flex gap-4">
                                    <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#dfff00] hover:text-black hover:border-[#dfff00] transition-all shadow-lg" aria-label="Facebook">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-3 7h-1.924c-.615 0-1.076.252-1.076.889v1.111h3l-.238 3h-2.762v8h-3v-8h-2v-3h2v-1.923c0-2.022 1.064-3.077 3.461-3.077h2.539v3z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                    <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#dfff00] hover:text-black hover:border-[#dfff00] transition-all shadow-lg" aria-label="LinkedIn">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                    <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-gradient-to-tr hover:from-pink-500 hover:via-red-500 hover:to-yellow-400 hover:text-white hover:border-transparent transition-all shadow-lg" aria-label="Instagram">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                            <p className="text-xs text-gray-600 font-bold tracking-widest uppercase">© 2026 RUVO Inc. All rights reserved.</p>
                            <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-xs text-gray-600 font-bold tracking-widest uppercase">
                                <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                                <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                                <a href="#" className="hover:text-white transition-colors">English (US)</a>
                                <Link to="/system-status" className="hover:text-white transition-colors">System Status</Link>
                            </div>
                        </div>
                    </div>
                </footer>

            </div>
        </>
    );
}
