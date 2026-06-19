import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Target, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useContent } from '../hooks/useQueries';

const TEAM = [
  { name: 'Prakash Gurung',    role: 'Managing Director',            img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400' },
  { name: 'Kum Prasad Tamang', role: 'Physical Training Instructor', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400' },
  { name: 'Sajan Pata Magar',  role: 'Physical Training Instructor', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' },
];

const SUCCESS_STATS = [
  { army: 'British Gurkha Army',        rate: '80%', flag: '🇬🇧', color: 'var(--primary)' },
  { army: 'Singapore Police Force',     rate: '64%', flag: '🇸🇬', color: 'var(--army)' },
  { army: 'Indian Gorkha Army',         rate: '55%', flag: '🇮🇳', color: '#e57373' },
];

const VALUES = [
  { icon: <Shield size={28} />,  title: 'Discipline',   desc: 'We instil military-grade discipline from day one. Punctuality, commitment, and respect are non-negotiable.' },
  { icon: <Target size={28} />,  title: 'Excellence',   desc: 'Every drill, every session is designed to push you beyond your limits and towards peak performance.' },
  { icon: <Users size={28} />,   title: 'Brotherhood',  desc: 'Training together builds bonds stronger than steel. Our graduates carry the BGTC spirit throughout their careers.' },
  { icon: <Award size={28} />,   title: 'Proven Track Record', desc: 'Ranked 2nd best pre-army training centre in Nepal with thousands of successfully placed graduates.' },
];

const About = () => {
  const { data: content = {} } = useContent();
  const aboutText = content.about_us || 'A team of professionals with high experience in pre-Army training. BGTC has successfully trained thousands of students, achieving remarkable results in selection. Ranked 2nd best pre-army training centre across Nepal based on selection success rate.';

  return (
    <div style={{ background: '#f4f5f0' }}>
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section style={{
        paddingTop: 'var(--navbar-height)',
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
            <div className="section-label" style={{ justifyContent: 'center', color: 'var(--primary)' }}>About Us</div>
            <h1 style={{ color: 'white', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', marginBottom: '1.5rem' }}>
              Who Are We?
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.2rem', maxWidth: '640px', margin: '0 auto', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
              The British Gurkha Training Centre — where Nepal's finest youth are forged into elite soldiers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Our Story ─────────────────────────────────────────────────── */}
      <section style={{ padding: '6rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="section-label">Our Story</div>
              <h2 className="section-title">Built for Warriors,<br />By Warriors</h2>
              <div className="divider" />
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '1.25rem', fontFamily: 'Inter, sans-serif' }}>
                {aboutText}
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '1.25rem', fontFamily: 'Inter, sans-serif' }}>
                Located in <strong style={{ color: 'var(--secondary)' }}>Kantipur Marga-15, near the Ban (Forestry) Campus in Pokhara</strong>, our facility provides everything an aspiring Gurkha soldier needs — from state-of-the-art training grounds to hostel accommodation and academic coaching.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, fontFamily: 'Inter, sans-serif' }}>
                Our <strong style={{ color: 'var(--secondary)' }}>goal</strong> is simple: to provide quality training and all prerequisites for youth to become an ultimate Gurkha.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div style={{ position: 'relative' }}>
                <img
                  src="https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&q=80&w=700"
                  alt="Military training"
                  style={{ width: '100%', borderRadius: '16px', boxShadow: '0 30px 60px rgba(0,0,0,0.15)' }}
                />
                <div style={{
                  position: 'absolute', bottom: '-1.5rem', left: '-1.5rem',
                  background: 'var(--secondary)', color: 'white',
                  padding: '1.5rem', borderRadius: '12px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  borderLeft: '4px solid var(--primary)',
                }}>
                  <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '2rem', color: 'var(--primary)', margin: 0, lineHeight: 1 }}>2nd</p>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0, fontFamily: 'Rajdhani, sans-serif' }}>Best in Nepal</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Success Rates ──────────────────────────────────────────────── */}
      <section style={{ padding: '6rem 0', background: 'var(--secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Selection Success</div>
            <h2 className="section-title light">Our Success Rates</h2>
            <p className="section-desc light" style={{ margin: '0 auto' }}>
              Numbers that speak for themselves. Our results are a testament to our training methodology.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {SUCCESS_STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                style={{
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px', padding: '2.5rem', textAlign: 'center',
                  borderTop: `4px solid ${s.color}`,
                }}
              >
                <p style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{s.flag}</p>
                <p style={{ color: s.color, fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '4rem', lineHeight: 1, margin: '0 0 0.5rem' }}>{s.rate}</p>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Rajdhani, sans-serif', textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.9rem' }}>{s.army}</p>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', marginTop: '0.5rem', fontFamily: 'Inter, sans-serif' }}>Selection success rate</p>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <blockquote style={{ color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', fontSize: '1rem', fontFamily: 'Inter, sans-serif' }}>
              "A great success story is the proof that you gave your dream your very best."
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────────────────── */}
      <section style={{ padding: '6rem 0', background: '#f4f5f0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Our Values</div>
            <h2 className="section-title">What We Stand For</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {VALUES.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ background: 'white', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid var(--border-color)' }}
              >
                <div style={{ background: 'var(--army)', borderRadius: '10px', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginBottom: '1.25rem' }}>
                  {v.icon}
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>{v.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontFamily: 'Inter, sans-serif', fontSize: '0.92rem' }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ──────────────────────────────────────────────────────── */}
      <section style={{ padding: '6rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Leadership</div>
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-desc" style={{ margin: '0 auto' }}>
              Experienced professionals who have walked the path you aspire to walk.
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
                <div style={{ height: '280px', overflow: 'hidden' }}>
                  <img src={member.img} alt={member.name} className="hover-scale" style={{ width: '100%', height: '280px', objectFit: 'cover' }} />
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

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section style={{ padding: '6rem 0', background: 'var(--army)', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ color: 'white', fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1rem' }}>
              Start Your Journey Today
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', marginBottom: '2.5rem', fontFamily: 'Inter, sans-serif' }}>
              Join the thousands of successful graduates who trusted BGTC to prepare them for greatness.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary" style={{ background: 'white', color: 'var(--army)', borderColor: 'white' }}>
                Register Now <ArrowRight size={16} />
              </Link>
              <Link to="/classes" className="btn-outline" style={{ color: 'white', borderColor: 'white' }}>
                View Classes
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
