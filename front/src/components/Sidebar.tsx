import React, { useEffect } from 'react';
import styles from '../styles/sidebar.module.css';
import Image from 'next/image';

import { FaHome, FaSearch, FaBookOpen, FaUpload, FaUser } from 'react-icons/fa';

const Sidebar = () => {
  useEffect(() => {
    const showNavbar = (
      toggleId: string,
      navId: string,
      bodyId: string,
      headerId: string,
    ) => {
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
      linkColor.forEach((l) => l.classList.remove('active'));
      this.classList.add('active');
    }

    linkColor.forEach((l) => l.addEventListener('click', colorLink));
  }, []);

  return (
    <div id="body-pd">
      <div className="l_navbar" id="nav-bar">
        <a href="index" className={`logoss ${styles.logoss}`}>
          <Image
            src="/logo/logosample.svg"
            alt="Logo"
            className={styles.logoImg}
            width={150}
            height={40}
          />
        </a>
        <div className="nav_link_container">
          <a href="#" className={`nav_link ${styles.nav_link} active`}>
            <FaHome className="nav_icon" />
            <span className="nav_name">Home</span>
          </a>
          <a href="#" className={`nav_link ${styles.nav_link}`}>
            <FaSearch className="nav_icon" />
            <span className="nav_name">Search</span>
          </a>
          <a href="#" className={`nav_link ${styles.nav_link}`}>
            <FaBookOpen className="nav_icon" />
            <span className="nav_name">Library</span>
          </a>
          <a href="#" className={`nav_link ${styles.nav_link}`}>
            <FaBookOpen className="nav_icon" />
            <span className="nav_name">My Licences</span>
          </a>
          <a href="#" className={`nav_link ${styles.nav_link}`}>
            <FaUpload className="nav_icon" />
            <span className="nav_name">Upload a song</span>
          </a>
          <a href="#" className={`nav_link ${styles.nav_link}`}>
            <FaUser className="nav_icon" />
            <span className="nav_name">Profil</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
