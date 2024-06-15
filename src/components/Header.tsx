// src/components/Header.tsx

import React from 'react';
import styles from '../styles/header.module.css'; // Importer le fichier CSS

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <button className={styles['back-button']}>
        <img src="/icon/retour.svg" alt="Back" className={styles['back-icon']} />
      </button>
      <div className={styles['center-content']}>
        <div className={styles.search}>
          <input type="text" placeholder="Rechercher..." />
        </div>
      </div>
      <div className={styles['right-content']}>
        <button className={styles['connect-wallet']}>Connect Wallet</button>
      </div>
    </header>
  );
};

export default Header;
