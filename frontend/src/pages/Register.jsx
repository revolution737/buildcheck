import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Auth.module.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      if (err.response?.status === 422 && err.response?.data?.fields) {
          setFieldErrors(err.response.data.fields);
          setError('Please fix the errors below');
      } else {
          setError(err.response?.data?.error || 'Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Create Account</h2>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.field}>
          <label>Full Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          {fieldErrors.name && <div className={styles.fieldError}>{fieldErrors.name}</div>}
        </div>
        <div className={styles.field}>
          <label>Email Address</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          {fieldErrors.email && <div className={styles.fieldError}>{fieldErrors.email}</div>}
        </div>
        <div className={styles.field}>
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          {fieldErrors.password && <div className={styles.fieldError}>{fieldErrors.password}</div>}
        </div>
        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
        <p className={styles.switch}>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
