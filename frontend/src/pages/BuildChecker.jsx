import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../api';
import styles from './BuildChecker.module.css';
import { AlertTriangle, XCircle, CheckCircle, Save } from 'lucide-react';

const CATEGORIES = ['CPU', 'MOTHERBOARD', 'RAM', 'GPU', 'PSU', 'STORAGE', 'CASE'];

const BuildChecker = () => {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const navigate = useNavigate();

  const [components, setComponents] = useState({}); // { category: [list] }
  const [selected, setSelected] = useState({
      CPU: '', MOTHERBOARD: '', RAM: '', GPU: '', PSU: '', STORAGE: '', CASE: ''
  });
  const [buildName, setBuildName] = useState('New PC Build');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [compRes, buildRes] = await Promise.all([
          api.get('/components'),
          editId ? api.get(`/builds/${editId}`) : Promise.resolve(null)
        ]);

        const categorized = {};
        const componentList = compRes.data?.data || [];
        if (Array.isArray(componentList)) {
          componentList.forEach(c => {
            if (!categorized[c.category]) categorized[c.category] = [];
            categorized[c.category].push(c);
          });
        }
        setComponents(categorized);

        if (buildRes) {
          const b = buildRes.data.data;
          setBuildName(b.name);
          const sel = { ...selected };
          b.components.forEach(c => {
            sel[c.category] = c._id;
          });
          setSelected(sel);
        }
      } catch (err) {
        console.error('Failed to fetch data', err);
      }
    };
    fetchData();
  }, [editId]);

  const handleSelect = (category, id) => {
    setSelected(prev => ({ ...prev, [category]: id }));
    setResults(null); // Clear results when selection changes
  };

  const checkCompatibility = async () => {
    const ids = Object.values(selected).filter(id => id !== '');
    if (ids.length === 0) return;

    setLoading(true);
    try {
      const res = await api.post('/compatibility/check', { componentIds: ids });
      setResults(res.data);
    } catch (err) {
      alert('Failed to check compatibility');
    } finally {
      setLoading(false);
    }
  };

  const saveBuild = async () => {
    const ids = Object.values(selected).filter(id => id !== '');
    if (ids.length === 0) return;

    setSaving(true);
    try {
      if (editId) {
        await api.put(`/builds/${editId}`, { name: buildName, componentIds: ids });
      } else {
        await api.post('/builds', { name: buildName, componentIds: ids });
      }
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to save build');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container">
      <header className={styles.header}>
        <div className={styles.titleArea}>
          <input 
            className={styles.buildNameInput}
            value={buildName}
            onChange={(e) => setBuildName(e.target.value)}
          />
        </div>
        <div className={styles.actions}>
            <button 
                onClick={checkCompatibility} 
                className={styles.checkBtn}
                disabled={loading}
            >
                {loading ? 'Checking...' : 'Check Compatibility'}
            </button>
            <button 
                onClick={saveBuild} 
                className={styles.saveBtn}
                disabled={saving || (results && !results.compatible)}
            >
                <Save size={18} />
                {saving ? 'Saving...' : 'Save Build'}
            </button>
        </div>
      </header>

      <div className={styles.layout}>
        <div className={styles.selectors}>
          {CATEGORIES.map(cat => (
            <div key={cat} className={styles.selectorGroup}>
              <label>{cat}</label>
              <select 
                value={selected[cat]} 
                onChange={(e) => handleSelect(cat, e.target.value)}
              >
                <option value="">Select {cat}...</option>
                {components[cat]?.map(c => (
                  <option key={c._id} value={c._id}>
                    {c.brand} {c.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className={styles.results}>
          <h3>Compatibility Results</h3>
          {!results ? (
            <div className={styles.noResults}>
              Select components and click "Check Compatibility"
            </div>
          ) : (
            <div className={styles.resultsContent}>
              <div className={results.compatible ? styles.statusCompatible : styles.statusIncompatible}>
                {results.compatible ? (
                  <><CheckCircle size={20} /> Components are compatible</>
                ) : (
                  <><XCircle size={20} /> Compatibility issues found</>
                )}
              </div>

              {results.issues.length > 0 && (
                <div className={styles.issueList}>
                  {results.issues.map((issue, i) => (
                    <div key={i} className={styles.issueItem}>
                      <XCircle size={16} className={styles.errorIcon} />
                      <span>{issue.message}</span>
                    </div>
                  ))}
                </div>
              )}

              {results.warnings.length > 0 && (
                <div className={styles.warningList}>
                  {results.warnings.map((warn, i) => (
                    <div key={i} className={styles.warningItem}>
                      <AlertTriangle size={16} className={styles.warningIcon} />
                      <span>{warn.message}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuildChecker;
