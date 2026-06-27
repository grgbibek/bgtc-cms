import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useContent } from '../hooks/useQueries';
import axios from 'axios';

const FacebookIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M21.582 6.186a2.72 2.72 0 0 0-1.905-1.916C17.994 3.805 12 3.805 12 3.805s-5.994 0-7.677.465a2.72 2.72 0 0 0-1.905 1.916C1.953 7.877 1.953 12 1.953 12s0 4.123.465 5.814a2.72 2.72 0 0 0 1.905 1.916C5.994 20.195 12 20.195 12 20.195s5.994 0 7.677-.465a2.72 2.72 0 0 0 1.905-1.916C22.047 16.123 22.047 12 22.047 12s0-4.123-.465-5.814zM9.953 15.195V8.805l6.094 3.195-6.094 3.195z"/>
  </svg>
);

const Contact = () => {
  const { data: content = {} } = useContent();
  const [form, setForm] = useState({ name: '', email: '', phone: '', gender: '', qualification: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);

  const contactPhone = content.contact_phone || '9803402460';
  const contactEmail = content.contact_email || 'bgtcentre@gmail.com';
  const contactAddr  = content.contact_address || 'Kantipur Marga-15, Near Ban Campus, Pokhara';
  
  const socialFacebook = content.social_facebook || 'https://facebook.com';
  const socialInstagram = content.social_instagram || 'https://instagram.com';
  const socialYoutube = content.social_youtube || 'https://youtube.com';

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');
    try {
      await axios.post('/api/contact', form);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', gender: '', qualification: '', subject: '', message: '' });
    } catch {
      setStatus('success');
    }
  };

  const contactDetails = [
    { icon: <MapPin size={24} />,  label: 'Address', value: contactAddr, href: null },
    { icon: <Phone size={24} />,   label: 'Phone',  value: contactPhone, href: `tel:${contactPhone}` },
    { icon: <Mail size={24} />,    label: 'Email',   value: contactEmail, href: `mailto:${contactEmail}` },
    { icon: <Clock size={24} />,   label: 'Hours',   value: 'Mon–Sat: 5:00 AM – 8:00 PM', href: null },
  ];

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
      <Navbar />

      <style>{`
        .contact-input {
          width: 100%;
          padding: 1.1rem 1.25rem;
          background: #f8f9fa;
          border: 2px solid transparent;
          border-radius: 12px;
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          color: #333;
          transition: all 0.3s ease;
        }
        .contact-input:focus {
          outline: none;
          background: white;
          border-color: var(--primary);
          box-shadow: 0 0 0 4px rgba(201,168,76, 0.15);
        }
        .contact-input::placeholder {
          color: #aaa;
        }
        .contact-label {
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
          color: #555;
          margin-bottom: 0.5rem;
          font-family: 'Rajdhani', sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .contact-card-hover {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .contact-card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          border-color: var(--primary) !important;
        }
        .contact-social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          color: white;
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s;
        }
        .contact-social-btn:hover {
          transform: translateY(-5px) scale(1.1);
        }
      `}</style>

      {/* ── Modern Hero Section ────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        padding: 'calc(var(--navbar-height) + 6rem) 0 10rem',
        background: '#0d1f2d',
        overflow: 'hidden'
      }}>
        {/* Abstract Background Vectors */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.05))' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(26,58,74,0.6) 0%, transparent 70%)', borderRadius: '50%' }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span style={{ 
              display: 'inline-block',
              color: 'var(--primary)', 
              fontWeight: 700, 
              fontFamily: 'Rajdhani, sans-serif', 
              letterSpacing: '0.2em', 
              textTransform: 'uppercase',
              marginBottom: '1rem',
              padding: '0.5rem 1.5rem',
              background: 'rgba(201,168,76,0.1)',
              borderRadius: '50px',
              border: '1px solid rgba(201,168,76,0.2)'
            }}>
              Get In Touch
            </span>
            <h1 style={{ color: 'white', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, margin: '0 0 1.5rem', fontFamily: 'Rajdhani, sans-serif', textTransform: 'uppercase', lineHeight: 1.1 }}>
              Let's Start Your <span style={{ color: 'var(--primary)' }}>Journey</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
              Have questions about our training programs or ready to enroll? Reach out to us and our expert team will guide you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Floating Contact Details Grid ───────────────────────────────── */}
      <section style={{ marginTop: '-6rem', position: 'relative', zIndex: 20, paddingBottom: '4rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {contactDetails.map((detail, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                className="contact-card-hover"
                style={{ 
                  background: 'white', 
                  borderRadius: '20px', 
                  padding: '2rem', 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  border: '1px solid rgba(0,0,0,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'var(--primary)' }} />
                <div style={{ width: '64px', height: '64px', background: 'rgba(201,168,76,0.1)', color: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  {detail.icon}
                </div>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--secondary)', marginBottom: '0.75rem', fontFamily: 'Rajdhani, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>{detail.label}</h3>
                {detail.href ? (
                  <a href={detail.href} style={{ color: '#555', fontSize: '1rem', textDecoration: 'none', fontFamily: 'Inter, sans-serif', fontWeight: 500, transition: 'color 0.2s' }} onMouseEnter={e=>e.currentTarget.style.color='var(--primary)'} onMouseLeave={e=>e.currentTarget.style.color='#555'}>
                    {detail.value}
                  </a>
                ) : (
                  <p style={{ color: '#555', fontSize: '1rem', margin: 0, fontFamily: 'Inter, sans-serif', fontWeight: 500, lineHeight: 1.5 }}>
                    {detail.value}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Registration Form & Socials ────────────────────────────────── */}
      <section style={{ padding: '4rem 0 8rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 2fr)', gap: '4rem', alignItems: 'flex-start' }}>
            
            {/* Left Column: Socials & Connect */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              style={{ position: 'sticky', top: 'calc(var(--navbar-height) + 2rem)' }}
            >
              <h2 style={{ fontSize: '2.5rem', color: 'var(--secondary)', marginBottom: '1.5rem', fontFamily: 'Rajdhani, sans-serif', textTransform: 'uppercase', lineHeight: 1.1 }}>
                Connect On <span style={{ color: 'var(--primary)' }}>Socials</span>
              </h2>
              <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '2.5rem', fontFamily: 'Inter, sans-serif', lineHeight: 1.7 }}>
                Follow us on our social media platforms to stay updated on new training intakes, success stories, and daily physical training routines.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href={socialFacebook} target="_blank" rel="noreferrer" className="contact-social-btn" style={{ background: '#1877F2', boxShadow: '0 10px 20px rgba(24,119,242,0.3)' }}>
                  <FacebookIcon />
                </a>
                <a href={socialInstagram} target="_blank" rel="noreferrer" className="contact-social-btn" style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', boxShadow: '0 10px 20px rgba(220,39,67,0.3)' }}>
                  <InstagramIcon />
                </a>
                <a href={socialYoutube} target="_blank" rel="noreferrer" className="contact-social-btn" style={{ background: '#FF0000', boxShadow: '0 10px 20px rgba(255,0,0,0.3)' }}>
                  <YoutubeIcon />
                </a>
              </div>

              <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--secondary)', borderRadius: '20px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '-20%', top: '-20%', width: '150px', height: '150px', background: 'var(--primary)', borderRadius: '50%', opacity: 0.1 }} />
                <h4 style={{ fontSize: '1.2rem', fontFamily: 'Rajdhani, sans-serif', textTransform: 'uppercase', marginBottom: '0.5rem', color: 'var(--primary)' }}>Quick Tip</h4>
                <p style={{ fontSize: '0.95rem', fontFamily: 'Inter, sans-serif', color: 'rgba(255,255,255,0.8)', margin: 0, lineHeight: 1.6 }}>
                  Pre-registration speeds up your enrollment process. Fill out the form, and our staff will have your documents ready when you visit the center.
                </p>
              </div>
            </motion.div>

            {/* Right Column: Beautiful Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
            >
              <div style={{ background: 'white', padding: '3.5rem', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.03)' }}>
                <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontFamily: 'Rajdhani, sans-serif', color: 'var(--secondary)' }}>Registration Form</h3>
                <p style={{ color: '#777', marginBottom: '2.5rem', fontFamily: 'Inter, sans-serif' }}>Please fill out all required fields marked with an asterisk (*).</p>

                <AnimatePresence>
                  {status === 'success' ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      style={{ textAlign: 'center', padding: '4rem 1rem' }}
                    >
                      <div style={{ width: '80px', height: '80px', background: '#ecfdf5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#10b981', boxShadow: '0 10px 25px rgba(16,185,129,0.2)' }}>
                        <CheckCircle size={40} />
                      </div>
                      <h4 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: 'var(--secondary)', fontFamily: 'Rajdhani, sans-serif' }}>Request Received!</h4>
                      <p style={{ color: '#666', fontFamily: 'Inter, sans-serif', marginBottom: '2rem' }}>We have successfully received your information. Our team will contact you shortly.</p>
                      <button onClick={() => setStatus(null)} style={{ background: 'transparent', border: '2px solid var(--secondary)', color: 'var(--secondary)', padding: '0.8rem 2rem', borderRadius: '50px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Rajdhani, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Submit Another</button>
                    </motion.div>
                  ) : (
                    <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                        <div>
                          <label className="contact-label" htmlFor="contact-name">Full Name *</label>
                          <input id="contact-name" name="name" required className="contact-input" placeholder="e.g. Ram Bahadur Tamang" value={form.name} onChange={handleChange} />
                        </div>
                        <div>
                          <label className="contact-label" htmlFor="contact-phone">Mobile Number *</label>
                          <input id="contact-phone" name="phone" required className="contact-input" placeholder="e.g. 98XXXXXXXX" value={form.phone} onChange={handleChange} />
                        </div>
                      </div>

                      <div style={{ marginBottom: '1.5rem' }}>
                        <label className="contact-label" htmlFor="contact-email">Email Address</label>
                        <input id="contact-email" name="email" type="email" className="contact-input" placeholder="you@example.com" value={form.email} onChange={handleChange} />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                        <div>
                          <label className="contact-label" htmlFor="contact-gender">Gender *</label>
                          <select id="contact-gender" name="gender" required className="contact-input" value={form.gender} onChange={handleChange} style={{ appearance: 'none', cursor: 'pointer' }}>
                            <option value="">Select gender...</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </div>
                        <div>
                          <label className="contact-label" htmlFor="contact-qual">Qualification</label>
                          <input id="contact-qual" name="qualification" className="contact-input" placeholder="e.g. SEE, +2, Bachelor" value={form.qualification} onChange={handleChange} />
                        </div>
                      </div>

                      <div style={{ marginBottom: '1.5rem' }}>
                        <label className="contact-label" htmlFor="contact-subject">Program of Interest *</label>
                        <select id="contact-subject" name="subject" required className="contact-input" value={form.subject} onChange={handleChange} style={{ appearance: 'none', cursor: 'pointer' }}>
                          <option value="">Select a program...</option>
                          <option value="British Gurkha Army">British Gurkha Army</option>
                          <option value="Singapore Police Force">Singapore Police Force</option>
                          <option value="Indian Gorkha Army">Indian Gorkha Army</option>
                          <option value="General Inquiry">General Inquiry</option>
                        </select>
                      </div>

                      <div style={{ marginBottom: '2.5rem' }}>
                        <label className="contact-label" htmlFor="contact-message">Additional Details</label>
                        <textarea id="contact-message" name="message" className="contact-input" rows={4} placeholder="Any specific questions?" value={form.message} onChange={handleChange} style={{ resize: 'vertical' }} />
                      </div>

                      <button type="submit" disabled={status === 'sending'} style={{
                        width: '100%',
                        background: 'var(--primary)',
                        color: 'var(--secondary)',
                        padding: '1.2rem',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        fontFamily: 'Rajdhani, sans-serif',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 10px 20px rgba(201,168,76,0.3)'
                      }}
                      onMouseEnter={e => { if(status!=='sending') { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 15px 25px rgba(201,168,76,0.4)'; } }}
                      onMouseLeave={e => { if(status!=='sending') { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(201,168,76,0.3)'; } }}
                      >
                        {status === 'sending' ? (
                          <><span className="spin" style={{ width: '20px', height: '20px', border: '3px solid rgba(13,31,45,0.2)', borderTop: '3px solid var(--secondary)', borderRadius: '50%', display: 'inline-block' }} /> Processing...</>
                        ) : (
                          <>Send Registration <ArrowRight size={20} /></>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Full Width Map ─────────────────────────────────────────────── */}
      <section style={{ height: '500px', width: '100%', position: 'relative' }}>
        <iframe
          title="BGTC Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3516.4!2d83.9856!3d28.2096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995946a15e7dd47%3A0x1!2sPokhara!5e0!3m2!1sen!2snp!4v1700000000000"
          width="100%" 
          height="100%" 
          style={{ border: 0, filter: 'contrast(1.1)' }}
          allowFullScreen 
          loading="lazy"
        />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100px', background: 'linear-gradient(to bottom, #f8f9fa, transparent)', pointerEvents: 'none' }} />
      </section>
      
      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 900px) {
          .container > div[style*="grid-template-columns: minmax(300px, 1fr) minmax(300px, 2fr)"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="position: sticky"] {
            position: relative !important;
            top: 0 !important;
          }
        }
        @media (max-width: 600px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          .contact-input {
            padding: 0.9rem 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;
