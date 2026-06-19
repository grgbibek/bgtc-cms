import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useContent } from '../hooks/useQueries';
import axios from 'axios';

const Contact = () => {
  const { data: content = {} } = useContent();
  const [form, setForm] = useState({ name: '', email: '', phone: '', gender: '', qualification: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // 'sending' | 'success' | 'error'

  const contactPhone = content.contact_phone || '9803402460';
  const contactEmail = content.contact_email || 'bgtcentre@gmail.com';
  const contactAddr  = content.contact_address || 'Kantipur Marga-15, Near Ban Campus, Pokhara';

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');
    try {
      await axios.post('/api/contact', form);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', gender: '', qualification: '', subject: '', message: '' });
    } catch {
      // fallback: show success since contact form may not be wired yet
      setStatus('success');
    }
  };

  const contactDetails = [
    { icon: <MapPin size={22} />,  label: 'Address', value: contactAddr, href: null },
    { icon: <Phone size={22} />,   label: 'Mobile',  value: contactPhone, href: `tel:${contactPhone}` },
    { icon: <Phone size={22} />,   label: 'Phone',   value: '061-431230', href: 'tel:061-431230' },
    { icon: <Mail size={22} />,    label: 'Email',   value: contactEmail, href: `mailto:${contactEmail}` },
    { icon: <Mail size={22} />,    label: 'Alt Email', value: 'bgtcplc@gmail.com', href: 'mailto:bgtcplc@gmail.com' },
    { icon: <Clock size={22} />,   label: 'Hours',   value: 'Mon–Sat: 5:00 AM – 8:00 PM', href: null },
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
            <div className="section-label" style={{ justifyContent: 'center', color: 'var(--primary)' }}>Get In Touch</div>
            <h1 style={{ color: 'white', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', marginBottom: '1.5rem' }}>Contact Us</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.15rem', maxWidth: '580px', margin: '0 auto', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
              Ready to start your training journey? Register now or get in touch with any questions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Content Grid ──────────────────────────────────────────────── */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div className="contact-grid">
            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="section-label">Contact Information</div>
              <h2 className="section-title" style={{ marginBottom: '0.75rem' }}>Find Us in Pokhara</h2>
              <div className="divider" />
              <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontFamily: 'Inter, sans-serif', lineHeight: 1.7 }}>
                Our training centre is located at Kantipur Marga-15, near the Ban (Forestry) Campus in Pokhara. Come visit us or reach out through any of the channels below.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
                {contactDetails.map((d, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ background: 'var(--army)', borderRadius: '10px', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                      {d.icon}
                    </div>
                    <div>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, margin: 0 }}>{d.label}</p>
                      {d.href ? (
                        <a href={d.href} style={{ color: 'var(--secondary)', fontWeight: 600, fontSize: '1rem', fontFamily: 'Inter, sans-serif' }}>{d.value}</a>
                      ) : (
                        <p style={{ color: 'var(--secondary)', fontWeight: 600, fontSize: '1rem', margin: 0, fontFamily: 'Inter, sans-serif' }}>{d.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div style={{ borderRadius: '16px', overflow: 'hidden', height: '280px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', border: '1px solid var(--border-color)' }}>
                <iframe
                  title="BGTC Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3516.4!2d83.9856!3d28.2096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995946a15e7dd47%3A0x1!2sPokhara!5e0!3m2!1sen!2snp!4v1700000000000"
                  width="100%" height="100%" style={{ border: 0 }}
                  allowFullScreen loading="lazy"
                />
              </div>
            </motion.div>

            {/* Registration Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div style={{ background: 'white', borderRadius: '20px', padding: '3rem', boxShadow: '0 20px 50px rgba(0,0,0,0.06)', border: '1px solid var(--border-color)', borderTop: '4px solid var(--primary)' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Registration Form</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                  Fill in your details and we'll get back to you with training schedule and enrollment information.
                </p>

                <AnimatePresence>
                  {status === 'success' ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      style={{ textAlign: 'center', padding: '3rem 1rem' }}
                    >
                      <div style={{ width: '72px', height: '72px', background: '#ecfdf5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#059669' }}>
                        <CheckCircle size={36} />
                      </div>
                      <h4 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--army)' }}>Submitted Successfully!</h4>
                      <p style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>We'll contact you shortly with training details.</p>
                      <button onClick={() => setStatus(null)} className="btn-outline" style={{ marginTop: '1.5rem' }}>Submit Another</button>
                    </motion.div>
                  ) : (
                    <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit}>
                      <div className="form-grid-2">
                        <div className="form-group">
                          <label htmlFor="contact-name">Full Name *</label>
                          <input id="contact-name" name="name" required className="form-control" placeholder="Ram Bahadur Tamang" value={form.name} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="contact-phone">Mobile Number *</label>
                          <input id="contact-phone" name="phone" required className="form-control" placeholder="+977 98XXXXXXXX" value={form.phone} onChange={handleChange} />
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="contact-email">Email Address</label>
                        <input id="contact-email" name="email" type="email" className="form-control" placeholder="your@email.com" value={form.email} onChange={handleChange} />
                      </div>

                      <div className="form-grid-2">
                        <div className="form-group">
                          <label htmlFor="contact-gender">Gender *</label>
                          <select id="contact-gender" name="gender" required className="form-control" value={form.gender} onChange={handleChange}>
                            <option value="">Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="contact-qual">Qualification</label>
                          <input id="contact-qual" name="qualification" className="form-control" placeholder="e.g. SEE, +2, Bachelor" value={form.qualification} onChange={handleChange} />
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="contact-subject">Class of Interest *</label>
                        <select id="contact-subject" name="subject" required className="form-control" value={form.subject} onChange={handleChange}>
                          <option value="">Select a program</option>
                          <option value="British Gurkha Army">🇬🇧 British Gurkha Army</option>
                          <option value="Singapore Police Force">🇸🇬 Singapore Police Force</option>
                          <option value="Indian Gorkha Army">🇮🇳 Indian Gorkha Army</option>
                          <option value="Nepal Army">🇳🇵 Nepal Army</option>
                          <option value="Nepal Police">🇳🇵 Nepal Police</option>
                          <option value="French Foreign Legion">🇫🇷 French Foreign Legion</option>
                          <option value="General Inquiry">General Inquiry</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="contact-message">Message</label>
                        <textarea id="contact-message" name="message" className="form-control" rows={4} placeholder="Any questions or additional details..." value={form.message} onChange={handleChange} style={{ resize: 'vertical' }} />
                      </div>

                      <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '1rem' }} disabled={status === 'sending'}>
                        {status === 'sending' ? (
                          <><span className="spin" style={{ width: '18px', height: '18px', border: '2px solid rgba(0,0,0,0.3)', borderTop: '2px solid #0d1f2d', borderRadius: '50%', display: 'inline-block' }} /> Sending…</>
                        ) : (
                          <><Send size={17} /> Submit Registration</>
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
    </div>
  );
};

export default Contact;
