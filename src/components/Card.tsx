import React from 'react';
import styles from '../scss/Card.module.scss';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  title: string;
  value?: string | number;
  icon: React.ReactNode;
  redirect?: string;
}

const Card: React.FC<CardProps> = ({ title, value, icon, redirect }) => {
  const navigate = useNavigate();

  const handleRedirect = (path: string) => {
    navigate(`/${path}`);
  }
  return (
    <div className={styles.card} onClick={() => redirect && handleRedirect(redirect)}>
      <div className={styles.iconContainer}>
        {icon}
      </div>
      <div className={styles.textContainer}>
        <h6 className={styles.title}>{title}</h6>
        {
          value && <h4 className={styles.value}>{value}</h4>
        }
        
      </div>
    </div>
  );
};

export default Card;
