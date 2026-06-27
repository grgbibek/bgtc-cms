import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FileText, Package, ArrowLeft, Menu, X, Tags, LayoutDashboard, ChevronLeft, ChevronRight, Users, Settings, Inbox } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');

  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserRole(payload.role || '');
        setUserName(payload.name || 'Admin');
      } catch (e) {
        console.error('Error decoding token:', e);
      }
    }
  }, []);

  return (
    <div className="admin-layout">
      {/* Mobile top bar */}
      <div className="admin-topbar">
        <button
          className="admin-menu-btn"
          onClick={() => setSidebarOpen(prev => !prev)}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <span className="admin-topbar-title">BGTC CMS</span>
      </div>

      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar} />
      )}

      <aside className={`sidebar${sidebarOpen ? ' sidebar--open' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '3rem' }}>
          <div>
            <h2 className="sidebar-title-expanded" style={{ fontFamily: 'Playfair Display', margin: 0 }}>BGTC<br />CMS Panel</h2>
            <h2 className="sidebar-title-collapsed" style={{ fontFamily: 'Playfair Display', margin: 0, fontSize: '2rem', textAlign: 'center' }}>B</h2>
          </div>
          <button
            className="desktop-only"
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: '50%', minWidth: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', marginTop: '0.2rem' }}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          <Link
            to="/admin/products"
            className={`sidebar-link ${(location.pathname === '/admin/products' || location.pathname === '/admin/classes') ? 'active' : ''}`}
            onClick={closeSidebar}
          >
            <Package size={20} style={{ flexShrink: 0 }} />
            <span className="link-text">Classes</span>
          </Link>
          <Link
            to="/admin/categories"
            className={`sidebar-link ${location.pathname === '/admin/categories' ? 'active' : ''}`}
            onClick={closeSidebar}
          >
            <Tags size={20} style={{ flexShrink: 0 }} />
            <span className="link-text">Categories</span>
          </Link>
          {['admin', 'super_admin', 'manager'].includes(userRole) && (
            <Link
              to="/admin/content"
              className={`sidebar-link ${location.pathname === '/admin/content' ? 'active' : ''}`}
              onClick={closeSidebar}
            >
              <FileText size={20} style={{ flexShrink: 0 }} />
              <span className="link-text">Website Content</span>
            </Link>
          )}
          {['admin', 'super_admin', 'manager'].includes(userRole) && (
            <Link
              to="/admin/submissions"
              className={`sidebar-link ${(location.pathname === '/admin/submissions' || location.pathname === '/admin' || location.pathname === '/admin/') ? 'active' : ''}`}
              onClick={closeSidebar}
            >
              <Inbox size={20} style={{ flexShrink: 0 }} />
              <span className="link-text">Submissions</span>
            </Link>
          )}
          {['admin', 'super_admin'].includes(userRole) && (
            <>
              <Link
                to="/admin/settings"
                className={`sidebar-link ${location.pathname === '/admin/settings' ? 'active' : ''}`}
                onClick={closeSidebar}
              >
                <Settings size={20} style={{ flexShrink: 0 }} />
                <span className="link-text">System Settings</span>
              </Link>
              <Link
                to="/admin/users"
                className={`sidebar-link ${location.pathname === '/admin/users' ? 'active' : ''}`}
                onClick={closeSidebar}
              >
                <Users size={20} style={{ flexShrink: 0 }} />
                <span className="link-text">Users</span>
              </Link>
            </>
          )}
        </nav>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button
            onClick={() => { localStorage.removeItem('adminToken'); window.location.href = '/admin/login'; }}
            className="sidebar-link"
            style={{ textAlign: 'left', background: 'transparent', width: '100%', border: 'none', cursor: 'pointer' }}
          >
            <ArrowLeft size={20} style={{ flexShrink: 0 }} />
            <span className="link-text">Logout</span>
          </button>
        </div>
      </aside>

      <main className="admin-main">
        {/* Desktop & Mobile Header Bar */}
        <header className="admin-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginLeft: 'auto' }}>
            {/* User Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: '#f8f9fa', padding: '0.4rem 1rem', borderRadius: '50px', border: '1px solid var(--border-color)' }}>
              <div style={{ width: '28px', height: '28px', background: 'var(--primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>
                {userName.charAt(0).toUpperCase()}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--secondary)' }}>{userName}</span>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', opacity: 0.8 }}>{userRole}</span>
              </div>
            </div>
          </div>
        </header>

        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
