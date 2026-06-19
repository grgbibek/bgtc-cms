import React, { useState, useEffect } from 'react';
import { settingService } from '../services/api';
import { Save, Plus, Trash2, Cake, CheckCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    cake_types: [],
    max_cake_pounds: 10,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await settingService.getSettings();
      if (res.data) {
        setSettings({
          cake_types: res.data.cake_types || [],
          max_cake_pounds: res.data.max_cake_pounds || 10,
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCakeTypeChange = (index, field, value) => {
    const updated = [...settings.cake_types];
    updated[index] = { ...updated[index], [field]: value };
    setSettings(prev => ({ ...prev, cake_types: updated }));
  };

  const addCakeType = () => {
    setSettings(prev => ({
      ...prev,
      cake_types: [...prev.cake_types, { name: '' }]
    }));
  };

  const removeCakeType = (index) => {
    const updated = settings.cake_types.filter((_, i) => i !== index);
    setSettings(prev => ({ ...prev, cake_types: updated }));
  };

  const saveCakeSettings = async () => {
    setSaving(true);
    try {
      await settingService.updateSetting('cake_types', settings.cake_types);
      await settingService.updateSetting('max_cake_pounds', settings.max_cake_pounds);
      setMessage('Settings saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error(error);
      alert('Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
        <RefreshCw className="spin" style={{ color: 'var(--primary)' }} size={32} />
      </div>
    );
  }

  return (
    <div className="admin-main">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', margin: 0 }}>System Settings</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.4rem' }}>Configure global site settings.</p>
        </div>

        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              style={{
                background: '#ecfdf5', color: '#10b981', padding: '0.8rem 1.2rem',
                borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.6rem',
                fontWeight: 600, fontSize: '0.9rem', border: '1px solid #d1fae5'
              }}
            >
              <CheckCircle size={18} /> {message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div style={{ maxWidth: '600px' }}>
        {/* Cake Customization */}
        <section className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{
            background: 'rgba(195,132,82,0.05)', padding: '1.2rem 2rem',
            borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.8rem'
          }}>
            <Cake size={20} style={{ color: 'var(--primary)' }} />
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Cake Customization Types</h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Types customers can select when viewing a cake product (e.g. Eggless, Vegan).
              </p>
            </div>
          </div>

          <div style={{ padding: '2rem' }}>
            <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '1.5rem', paddingRight: '0.5rem' }}>
              {settings.cake_types.map((type, index) => (
                <motion.div
                  layout
                  key={index}
                  style={{
                    display: 'flex', gap: '1rem', alignItems: 'flex-end',
                    background: '#fcfaf8', padding: '1rem', borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)', marginBottom: '1rem'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>Type Name</label>
                    <input
                      type="text"
                      value={type.name}
                      onChange={(e) => handleCakeTypeChange(index, 'name', e.target.value)}
                      className="form-control"
                      placeholder="e.g. Eggless, Vegan, Gluten-Free"
                      style={{ padding: '0.6rem' }}
                    />
                  </div>
                  <button
                    onClick={() => removeCakeType(index)}
                    className="btn-icon danger"
                    style={{ marginBottom: '2px' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </motion.div>
              ))}
            </div>

            <button
              onClick={addCakeType}
              className="btn-outline"
              style={{ width: '100%', borderStyle: 'dashed', background: 'transparent', marginBottom: '1.5rem', padding: '0.6rem' }}
            >
              <Plus size={16} /> Add New Type
            </button>

            <div className="form-group" style={{ marginBottom: '1.5rem', background: '#fcfaf8', padding: '1.2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>Maximum Cake Weight (Pounds)</label>
              <input
                type="number"
                min="1"
                value={settings.max_cake_pounds}
                onChange={(e) => setSettings(prev => ({ ...prev, max_cake_pounds: e.target.value }))}
                className="form-control"
              />
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.5rem 0 0 0' }}>Customers can select cake weight up to this limit on the product page.</p>
            </div>

            <button
              onClick={saveCakeSettings}
              disabled={saving}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Save size={18} /> {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminSettings;
