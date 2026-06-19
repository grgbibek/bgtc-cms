import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Megaphone } from 'lucide-react';

/**
 * AnnouncementBanner
 * Shows a centered modal overlay when `announcement_enabled` is "true".
 * Dismissible per-session via sessionStorage.
 */
const AnnouncementBanner = ({ content }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const enabled = content?.announcement_enabled === 'true';
    const dismissed = sessionStorage.getItem('announcement_dismissed') === 'true';
    if (enabled && !dismissed) {
      // Small delay so it appears after page load
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, [content]);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem('announcement_dismissed', 'true');
  };

  const title = content?.announcement_title || 'Announcement';
  const text  = content?.announcement_text  || '';
  const image = content?.announcement_image || '';

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
            position: 'fixed',
            inset: 0,
            background: 'rgba(13,31,45,0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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
              maxWidth: '480px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
              position: 'relative',
            }}
          >
            {/* Gold accent bar */}
            <div style={{
              height: '4px',
              background: 'linear-gradient(90deg, var(--primary), #e8c97a)',
            }} />

            {/* Image (optional) */}
            {image && (
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <img
                  src={image}
                  alt={title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            )}

            {/* Content */}
            <div style={{ padding: '2rem 2rem 2.5rem' }}>
              {/* Icon + Title */}
              <div style={{
                display: 'flex', alignItems: 'flex-start',
                gap: '0.85rem', marginBottom: '1rem',
              }}>
                <div style={{
                  background: 'rgba(201,168,76,0.12)',
                  borderRadius: '10px',
                  width: '44px', height: '44px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
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
                  {title}
                </h2>
              </div>

              {text && (
                <p style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.97rem',
                  lineHeight: 1.7,
                  marginBottom: '1.75rem',
                }}>
                  {text}
                </p>
              )}

              <button
                onClick={dismiss}
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  background: 'var(--secondary)',
                  color: 'var(--primary)',
                  border: 'none',
                  borderRadius: '10px',
                  fontFamily: 'Rajdhani, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => (e.target.style.opacity = '0.85')}
                onMouseLeave={(e) => (e.target.style.opacity = '1')}
              >
                Got it
              </button>
            </div>

            {/* Close ✕ */}
            <button
              onClick={dismiss}
              style={{
                position: 'absolute', top: '1rem', right: '1rem',
                width: '32px', height: '32px',
                background: 'rgba(0,0,0,0.07)', border: 'none',
                borderRadius: '50%', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.15)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.07)')}
              aria-label="Close announcement"
            >
              <X size={16} color="var(--secondary)" strokeWidth={2.5} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementBanner;
