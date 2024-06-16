import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import styles from '../scss/Layout.module.scss';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <Sidebar />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
