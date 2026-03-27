import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ComingSoonPage = () => {
  const videoSource = "/video.mp4";
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // Added for input glow effect

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from refreshing on form submit
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/mkopgdel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ 
          email: email, 
          source: "RUVO Waitlist Form" 
        })
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Oops! There was a problem submitting your email. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting email:", error);
      alert("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#000' }}>

      {/* ── Video Background ── */}
      <video
        src={videoSource}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: 0,
          filter: 'grayscale(100%)', 
          opacity: 0.5, 
          transform: 'scale(1.4)', 
        }}
      />

      {/* ── Dark Overlay ── */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.72) 100%)',
        zIndex: 1,
      }} />

      {/* ── Main Content ── */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        textAlign: 'center',
        padding: '1rem',
      }}>

        {/* Subtle Ambient Glow behind the text */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80vw',
          height: '80vw',
          maxWidth: '800px',
          maxHeight: '800px',
          background: 'radial-gradient(circle, rgba(170,255,0,0.06) 0%, rgba(0,0,0,0) 70%)',
          zIndex: -1,
          pointerEvents: 'none',
        }} />

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '999px',
            padding: '0.4rem 1.1rem',
            marginBottom: '1.75rem',
            backdropFilter: 'blur(10px)',
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#AAFF00', display: 'inline-block', boxShadow: '0 0 8px #AAFF00' }} />
          <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.04em' }}>
            Something big is coming
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h1 style={{
            fontFamily: 'Impact, Arial Black, "Franklin Gothic Heavy", sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(3.5rem, 10vw, 8rem)',
            lineHeight: 1.0,
            margin: 0,
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
          }}>
            WE'RE ALMOST
          </h1>
          <h1 style={{
            fontFamily: 'Impact, Arial Black, "Franklin Gothic Heavy", sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(3.5rem, 10vw, 8rem)',
            lineHeight: 1.0,
            margin: 0,
            color: '#AAFF00',
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
            textShadow: '0 0 30px rgba(170,255,0,0.2)', // Added a slight glow to the neon text
          }}>
            READY.
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{
            color: '#AAFF00',
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginTop: '1.25rem',
            marginBottom: '0.75rem',
          }}
        >
          The first AI running coach from the Middle East
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
            maxWidth: '560px',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
          }}
        >
          AI coaching, heart rate tracking, and a gamified reward system — designed in Lebanon, built for runners everywhere.
        </motion.p>

        {/* Email Form */}
        {!submitted ? (
          <motion.form // Changed to a form so hitting 'Enter' works
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setIsFocused(true)}   // Tracks focus
              onBlur={() => setIsFocused(false)}   // Tracks blur
              placeholder="Enter your email"
              style={{
                padding: '0.85rem 1.5rem',
                borderRadius: '999px',
                // Smoothly transition border and shadow based on focus state
                border: isFocused ? '1.5px solid #AAFF00' : '1.5px solid rgba(255,255,255,0.25)', 
                boxShadow: isFocused ? '0 0 15px rgba(170,255,0,0.2)' : 'none',
                backgroundColor: 'rgba(255,255,255,0.08)',
                color: '#fff',
                fontSize: '0.95rem',
                outline: 'none',
                backdropFilter: 'blur(8px)',
                minWidth: '280px',
                transition: 'all 0.3s ease', // Smooth animation
              }}
            />
            <button
              type="submit" // Explicitly declare as submit button
              disabled={isSubmitting}
              style={{
                padding: '0.85rem 2rem',
                borderRadius: '999px',
                backgroundColor: '#AAFF00',
                color: '#000',
                fontWeight: 800,
                fontSize: '0.95rem',
                border: 'none',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                boxShadow: '0 0 20px rgba(170,255,0,0.35)',
                opacity: isSubmitting ? 0.7 : 1,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => !isSubmitting && (e.currentTarget.style.transform = 'scale(1.04)')}
              onMouseLeave={e => !isSubmitting && (e.currentTarget.style.transform = 'scale(1)')}
            >
              {isSubmitting ? "Sending..." : "Notify Me"}
            </button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
            style={{
              padding: '1rem 2rem',
              backgroundColor: 'rgba(170,255,0,0.1)',
              border: '1px solid rgba(170,255,0,0.3)',
              borderRadius: '999px',
              backdropFilter: 'blur(8px)',
            }}
          >
            <p style={{ color: '#AAFF00', margin: 0, fontWeight: 700, fontSize: '1rem', letterSpacing: '0.05em' }}>
              ✓ You're on the list. We'll reach out soon!
            </p>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default ComingSoonPage;