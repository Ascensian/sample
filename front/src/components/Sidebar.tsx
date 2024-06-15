import React, { useEffect } from 'react';
import styles from '../styles/sidebar.module.css';
import Image from 'next/image';

const Sidebar = () => {
  useEffect(() => {
    const showNavbar = (toggleId: string, navId: string, bodyId: string, headerId: string) => {
      const toggle = document.getElementById(toggleId);
      const nav = document.getElementById(navId);
      const bodypd = document.getElementById(bodyId);
      const headerpd = document.getElementById(headerId);

      if (toggle && nav && bodypd && headerpd) {
        toggle.addEventListener('click', () => {
          nav.classList.toggle('show');
          toggle.classList.toggle('bx-x');
          bodypd.classList.toggle('body-pd');
          headerpd.classList.toggle('body-pd');
        });
      }
    };

    showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header');

    const linkColor = document.querySelectorAll(`.${styles.nav_link}`);

    function colorLink(this: HTMLElement) {
      linkColor.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    }

    linkColor.forEach(l => l.addEventListener('click', colorLink));
  }, []);

  return (
    <div id="body-pd">
      <div className="l_navbar" id="nav-bar">
          <a href="index" className={`logoss ${styles.logoss}`}>
              <Image src="/logo/logosample.svg" alt="Logo" className={styles.logoImg} width={150} height={40} />
            </a>
            <a href="#" className={`nav_link ${styles.nav_link} active`}>
              <i className='bx bx-home nav_icon'></i>
              <span className="nav_name">Accueil</span>
            </a>
            <a href="#" className={`nav_link ${styles.nav_link}`}>
              <i className='bx bx-search-alt nav_icon'></i>
              <span className="nav_name">Rechercher</span>
            </a>
            <a href="#" className={`nav_link ${styles.nav_link}`}>
              <i className='bx bx-book-open nav_icon'></i>
              <span className="nav_name">Découvrir</span>
            </a>
          </div>
      </div>
  );
};

export default Sidebar;
