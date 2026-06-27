import React, { useState, useEffect, useRef } from 'react';
import { contentService, uploadService } from '../services/api';
import {
  Save, CheckCircle, RefreshCw,
  Layout, Map, Shield, Users, Phone, Megaphone, Building2,
  Link2, Upload, X, ImageIcon, Plus, Trash2, ToggleLeft, ToggleRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const pageSections = [
  {
    title: 'Site Identity',
    icon: Layout,
    description: 'Configure the website logo and primary text.',
    fields: [
      { key: 'site_logo', label: 'Website Logo', type: 'image', help: 'Upload an image to replace the default text logo.' },
      { key: 'site_name', label: 'Website Name', type: 'text', help: 'Main text logo (e.g., BGTC).' },
      { key: 'site_tagline', label: 'Website Tagline', type: 'text', help: 'Sub text under the logo.' },
    ]
  },


  {
    title: 'Hero Section',
    icon: Layout,
    description: 'The introductory header displayed at the very top of your homepage.',
    fields: [
      { key: 'hero_title', label: 'Main Headline', type: 'text', help: 'The large text appearing on the homepage.' },
      { key: 'hero_subtitle', label: 'Subtitle Description', type: 'text', help: 'A short sentence under the main headline.' },
      { key: 'hero_image', label: 'Hero Background Image', type: 'image', help: 'Background image for the hero section.' },
      { key: 'hero_bestseller_id', label: 'Featured Class (Product ID)', type: 'text', help: 'The ID of the program to show prominently.' },
    ]
  },

  {
    title: 'Strategic Navigation',
    icon: Map,
    description: 'Configure images for the visual navigation icons on the homepage.',
    fields: [
      { key: 'cat_army_img', label: 'Army Category Image', type: 'image', help: 'Image for the Army category icon.' },
      { key: 'cat_police_img', label: 'Police Category Image', type: 'image', help: 'Image for the Police category icon.' },
      { key: 'cat_special_img', label: 'Special Category Image', type: 'image', help: 'Image for the Special category icon.' },
      { key: 'cat_other_img', label: 'Other Categories Image', type: 'image', help: 'Default image for other categories.' },
    ]
  },
  {
    title: 'Trust & Social Proof',
    icon: Shield,
    description: 'Manage the short trust indicator points shown on the homepage hero.',
    fields: [
      { key: 'trust_1_title', label: 'Point 1 Text', type: 'text', help: 'E.g., Ranked 2nd Best in Nepal' },
      { key: 'trust_2_title', label: 'Point 2 Text', type: 'text', help: 'E.g., Ex-British Army Trainers' },
      { key: 'trust_3_title', label: 'Point 3 Text', type: 'text', help: 'E.g., 1000+ Successful Students' },
    ]
  },
  {
    title: 'Army Programs',
    icon: Shield,
    description: 'Configure the army selection programs featured on the homepage.',
    fields: [
      { key: 'class_1_title', label: 'Program 1 Title', type: 'text', help: 'E.g., British Gurkha Army' },
      { key: 'class_1_subtitle', label: 'Program 1 Subtitle', type: 'text', help: 'E.g., Most Prestigious Selection' },
      { key: 'class_1_desc', label: 'Program 1 Description', type: 'textarea', help: 'Details about Program 1.' },
      { key: 'class_1_badge', label: 'Program 1 Badge', type: 'text', help: 'E.g., Once a Year' },
      { key: 'class_1_frequency', label: 'Program 1 Frequency', type: 'text', help: 'Intake frequency description.' },
      { key: 'class_1_eligibility', label: 'Program 1 Eligibility', type: 'textarea', help: 'One item per line.' },
      { key: 'class_1_selection', label: 'Program 1 Selection', type: 'textarea', help: 'Format: Phase Title | Phase Description (one phase per line).' },
      { key: 'class_1_img', label: 'Program 1 Image', type: 'image', help: 'Image for Program 1.' },
      { key: 'class_2_title', label: 'Program 2 Title', type: 'text', help: 'E.g., Singapore Police Force' },
      { key: 'class_2_subtitle', label: 'Program 2 Subtitle', type: 'text', help: 'E.g., Gurkha Contingent' },
      { key: 'class_2_desc', label: 'Program 2 Description', type: 'textarea', help: 'Details about Program 2.' },
      { key: 'class_2_badge', label: 'Program 2 Badge', type: 'text', help: 'E.g., Once a Year' },
      { key: 'class_2_frequency', label: 'Program 2 Frequency', type: 'text', help: 'Intake frequency description.' },
      { key: 'class_2_eligibility', label: 'Program 2 Eligibility', type: 'textarea', help: 'One item per line.' },
      { key: 'class_2_selection', label: 'Program 2 Selection', type: 'textarea', help: 'Format: Phase Title | Phase Description (one phase per line).' },
      { key: 'class_2_img', label: 'Program 2 Image', type: 'image', help: 'Image for Program 2.' },
      { key: 'class_3_title', label: 'Program 3 Title', type: 'text', help: 'E.g., Indian Gorkha Army' },
      { key: 'class_3_subtitle', label: 'Program 3 Subtitle', type: 'text', help: 'E.g., Six Gorkha Regiments' },
      { key: 'class_3_desc', label: 'Program 3 Description', type: 'textarea', help: 'Details about Program 3.' },
      { key: 'class_3_badge', label: 'Program 3 Badge', type: 'text', help: 'E.g., 1–2 Times/Year' },
      { key: 'class_3_frequency', label: 'Program 3 Frequency', type: 'text', help: 'Intake frequency description.' },
      { key: 'class_3_eligibility', label: 'Program 3 Eligibility', type: 'textarea', help: 'One item per line.' },
      { key: 'class_3_selection', label: 'Program 3 Selection', type: 'textarea', help: 'Format: Phase Title | Phase Description (one phase per line).' },
      { key: 'class_3_img', label: 'Program 3 Image', type: 'image', help: 'Image for Program 3.' },
    ]
  },
  {
    title: 'About Us',
    icon: Users,
    description: 'The story and background showcasing BGTC.',
    fields: [
      { key: 'about_us', label: 'About Us Biography', type: 'textarea', help: 'Detailed text talking about the training centre.' },
      { key: 'about_bullet_1_label', label: 'Bullet 1 Label', type: 'text', help: 'E.g., Physical Training' },
      { key: 'about_bullet_1_value', label: 'Bullet 1 Value', type: 'text', help: 'E.g., Daily Drills' },
      { key: 'about_bullet_2_label', label: 'Bullet 2 Label', type: 'text', help: 'E.g., Selection Rate' },
      { key: 'about_bullet_2_value', label: 'Bullet 2 Value', type: 'text', help: 'E.g., 80% BGA' },
      { key: 'about_bullet_3_label', label: 'Bullet 3 Label', type: 'text', help: 'E.g., Experience' },
      { key: 'about_bullet_3_value', label: 'Bullet 3 Value', type: 'text', help: 'E.g., 20+ Years' },
      { key: 'about_bullet_4_label', label: 'Bullet 4 Label', type: 'text', help: 'E.g., Location' },
      { key: 'about_bullet_4_value', label: 'Bullet 4 Value', type: 'text', help: 'E.g., Pokhara' },
    ]
  },
  {
    title: 'Core Values',
    icon: Shield,
    description: 'The core values shown on the About page.',
    fields: [
      { key: 'value_1_title', label: 'Value 1 Title', type: 'text', help: 'E.g., Discipline' },
      { key: 'value_1_desc', label: 'Value 1 Description', type: 'textarea', help: 'Description for Value 1.' },
      { key: 'value_2_title', label: 'Value 2 Title', type: 'text', help: 'E.g., Excellence' },
      { key: 'value_2_desc', label: 'Value 2 Description', type: 'textarea', help: 'Description for Value 2.' },
      { key: 'value_3_title', label: 'Value 3 Title', type: 'text', help: 'E.g., Brotherhood' },
      { key: 'value_3_desc', label: 'Value 3 Description', type: 'textarea', help: 'Description for Value 3.' },
      { key: 'value_4_title', label: 'Value 4 Title', type: 'text', help: 'E.g., Proven Track Record' },
      { key: 'value_4_desc', label: 'Value 4 Description', type: 'textarea', help: 'Description for Value 4.' },
    ]
  },
  {
    title: 'Team Members',
    icon: Users,
    description: 'The leadership team displayed on the homepage and about page.',
    fields: [
      { key: 'team_1_name', label: 'Member 1 Name', type: 'text', help: 'E.g., Prakash Gurung' },
      { key: 'team_1_role', label: 'Member 1 Role', type: 'text', help: 'E.g., Managing Director' },
      { key: 'team_1_img', label: 'Member 1 Image', type: 'image', help: 'Image for Member 1.' },
      { key: 'team_2_name', label: 'Member 2 Name', type: 'text', help: 'E.g., Kum Prasad Tamang' },
      { key: 'team_2_role', label: 'Member 2 Role', type: 'text', help: 'E.g., Physical Training Instructor' },
      { key: 'team_2_img', label: 'Member 2 Image', type: 'image', help: 'Image for Member 2.' },
      { key: 'team_3_name', label: 'Member 3 Name', type: 'text', help: 'E.g., Sajan Pata Magar' },
      { key: 'team_3_role', label: 'Member 3 Role', type: 'text', help: 'E.g., Physical Training Instructor' },
      { key: 'team_3_img', label: 'Member 3 Image', type: 'image', help: 'Image for Member 3.' },
    ]
  },
  {
    title: 'Contact Info',
    icon: Phone,
    description: 'Business details displayed in the footer or contact area.',
    fields: [
      { key: 'contact_address', label: 'Physical Address', type: 'text', help: 'E.g., Kantipur Marga-15, Pokhara' },
      { key: 'contact_phone', label: 'Phone Number', type: 'text', help: 'Contact number shown on the site.' },
      { key: 'contact_email', label: 'Email Address', type: 'text', help: 'Business email.' },
      { key: 'social_facebook', label: 'Facebook URL', type: 'text', help: 'Full URL to your Facebook page.' },
      { key: 'social_instagram', label: 'Instagram URL', type: 'text', help: 'Full URL to your Instagram profile.' },
      { key: 'social_youtube', label: 'YouTube URL', type: 'text', help: 'Full URL to your YouTube channel.' },
    ]
  },
  {
    title: 'Announcements',
    icon: Megaphone,
    description: 'Manage multiple pop-up announcements shown when visitors open the site. Each item has a title, message, and optional image.',
    fields: [
      { key: 'announcements', label: 'Announcements List', type: 'announcements', help: 'Add, remove, enable/disable individual announcements.' },
    ]
  },
  {
    title: 'Facilities Page',
    icon: Building2,
    description: 'Manage texts and images displayed on your facilities page.',
    fields: [
      { key: 'services_hero_title', label: 'Page Headline', type: 'text', help: 'Main title at the top of the page.' },
      { key: 'services_hero_subtitle', label: 'Page Subtitle', type: 'text', help: 'Short description below the headline.' },
      { key: 'service_1_title', label: 'Facility 1 — Title', type: 'text', help: 'E.g., Gym & Training Hall' },
      { key: 'service_1_desc', label: 'Facility 1 — Description', type: 'textarea', help: 'Details about the first facility.' },
      { key: 'service_1_img', label: 'Facility 1 — Image', type: 'image', help: 'Image for the first facility.' },
      { key: 'service_2_title', label: 'Facility 2 — Title', type: 'text', help: 'E.g., Student Hostel' },
      { key: 'service_2_desc', label: 'Facility 2 — Description', type: 'textarea', help: 'Details about the second facility.' },
      { key: 'service_2_img', label: 'Facility 2 — Image', type: 'image', help: 'Image for the second facility.' },
      { key: 'service_3_title', label: 'Facility 3 — Title', type: 'text', help: 'E.g., Education Center' },
      { key: 'service_3_desc', label: 'Facility 3 — Description', type: 'textarea', help: 'Details about the third facility.' },
      { key: 'service_3_img', label: 'Facility 3 — Image', type: 'image', help: 'Image for the third facility.' },
      { key: 'service_4_title', label: 'Facility 4 — Title', type: 'text', help: 'E.g., Nutritional Canteen' },
      { key: 'service_4_desc', label: 'Facility 4 — Description', type: 'textarea', help: 'Details about the fourth facility.' },
      { key: 'service_4_img', label: 'Facility 4 — Image', type: 'image', help: 'Image for the fourth facility.' },
      { key: 'service_5_title', label: 'Facility 5 — Title', type: 'text', help: 'E.g., Swimming Facility' },
      { key: 'service_5_desc', label: 'Facility 5 — Description', type: 'textarea', help: 'Details about the fifth facility.' },
      { key: 'service_5_img', label: 'Facility 5 — Image', type: 'image', help: 'Image for the fifth facility.' },
      { key: 'service_6_title', label: 'Facility 6 — Title', type: 'text', help: 'E.g., Sports Courts' },
      { key: 'service_6_desc', label: 'Facility 6 — Description', type: 'textarea', help: 'Details about the sixth facility.' },
      { key: 'service_6_img', label: 'Facility 6 — Image', type: 'image', help: 'Image for the sixth facility.' },
    ]
  },
  {
    title: 'Success Rates',
    icon: Users,
    description: 'Manage the success rates displayed across the website.',
    fields: [
      { key: 'success_rate_bga', label: 'British Gurkha Success Rate', type: 'text', help: 'E.g., 80%' },
      { key: 'success_rate_spf', label: 'Singapore Police Success Rate', type: 'text', help: 'E.g., 64%' },
      { key: 'success_rate_ia', label: 'Indian Army Success Rate', type: 'text', help: 'E.g., 55%' },
      { key: 'students_trained', label: 'Total Students Trained', type: 'text', help: 'E.g., 1000+' },
    ]
  }
];

/* ─── Image Field Component ──────────────────────────────────────────── */
const ImageField = ({ fieldKey, value, onChange }) => {
  const [mode, setMode] = useState('url'); // 'url' | 'upload'
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // Build preview from value (URL) or local blob
  const displayUrl = preview || value || '';

  const handleFileSelect = async (file) => {
    if (!file) return;
    setUploadError('');
    // Local blob preview immediately
    const blobUrl = URL.createObjectURL(file);
    setPreview(blobUrl);
    setUploading(true);
    try {
      const res = await uploadService.uploadImage(file);
      onChange(res.data.url);
      setPreview(null); // server URL is now in value
    } catch (err) {
      setUploadError(err?.response?.data?.message || 'Upload failed. Please try again.');
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  };

  const clearImage = () => {
    onChange('');
    setPreview(null);
    setUploadError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div>
      {/* Mode toggle */}
      <div style={{
        display: 'inline-flex',
        background: '#f0eee9',
        borderRadius: '8px',
        padding: '3px',
        marginBottom: '0.85rem',
        gap: '2px',
      }}>
        {[{ id: 'url', label: 'URL', Icon: Link2 }, { id: 'upload', label: 'Upload File', Icon: Upload }].map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setMode(id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.35rem',
              padding: '0.38rem 0.85rem',
              background: mode === id ? 'var(--secondary)' : 'transparent',
              color: mode === id ? 'var(--primary)' : 'var(--text-muted)',
              border: 'none', borderRadius: '6px', cursor: 'pointer',
              fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
              fontSize: '0.78rem', letterSpacing: '0.06em', textTransform: 'uppercase',
              transition: 'all 0.18s ease',
            }}
          >
            <Icon size={13} strokeWidth={2.5} />
            {label}
          </button>
        ))}
      </div>

      {/* URL mode */}
      {mode === 'url' && (
        <input
          type="text"
          className="form-control"
          placeholder="https://example.com/image.jpg"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {/* Upload mode */}
      {mode === 'upload' && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !uploading && fileInputRef.current?.click()}
          style={{
            border: `2px dashed ${dragOver ? 'var(--primary)' : '#d1cdc6'}`,
            borderRadius: '10px',
            padding: '1.5rem',
            textAlign: 'center',
            cursor: uploading ? 'not-allowed' : 'pointer',
            background: dragOver ? 'rgba(201,168,76,0.05)' : '#fafaf8',
            transition: 'all 0.2s ease',
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => handleFileSelect(e.target.files?.[0])}
          />
          {uploading ? (
            <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <RefreshCw size={18} className="spin" />
              <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '0.9rem' }}>Uploading…</span>
            </div>
          ) : (
            <>
              <Upload size={22} color="var(--primary)" style={{ margin: '0 auto 0.5rem' }} />
              <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, color: 'var(--secondary)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                Drop an image or click to browse
              </p>
              <p style={{ color: 'var(--text-light)', fontSize: '0.78rem' }}>JPG, PNG, WEBP, GIF, SVG — max 8 MB</p>
            </>
          )}
        </div>
      )}

      {/* Error */}
      {uploadError && (
        <p style={{ color: '#dc2626', fontSize: '0.82rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <X size={13} /> {uploadError}
        </p>
      )}

      {/* Preview */}
      {displayUrl && (
        <div style={{ marginTop: '0.85rem', position: 'relative', display: 'inline-block' }}>
          <img
            src={displayUrl}
            alt="Preview"
            style={{
              height: '90px', width: 'auto', maxWidth: '100%',
              borderRadius: '8px', objectFit: 'cover',
              border: '2px solid #e5e7eb',
              display: 'block',
            }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); clearImage(); }}
            title="Remove image"
            style={{
              position: 'absolute', top: '-8px', right: '-8px',
              width: '22px', height: '22px',
              background: '#dc2626', color: 'white',
              border: 'none', borderRadius: '50%', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            }}
          >
            <X size={12} strokeWidth={3} />
          </button>
        </div>
      )}

      {/* Empty placeholder when no image */}
      {!displayUrl && (
        <div style={{
          marginTop: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem',
          color: 'var(--text-light)', fontSize: '0.82rem',
        }}>
          <ImageIcon size={14} />
          No image set
        </div>
      )}
    </div>
  );
};

