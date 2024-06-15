// src/components/ProfileButton.tsx

import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/ProfileButton.module.css';

const ProfileButton: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Logique de déconnexion du wallet
    console.log('Wallet déconnecté');
  };

  const handleUpload = () => {
    router.push('/upload');
  };

  return (
    <div className={styles.dropdown}>
      <input type="checkbox" id="dropdown" className={styles.dropdown__input} />

      <label className={styles.dropdown__face} htmlFor="dropdown">
        <div className={styles.dropdown__text}>Profile</div>
        <div className={styles.dropdown__arrow}></div>
      </label>

      <ul className={styles.dropdown__items}>
        <li onClick={handleUpload}>Upload</li>
        <li onClick={handleLogout}>Logout</li>
      </ul>

      <svg>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </svg>
    </div>
  );
};

export default ProfileButton;
