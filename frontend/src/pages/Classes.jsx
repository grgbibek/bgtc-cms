import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, CheckCircle, Info } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useProducts, useContent } from '../hooks/useQueries';



const Classes = () => {
  const navigate  = useNavigate();
  const [selected, setSelected] = useState(null);
  const { data: content = {} } = useContent();

  const ARMY_CLASSES = [
    {
      id:       'british-gurkha',
      flag:     '🇬🇧',
      title:    content.class_1_title || 'British Gurkha Army',
      subtitle: content.class_1_subtitle || 'Most Prestigious Selection',
      desc:     content.class_1_desc || 'Join the elite British Gurkha Regiment — one of the most respected military forces in the world. Our training covers the full spectrum of physical requirements for British Gurkha selection.',
      badge:    content.class_1_badge || 'Once a Year',
      frequency:content.class_1_frequency || 'Open once a year at British Gurkha Army Camp, Pokhara and Dharan.',
      eligibility: (content.class_1_eligibility || 'Nepalese youth from all parts of Nepal\nExcept Kathmandu, Bhaktapur, and Lalitpur districts\nAll castes eligible\nAge and height as per BGA requirements').split('\n').filter(Boolean),
      selection: (content.class_1_selection || 'Registration & Documentation | \nRegional Selection (Pokhara/Dharan) | \nPhysical Tests (Heaving, 800m, Doko Race etc.) | \nCentral Selection | \nMedical & Final | ').split('\n').filter(Boolean).map(s => s.split('|')[0].trim()),
      successRate: content.success_rate_bga || '80%',
      img: content.class_1_img || 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&q=80&w=900',
      color: 'var(--primary)',
      route: '/classes/british-gurkha',
    },
    {
      id:       'singapore-police',
      flag:     '🇸🇬',
      title:    content.class_2_title || 'Singapore Police Force',
      subtitle: content.class_2_subtitle || 'Gurkha Contingent',
      desc:     content.class_2_desc || 'Serve as part of the Gurkha Contingent of Singapore Police Force — a specialized guard force and counter-terrorist unit. A prestigious and well-compensated posting.',
      badge:    content.class_2_badge || 'Once a Year',
      frequency:content.class_2_frequency || 'Open once a year at BGT Camp Pokhara and Dharan.',
      eligibility: (content.class_2_eligibility || 'Nepalese youth from all parts of Nepal\nExcept Kathmandu Valley districts\nAll castes eligible\nAge and height as per SPF requirements').split('\n').filter(Boolean),
      selection: (content.class_2_selection || 'Registration & Documentation | \nRegional Selection (Pokhara/Dharan) | \nPhysical Fitness Tests | \nCentral Selection | \nMedical & Final | ').split('\n').filter(Boolean).map(s => s.split('|')[0].trim()),
      successRate: content.success_rate_spf || '64%',
      img: content.class_2_img || 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&q=80&w=900',
      color: '#e74c3c',
      route: '/classes/singapore-police',
    },
    {
      id:       'indian-gorkha',
      flag:     '🇮🇳',
      title:    content.class_3_title || 'Indian Gorkha Army',
      subtitle: content.class_3_subtitle || 'Six Gorkha Regiments',
      desc:     content.class_3_desc || 'Join one of the six prestigious Gorkha regiments of the Indian Army. Based on the 1947 Britain-India-Nepal Tripartite Agreement, this is a well-established and respected career path.',
      badge:    content.class_3_badge || '1–2 Times/Year',
      frequency:content.class_3_frequency || 'Open 1–2 times per year at regional selection camps.',
      eligibility: (content.class_3_eligibility || 'Nepalese youth from all parts of Nepal\nAll castes eligible\nChaudhary caste is NOT eligible\nAge and height as per IA requirements').split('\n').filter(Boolean),
      selection: (content.class_3_selection || 'Registration & Documentation | \nRegional Selection Camp | \nPhysical Fitness Tests | \nMedical Test | \nFinal Result | ').split('\n').filter(Boolean).map(s => s.split('|')[0].trim()),
      successRate: content.success_rate_ia || '55%',
      img: content.class_3_img || 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=900',
      color: '#ff9800',
      route: '/classes/indian-gorkha',
    },
  ];

  return (
    <div style={{ background: '#f4f5f0', minHeight: '100vh' }}>
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, #0d1f2d 0%, #1a3a4a 60%, #3d5a3e 100%)',
        padding: `calc(var(--navbar-height) + 5rem) 0 6rem`,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px', pointerEvents: 'none',
        }} />
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="section-label" style={{ justifyContent: 'center', color: 'var(--primary)' }}>Training Programs</div>
            <h1 style={{ color: 'white', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', marginBottom: '1.5rem' }}>
              Choose Your Path to Service
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.2rem', maxWidth: '640px', margin: '0 auto', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
              Specialized programs tailored for each army's selection process, taught by instructors who have lived through it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Class Cards ───────────────────────────────────────────────── */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {ARMY_CLASSES.map((cls, i) => (
              <motion.div
                key={cls.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: 'white', borderRadius: '20px', overflow: 'hidden',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.06)', display: 'flex',
                  flexWrap: 'wrap', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
                }}
              >
                {/* Image */}
                <div style={{ flex: '1 1 360px', minHeight: '380px', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={cls.img} alt={cls.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    className="hover-scale"
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to bottom, transparent 50%, rgba(13,31,45,0.7))',
                  }} />
                  {/* Success badge */}
                  <div style={{
                    position: 'absolute', top: '1.5rem', left: '1.5rem',
                    background: 'rgba(13,31,45,0.85)', backdropFilter: 'blur(8px)',
                    border: `1px solid ${cls.color}`, borderRadius: '8px',
                    padding: '0.75rem 1.25rem', textAlign: 'center',
                  }}>
                    <p style={{ color: cls.color, fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '1.8rem', margin: 0, lineHeight: 1 }}>
                      {cls.successRate}
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0, fontFamily: 'Rajdhani, sans-serif' }}>Success Rate</p>
                  </div>
                </div>

                {/* Content */}
                <div style={{ flex: '1 1 360px', padding: '3rem 3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '2.5rem' }}>{cls.flag}</span>
                    <div>
                      <p style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 700, fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>{cls.subtitle}</p>
                      <h2 style={{ fontSize: '2rem', margin: 0 }}>{cls.title}</h2>
                    </div>
                  </div>

                  <div className="divider" />
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '1.75rem', fontFamily: 'Inter, sans-serif' }}>{cls.desc}</p>

                  {/* Eligibility quick list */}
                  <div style={{ marginBottom: '2rem' }}>
                    <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.85rem', color: 'var(--secondary)', marginBottom: '0.75rem' }}>Eligibility</p>
                    {cls.eligibility.map((e, j) => (
                      <div key={j} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                        <CheckCircle size={15} color={cls.color} style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif' }}>{e}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Link to={cls.route} className="btn-primary">
                      Full Details <ChevronRight size={16} />
                    </Link>
                    <Link to="/contact" className="btn-outline">
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Other armies strip ─────────────────────────────────────────── */}
      <section style={{ padding: '4rem 0', background: 'var(--secondary)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--primary)', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '1rem' }}>
            Also Available
          </p>
          <h3 style={{ color: 'white', fontSize: '1.8rem', marginBottom: '1rem' }}>Additional Programs</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            {['🇫🇷 French Foreign Legion', '🇳🇵 Nepal Army', '🇳🇵 Nepal Police Force'].map((item, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(201,168,76,0.2)',
                borderRadius: '8px', padding: '0.85rem 1.75rem',
                color: 'rgba(255,255,255,0.7)', fontFamily: 'Rajdhani, sans-serif',
                fontWeight: 600, letterSpacing: '0.06em', fontSize: '0.95rem',
              }}>{item}</div>
            ))}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '1.5rem', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif' }}>
            Contact us for scheduling and eligibility details for additional programs.
          </p>
          <Link to="/contact" className="btn-primary" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
            Contact Us <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Classes;
