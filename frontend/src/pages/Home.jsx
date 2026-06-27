import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Target, Star, Users, Award, ArrowRight, ChevronRight,
  MapPin, Phone, Mail, Clock, X, CheckCircle, Dumbbell,
  BookOpen, Home as HomeIcon, Utensils, Waves
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AnnouncementBanner from '../components/AnnouncementBanner';
import { useContent } from '../hooks/useQueries';

const FacebookIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M21.582 6.186a2.72 2.72 0 0 0-1.905-1.916C17.994 3.805 12 3.805 12 3.805s-5.994 0-7.677.465a2.72 2.72 0 0 0-1.905 1.916C1.953 7.877 1.953 12 1.953 12s0 4.123.465 5.814a2.72 2.72 0 0 0 1.905 1.916C5.994 20.195 12 20.195 12 20.195s5.994 0 7.677-.465a2.72 2.72 0 0 0 1.905-1.916C22.047 16.123 22.047 12 22.047 12s0-4.123-.465-5.814zM9.953 15.195V8.805l6.094 3.195-6.094 3.195z" />
  </svg>
);

/* ── Hero background images (fallback) ─────────────────────────────────── */
const heroVideoBg = 'https://images.unsplash.com/photo-1580694080374-e81a4f694f5e?auto=format&fit=crop&q=80&w=1600';
// Gurkha/military training photo

