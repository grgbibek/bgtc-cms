import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Megaphone, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * AnnouncementBanner
 *
 * Reads `announcements` from content — a JSON array of objects:
 *   [{ title, text, image, enabled }, ...]
 *
 * Falls back to legacy flat keys (announcement_enabled / announcement_title /
 * announcement_text / announcement_image) so existing DB data still works.
 *
 * Shows one announcement at a time in a modal. If there are multiple active
 * announcements the user can page through them with Prev / Next arrows.
 * Dismissed per-session via sessionStorage.
 */
const AnnouncementBanner = ({ content = {} }) => {
  const [visible, setVisible] = useState(false);
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  /* ── Compute slide list ────────────────────────────────────────────── */
  useEffect(() => {
    let parsed = [];

    // Try JSON array key first
    if (content.announcements) {
      try {
        const arr = JSON.parse(content.announcements);
        if (Array.isArray(arr)) {
          parsed = arr.filter((a) => a.enabled !== false && a.enabled !== 'false');
        }
      } catch (_) { /* fall through to legacy */ }
    }

    // Legacy flat keys fallback
    if (parsed.length === 0 && content.announcement_enabled === 'true') {
      parsed = [{
        title: content.announcement_title || 'Announcement',
        text:  content.announcement_text  || '',
        image: content.announcement_image || '',
      }];
    }

    const dismissed = sessionStorage.getItem('announcement_dismissed') === 'true';
    if (parsed.length > 0 && !dismissed) {
      setSlides(parsed);
      setIndex(0);
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, [content]);

  /* ── Navigation helpers ────────────────────────────────────────────── */
  const goTo = useCallback((next, dir) => {
    setDirection(dir);
    setIndex(next);
  }, []);

  const prev = () => goTo((index - 1 + slides.length) % slides.length, -1);
  const next = () => goTo((index + 1) % slides.length,  1);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem('announcement_dismissed', 'true');
  };

  if (!visible || slides.length === 0) return null;

  const slide = slides[index];

  const variants = {
    enter:  (d) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="announcement-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={dismiss}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(13,31,45,0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 2000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white',
              borderRadius: '20px',
              maxWidth: '520px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
              position: 'relative',
            }}
          >
            {/* Gold accent bar */}
            <div style={{ height: '4px', background: 'linear-gradient(90deg, var(--primary), #e8c97a)' }} />

            {/* Close ✕ */}
            <button
              onClick={dismiss}
              style={{
                position: 'absolute', top: '1rem', right: '1rem',
                width: '32px', height: '32px',
                background: 'rgba(0,0,0,0.07)', border: 'none',
                borderRadius: '50%', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 10, transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.15)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.07)')}
              aria-label="Close announcement"
            >
              <X size={16} color="var(--secondary)" strokeWidth={2.5} />
            </button>

            {/* Slide content — AnimatePresence for swipe transitions */}
            <div style={{ overflow: 'hidden' }}>
              <AnimatePresence custom={direction} initial={false} mode="wait">
                <motion.div
                  key={index}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                >
                  {/* Image */}
                  {slide.image && (
                    <div style={{ height: '220px', overflow: 'hidden' }}>
                      <img
                        src={slide.image}
                        alt={slide.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                  )}

                  {/* Text body */}
                  <div style={{ padding: '2rem 2rem 1.5rem' }}>
                    {/* Icon + Title row */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', marginBottom: '1rem' }}>
                      <div style={{
                        background: 'rgba(201,168,76,0.12)', borderRadius: '10px',
                        width: '44px', height: '44px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <Megaphone size={20} color="var(--primary)" strokeWidth={2} />
                      </div>
                      <h2 style={{
                        fontFamily: 'Rajdhani, sans-serif',
                        fontSize: '1.45rem',
                        color: 'var(--secondary)',
                        lineHeight: 1.15,
                        marginTop: '0.2rem',
                      }}>
                        {slide.title || 'Announcement'}
                      </h2>
                    </div>

                    {slide.text && (
                      <p style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.97rem',
                        lineHeight: 1.7,
                        marginBottom: '1.5rem',
                      }}>
                        {slide.text}
                      </p>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer — pagination + dismiss */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0 2rem 1.75rem',
              gap: '1rem',
            }}>
              {/* Prev / Next arrows (only if multiple) */}
              {slides.length > 1 ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button onClick={prev} aria-label="Previous" style={navBtn}>
                    <ChevronLeft size={16} strokeWidth={2.5} />
                  </button>
                  {/* Dot indicators */}
                  <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goTo(i, i > index ? 1 : -1)}
                        aria-label={`Announcement ${i + 1}`}
                        style={{
                          width: i === index ? '20px' : '8px',
                          height: '8px',
                          borderRadius: '4px',
                          background: i === index ? 'var(--primary)' : 'rgba(13,31,45,0.2)',
                          border: 'none', cursor: 'pointer', padding: 0,
                          transition: 'all 0.3s ease',
                        }}
                      />
                    ))}
                  </div>
                  <button onClick={next} aria-label="Next" style={navBtn}>
                    <ChevronRight size={16} strokeWidth={2.5} />
                  </button>
                </div>
              ) : (
                <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontFamily: 'Rajdhani, sans-serif' }}>
                  Announcement
                </span>
              )}

              <button
                onClick={dismiss}
                style={{
                  padding: '0.7rem 1.6rem',
                  background: 'var(--secondary)',
                  color: 'var(--primary)',
                  border: 'none', borderRadius: '10px',
                  fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
                  fontSize: '0.88rem', letterSpacing: '0.08em', textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'opacity 0.2s', flexShrink: 0,
                }}
                onMouseEnter={(e) => (e.target.style.opacity = '0.85')}
                onMouseLeave={(e) => (e.target.style.opacity = '1')}
              >
                Got it
              </button>
            </div>

            {/* Slide counter badge */}
            {slides.length > 1 && (
              <div style={{
                position: 'absolute', top: '1rem', left: '1rem',
                background: 'rgba(13,31,45,0.7)', color: 'rgba(255,255,255,0.8)',
                padding: '0.2rem 0.6rem', borderRadius: '20px',
                fontSize: '0.72rem', fontFamily: 'Rajdhani, sans-serif',
                fontWeight: 700, letterSpacing: '0.08em',
              }}>
                {index + 1} / {slides.length}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const navBtn = {
  width: '30px', height: '30px',
  background: '#f0eee9', border: '1px solid #e0ddd6',
  borderRadius: '50%', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: 'var(--secondary)', flexShrink: 0,
  transition: 'background 0.2s',
};

export default AnnouncementBanner;
