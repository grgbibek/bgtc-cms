import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield } from 'lucide-react';
import { useContent } from '../hooks/useQueries';

const Navbar = () => {
  const { data: content = {} } = useContent();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const navItems = [
    { to: '/', label: 'Home', end: true },
    { to: '/about', label: 'About Us', end: true },
    // { to: '/gallery', label: 'Gallery', end: true },
    { to: '/classes', label: 'Classes', end: true },
    { to: '/contact', label: 'Contact', end: true },
  ];

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} id="main-navbar">
      <div className="container navbar__inner">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="logo" onClick={closeMenu}>
            {content.site_logo ? (
              <img src={content.site_logo} alt={content.site_name || 'BGTC'} style={{ paddingTop: '0.5rem', height: '4.5rem', objectFit: 'contain', marginRight: '0.5rem' }} />
            ) : (
              <div className="logo-emblem">
                <Shield size={20} strokeWidth={2.5} />
              </div>
            )}
            <div>
              <span className="logo-text-main">{content.site_name || 'BGTC'}</span>
              <span className="logo-text-sub">{content.site_tagline || 'British Gurkha Training Centre'}</span>
            </div>
          </Link>
        </motion.div>

        {/* Desktop nav */}
        <motion.nav
          className="nav-links"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} end={item.end} onClick={closeMenu}>
              {item.label}
            </NavLink>
          ))}
        </motion.nav>

        {/* Desktop CTA */}
        <div className="nav-cta">
          <Link to="/contact" className="btn-primary" style={{ fontSize: '0.82rem', padding: '0.6rem 1.4rem' }}>
            Register Now
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="nav-toggle"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="nav-mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map(item => (
              <NavLink key={item.to} to={item.to} end={item.end} onClick={closeMenu}>
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={closeMenu}
              style={{
                background: 'var(--primary)',
                color: '#0d1f2d',
                textAlign: 'center',
                fontWeight: 700,
                padding: '1rem',
              }}
            >
              Register Now
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
