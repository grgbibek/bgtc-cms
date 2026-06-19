import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Shield, Award, Clock, MapPin, Target, Calendar } from 'lucide-react';
import Navbar from '../components/Navbar';

const ARMY_CLASSES = {
  'british-gurkha': {
    flag: '🇬🇧', title: 'British Gurkha Army', subtitle: 'Most Prestigious Selection',
    badge: 'Once a Year', badgeColor: '#c9a84c', color: 'var(--primary)',
    img: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&q=80&w=1200',
    desc: "The Brigade of Gurkhas is a unique organization in the British Army. Gurkhas are known for their exceptional courage, loyalty, and resilience. Joining the British Gurkha Army is highly competitive, requiring peak physical fitness and mental fortitude.",
    eligibility: [
      'Nepalese youth from all parts of Nepal',
      'Except Kathmandu, Bhaktapur, and Lalitpur districts',
      'All castes eligible',
      'Minimum Height: 158cm',
      'BMI: 17.0 - 24.0',
      'Education: Minimum SEE with C grade in English & Math'
    ],
    selection: [
      { step: 'Phase 1: Registration', desc: 'Initial documentation check and basic physical screening at regional centers.' },
      { step: 'Phase 2: Regional Selection', desc: 'Held in Pokhara and Dharan. Includes English tests, math tests, and initial physicals (Heaving, Sit-ups, 800m run).' },
      { step: 'Phase 3: Central Selection', desc: 'The ultimate test in Pokhara camp. Includes the infamous Doko Race (5.8km carrying 25kg uphill), medicals, and interviews.' }
    ]
  },
  'singapore-police': {
    flag: '🇸🇬', title: 'Singapore Police Force', subtitle: 'Gurkha Contingent',
    badge: 'Once a Year', badgeColor: '#c9a84c', color: '#e74c3c',
    img: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&q=80&w=1200',
    desc: "The Gurkha Contingent (GC) is a line department of the Singapore Police Force consisting primarily of Gurkhas from Nepal. They are a highly trained elite unit serving as a special guard force and counter-terrorist force.",
    eligibility: [
      'Nepalese youth from all parts of Nepal',
      'Except Kathmandu Valley districts',
      'All castes eligible',
      'Minimum Height: 160cm',
      'BMI: 18.0 - 25.0',
      'Education: Minimum SEE with C grade in English & Math'
    ],
    selection: [
      { step: 'Phase 1: Registration', desc: 'Initial documentation check at regional centers.' },
      { step: 'Phase 2: Regional Selection', desc: 'Held in Pokhara and Dharan. Includes physical fitness tests, written tests.' },
      { step: 'Phase 3: Central Selection', desc: 'Final grueling physicals, comprehensive medical examination, and final interview in Pokhara.' }
    ]
  },
  'indian-gorkha': {
    flag: '🇮🇳', title: 'Indian Gorkha Army', subtitle: 'Six Gorkha Regiments',
    badge: '1-2 Times/Year', badgeColor: '#3d5a3e', color: '#ff9800',
    img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=1200',
    desc: "Since the independence of India in 1947, six Gurkha regiments have been part of the Indian Army. They have a proud history of valor and serve across various terrains and roles within the Indian military.",
    eligibility: [
      'Nepalese youth from all parts of Nepal',
      'All castes eligible EXCEPT Chaudhary caste',
      'Minimum Height: 157cm',
      'BMI: Proportionate to height and age',
      'Education: Minimum 8th/10th pass depending on the trade applied for'
    ],
    selection: [
      { step: 'Phase 1: Rally/Registration', desc: 'Open recruitment rallies held at various regional camps.' },
      { step: 'Phase 2: Physical Test', desc: '1.6km run, pull-ups, 9 feet ditch jump, zig-zag balance.' },
      { step: 'Phase 3: Medical & Written', desc: 'Detailed medical examination followed by a Common Entrance Examination (CEE).' }
    ]
  }
};

const ClassDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
      <Navbar />

      {/* Hero */}
      <section style={{
        paddingTop: 'var(--navbar-height)',
        height: '60vh', minHeight: '400px',
        backgroundImage: `linear-gradient(to top, #0d1f2d 0%, transparent 80%), url(${program.img})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', alignItems: 'flex-end', paddingBottom: '4rem',
        color: 'white', position: 'relative'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
          <button onClick={() => navigate('/classes')} style={{ background: 'transparent', color: 'white', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', cursor: 'pointer', fontFamily: 'Rajdhani, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
            <ArrowLeft size={18} /> Back to Programs
          </button>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '2.5rem' }}>{program.flag}</span>
            <span style={{ background: program.color, color: 'white', padding: '0.3rem 0.8rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {program.badge}
            </span>
          </div>
          
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', margin: '0 0 0.5rem', color: 'white' }}>{program.title}</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', fontFamily: 'Rajdhani, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>{program.subtitle}</p>
        </div>
      </section>

      {/* Content */}
      <section style={{ marginTop: '-2rem', position: 'relative', zIndex: 20 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
            
            {/* Left Column (Main Info) */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div style={{ background: 'white', borderRadius: '16px', padding: '3rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', marginBottom: '2rem', border: '1px solid var(--border-color)' }}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Shield color={program.color} size={28} /> About the Program
                </h2>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1.05rem', fontFamily: 'Inter, sans-serif' }}>
                  {program.desc}
                </p>

                <div className="divider" style={{ background: program.color, margin: '2.5rem 0' }} />

                <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Target color={program.color} size={28} /> Selection Process
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {program.selection.map((sel, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '1.5rem' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(13,31,45,0.05)', border: `2px solid ${program.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--secondary)', flexShrink: 0, fontFamily: 'Rajdhani, sans-serif' }}>
                        {idx + 1}
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '0.3rem', fontFamily: 'Rajdhani, sans-serif' }}>{sel.step}</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontFamily: 'Inter, sans-serif', lineHeight: 1.6 }}>{sel.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column (Sidebar) */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <div style={{ background: 'var(--secondary)', color: 'white', borderRadius: '16px', padding: '2.5rem', position: 'sticky', top: 'calc(var(--navbar-height) + 2rem)' }}>
                <h3 style={{ color: program.color, fontSize: '1.4rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={20} /> Eligibility Criteria
                </h3>
                
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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

                <Link to="/contact" className="btn-primary" style={{ width: '100%', justifyContent: 'center', background: program.color, borderColor: program.color }}>
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
