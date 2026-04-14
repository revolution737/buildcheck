import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import styles from './Dashboard.module.css';
import { Layout, CheckCircle, XCircle, Trash2 } from 'lucide-react';

const Dashboard = () => {
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuilds = async () => {
      try {
        const res = await api.get('/builds');
        setBuilds(res.data.data);
      } catch (err) {
        console.error('Failed to fetch builds', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBuilds();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this build?')) return;
    try {
      await api.delete(`/builds/${id}`);
      setBuilds(builds.filter(b => b._id !== id));
    } catch (err) {
      alert('Failed to delete build');
    }
  };

  if (loading) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <header className={styles.header}>
        <h1>My Builds</h1>
        <Link to="/builds/new" className={styles.newBuildBtn}>New Build</Link>
      </header>

      {builds.length === 0 ? (
        <div className={styles.empty}>
          <Layout size={48} color="var(--text-secondary)" />
          <p>No builds found. Start by creating a new one!</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {builds.map(build => (
            <div key={build._id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.buildName}>{build.name}</h3>
                <button onClick={() => handleDelete(build._id)} className={styles.deleteBtn}>
                  <Trash2 size={18} />
                </button>
              </div>
              <div className={styles.cardInfo}>
                <span className={styles.componentCount}>
                  {build.components.length} Components
                </span>
                <Link to={`/builds/new?edit=${build._id}`} className={styles.editLink}>Edit</Link>
              </div>
              <ul className={styles.componentList}>
                  {build.components.slice(0, 3).map(c => (
                      <li key={c._id}>{c.name}</li>
                  ))}
                  {build.components.length > 3 && <li>...</li>}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
