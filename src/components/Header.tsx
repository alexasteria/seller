import React, { FC } from 'react';

const Header: FC = () => {
  return (
    <header className="header">
      <h1>🍕 Pizza Bot</h1>
      <p className="hint">Выберите пиццу и нажмите «Перейти к доставке»</p>
    </header>
  );
};

export default Header;
