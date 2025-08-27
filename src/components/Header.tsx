import React, { FC } from 'react';
import styles from '@/components/Header.module.css';

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <h1>🍕 БоБо Пицца</h1>
      <p className={styles.hint}>Выберите пиццу и нажмите «Перейти к доставке»</p>
    </header>
  );
};

export default Header;
