import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * AnnouncementBanner
 *
 * Image-first modal. Left/right arrows overlay the image.
 * Title and description are only rendered when non-empty.
 * Dismissed per-session via sessionStorage.
 *
 * Reads `announcements` JSON array from content:
 *   [{ title, text, image, enabled }, ...]
 *
 * Falls back to legacy flat keys for backward compat.
 */
const AnnouncementBanner = ({ content = {} }) => {
  const [visible, setVisible] = useState(false);
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  /* ── Build slide list ──────────────────────────────────────────────── */
  useEffect(() => {
    let parsed = [];

    if (content.announcements) {
      try {
        const arr = JSON.parse(content.announcements);
        if (Array.isArray(arr)) {
          parsed = arr.filter((a) => a.enabled !== false && a.enabled !== 'false');
        }
      } catch (_) { /* fall through */ }
    }

    // Legacy flat-key fallback
    if (parsed.length === 0 && content.announcement_enabled === 'true') {
      parsed = [{
        title: content.announcement_title || '',
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

  /* ── Navigation ────────────────────────────────────────────────────── */
  const goTo = useCallback((next, dir) => {
    setDirection(dir);
    setIndex(next);
  }, []);

  const prev = () => goTo((index - 1 + slides.length) % slides.length, -1);
  const next = useCallback(() => goTo((index + 1) % slides.length, 1), [index, slides.length, goTo]);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem('announcement_dismissed', 'true');
  };

  if (!visible || slides.length === 0) return null;

  const slide = slides[index];
  const hasTitle = slide.title && slide.title.trim();
  const hasText  = slide.text  && slide.text.trim();
  const hasImage = slide.image && slide.image.trim();
  const hasContent = hasTitle || hasText;

  const variants = {
    enter:  (d) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <AnimatePresence>
      {visible && (
        /* Overlay */
        <motion.div
          key="ann-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={dismiss}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(10,22,35,0.8)',
            backdropFilter: 'blur(5px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem',
          }}
        >
          {/* Modal card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 24 }}
            transition={{ type: 'spring', damping: 24, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white',
              borderRadius: '20px',
              width: '100%',
              maxWidth: '420px',
              maxHeight: '90vh',
              overflow: 'hidden',
              boxShadow: '0 40px 100px rgba(0,0,0,0.45)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Gold top bar */}
            <div style={{
              height: '3px',
              background: 'linear-gradient(90deg, var(--primary), #e8c97a)',
              flexShrink: 0,
            }} />

            {/* ── Image area ─────────────────────────────────────── */}
            <div style={{
              position: 'relative',
              flexShrink: 0,
              background: '#0d1f2d',
              /* Portrait images are ~2:3; landscape ~16:9. We use aspect-ratio
                 so the image drives the height naturally. */
              overflow: 'hidden',
            }}>
              <AnimatePresence custom={direction} initial={false} mode="wait">
                <motion.div
                  key={index}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  style={{ lineHeight: 0 }}
                >
                  {hasImage ? (
                    <img
                      src={slide.image}
                      alt={slide.title || 'Announcement'}
                      style={{
                        width: '100%',
                        maxHeight: hasContent ? '55vh' : '80vh',
                        objectFit: 'contain',
                        objectPosition: 'center top',
                        display: 'block',
                        background: '#0d1f2d',
                      }}
                    />
                  ) : (
                    /* No image — small placeholder strip */
                    <div style={{ height: '6px' }} />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* ── Prev / Next arrows (over image) ────────────── */}
              {slides.length > 1 && hasImage && (
                <>
                  <button
                    onClick={prev}
                    aria-label="Previous announcement"
                    style={arrowBtn('left')}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(13,31,45,0.75)')}
                    onMouseLeave={e => (e.currentTarget.style.background = arrowBtn('left').background)}
                  >
                    <ChevronLeft size={20} strokeWidth={2.5} color="white" />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next announcement"
                    style={arrowBtn('right')}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(13,31,45,0.75)')}
                    onMouseLeave={e => (e.currentTarget.style.background = arrowBtn('right').background)}
                  >
                    <ChevronRight size={20} strokeWidth={2.5} color="white" />
                  </button>
                </>
              )}

              {/* Slide counter */}
              {slides.length > 1 && (
                <div style={{
                  position: 'absolute', top: '0.75rem', left: '0.75rem',
                  background: 'rgba(13,31,45,0.65)',
                  color: 'rgba(255,255,255,0.85)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '20px',
                  fontSize: '0.7rem',
                  fontFamily: 'Rajdhani, sans-serif',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  backdropFilter: 'blur(4px)',
                }}>
                  {index + 1} / {slides.length}
                </div>
              )}
            </div>

            {/* ── Dot indicators (always visible when multiple) ── */}
            {slides.length > 1 && (
              <div style={{
                display: 'flex', gap: '6px', justifyContent: 'center',
                padding: hasContent ? '0.75rem 1.5rem 0' : '0.85rem 1.5rem',
                flexShrink: 0,
              }}>
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i, i > index ? 1 : -1)}
                    aria-label={`Slide ${i + 1}`}
                    style={{
                      width: i === index ? '22px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      background: i === index ? 'var(--primary)' : 'rgba(13,31,45,0.18)',
                      border: 'none', cursor: 'pointer', padding: 0,
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
              </div>
            )}

            {/* Prev / Next for no-image slides (inline row) */}
            {slides.length > 1 && !hasImage && (
              <div style={{
                display: 'flex', justifyContent: 'center', gap: '0.6rem',
                paddingTop: hasContent ? '0.5rem' : '0.75rem',
              }}>
                <button onClick={prev} style={inlineArrowBtn} aria-label="Previous">
                  <ChevronLeft size={16} strokeWidth={2.5} />
                </button>
                <button onClick={next} style={inlineArrowBtn} aria-label="Next">
                  <ChevronRight size={16} strokeWidth={2.5} />
                </button>
              </div>
            )}

            {/* ── Text content (only if non-empty) ───────────────── */}
            {hasContent && (
              <div style={{
                padding: '1rem 1.5rem 1.5rem',
                flexShrink: 0,
                overflowY: 'auto',
              }}>
                {hasTitle && (
                  <h2 style={{
                    fontFamily: 'Rajdhani, sans-serif',
                    fontSize: '1.3rem',
                    fontWeight: 800,
                    color: 'var(--secondary)',
                    lineHeight: 1.15,
                    marginBottom: hasText ? '0.5rem' : 0,
                  }}>
                    {slide.title}
                  </h2>
                )}
                {hasText && (
                  <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.93rem',
                    lineHeight: 1.65,
                    margin: 0,
                  }}>
                    {slide.text}
                  </p>
                )}
              </div>
            )}

            {/* ── Close ✕ ────────────────────────────────────────── */}
            <button
              onClick={dismiss}
              aria-label="Close announcement"
              style={{
                position: 'absolute', top: '0.7rem', right: '0.7rem',
                width: '32px', height: '32px',
                background: 'rgba(13,31,45,0.55)',
                border: 'none', borderRadius: '50%', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(4px)',
                transition: 'background 0.2s',
                zIndex: 10,
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(13,31,45,0.85)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(13,31,45,0.55)')}
            >
              <X size={15} color="white" strokeWidth={2.5} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ── Shared styles ─────────────────────────────────────────────────────── */
const arrowBtn = (side) => ({
  position: 'absolute',
  top: '50%',
  [side]: '0.75rem',
  transform: 'translateY(-50%)',
  width: '38px', height: '38px',
  background: 'rgba(13,31,45,0.5)',
  border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: '50%',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer',
  backdropFilter: 'blur(6px)',
  transition: 'background 0.18s ease',
  zIndex: 5,
});

const inlineArrowBtn = {
  width: '34px', height: '34px',
  background: '#f0eee9',
  border: '1px solid #e0ddd6',
  borderRadius: '50%',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer',
  color: 'var(--secondary)',
  transition: 'background 0.18s',
};

export default AnnouncementBanner;
