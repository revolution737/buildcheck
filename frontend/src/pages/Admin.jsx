import React, { useState, useEffect } from 'react';
import api from '../api';
import styles from './Admin.module.css';

const Admin = () => {
  const [components, setComponents] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('components');
  
  // State for component form
  const [form, setForm] = useState({
      name: '', brand: '', category: 'CPU', specs: {}
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [compRes, userRes] = await Promise.all([
        api.get('/components'),
        api.get('/admin/users')
      ]);
      setComponents(compRes.data.data);
      setUsers(userRes.data.data);
    } catch (err) {
      console.error('Failed to fetch admin data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/components/${editId}`, form);
      } else {
        await api.post('/components', form);
      }
      setForm({ name: '', brand: '', category: 'CPU', specs: {} });
      setIsEditing(false);
      setEditId(null);
      fetchData();
    } catch (err) {
      alert('Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this component?')) return;
    try {
      await api.delete(`/components/${id}`);
      fetchData();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleEdit = (comp) => {
    setForm({
        name: comp.name,
        brand: comp.brand,
        category: comp.category,
        specs: comp.specs
    });
    setIsEditing(true);
    setEditId(comp._id);
  };

  if (loading) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <header className={styles.header}>
        <h1>Admin Dashboard</h1>
        <div className={styles.tabs}>
            <button 
                className={activeTab === 'components' ? styles.activeTab : ''}
                onClick={() => setActiveTab('components')}
            >
                Components
            </button>
            <button 
                className={activeTab === 'users' ? styles.activeTab : ''}
                onClick={() => setActiveTab('users')}
            >
                Users
            </button>
        </div>
      </header>

      {activeTab === 'components' && (
        <div className={styles.content}>
          <div className={styles.formCard}>
            <h3>{isEditing ? 'Edit Component' : 'Add New Component'}</h3>
            <form onSubmit={handleCreateOrUpdate}>
                <div className={styles.formGrid}>
                    <input 
                        placeholder="Name" 
                        value={form.name} 
                        onChange={e => setForm({...form, name: e.target.value})} 
                        required 
                    />
                    <input 
                        placeholder="Brand" 
                        value={form.brand} 
                        onChange={e => setForm({...form, brand: e.target.value})} 
                        required 
                    />
                    <select 
                        value={form.category} 
                        onChange={e => setForm({...form, category: e.target.value})}
                    >
                        <option value="CPU">CPU</option>
                        <option value="MOTHERBOARD">MOTHERBOARD</option>
                        <option value="RAM">RAM</option>
                        <option value="GPU">GPU</option>
                        <option value="PSU">PSU</option>
                        <option value="STORAGE">STORAGE</option>
                        <option value="CASE">CASE</option>
                    </select>
                </div>
                <div className={styles.specsArea}>
                    <p>Specs (JSON format):</p>
                    <textarea 
                        rows="5"
                        value={JSON.stringify(form.specs, null, 2)}
                        onChange={e => {
                            try {
                                setForm({...form, specs: JSON.parse(e.target.value)});
                            } catch(err) {}
                        }}
                    ></textarea>
                </div>
                <div className={styles.formActions}>
                    <button type="submit" className={styles.submitBtn}>
                        {isEditing ? 'Update Component' : 'Create Component'}
                    </button>
                    {isEditing && (
                        <button 
                            type="button" 
                            className={styles.cancelBtn}
                            onClick={() => {
                                setIsEditing(false);
                                setForm({ name: '', brand: '', category: 'CPU', specs: {} });
                            }}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {components.map(comp => (
                <tr key={comp._id}>
                  <td>{comp.name}</td>
                  <td>{comp.brand}</td>
                  <td>{comp.category}</td>
                  <td>
                    <button onClick={() => handleEdit(comp)} className={styles.editBtn}>Edit</button>
                    <button onClick={() => handleDelete(comp._id)} className={styles.deleteBtn}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'users' && (
        <div className={styles.content}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
