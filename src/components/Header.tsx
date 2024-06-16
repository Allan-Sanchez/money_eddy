import React from 'react';
import styles from '../scss/Header.module.scss';
import LogoImage from '../assets/Home/Logo_eddy.png';
import Icon from './Icon';

const Header: React.FC = () => {
  const userName = "John Doe"; // Este valor puede ser dinámico, basado en el usuario autenticado

  return (
    <header className={styles.header}>
      <div className={styles.containerMain}>
        <div className={styles.logoContainer}>
          {/* use image how svg */}

          <img src={LogoImage} alt="Logo" className={styles.logo} />
          <span className={styles.companyName}>Money Eddy</span>
        </div>

        <div className={styles.userContainer}>
          <Icon name="notification" className={styles.icon} />
          <span className={styles.userName}>{userName}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
