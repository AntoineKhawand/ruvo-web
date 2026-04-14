import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function WaitlistPage() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [isMounted, setIsMounted] = useState(false);

  // Set your expected launch date here
  function calculateTimeLeft(): TimeLeft {
    const difference = +new Date("2026-06-01T00:00:00") - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Helper to format numbers with leading zeros
  const formatTime = (time: number) => String(time).padStart(2, "0");

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden font-sans text-slate-200 selection:bg-lime-500/30">
      {/* Ambient Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-lime-500/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-yellow-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl p-6 flex flex-col items-center text-center space-y-12">
        
        {/* Header Section */}
        <div className="space-y-6 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-lime-400 shadow-sm backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-lime-500 shadow-[0_0_8px_rgba(132,204,22,0.8)]"></span>
            Coming Soon
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-sm">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-lime-400 to-green-500">
              Ruvo
            </span>{" "}
            is almost here.
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            We are putting the final touches on the platform. Join the exclusive waitlist today and be the first to know the second we launch.
          </p>
        </div>

        {/* Countdown Timer */}
        {isMounted && (
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 w-full">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((block) => (
              <div
                key={block.label}
                className="flex flex-col items-center justify-center bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl w-28 h-28 md:w-36 md:h-36 shadow-2xl transition-transform hover:scale-105"
              >
                <span className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tighter">
                  {formatTime(block.value)}
                </span>
                <span className="text-xs md:text-sm font-semibold text-lime-300/80 uppercase tracking-widest">
                  {block.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Waitlist Form */}
        <div className="w-full max-w-lg mt-8">
          <form 
            className="relative flex flex-col sm:flex-row items-center gap-3 bg-white/5 p-2 rounded-3xl sm:rounded-full border border-white/10 backdrop-blur-md shadow-2xl focus-within:ring-2 focus-within:ring-lime-500/50 transition-all"
            onSubmit={(e) => {
              e.preventDefault();
              // Add your form submission logic here
              alert("Thanks for joining the Ruvo waitlist!");
            }}
          >
            <div className="flex-1 w-full relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                type="email"
                placeholder="Enter your email address"
                required
                className="w-full pl-12 pr-4 py-3 bg-transparent text-white focus:outline-none placeholder:text-slate-500"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-lime-500 hover:bg-lime-400 text-black font-bold rounded-full transition-all shadow-[0_0_20px_-5px_rgba(132,204,22,0.5)] hover:shadow-[0_0_25px_-5px_rgba(132,204,22,0.7)] active:scale-95 whitespace-nowrap"
            >
              Notify Me
            </button>
          </form>
          <p className="text-sm text-slate-500 mt-6 font-medium">
            No spam. Unsubscribe at any time.
          </p>
        </div>

        {/* Back Link */}
        <div className="pt-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group">
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}