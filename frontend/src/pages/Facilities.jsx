import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Award, Dumbbell, Home, BookOpen, Utensils, Waves } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useContent } from '../hooks/useQueries';

const FACILITIES_DATA = [
  {
    id: 'gym',
    icon: <Dumbbell size={32} />,
    title: 'Gym & Training Hall',
    desc: 'Fully equipped indoor gym tailored for pre-army physical training. Features battle PT equipment, power bags, circuit training stations, and dedicated zones for heaving, sit-ups, and push-ups.',
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'hostel',
    icon: <Home size={32} />,
    title: 'Student Hostel',
    desc: 'Comfortable and disciplined on-site accommodation for out-of-town students. Our hostel environment fosters brotherhood and ensures students follow a strict daily routine essential for military preparation.',
    img: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'education',
    icon: <BookOpen size={32} />,
    title: 'Education Center',
    desc: 'Academic excellence is just as important as physical fitness. We provide dedicated classrooms and experienced tutors to prepare students for the written examinations required by the British and Singapore armies.',
    img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'canteen',
    icon: <Utensils size={32} />,
    title: 'Nutritional Canteen',
    desc: 'Our canteen serves high-quality, nutritious meals designed specifically for individuals undergoing intense physical training. We ensure our students get the right balance of proteins, carbs, and hydration.',
    img: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'swimming',
    icon: <Waves size={32} />,
    title: 'Swimming Facility',
    desc: 'Access to swimming facilities for full-body conditioning, endurance building, and specific aquatic tests that may be part of selection processes.',
    img: 'https://images.unsplash.com/photo-1519315901367-f34bf9150f01?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'sports',
    icon: <Target size={32} />,
    title: 'Sports Courts',
    desc: 'Indoor and outdoor courts for badminton and volleyball. These activities improve agility, teamwork, and reflexes while providing a healthy recreational outlet.',
    img: 'https://images.unsplash.com/photo-1628795092040-d124cc2c3dfb?auto=format&fit=crop&q=80&w=800'
  }
];

const Facilities = () => {
  const { data: content = {} } = useContent();

  return (
    <div style={{ background: '#f4f5f0', minHeight: '100vh' }}>
      <Navbar />

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
            <div className="section-label" style={{ justifyContent: 'center', color: 'var(--primary)' }}>Infrastructure</div>
            <h1 style={{ color: 'white', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', marginBottom: '1.5rem' }}>
              World-Class Facilities
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.2rem', maxWidth: '640px', margin: '0 auto', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
              Everything you need to train, rest, study, and succeed — all in one place in Pokhara.
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '3rem' }}>
            {FACILITIES_DATA.map((fac, i) => (
              <motion.div 
                key={fac.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ 
                  background: 'white', borderRadius: '24px', overflow: 'hidden',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.05)', border: '1px solid var(--border-color)',
                  display: 'flex', flexDirection: 'column'
                }}
              >
                <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                  <img src={fac.img} alt={fac.title} className="hover-scale" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', bottom: '-1.5rem', right: '2rem', background: 'var(--primary)', color: '#0d1f2d', width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(201,168,76,0.3)' }}>
                    {fac.icon}
                  </div>
                </div>
                <div style={{ padding: '2.5rem 2rem 2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem', color: 'var(--secondary)' }}>{fac.title}</h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>{fac.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section style={{ padding: '5rem 0', background: 'var(--secondary)', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'white', fontSize: '2rem', marginBottom: '1rem' }}>Experience It For Yourself</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem' }}>Visit our center in Pokhara for a guided tour of the facilities.</p>
          <Link to="/contact" className="btn-primary">Contact Us for a Tour</Link>
        </div>
      </section>

    </div>
  );
};

export default Facilities;