/* ════════════════════════════════════════════════════════════════════════ */
const Home = () => {
  const navigate = useNavigate();
  const { data: content = {} } = useContent();

  const socialFacebook = content.social_facebook || 'https://facebook.com';
  const socialInstagram = content.social_instagram || 'https://instagram.com';
  const socialYoutube = content.social_youtube || 'https://youtube.com';

  const heroTitle = content.hero_title || 'Discipline Today,\nStrength Tomorrow';
  const heroSubtitle = content.hero_subtitle || 'Quality pre-army physical training for youth aspiring to join the British Gurkha Army, Singapore Police Force, Indian Army, and more — guided by Ex-British Army PTIs.';
  const aboutText = content.about_us || 'A team of professionals with high experience in pre-Army training. BGTC has successfully trained thousands of students, achieving remarkable results in selection. Ranked 2nd best pre-army training centre across Nepal.';
  const contactPhone = content.contact_phone || '9803402460';
  const contactEmail = content.contact_email || 'bgtcentre@gmail.com';
  const contactAddr = content.contact_address || 'Kantipur Marga-15, Near Ban Campus, Pokhara';

  const stats = [
    { value: content.success_rate_bga || '80%', label: 'British Gurkha Success Rate' },
    { value: content.success_rate_spf || '64%', label: 'Singapore Police Success Rate' },
    { value: content.success_rate_ia || '55%', label: 'Indian Army Success Rate' },
    { value: content.students_trained || '1000+', label: 'Students Trained' },
  ];

  const ARMY_CLASSES = [
    {
      id: 'british-gurkha', flag: '🇬🇧',
      title: content.class_1_title || 'British Gurkha Army',
      subtitle: content.class_1_subtitle || 'Most Prestigious Selection',
      desc: content.class_1_desc || 'Join the elite British Gurkha Regiment. Training covering all physical tests including heaving, 800m, 1.5-mile run, Doko Race (5.8 KM) and more.',
      badge: content.class_1_badge || 'Once a Year', badgeColor: '#c9a84c',
      successRate: content.success_rate_bga || '80%',
      img: content.class_1_img || 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&q=80&w=800',
      route: '/classes/british-gurkha',
    },
    {
      id: 'singapore-police', flag: '🇸🇬',
      title: content.class_2_title || 'Singapore Police Force',
      subtitle: content.class_2_subtitle || 'Gurkha Contingent',
      desc: content.class_2_desc || 'Serve as part of the elite Gurkha Contingent of Singapore Police Force — a specialized counter-terrorist and guard force.',
      badge: content.class_2_badge || 'Once a Year', badgeColor: '#c9a84c',
      successRate: content.success_rate_spf || '64%',
      img: content.class_2_img || 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&q=80&w=800',
      route: '/classes/singapore-police',
    },
    {
      id: 'indian-gorkha', flag: '🇮🇳',
      title: content.class_3_title || 'Indian Gorkha Army',
      subtitle: content.class_3_subtitle || 'Six Gorkha Regiments',
      desc: content.class_3_desc || 'Join one of the six prestigious Gorkha regiments of the Indian Army, established under the 1947 Tripartite Agreement.',
      badge: content.class_3_badge || '1–2 Times/Year', badgeColor: '#3d5a3e',
      successRate: content.success_rate_ia || '55%',
      img: content.class_3_img || 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800',
      route: '/classes/indian-gorkha',
    },
  ];

  const FACILITIES = [
    { icon: <Dumbbell size={28} />, title: content.service_1_title || 'Gym Hall', desc: content.service_1_desc || 'Fully equipped indoor gym with battle PT, circuit training, power bag lifts, and more.' },
    { icon: <HomeIcon size={28} />, title: content.service_2_title || 'Hostel', desc: content.service_2_desc || 'Comfortable on-site accommodation for students training away from home.' },
    { icon: <BookOpen size={28} />, title: content.service_3_title || 'Education', desc: content.service_3_desc || 'Academic support and coaching for the written portions of army selection.' },
    { icon: <Utensils size={28} />, title: content.service_4_title || 'Canteen', desc: content.service_4_desc || 'Nutritious meals designed to fuel your training and support peak physical performance.' },
    { icon: <Waves size={28} />, title: content.service_5_title || 'Swimming', desc: content.service_5_desc || 'Swimming training facility for full-body conditioning and endurance.' },
    { icon: <Target size={28} />, title: content.service_6_title || 'Sports Hall', desc: content.service_6_desc || 'Indoor courts for badminton and volleyball; multi-beep tests and medicine ball training.' },
  ];

  const TEAM = [
    { name: content.team_1_name || 'Prakash Gurung', role: content.team_1_role || 'Managing Director', img: content.team_1_img || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400' },
    { name: content.team_2_name || 'Kum Prasad Tamang', role: content.team_2_role || 'Physical Training Instructor', img: content.team_2_img || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400' },
    { name: content.team_3_name || 'Sajan Pata Magar', role: content.team_3_role || 'Physical Training Instructor', img: content.team_3_img || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' },
  ];

  return (
    <div style={{ background: '#f4f5f0' }}>
      <AnnouncementBanner content={content} />
      <Navbar />

      {/* ── 1. HERO ───────────────────────────────────────────────────── */}
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(13,31,45,0.92) 0%, rgba(13,31,45,0.75) 60%, rgba(61,90,62,0.7) 100%), url(${content.hero_image || heroVideoBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          paddingTop: 'var(--navbar-height)',
          minHeight: '100vh',
        }}
      >
        {/* Decorative grid lines */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }} />

        <div className="container hero-grid" style={{ zIndex: 1, position: 'relative', padding: '5rem 1.5rem' }}>
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)',
                color: 'var(--primary)', padding: '0.5rem 1.2rem',
                borderRadius: '3px', fontWeight: 700, fontSize: '0.78rem',
                marginBottom: '1.75rem', textTransform: 'uppercase', letterSpacing: '0.12em',
                fontFamily: 'Rajdhani, sans-serif',
              }}
            >
              <Shield size={14} />
              Est. Pokhara, Nepal · Ex-British Army PTIs
            </motion.div>

            <h1 style={{ whiteSpace: 'pre-line' }}>
              {heroTitle}
            </h1>

            <p style={{ marginTop: '1.5rem' }}>{heroSubtitle}</p>

            <div className="hero-cta-group" style={{ marginTop: '2.5rem' }}>
              <Link to="/contact" className="btn-primary" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
                Register Now <ArrowRight size={18} />
              </Link>
              <Link to="/classes" className="btn-white" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
                Our Classes <ChevronRight size={18} />
              </Link>
            </div>

            {/* Quick trust indicators */}
            <div style={{ display: 'flex', gap: '2rem', marginTop: '3rem', flexWrap: 'wrap' }}>
              {[
                { icon: <CheckCircle size={16} />, text: content.trust_1_title || 'Ranked 2nd Best in Nepal' },
                { icon: <CheckCircle size={16} />, text: content.trust_2_title || 'Ex-British Army Trainers' },
                { icon: <CheckCircle size={16} />, text: content.trust_3_title || '1000+ Successful Students' },
              ].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem' }}>
                  <span style={{ color: 'var(--primary)' }}>{t.icon}</span>
                  {t.text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right side — Army flags & class preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            {ARMY_CLASSES.map((cls, i) => (
              <motion.div
                key={cls.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.15 }}
                onClick={() => navigate(cls.route)}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '1.1rem 1.5rem',
                  display: 'flex', alignItems: 'center', gap: '1.25rem',
                  cursor: 'pointer',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.3s',
                }}
                whileHover={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(201,168,76,0.4)' }}
              >
                <span style={{ fontSize: '2rem' }}>{cls.flag}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ color: 'white', fontWeight: 700, fontFamily: 'Rajdhani, sans-serif', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.04em', margin: 0 }}>{cls.title}</p>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', margin: 0, fontFamily: 'Inter, sans-serif' }}>{cls.subtitle}</p>
                </div>
                <span style={{ background: cls.badgeColor, color: '#0d1f2d', padding: '0.25rem 0.65rem', borderRadius: '3px', fontSize: '0.72rem', fontWeight: 700, fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
                  {cls.badge}
                </span>
              </motion.div>
            ))}
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', textAlign: 'center', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.06em' }}>
              + NEPAL ARMY · NEPAL POLICE · FRENCH FOREIGN LEGION
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. STATS BAR ──────────────────────────────────────────────── */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                className="stat-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h3>{s.value}</h3>
                <p>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. ABOUT ──────────────────────────────────────────────────── */}
      <section style={{ padding: '7rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem', alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="section-label">Who We Are</div>
              <h2 className="section-title">Forging Nepal's Finest Warriors</h2>
              <div className="divider" />
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1.5rem' }}>{aboutText}</p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2rem' }}>
                Training programs are designed and delivered by <strong style={{ color: 'var(--secondary)' }}>Ex-British Army Physical Training Instructors</strong> with decades of selection experience. Our curriculum covers every aspect of Gurkha selection — from the gruelling <em>Doko Race (5.8 KM)</em> to academic preparation.
              </p>
              <Link to="/about" className="btn-primary">
                Learn More <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}
            >
              {[
                { label: content.about_bullet_1_label || 'Physical Training', value: content.about_bullet_1_value || 'Daily Drills', color: 'var(--army)' },
                { label: content.about_bullet_2_label || 'Selection Rate', value: content.about_bullet_2_value || '80% BGA', color: 'var(--primary)' },
                { label: content.about_bullet_3_label || 'Experience', value: content.about_bullet_3_value || '20+ Years', color: 'var(--secondary)' },
                { label: content.about_bullet_4_label || 'Location', value: content.about_bullet_4_value || 'Pokhara', color: 'var(--army)' },
              ].map((item, i) => (
                <div key={i} style={{
                  background: '#f4f5f0', padding: '1.75rem', borderRadius: '12px',
                  borderLeft: `4px solid ${item.color}`,
                }}>
                  <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.5rem', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>{item.label}</p>
                  <p style={{ fontSize: '1.4rem', fontWeight: 700, color: item.color, fontFamily: 'Rajdhani, sans-serif' }}>{item.value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 4. ARMY CLASSES ───────────────────────────────────────────── */}
      <section id="classes" style={{ padding: '7rem 0', background: '#f4f5f0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Our Programs</div>
            <h2 className="section-title">Choose Your Path to Service</h2>
            <p className="section-desc" style={{ margin: '0 auto' }}>
              Specialized training programs tailored for each army selection process, taught by instructors who have been through it themselves.
            </p>
          </div>

          <div className="products-grid">
            {ARMY_CLASSES.map((cls, i) => (
              <motion.div
                key={cls.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                onClick={() => navigate(cls.route)}
                whileHover="hover"
                style={{
                  cursor: 'pointer',
                  background: 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                  border: '1px solid rgba(201,168,76,0.15)',
                  borderTop: '5px solid var(--primary)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  height: '100%',
                }}
              >
                {/* Image Container with Badges */}
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                  {/* Success Rate Badge (Top Left) */}
                  <div style={{
                    position: 'absolute', top: '1rem', left: '1rem',
                    background: 'rgba(13,31,45,0.9)', backdropFilter: 'blur(8px)',
                    border: `1px solid ${cls.badgeColor}`, borderRadius: '6px',
                    padding: '0.4rem 0.8rem', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center'
                  }}>
                    <span style={{ color: cls.badgeColor, fontFamily: 'Rajdhani', fontWeight: 800, fontSize: '1.1rem', lineHeight: 1 }}>{cls.successRate}</span>
                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.1rem', fontFamily: 'Rajdhani', fontWeight: 700 }}>Success</span>
                  </div>

                  {/* Program Intake Badge (Top Right) */}
                  <div style={{
                    position: 'absolute', top: '1rem', right: '1rem',
                    background: 'rgba(13,31,45,0.9)', backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px',
                    padding: '0.4rem 0.8rem', color: 'white', zIndex: 10,
                    fontFamily: 'Rajdhani', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase'
                  }}>
                    {cls.flag} {cls.badge}
                  </div>

                  <motion.img
                    src={cls.img}
                    alt={cls.title}
                    variants={{
                      hover: { scale: 1.06 }
                    }}
                    transition={{ duration: 0.4 }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Card Info Container */}
                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <p style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 700, fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    {cls.subtitle}
                  </p>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--secondary)', marginBottom: '0.75rem', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700 }}>
                    {cls.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1, fontFamily: 'Inter, sans-serif' }}>
                    {cls.desc}
                  </p>

                  {/* Gold Interactive CTA */}
                  <div style={{ marginTop: 'auto', paddingTop: '1.25rem', borderTop: '1px solid #f0f0eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--secondary)', fontWeight: 700, fontFamily: 'Rajdhani, sans-serif', fontSize: '0.92rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                      Explore Program
                    </span>
                    <motion.div
                      variants={{
                        hover: { x: 5, background: 'var(--primary)', color: '#0d1f2d' }
                      }}
                      transition={{ duration: 0.2 }}
                      style={{
                        width: '36px', height: '36px', borderRadius: '50%',
                        background: 'rgba(201,168,76,0.15)', color: 'var(--primary)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}
                    >
                      <ArrowRight size={16} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/classes" className="btn-outline">
              All Programs <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. TRAINING HIGHLIGHTS ────────────────────────────────────── */}
      <section style={{ padding: '7rem 0', background: 'var(--secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Physical Training</div>
            <h2 className="section-title light">What We Train</h2>
            <p className="section-desc light" style={{ margin: '0 auto' }}>
              Every drill, every exercise is designed to mirror the actual army selection tests.
            </p>
          </div>

          {/* Single wrapper animation — avoids animating 16 individual elements */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.25rem' }}
          >
            {[
              'Heaving', 'Sit-ups', 'Push-ups',
              '800m Run', 'Interval Run', 'Fartlek Run',
              '1.5–3.5 Mile Run', 'Doko Race (5.8 KM)',
              'Jerry Can Carry', 'Power Bag Lift',
              'Battle PT', 'Circuit Training',
              'Multi-Beep Test', 'Medicine Ball',
              'Swimming', 'Mid Thai Pool',
            ].map((drill, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(201,168,76,0.15)',
                  borderRadius: '8px',
                  padding: '1rem 1.25rem',
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  color: 'rgba(255,255,255,0.8)',
                  fontFamily: 'Rajdhani, sans-serif',
                  fontWeight: 600, fontSize: '0.95rem',
                  letterSpacing: '0.04em',
                }}
              >
                <span style={{ color: 'var(--primary)', flexShrink: 0 }}>▶</span>
                {drill}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 6. FACILITIES ─────────────────────────────────────────────── */}
      <section style={{ padding: '7rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Infrastructure</div>
            <h2 className="section-title">World-Class Facilities</h2>
            <p className="section-desc" style={{ margin: '0 auto' }}>
              Everything you need to train, rest, study, and succeed — all in one place in Pokhara.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {FACILITIES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{
                  background: '#f4f5f0', borderRadius: '16px',
                  padding: '2rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start',
                  border: '1px solid transparent', transition: 'all 0.3s',
                }}
                whileHover={{ borderColor: 'var(--primary)', background: 'white' }}
              >
                <div style={{ background: 'var(--army)', borderRadius: '10px', width: '52px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                  {f.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.15rem', marginBottom: '0.4rem' }}>{f.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/facilities" className="btn-outline">
              View All Facilities <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. TESTIMONIAL ────────────────────────────────────────────── */}
      <section style={{ padding: '7rem 0', background: 'var(--secondary)' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Student Success</div>
            <h2 className="section-title light">What Our Students Say</h2>
          </div>
          <motion.div
            className="testimonial-card"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.25rem', lineHeight: 1.8, marginBottom: '2rem', fontStyle: 'italic', paddingTop: '1rem', fontFamily: 'Inter, sans-serif' }}>
              "The Gurkha keeps faith not only with his fellow men but with great spiritual concepts, and above all, with himself."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.2rem', color: '#0d1f2d', fontFamily: 'Rajdhani, sans-serif' }}>
                SK
              </div>
              <div>
                <p style={{ color: 'white', fontWeight: 700, fontFamily: 'Rajdhani, sans-serif', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>Shashi Khatri</p>
                <p style={{ color: 'var(--primary)', fontSize: '0.85rem', margin: 0 }}>Former Student, BGTC</p>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.2rem' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="var(--primary)" color="var(--primary)" />)}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 8. TEAM ───────────────────────────────────────────────────── */}
      <section style={{ padding: '7rem 0', background: '#f4f5f0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Leadership</div>
            <h2 className="section-title">Our Training Team</h2>
            <p className="section-desc" style={{ margin: '0 auto' }}>
              Expert instructors with real selection experience leading you to success.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
            {TEAM.map((member, i) => (
              <motion.div
                key={i}
                className="team-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div style={{ height: '260px', overflow: 'hidden' }}>
                  <img src={member.img} alt={member.name} className="team-avatar hover-scale" style={{ height: '260px' }} loading="lazy" decoding="async" />
                </div>
                <div className="team-info">
                  <h4 style={{ fontSize: '1.25rem', marginBottom: '0.3rem' }}>{member.name}</h4>
                  <p style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600, fontFamily: 'Rajdhani, sans-serif', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. CONTACT STRIP ──────────────────────────────────────────── */}
      <section id="contact" style={{ padding: '8rem 0', position: 'relative', overflow: 'hidden' }}>
        {/* Background abstract elements */}
        <div style={{ position: 'absolute', inset: 0, background: 'var(--secondary)', zIndex: 0 }}></div>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '50%', background: 'linear-gradient(135deg, #0d1f2d 0%, #1a3a4a 100%)', zIndex: 0 }}></div>
        <div style={{ position: 'absolute', right: '-10%', top: '-20%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)', borderRadius: '50%', zIndex: 0 }}></div>
        <div style={{ position: 'absolute', left: '-5%', bottom: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(61,90,62,0.4) 0%, transparent 70%)', borderRadius: '50%', zIndex: 0 }}></div>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px', zIndex: 0 }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '24px',
              padding: '4rem',
              boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center'
            }}
          >
            <div>
              <div className="section-label" style={{ color: 'var(--primary)', marginBottom: '1rem', letterSpacing: '0.2em' }}>Get In Touch</div>
              <h2 style={{ color: 'white', fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, marginBottom: '1.5rem', fontFamily: 'Rajdhani, sans-serif', textTransform: 'uppercase' }}>Ready to <span style={{ color: 'var(--primary)' }}>Begin?</span></h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', marginBottom: '2.5rem', fontFamily: 'Inter, sans-serif', lineHeight: 1.8 }}>
                Start your journey to becoming a Gurkha. Contact us today for registration and training schedule information. We are here to guide you every step of the way.
              </p>
              <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: 'var(--primary)', color: 'var(--secondary)', padding: '1.1rem 2.5rem', borderRadius: '50px', fontWeight: 700, fontSize: '1rem', fontFamily: 'Rajdhani, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', transition: 'all 0.3s ease', boxShadow: '0 10px 20px rgba(201,168,76,0.3)' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 15px 25px rgba(201,168,76,0.4)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(201,168,76,0.3)'; }}
              >
                Contact Us <ArrowRight size={18} />
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {[
                { icon: <MapPin size={24} />, label: 'Location', value: contactAddr },
                { icon: <Phone size={24} />, label: 'Phone', value: contactPhone },
                { icon: <Mail size={24} />, label: 'Email', value: contactEmail },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 + 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                  style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', transition: 'transform 0.3s, background 0.3s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateX(10px)'; e.currentTarget.style.background = 'rgba(0,0,0,0.4)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.background = 'rgba(0,0,0,0.2)'; }}
                >
                  <div style={{ background: 'var(--army)', padding: '1.2rem', borderRadius: '14px', color: 'var(--primary)', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}>
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, margin: 0 }}>{item.label}</p>
                    <p style={{ color: 'white', fontWeight: 600, margin: 0 }}>{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────── */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo" style={{ marginBottom: '1rem' }}>
                {content.site_logo ? (
                  <img src={content.site_logo} alt={content.site_name || 'BGTC'} style={{ paddingTop: '0.5rem', height: '10rem', objectFit: 'contain' }} />
                ) : (
                  <div className="logo-emblem"><Shield size={20} strokeWidth={2.5} /></div>
                )}
                <div>
                  <span className="logo-text-main" style={{ fontSize: '2rem' }}>{content.site_name || 'BGTC'}</span>
                  <span className="logo-text-sub" style={{ fontSize: '0.8rem' }}>{content.site_tagline || 'British Gurkha Training Centre'}</span>
                </div>
              </div>
              <p>Providing quality pre-army physical training since our inception in Pokhara, Nepal. Ranked 2nd best pre-army training centre in Nepal.</p>
            </div>

            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                {[['/', 'Home'], ['/about', 'About Us'], ['/classes', 'Classes'], ['/contact', 'Contact']].map(([to, label]) => (
                  <li key={to}><Link to={to}>{label}</Link></li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h4>Our Classes</h4>
              <ul>
                {[
                  ['/classes/british-gurkha', 'British Gurkha Army'],
                  ['/classes/singapore-police', 'Singapore Police Force'],
                  ['/classes/indian-gorkha', 'Indian Gorkha Army'],
                ].map(([to, label]) => (
                  <li key={to}><Link to={to}>{label}</Link></li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h4>Contact</h4>
              <ul>
                <li><a href={`tel:${contactPhone}`}>{contactPhone}</a></li>
                <li><a href="tel:061-431230">061-431230</a></li>
                <li><a href={`mailto:${contactEmail}`}>{contactEmail}</a></li>
              </ul>

              <h4 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Follow Us</h4>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href={socialFacebook} target="_blank" rel="noreferrer" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', transition: 'all 0.3s' }} onMouseEnter={e => { e.currentTarget.style.background = '#1877F2'; e.currentTarget.style.transform = 'translateY(-3px)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'none'; }}>
                  <FacebookIcon />
                </a>
                <a href={socialInstagram} target="_blank" rel="noreferrer" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', transition: 'all 0.3s' }} onMouseEnter={e => { e.currentTarget.style.background = '#E1306C'; e.currentTarget.style.transform = 'translateY(-3px)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'none'; }}>
                  <InstagramIcon />
                </a>
                <a href={socialYoutube} target="_blank" rel="noreferrer" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', transition: 'all 0.3s' }} onMouseEnter={e => { e.currentTarget.style.background = '#FF0000'; e.currentTarget.style.transform = 'translateY(-3px)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'none'; }}>
                  <YoutubeIcon />
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} British Gurkha Training Centre Pvt. Ltd. All rights reserved.</p>
            <p style={{ color: 'rgba(255,255,255,0.2)' }}>Kantipur Marga-15, Pokhara, Nepal</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
