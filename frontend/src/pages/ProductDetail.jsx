import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Shield, Award, Clock, MapPin, Target, Calendar } from 'lucide-react';
import Navbar from '../components/Navbar';

import { useContent } from '../hooks/useQueries';

const ClassDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: content = {} } = useContent();

  const parseSelection = (selectionStr) => {
    if (!selectionStr) return [];
    return selectionStr.split('\n').filter(Boolean).map(line => {
      const parts = line.split('|');
      return { step: parts[0]?.trim() || '', desc: parts[1]?.trim() || '' };
    });
  };

  const ARMY_CLASSES = {
    'british-gurkha': {
      flag: '🇬🇧', title: content.class_1_title || 'British Gurkha Army', subtitle: content.class_1_subtitle || 'Most Prestigious Selection',
      badge: content.class_1_badge || 'Once a Year', badgeColor: '#c9a84c', color: 'var(--primary)',
      img: content.class_1_img || 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&q=80&w=1200',
      desc: content.class_1_desc || "The Brigade of Gurkhas is a unique organization in the British Army. Gurkhas are known for their exceptional courage, loyalty, and resilience. Joining the British Gurkha Army is highly competitive, requiring peak physical fitness and mental fortitude.",
      eligibility: (content.class_1_eligibility || 'Nepalese youth from all parts of Nepal\nExcept Kathmandu, Bhaktapur, and Lalitpur districts\nAll castes eligible\nMinimum Height: 158cm\nBMI: 17.0 - 24.0\nEducation: Minimum SEE with C grade in English & Math').split('\n').filter(Boolean),
      selection: parseSelection(content.class_1_selection || 'Phase 1: Registration | Initial documentation check and basic physical screening at regional centers.\nPhase 2: Regional Selection | Held in Pokhara and Dharan. Includes English tests, math tests, and initial physicals (Heaving, Sit-ups, 800m run).\nPhase 3: Central Selection | The ultimate test in Pokhara camp. Includes the infamous Doko Race (5.8km carrying 25kg uphill), medicals, and interviews.')
    },
    'singapore-police': {
      flag: '🇸🇬', title: content.class_2_title || 'Singapore Police Force', subtitle: content.class_2_subtitle || 'Gurkha Contingent',
      badge: content.class_2_badge || 'Once a Year', badgeColor: '#c9a84c', color: '#e74c3c',
      img: content.class_2_img || 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&q=80&w=1200',
      desc: content.class_2_desc || "The Gurkha Contingent (GC) is a line department of the Singapore Police Force consisting primarily of Gurkhas from Nepal. They are a highly trained elite unit serving as a special guard force and counter-terrorist force.",
      eligibility: (content.class_2_eligibility || 'Nepalese youth from all parts of Nepal\nExcept Kathmandu Valley districts\nAll castes eligible\nMinimum Height: 160cm\nBMI: 18.0 - 25.0\nEducation: Minimum SEE with C grade in English & Math').split('\n').filter(Boolean),
      selection: parseSelection(content.class_2_selection || 'Phase 1: Registration | Initial documentation check at regional centers.\nPhase 2: Regional Selection | Held in Pokhara and Dharan. Includes physical fitness tests, written tests.\nPhase 3: Central Selection | Final grueling physicals, comprehensive medical examination, and final interview in Pokhara.')
    },
    'indian-gorkha': {
      flag: '🇮🇳', title: content.class_3_title || 'Indian Gorkha Army', subtitle: content.class_3_subtitle || 'Six Gorkha Regiments',
      badge: content.class_3_badge || '1-2 Times/Year', badgeColor: '#3d5a3e', color: '#ff9800',
      img: content.class_3_img || 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=1200',
      desc: content.class_3_desc || "Since the independence of India in 1947, six Gurkha regiments have been part of the Indian Army. They have a proud history of valor and serve across various terrains and roles within the Indian military.",
      eligibility: (content.class_3_eligibility || 'Nepalese youth from all parts of Nepal\nAll castes eligible EXCEPT Chaudhary caste\nMinimum Height: 157cm\nBMI: Proportionate to height and age\nEducation: Minimum 8th/10th pass depending on the trade applied for').split('\n').filter(Boolean),
      selection: parseSelection(content.class_3_selection || 'Phase 1: Rally/Registration | Open recruitment rallies held at various regional camps.\nPhase 2: Physical Test | 1.6km run, pull-ups, 9 feet ditch jump, zig-zag balance.\nPhase 3: Medical & Written | Detailed medical examination followed by a Common Entrance Examination (CEE).')
    }
  };

  const program = ARMY_CLASSES[id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!program) {
    return (
      <div style={{ background: '#f4f5f0', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <Navbar />
        <h2>Program Not Found</h2>
        <Link to="/classes" className="btn-primary" style={{ marginTop: '1rem' }}>Back to Classes</Link>
      </div>
    );
  }

  return (
    <div style={{ background: '#f4f5f0', minHeight: '100vh', paddingBottom: '4rem' }}>
      <style>{`
        .cd-hero {
          padding-top: var(--navbar-height);
          height: 60vh;
          min-height: 380px;
          background-image: linear-gradient(to top, #0d1f2d 0%, transparent 80%), url(${program.img});
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: flex-end;
          padding-bottom: 3rem;
          color: white;
          position: relative;
        }
        .cd-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3rem;
        }
        .cd-main-card {
          background: white;
          border-radius: 16px;
          padding: 3rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          margin-bottom: 2rem;
          border: 1px solid var(--border-color);
        }
        .cd-sidebar {
          background: var(--secondary);
          color: white;
          border-radius: 16px;
          padding: 2.5rem;
          position: sticky;
          top: calc(var(--navbar-height) + 2rem);
          height: fit-content;
        }
        .cd-hero-title {
          font-size: clamp(2rem, 6vw, 4.5rem);
          margin: 0 0 0.5rem;
          color: white;
        }
        .cd-hero-subtitle {
          color: rgba(255,255,255,0.7);
          font-size: 1.2rem;
          font-family: Rajdhani, sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 600;
        }
        .cd-section-title {
          font-size: 1.8rem;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .cd-selection-item {
          display: flex;
          gap: 1.5rem;
        }
        .cd-register-btn {
          width: 100%;
          justify-content: center;
          background: ${program.color};
          border-color: ${program.color};
        }

        /* ── Tablet ─────────────────────────────────────────── */
        @media (max-width: 900px) {
          .cd-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .cd-sidebar {
            position: static;
          }
        }

        /* ── Mobile ─────────────────────────────────────────── */
        @media (max-width: 768px) {
          .cd-hero {
            height: 50vh;
            min-height: 300px;
            padding-bottom: 2rem;
          }
          .cd-hero-subtitle {
            font-size: 0.95rem;
          }
          .cd-main-card {
            padding: 1.5rem;
            border-radius: 12px;
          }
          .cd-sidebar {
            padding: 1.5rem;
            border-radius: 12px;
          }
          .cd-section-title {
            font-size: 1.4rem;
          }
          .cd-selection-item {
            gap: 1rem;
          }
        }

        /* ── Extra small ─────────────────────────────────────── */
        @media (max-width: 480px) {
          .cd-hero {
            min-height: 260px;
          }
          .cd-main-card {
            padding: 1.25rem;
          }
          .cd-sidebar {
            padding: 1.25rem;
          }
          .cd-section-title {
            font-size: 1.2rem;
          }
        }
      `}</style>

      <Navbar />

      {/* Hero */}
      <section className="cd-hero">
        <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
          <button
            onClick={() => navigate('/classes')}
            style={{ background: 'transparent', color: 'white', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', cursor: 'pointer', fontFamily: 'Rajdhani, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}
          >
            <ArrowLeft size={18} /> Back to Programs
          </button>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '2rem' }}>{program.flag}</span>
            <span style={{ background: program.color, color: 'white', padding: '0.3rem 0.8rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {program.badge}
            </span>
          </div>

          <h1 className="cd-hero-title">{program.title}</h1>
          <p className="cd-hero-subtitle">{program.subtitle}</p>
        </div>
      </section>

      {/* Content */}
      <section style={{ marginTop: '-2rem', position: 'relative', zIndex: 20 }}>
        <div className="container">
          <div className="cd-grid">

            {/* Left Column (Main Info) */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="cd-main-card">
                <h2 className="cd-section-title">
                  <Shield color={program.color} size={26} /> About the Program
                </h2>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1.05rem', fontFamily: 'Inter, sans-serif' }}>
                  {program.desc}
                </p>

                <div className="divider" style={{ background: program.color, margin: '2.5rem 0' }} />

                <h2 className="cd-section-title">
                  <Target color={program.color} size={26} /> Selection Process
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {program.selection.map((sel, idx) => (
                    <div key={idx} className="cd-selection-item">
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(13,31,45,0.05)', border: `2px solid ${program.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--secondary)', flexShrink: 0, fontFamily: 'Rajdhani, sans-serif' }}>
                        {idx + 1}
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.05rem', marginBottom: '0.3rem', fontFamily: 'Rajdhani, sans-serif' }}>{sel.step}</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontFamily: 'Inter, sans-serif', lineHeight: 1.6 }}>{sel.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column (Sidebar) */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <div className="cd-sidebar">
                <h3 style={{ color: program.color, fontSize: '1.3rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={20} /> Eligibility Criteria
                </h3>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                  {program.eligibility.map((req, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <div style={{ color: program.color, marginTop: '0.2rem' }}>•</div>
                      <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', lineHeight: 1.5, fontFamily: 'Inter, sans-serif' }}>{req}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '1.25rem', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <Calendar size={18} color={program.color} />
                    <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Intake Frequency</span>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', margin: 0 }}>{program.badge} recruitment drive.</p>
                </div>

                <Link to="/contact" className="btn-primary cd-register-btn">
                  Register for Training
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ClassDetail;
