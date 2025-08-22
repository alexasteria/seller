import React, { FC } from 'react';

interface FooterProps {
  total: number;
}

const Footer: FC<FooterProps> = ({ total }) => {
  return (
    <footer className="footer">
      <div className="summary">
        <span>Итого</span>
        <strong>₽{total.toFixed(2)}</strong>
      </div>
    </footer>
  );
};

export default Footer;
