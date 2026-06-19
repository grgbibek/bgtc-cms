import React, { useState, useEffect, useRef } from 'react';
import { contentService, uploadService } from '../services/api';
import {
  Save, CheckCircle, RefreshCw,
  Layout, Map, Shield, Users, Phone, Megaphone, Building2,
  Link2, Upload, X, ImageIcon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const pageSections = [
  {
    title: 'Hero Section',
    icon: Layout,
    description: 'The introductory header displayed at the very top of your homepage.',
    fields: [
      { key: 'hero_title', label: 'Main Headline', type: 'text', help: 'The large text appearing on the homepage.' },
      { key: 'hero_subtitle', label: 'Subtitle Description', type: 'text', help: 'A short sentence under the main headline.' },
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
    description: 'Manage the key "Why Choose Us" points that build customer trust.',
    fields: [
      { key: 'trust_1_title', label: 'Point 1 Title', type: 'text', help: 'E.g., Expert Instructors' },
      { key: 'trust_1_desc', label: 'Point 1 Description', type: 'text', help: 'Short supporting text.' },
      { key: 'trust_2_title', label: 'Point 2 Title', type: 'text', help: 'E.g., Proven Track Record' },
      { key: 'trust_2_desc', label: 'Point 2 Description', type: 'text', help: 'Short supporting text.' },
      { key: 'trust_3_title', label: 'Point 3 Title', type: 'text', help: 'E.g., Modern Facilities' },
      { key: 'trust_3_desc', label: 'Point 3 Description', type: 'text', help: 'Short supporting text.' },
    ]
  },
  {
    title: 'About Us',
    icon: Users,
    description: 'The story and background showcasing BGTC.',
    fields: [
      { key: 'about_us', label: 'About Us Biography', type: 'textarea', help: 'Detailed text talking about the training centre.' },
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
    ]
  },
  {
    title: 'Announcement',
    icon: Megaphone,
    description: 'A pop-up banner displayed when visitors open the site.',
    fields: [
      { key: 'announcement_enabled', label: 'Enable Banner', type: 'select', help: 'Toggle to show or hide the announcement.' },
      { key: 'announcement_title', label: 'Banner Title', type: 'text', help: 'E.g. New Intake Open!' },
      { key: 'announcement_text', label: 'Banner Message', type: 'textarea', help: 'Describe your offers or event.' },
      { key: 'announcement_image', label: 'Banner Image (optional)', type: 'image', help: 'A hero image displayed at the top of the banner.' },
    ]
  },
  {
    title: 'Facilities Page',
    icon: Building2,
    description: 'Manage texts and images displayed on your facilities page.',
    fields: [
      { key: 'services_hero_title', label: 'Page Headline', type: 'text', help: 'Main title at the top of the page.' },
      { key: 'services_hero_subtitle', label: 'Page Subtitle', type: 'text', help: 'Short description below the headline.' },
      { key: 'service_1_title', label: 'Facility 1 — Title', type: 'text', help: 'E.g., Combat Training' },
      { key: 'service_1_desc', label: 'Facility 1 — Description', type: 'textarea', help: 'Details about the first facility.' },
      { key: 'service_1_img', label: 'Facility 1 — Image', type: 'image', help: 'Image for the first facility.' },
      { key: 'service_2_title', label: 'Facility 2 — Title', type: 'text', help: 'E.g., Physical Training' },
      { key: 'service_2_desc', label: 'Facility 2 — Description', type: 'textarea', help: 'Details about the second facility.' },
      { key: 'service_2_img', label: 'Facility 2 — Image', type: 'image', help: 'Image for the second facility.' },
      { key: 'service_3_title', label: 'Facility 3 — Title', type: 'text', help: 'E.g., Leadership Programs' },
      { key: 'service_3_desc', label: 'Facility 3 — Description', type: 'textarea', help: 'Details about the third facility.' },
      { key: 'service_3_img', label: 'Facility 3 — Image', type: 'image', help: 'Image for the third facility.' },
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

  if (userRole && userRole !== 'admin') {
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ maxWidth: '900px' }}>

      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '0.35rem' }}>Website Content</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Update texts, images, and contact info instantly across your site.
        </p>
      </div>

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
              {activeSection.fields.map(({ key, label, type, help }) => (
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
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default AdminContent;
