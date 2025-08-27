import React, { FC } from "react";
import styles from "@/components/Footer.module.css";

interface FooterProps {
  total: number;
}

const Footer: FC<FooterProps> = ({ total }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.summary}>
        <span>Итого</span>
        <strong>{total.toFixed(2)}₽</strong>
      </div>
    </footer>
  );
};

export default Footer;
