import React, { useState } from 'react';
import styles from '../scss/Sidebar.module.scss';
import Icon from './Icon';
import { useAuthStore } from '../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const setIsAuthenticated = useAuthStore((state) => state.logout);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    setIsAuthenticated();
  }

  const handlerRedirect = (path: string) => {
    navigate(path);
  }

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.toggleButton} onClick={toggleSidebar}>
        {/* <Icon name="collapse" className={styles.collapseIcon} /> */}
        <span className={styles.menuText}>Menu Principal</span>
        <Icon name="hamburger" className={styles.icon} />
      </div>
      <ul className={styles.menu}>
        <li onClick={() => handlerRedirect("/dashboard")}><Icon name="home" className={styles.icon} /><span className={styles.menuText}>Home</span></li>
        <li onClick={() => handlerRedirect("/calculadora")}><Icon name="calc" className={styles.icon} /><span className={styles.menuText}>Calculadora</span></li>
        <li onClick={() => handlerRedirect("/usuarios")}><Icon name="profile" className={styles.icon} /><span className={styles.menuText}>Usuarios</span></li>
        <li onClick={() => handlerRedirect("/prestatarios")}><Icon name="borrower" className={styles.icon} /><span className={styles.menuText}>Prestatarios</span></li>
        <li onClick={() => handlerRedirect("/Pagos")}><Icon name="money" className={styles.icon} /><span className={styles.menuText}>Pagos</span></li>
        <li onClick={() => handlerRedirect("/prestamos")}><Icon name="loan" className={styles.icon} /><span className={styles.menuText}>Créditos</span></li>
        <li onClick={() => handleLogout()}><Icon name="logout" className={styles.icon} /><span className={styles.menuText}>Logout</span></li>
      </ul>
    </div>
  );
};

export default Sidebar;
