import React, { useState, useEffect, useCallback } from 'react';
import { submissionService } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Inbox, Eye, Trash2, RefreshCw, X, ChevronDown,
  User, Phone, Mail, BookOpen, MessageSquare, Calendar, Filter,
  CheckCircle, Clock, XCircle, UserCheck, TrendingUp,
} from 'lucide-react';

// ─── Status config ─────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  new:       { label: 'New',       color: '#3b82f6', bg: '#eff6ff', icon: Clock },
  contacted: { label: 'Contacted', color: '#f59e0b', bg: '#fffbeb', icon: Phone },
  enrolled:  { label: 'Enrolled',  color: '#10b981', bg: '#ecfdf5', icon: CheckCircle },
  rejected:  { label: 'Rejected',  color: '#ef4444', bg: '#fef2f2', icon: XCircle },
};

const STATUSES = Object.keys(STATUS_CONFIG);

const PROGRAMS = [
  'British Gurkha Army',
  'Singapore Police Force',
  'Indian Gorkha Army',
  'General Inquiry',
];

// ─── Status Badge ──────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.new;
  const Icon = cfg.icon;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
      padding: '0.25rem 0.7rem', borderRadius: '50px',
      background: cfg.bg, color: cfg.color,
      fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
      fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase',
      border: `1px solid ${cfg.color}30`,
    }}>
      <Icon size={11} strokeWidth={2.5} />
      {cfg.label}
    </span>
  );
};

