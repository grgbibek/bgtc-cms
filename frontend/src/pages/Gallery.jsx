import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import Navbar from '../components/Navbar';

const GALLERY_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&q=80&w=800', category: 'Training', title: 'Morning Run' },
  { src: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&q=80&w=800', category: 'Facilities', title: 'Gym Hall' },
  { src: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800', category: 'Events', title: 'Graduation' },
  { src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800', category: 'Team', title: 'Instructors' },
  { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800', category: 'Training', title: 'Pushups' },
  { src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800', category: 'Facilities', title: 'Hostel' },
];

const CATEGORIES = ['All', 'Training', 'Facilities', 'Events', 'Team'];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImages = activeCategory === 'All' 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === activeCategory);

  return (
    <div style={{ background: '#f4f5f0', minHeight: '100vh', paddingBottom: '4rem' }}>
      <Navbar />

      <section style={{
        paddingTop: 'calc(var(--navbar-height) + 4rem)',
        paddingBottom: '3rem',
        textAlign: 'center'
      }}>
        <div className="container">
          <div className="section-label" style={{ justifyContent: 'center' }}>Our Gallery</div>
          <h1 className="section-title">Life at BGTC</h1>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            A glimpse into the rigorous training, world-class facilities, and the strong brotherhood at our centre.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '3rem' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.6rem 1.5rem',
                  borderRadius: '50px',
                  border: `2px solid ${activeCategory === cat ? 'var(--primary)' : 'var(--border-color)'}`,
                  background: activeCategory === cat ? 'var(--primary)' : 'transparent',
                  color: activeCategory === cat ? '#0d1f2d' : 'var(--text-main)',
                  fontWeight: 600,
                  fontFamily: 'Rajdhani, sans-serif',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  transition: 'all 0.3s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <motion.div layout className="gallery-grid">
            <AnimatePresence>
              {filteredImages.map((img, i) => (
                <motion.div
                  key={img.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="gallery-item"
                  onClick={() => setSelectedImage(img)}
                >
                  <img src={img.src} alt={img.title} />
                  <div className="gallery-item-overlay">
                    <div style={{ width: '100%' }}>
                      <p style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 700, fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{img.category}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ color: 'white', margin: 0, fontSize: '1.25rem' }}>{img.title}</h3>
                        <ZoomIn color="white" size={20} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(5px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '2rem'
            }}
            onClick={() => setSelectedImage(null)}
          >
            <button
              style={{
                position: 'absolute', top: '2rem', right: '2rem',
                background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%',
                width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', cursor: 'pointer', transition: 'background 0.2s'
              }}
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            >
              <X size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage.src}
              alt={selectedImage.title}
              style={{ maxWidth: '100%', maxHeight: '90vh', borderRadius: '8px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}
              onClick={e => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
