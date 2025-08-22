import React, { FC } from 'react';
import MenuItem from './MenuItem';
import { MENU } from '../data/menu';

interface MenuProps {
  cart: Record<string, number>;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
}

const Menu: FC<MenuProps> = ({ cart, onIncrement, onDecrement }) => {
  return (
    <section className="grid">
      {MENU.map(item => (
        <MenuItem
          key={item.id}
          item={item}
          quantity={cart[item.id] ?? 0}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
        />
      ))}
    </section>
  );
};

export default Menu;
