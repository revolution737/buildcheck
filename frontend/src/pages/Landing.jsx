import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Landing.module.css';

const Landing = () => {
  return (
    <div className={styles.hero}>
      <h1 className={styles.title}>Check before you build</h1>
      <p className={styles.subtitle}>
        The ultimate PC component compatibility checker. Ensure every part fits perfectly in your next masterpiece.
      </p>
      <div className={styles.actions}>
        <Link to="/register" className={styles.primaryBtn}>Get Started</Link>
        <Link to="/login" className={styles.secondaryBtn}>Sign In</Link>
      </div>
    </div>
  );
};

export default Landing;
