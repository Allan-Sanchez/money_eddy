import React from 'react';
import styles from '../scss/Card.module.scss';

interface CardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, value, icon }) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconContainer}>
        {icon}
      </div>
      <div className={styles.textContainer}>
        <h6 className={styles.title}>{title}</h6>
        <h4 className={styles.value}>{value}</h4>
      </div>
    </div>
  );
};

export default Card;
