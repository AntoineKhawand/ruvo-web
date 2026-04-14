import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@heroui/react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'ruvo_cookie_consent';

/**
 * Fires GA4 page-view tracking. Called once the user grants consent.
 */
export function initAnalytics() {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('consent', 'update', {
    analytics_storage: 'granted',
  });
  window.gtag('config', 'G-F3H97VCE0F', { send_page_view: true });
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Small delay so the banner doesn't flash on first paint
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
    if (stored === 'granted') initAnalytics();
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'granted');
    initAnalytics();
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'denied');
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', { analytics_storage: 'denied' });
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-sm z-[100]"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="bg-[#111] border border-white/10 rounded-2xl p-5 shadow-2xl shadow-black/60 backdrop-blur-xl">
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              We use cookies to analyse site traffic and improve your experience.
              Read our{' '}
              <Link to="/privacy" className="text-[#dfff00] underline underline-offset-2 hover:no-underline" onClick={decline}>
                Privacy Policy
              </Link>
              .
            </p>
            <div className="flex gap-3">
              <Button
                onPress={accept}
                radius="full"
                size="sm"
                className="bg-[#dfff00] text-black font-bold flex-1 shadow-[0_0_12px_rgba(223,255,0,0.25)]"
              >
                Accept
              </Button>
              <Button
                onPress={decline}
                radius="full"
                size="sm"
                variant="bordered"
                className="border-white/20 text-gray-400 font-bold flex-1 hover:bg-white/5"
              >
                Decline
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
