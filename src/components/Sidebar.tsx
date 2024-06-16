import React, { useState } from 'react';
import styles from '../scss/Sidebar.module.scss';
import Icon from './Icon';

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.toggleButton} onClick={toggleSidebar}>
        {/* <Icon name="collapse" className={styles.collapseIcon} /> */}
        <span className={styles.menuText}>Menu Principal</span>
        <Icon name="hamburger" className={styles.icon} />
      </div>
      <ul className={styles.menu}>
        <li><Icon name="home" className={styles.icon} /><span className={styles.menuText}>Home</span></li>
        <li><Icon name="profile" className={styles.icon} /><span className={styles.menuText}>Profile</span></li>
        <li><Icon name="settings" className={styles.icon} /><span className={styles.menuText}>Settings</span></li>
        <li><Icon name="logout" className={styles.icon} /><span className={styles.menuText}>Logout</span></li>
      </ul>
    </div>
  );
};

export default Sidebar;