// ─── Stat Card ─────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, color, bg, icon: Icon, onClick, active }) => (
  <motion.button
    whileHover={{ y: -3, boxShadow: '0 12px 28px rgba(0,0,0,0.1)' }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    style={{
      flex: 1, minWidth: '130px',
      background: active ? color : 'white',
      border: `2px solid ${active ? color : '#e5e7eb'}`,
      borderRadius: '16px', padding: '1.25rem',
      display: 'flex', flexDirection: 'column', gap: '0.5rem',
      cursor: 'pointer', textAlign: 'left',
      transition: 'border-color 0.2s',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    }}
  >
    <div style={{
      width: '36px', height: '36px', borderRadius: '10px',
      background: active ? 'rgba(255,255,255,0.2)' : bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: active ? 'white' : color,
    }}>
      <Icon size={18} strokeWidth={2} />
    </div>
    <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'Rajdhani, sans-serif', color: active ? 'white' : '#0d1f2d', lineHeight: 1 }}>
      {value ?? '—'}
    </div>
    <div style={{ fontSize: '0.78rem', fontWeight: 600, color: active ? 'rgba(255,255,255,0.85)' : '#6b7280', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
      {label}
    </div>
  </motion.button>
);

// ─── Detail Modal ──────────────────────────────────────────────────────────────
const DetailModal = ({ submission, onClose, onStatusChange }) => {
  const [saving, setSaving] = useState(false);

  if (!submission) return null;

  const handleStatus = async (status) => {
    setSaving(true);
    await onStatusChange(submission.id, status);
    setSaving(false);
  };

  const field = (Icon, label, value) => value ? (
    <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start', padding: '0.85rem 0', borderBottom: '1px solid #f3f4f6' }}>
      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(201,168,76,0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon size={16} />
      </div>
      <div>
        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'Rajdhani, sans-serif', marginBottom: '0.15rem' }}>{label}</div>
        <div style={{ fontSize: '0.97rem', color: '#111827', fontFamily: 'Inter, sans-serif', fontWeight: 500, lineHeight: 1.5 }}>{value}</div>
      </div>
    </div>
  ) : null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
          onClick={e => e.stopPropagation()}
          style={{ background: 'white', borderRadius: '20px', width: '100%', maxWidth: '540px', boxShadow: '0 30px 80px rgba(0,0,0,0.2)', overflow: 'hidden' }}
        >
          {/* Header */}
          <div style={{ background: 'var(--secondary)', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ color: 'white', margin: 0, fontFamily: 'Rajdhani, sans-serif', fontSize: '1.3rem' }}>{submission.name}</h3>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                {new Date(submission.created_at).toLocaleString()}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <StatusBadge status={submission.status} />
              <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: '1.5rem 2rem' }}>
            {field(User, 'Full Name', submission.name)}
            {field(Phone, 'Phone', submission.phone)}
            {field(Mail, 'Email', submission.email)}
            {field(User, 'Gender', submission.gender)}
            {field(BookOpen, 'Qualification', submission.qualification)}
            {field(TrendingUp, 'Program of Interest', submission.subject)}
            {field(MessageSquare, 'Message', submission.message)}
          </div>

          {/* Status Actions */}
          <div style={{ padding: '1rem 2rem 1.5rem', borderTop: '1px solid #f3f4f6' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'Rajdhani, sans-serif', marginBottom: '0.75rem' }}>Update Status</div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {STATUSES.map(s => {
                const cfg = STATUS_CONFIG[s];
                const isActive = submission.status === s;
                return (
                  <button
                    key={s}
                    onClick={() => !isActive && handleStatus(s)}
                    disabled={saving || isActive}
                    style={{
                      padding: '0.45rem 1rem', borderRadius: '8px', cursor: isActive ? 'default' : 'pointer',
                      border: `2px solid ${isActive ? cfg.color : '#e5e7eb'}`,
                      background: isActive ? cfg.bg : 'white',
                      color: isActive ? cfg.color : '#6b7280',
                      fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
                      fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em',
                      opacity: saving ? 0.6 : 1,
                      transition: 'all 0.15s',
                    }}
                  >
                    {cfg.label}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const AdminSubmissions = () => {
  const [data, setData] = useState({ submissions: [], total: 0, stats: {} });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: '', subject: '' });
  const [selected, setSelected] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.subject) params.subject = filters.subject;
      const res = await submissionService.getSubmissions(params);
      setData(res.data);
    } catch (err) {
      console.error('Failed to fetch submissions:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleStatusChange = async (id, status) => {
    try {
      await submissionService.updateStatus(id, status);
      // Update locally
      setData(prev => ({
        ...prev,
        submissions: prev.submissions.map(s => s.id === id ? { ...s, status } : s),
      }));
      if (selected?.id === id) setSelected(prev => ({ ...prev, status }));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    setDeleting(id);
    try {
      await submissionService.deleteSubmission(id);
      setData(prev => ({
        ...prev,
        submissions: prev.submissions.filter(s => s.id !== id),
        total: prev.total - 1,
      }));
      if (selected?.id === id) setSelected(null);
    } catch (err) {
      alert('Failed to delete submission');
    } finally {
      setDeleting(null);
      setConfirmDelete(null);
    }
  };

  const { stats } = data;

  const statCards = [
    { label: 'Total',     value: stats.total,          color: '#6366f1', bg: '#eef2ff', icon: Inbox,        filterStatus: '' },
    { label: 'New',       value: stats.new_count,      color: '#3b82f6', bg: '#eff6ff', icon: Clock,        filterStatus: 'new' },
    { label: 'Contacted', value: stats.contacted_count, color: '#f59e0b', bg: '#fffbeb', icon: Phone,        filterStatus: 'contacted' },
    { label: 'Enrolled',  value: stats.enrolled_count,  color: '#10b981', bg: '#ecfdf5', icon: UserCheck,    filterStatus: 'enrolled' },
    { label: 'Rejected',  value: stats.rejected_count,  color: '#ef4444', bg: '#fef2f2', icon: XCircle,     filterStatus: 'rejected' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ width: '100%' }}>

      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ margin: 0, fontFamily: 'Rajdhani, sans-serif', fontSize: '1.6rem', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Form Submissions
          </h1>
          <p style={{ margin: '0.2rem 0 0', color: '#6b7280', fontSize: '0.88rem', fontFamily: 'Inter, sans-serif' }}>
            {data.total} total registration{data.total !== 1 ? 's' : ''} received
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          onClick={fetchData}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            background: 'var(--primary)', color: 'var(--secondary)',
            border: 'none', borderRadius: '10px', padding: '0.6rem 1.2rem',
            fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
            fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer',
          }}
        >
          <RefreshCw size={14} className={loading ? 'spin' : ''} />
          Refresh
        </motion.button>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {statCards.map(card => (
          <StatCard
            key={card.label}
            {...card}
            active={filters.status === card.filterStatus}
            onClick={() => setFilters(f => ({ ...f, status: f.status === card.filterStatus ? '' : card.filterStatus }))}
          />
        ))}
      </div>

      {/* Filters Row */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <Filter size={16} color="#9ca3af" />
        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Filter by program:</span>
        {['', ...PROGRAMS].map(p => (
          <button
            key={p}
            onClick={() => setFilters(f => ({ ...f, subject: p }))}
            style={{
              padding: '0.35rem 0.85rem', borderRadius: '8px',
              border: `1.5px solid ${filters.subject === p ? 'var(--primary)' : '#e5e7eb'}`,
              background: filters.subject === p ? 'rgba(201,168,76,0.1)' : 'white',
              color: filters.subject === p ? 'var(--primary)' : '#374151',
              fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.82rem',
              cursor: 'pointer', transition: 'all 0.15s',
            }}
          >
            {p || 'All Programs'}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', overflow: 'hidden', border: '1px solid #f3f4f6' }}>
        {loading ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: '#9ca3af', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <RefreshCw size={28} className="spin" />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>Loading submissions…</span>
          </div>
        ) : data.submissions.length === 0 ? (
          <div style={{ padding: '5rem 2rem', textAlign: 'center' }}>
            <Inbox size={48} color="#d1d5db" style={{ marginBottom: '1rem' }} />
            <h3 style={{ color: '#374151', fontFamily: 'Rajdhani, sans-serif', marginBottom: '0.5rem' }}>No Submissions Yet</h3>
            <p style={{ color: '#9ca3af', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>When visitors fill out the registration form, they'll appear here.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f9fafb', borderBottom: '1px solid #f3f4f6' }}>
                  {['Name', 'Phone', 'Program', 'Gender', 'Status', 'Date', 'Actions'].map(h => (
                    <th key={h} style={{
                      padding: '0.85rem 1.1rem', textAlign: 'left',
                      fontSize: '0.72rem', fontWeight: 700, color: '#6b7280',
                      textTransform: 'uppercase', letterSpacing: '0.06em',
                      fontFamily: 'Rajdhani, sans-serif', whiteSpace: 'nowrap',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.submissions.map((s, i) => (
                  <motion.tr
                    key={s.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    style={{ borderBottom: '1px solid #f9fafb', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    {/* Name */}
                    <td style={{ padding: '0.9rem 1.1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                        <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(201,168,76,0.15)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '0.95rem', flexShrink: 0 }}>
                          {s.name?.charAt(0).toUpperCase() || '?'}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: '#111827', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>{s.name}</div>
                          {s.email && <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{s.email}</div>}
                        </div>
                      </div>
                    </td>
                    {/* Phone */}
                    <td style={{ padding: '0.9rem 1.1rem', fontFamily: 'Inter, sans-serif', fontSize: '0.88rem', color: '#374151' }}>
                      {s.phone || <span style={{ color: '#d1d5db' }}>—</span>}
                    </td>
                    {/* Program */}
                    <td style={{ padding: '0.9rem 1.1rem', maxWidth: '180px' }}>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#374151', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {s.subject || <span style={{ color: '#d1d5db' }}>—</span>}
                      </span>
                    </td>
                    {/* Gender */}
                    <td style={{ padding: '0.9rem 1.1rem', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#6b7280' }}>
                      {s.gender || <span style={{ color: '#d1d5db' }}>—</span>}
                    </td>
                    {/* Status */}
                    <td style={{ padding: '0.9rem 1.1rem' }}>
                      <div style={{ position: 'relative', display: 'inline-block' }}>
                        <select
                          value={s.status}
                          onChange={e => handleStatusChange(s.id, e.target.value)}
                          style={{
                            appearance: 'none', paddingRight: '1.5rem',
                            padding: '0.3rem 1.6rem 0.3rem 0.7rem',
                            borderRadius: '50px', cursor: 'pointer',
                            background: STATUS_CONFIG[s.status]?.bg || '#f3f4f6',
                            color: STATUS_CONFIG[s.status]?.color || '#374151',
                            border: `1px solid ${STATUS_CONFIG[s.status]?.color || '#e5e7eb'}30`,
                            fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
                            fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase',
                          }}
                        >
                          {STATUSES.map(st => (
                            <option key={st} value={st}>{STATUS_CONFIG[st].label}</option>
                          ))}
                        </select>
                        <ChevronDown size={11} style={{ position: 'absolute', right: '0.4rem', top: '50%', transform: 'translateY(-50%)', color: STATUS_CONFIG[s.status]?.color, pointerEvents: 'none' }} />
                      </div>
                    </td>
                    {/* Date */}
                    <td style={{ padding: '0.9rem 1.1rem', fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: '#9ca3af', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Calendar size={12} />
                        {new Date(s.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                      <div style={{ fontSize: '0.72rem', marginTop: '0.1rem' }}>
                        {new Date(s.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    {/* Actions */}
                    <td style={{ padding: '0.9rem 1.1rem' }}>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <motion.button
                          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                          onClick={() => setSelected(s)}
                          title="View details"
                          style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(99,102,241,0.1)', color: '#6366f1', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Eye size={14} />
                        </motion.button>
                        {confirmDelete === s.id ? (
                          <>
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDelete(s.id)}
                              disabled={deleting === s.id}
                              title="Confirm delete"
                              style={{ padding: '0 0.6rem', height: '32px', borderRadius: '8px', background: '#ef4444', color: 'white', border: 'none', cursor: 'pointer', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                            >
                              {deleting === s.id ? <RefreshCw size={11} className="spin" /> : 'Confirm'}
                            </motion.button>
                            <button onClick={() => setConfirmDelete(null)} style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f3f4f6', color: '#6b7280', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <X size={12} />
                            </button>
                          </>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                            onClick={() => setConfirmDelete(s.id)}
                            title="Delete"
                            style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          >
                            <Trash2 size={14} />
                          </motion.button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <DetailModal
          submission={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </motion.div>
  );
};

export default AdminSubmissions;