/* ─── Announcements Editor ───────────────────────────────────────────── */
const EMPTY_ITEM = () => ({ title: '', text: '', image: '', enabled: true });

const AnnouncementsEditor = ({ value, onChange, onSave, saving, saved }) => {
  const parseItems = (raw) => {
    try {
      const arr = JSON.parse(raw || '[]');
      return Array.isArray(arr) ? arr : [EMPTY_ITEM()];
    } catch { return [EMPTY_ITEM()]; }
  };

  const [items, setItems] = useState(() => parseItems(value));

  // Sync outward whenever items change
  useEffect(() => {
    onChange(JSON.stringify(items));
  }, [items]); // eslint-disable-line

  const update = (i, field, val) => {
    setItems(prev => prev.map((item, idx) => idx === i ? { ...item, [field]: val } : item));
  };

  const addItem = () => setItems(prev => [...prev, EMPTY_ITEM()]);
  const removeItem = (i) => setItems(prev => prev.filter((_, idx) => idx !== i));
  const toggleEnabled = (i) => update(i, 'enabled', !items[i].enabled);

  return (
    <div>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            background: item.enabled ? '#fafaf8' : '#f5f5f5',
            border: `1.5px solid ${item.enabled ? '#e0ddd6' : '#ddd'}`,
            borderRadius: '14px',
            padding: '1.25rem',
            marginBottom: '1rem',
            opacity: item.enabled ? 1 : 0.7,
            transition: 'all 0.2s',
          }}
        >
          {/* Card header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{
              fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
              fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em',
              color: 'var(--secondary)',
            }}>
              Announcement {i + 1}
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {/* Toggle enabled */}
              <button
                type="button"
                onClick={() => toggleEnabled(i)}
                title={item.enabled ? 'Disable' : 'Enable'}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.3rem',
                  background: item.enabled ? 'rgba(22,101,52,0.1)' : '#f0eee9',
                  color: item.enabled ? '#166534' : 'var(--text-muted)',
                  border: 'none', borderRadius: '6px',
                  padding: '0.35rem 0.7rem', cursor: 'pointer',
                  fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
                  fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase',
                }}
              >
                {item.enabled
                  ? <><ToggleRight size={14} /> Enabled</>
                  : <><ToggleLeft size={14} /> Disabled</>}
              </button>
              {/* Remove */}
              <button
                type="button"
                onClick={() => removeItem(i)}
                title="Remove"
                style={{
                  width: '30px', height: '30px',
                  background: 'rgba(220,38,38,0.1)', color: '#dc2626',
                  border: 'none', borderRadius: '6px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          {/* Image upload */}
          <div style={{ marginBottom: '0.85rem' }}>
            <label style={fieldLabel}>Image (optional)</label>
            <ImageField
              fieldKey={`ann_img_${i}`}
              value={item.image || ''}
              onChange={(val) => update(i, 'image', val)}
            />
          </div>

          {/* Title */}
          <div style={{ marginBottom: '0.75rem' }}>
            <label style={fieldLabel}>Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="E.g. New Intake Open!"
              value={item.title || ''}
              onChange={(e) => update(i, 'title', e.target.value)}
            />
          </div>

          {/* Text */}
          <div>
            <label style={fieldLabel}>Message</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Describe your announcement..."
              value={item.text || ''}
              onChange={(e) => update(i, 'text', e.target.value)}
              style={{ resize: 'vertical', marginBottom: 0 }}
            />
          </div>
        </div>
      ))}

      {/* Add button */}
      <button
        type="button"
        onClick={addItem}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          width: '100%', padding: '0.85rem',
          background: 'rgba(201,168,76,0.08)',
          border: '2px dashed rgba(201,168,76,0.4)',
          borderRadius: '12px', cursor: 'pointer',
          fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
          fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.07em',
          color: 'var(--primary)', justifyContent: 'center',
          transition: 'background 0.2s',
          marginBottom: '1.25rem',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.15)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.08)')}
      >
        <Plus size={16} /> Add Announcement
      </button>

      {/* Save all button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        type="button"
        onClick={onSave}
        disabled={saving}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.75rem 2rem',
          background: saved ? '#166534' : saving ? 'var(--secondary)' : 'var(--primary)',
          color: saved || saving ? 'white' : 'var(--secondary)',
          border: 'none', borderRadius: '10px',
          fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
          fontSize: '0.9rem', letterSpacing: '0.07em', textTransform: 'uppercase',
          cursor: saving ? 'not-allowed' : 'pointer',
          opacity: saving ? 0.7 : 1,
          transition: 'background 0.25s',
        }}
      >
        {saving ? <><RefreshCw size={15} className="spin" /> Saving…</>
          : saved ? <><CheckCircle size={15} /> Saved!</>
          : <><Save size={15} /> Save All Announcements</>}
      </motion.button>
    </div>
  );
};

const fieldLabel = {
  display: 'block',
  fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
  fontSize: '0.8rem', textTransform: 'uppercase',
  letterSpacing: '0.06em', color: 'var(--text-muted)',
  marginBottom: '0.4rem',
};

/* ─── Main Component ─────────────────────────────────────────────────── */
const AdminContent = () => {
  const [content, setContent] = useState({});
  const [savingKeys, setSavingKeys] = useState({});
  const [successKeys, setSuccessKeys] = useState({});
  const [userRole, setUserRole] = useState('');
  const [activeTab, setActiveTab] = useState(pageSections[0].title);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserRole(payload.role || '');
      } catch (e) {
        console.error('Error decoding token:', e);
      }
    }
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await contentService.getContent();
      const contentObj = res.data.reduce((acc, item) => {
        acc[item.key_name] = item.value;
        return acc;
      }, {});
      setContent(contentObj);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async (section_key) => {
    setSavingKeys(prev => ({ ...prev, [section_key]: true }));
    try {
      await contentService.updateContent({
        key_name: section_key,
        value: content[section_key] || ''
      });
      setSavingKeys(prev => ({ ...prev, [section_key]: false }));
      setSuccessKeys(prev => ({ ...prev, [section_key]: true }));
      setTimeout(() => setSuccessKeys(prev => ({ ...prev, [section_key]: false })), 3000);
    } catch (error) {
      console.error(error);
      setSavingKeys(prev => ({ ...prev, [section_key]: false }));
    }
  };

  const handleInputChange = (section_key, value) => {
    setContent(prev => ({ ...prev, [section_key]: value }));
  };

  if (userRole && !['admin', 'super_admin', 'manager'].includes(userRole)) {
    return (
      <div style={{ padding: '4rem 2rem', textAlign: 'center', background: 'white', borderRadius: '20px', margin: '2rem' }}>
        <Shield size={64} color="#ef4444" style={{ margin: '0 auto 1.5rem', opacity: 0.4 }} />
        <h2 style={{ marginBottom: '1rem' }}>Access Restricted</h2>
        <p style={{ color: 'var(--text-muted)' }}>You do not have permission to modify website content.</p>
      </div>
    );
  }

  const activeSection = pageSections.find(s => s.title === activeTab);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ width: '100%' }}>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.25rem',
        overflowX: 'auto',
        marginBottom: '2rem',
        background: 'white',
        borderRadius: '12px',
        padding: '0.4rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        scrollbarWidth: 'none',
        flexWrap: 'wrap',
      }}>
        {pageSections.map((section) => {
          const Icon = section.icon;
          const isActive = activeTab === section.title;
          return (
            <button
              key={section.title}
              onClick={() => setActiveTab(section.title)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.45rem',
                padding: '0.55rem 0.9rem',
                background: isActive ? 'var(--secondary)' : 'transparent',
                color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                border: 'none', borderRadius: '8px', cursor: 'pointer',
                fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
                fontSize: '0.82rem', letterSpacing: '0.06em', textTransform: 'uppercase',
                whiteSpace: 'nowrap', transition: 'all 0.2s ease', flexShrink: 0,
              }}
            >
              <Icon size={14} strokeWidth={2.5} />
              {section.title}
            </button>
          );
        })}
      </div>

      {/* Active Section */}
      <AnimatePresence mode="wait">
        {activeSection && (
          <motion.div
            key={activeSection.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {/* Section Header */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '1rem',
              marginBottom: '1.25rem', padding: '1.25rem 1.5rem',
              background: 'var(--secondary)', borderRadius: '12px',
              borderLeft: '4px solid var(--primary)',
            }}>
              {React.createElement(activeSection.icon, { size: 20, color: 'var(--primary)', strokeWidth: 2 })}
              <div>
                <h2 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '0.15rem' }}>
                  {activeSection.title}
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                  {activeSection.description}
                </p>
              </div>
            </div>

            {/* Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {activeSection.fields.map(({ key, label, type, help }) => {
                if (type === 'announcements') {
                  return (
                    <div key={key} style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                      <p style={{ color: 'var(--text-light)', fontSize: '0.83rem', marginBottom: '1.25rem' }}>{help}</p>
                      <AnnouncementsEditor
                        value={content[key] || '[]'}
                        onChange={(val) => handleInputChange(key, val)}
                        onSave={() => handleSave(key)}
                        saving={!!savingKeys[key]}
                        saved={!!successKeys[key]}
                      />
                    </div>
                  );
                }

                return (
                  <motion.div
                    key={key}
                    layout
                    style={{
                      background: successKeys[key] ? 'rgba(22,101,52,0.04)' : 'white',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                      border: successKeys[key]
                        ? '1.5px solid rgba(22,101,52,0.3)'
                        : '1.5px solid transparent',
                      transition: 'background 0.4s ease, border-color 0.4s ease',
                    }}
                  >
                    {/* Field header */}
                    <div style={{
                      display: 'flex', justifyContent: 'space-between',
                      alignItems: 'flex-start', marginBottom: '0.85rem',
                      gap: '1rem', flexWrap: 'wrap',
                    }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <label style={{
                          display: 'block',
                          fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
                          fontSize: '0.95rem', textTransform: 'uppercase',
                          letterSpacing: '0.05em', color: 'var(--secondary)', marginBottom: '0.25rem',
                        }}>
                          {label}
                        </label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <code style={{
                            background: '#f0eee9', padding: '0.15rem 0.45rem',
                            borderRadius: '4px', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 600,
                          }}>
                            {key}
                          </code>
                          <span style={{ color: 'var(--text-light)', fontSize: '0.82rem' }}>{help}</span>
                        </div>
                      </div>

                      {/* Save button */}
                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => handleSave(key)}
                        disabled={savingKeys[key]}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                          padding: '0.5rem 1.1rem',
                          background: successKeys[key] ? '#166534' : savingKeys[key] ? 'var(--secondary)' : 'var(--primary)',
                          color: successKeys[key] || savingKeys[key] ? 'white' : 'var(--secondary)',
                          border: 'none', borderRadius: '7px',
                          fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
                          fontSize: '0.82rem', letterSpacing: '0.06em', textTransform: 'uppercase',
                          cursor: savingKeys[key] ? 'not-allowed' : 'pointer',
                          transition: 'background 0.25s ease', flexShrink: 0,
                          opacity: savingKeys[key] ? 0.7 : 1,
                        }}
                      >
                        {savingKeys[key] ? (
                          <RefreshCw size={14} className="spin" />
                        ) : successKeys[key] ? (
                          <><CheckCircle size={14} /> Saved</>
                        ) : (
                          <><Save size={14} /> Save</>
                        )}
                      </motion.button>
                    </div>

                    {/* Input by type */}
                    {type === 'image' ? (
                      <ImageField
                        fieldKey={key}
                        value={content[key] || ''}
                        onChange={(val) => handleInputChange(key, val)}
                      />
                    ) : type === 'textarea' ? (
                      <textarea
                        className="form-control"
                        rows="4"
                        value={content[key] || ''}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        style={{ resize: 'vertical', marginBottom: 0 }}
                      />
                    ) : type === 'select' ? (
                      <select
                        className="form-control"
                        value={content[key] || 'false'}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                      >
                        <option value="false">Disabled / Hidden</option>
                        <option value="true">Enabled / Visible</option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        className="form-control"
                        value={content[key] || ''}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default AdminContent;
