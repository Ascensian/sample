// src/components/Header.tsx

import React from 'react';
import styles from '../styles/header.module.css';
import ConnectWalletButton from './ConnectWalletButton';

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
      <ConnectWalletButton />
    </header>
  );
};

export default Header;
