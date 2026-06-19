import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// ─── Lazy-loaded public pages ─────────────────────────────────────────────────
const Home          = lazy(() => import('./pages/Home'));
const About         = lazy(() => import('./pages/About'));
const Gallery       = lazy(() => import('./pages/Gallery'));
const Classes       = lazy(() => import('./pages/Classes'));
const ClassDetail   = lazy(() => import('./pages/ProductDetail')); // reused file
const Facilities    = lazy(() => import('./pages/Facilities'));
const Contact       = lazy(() => import('./pages/Contact'));

// ─── Lazy-loaded admin pages ──────────────────────────────────────────────────
const AdminLogin       = lazy(() => import('./admin/AdminLogin'));
const AdminLayout      = lazy(() => import('./admin/AdminLayout'));
const AdminProducts    = lazy(() => import('./admin/AdminProducts'));
const AdminCategories  = lazy(() => import('./admin/AdminCategories'));
const AdminUsers       = lazy(() => import('./admin/AdminUsers'));
const AdminSettings    = lazy(() => import('./admin/AdminSettings'));
const AdminContent     = lazy(() => import('./admin/AdminContent'));

// ─── Loading fallback ─────────────────────────────────────────────────────────
const PageLoader = () => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f4f5f0',
    flexDirection: 'column',
    gap: '1.5rem',
  }}>
    <div style={{
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      border: '3px solid rgba(201,168,76,0.2)',
      borderTop: '3px solid var(--primary, #c9a84c)',
      animation: 'spin 0.8s linear infinite',
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    <p style={{ color: '#0d1f2d', fontSize: '0.95rem', margin: 0, fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Loading BGTC…</p>
  </div>
);

// ─── Route guards ─────────────────────────────────────────────────────────────
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) return <Navigate to="/admin/login" replace />;
  return children;
};

const AdminOnlyRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) return <Navigate to="/admin/login" replace />;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.role !== 'admin' && payload.role !== 'super_admin') return <Navigate to="/admin" replace />;
  } catch (e) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public */}
          <Route path="/"              element={<Home />} />
          <Route path="/about"         element={<About />} />
          <Route path="/gallery"       element={<Gallery />} />
          <Route path="/classes"       element={<Classes />} />
          <Route path="/classes/:id"   element={<ClassDetail />} />
          <Route path="/product/:id"   element={<Navigate to="/classes" replace />} /> {/* Redirect old bakery route */}
          <Route path="/products"      element={<Navigate to="/classes" replace />} /> {/* Redirect old bakery route */}
          <Route path="/facilities"    element={<Facilities />} />
          <Route path="/services"      element={<Navigate to="/facilities" replace />} /> {/* Redirect old bakery route */}
          <Route path="/contact"       element={<Contact />} />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute><AdminLayout /></ProtectedRoute>
          }>
            <Route index                element={<AdminProducts />} />
            <Route path="classes"       element={<AdminProducts />} />
            <Route path="products"      element={<Navigate to="/admin/classes" replace />} />
            <Route path="categories"    element={<AdminCategories />} />
            <Route path="users"         element={<AdminOnlyRoute><AdminUsers /></AdminOnlyRoute>} />
            <Route path="settings"      element={<AdminOnlyRoute><AdminSettings /></AdminOnlyRoute>} />
            <Route path="content"       element={<AdminOnlyRoute><AdminContent /></AdminOnlyRoute>} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
