import React, { FC } from 'react';
import { MenuItem as MenuItemType } from '../types';
import ClassicCard from './cards/ClassicCard';

interface MenuItemProps {
  item: MenuItemType;
  quantity: number;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
}

const MenuItem: FC<MenuItemProps> = ({ item, quantity, onIncrement, onDecrement }) => {
  return (
    <ClassicCard
      item={item}
      quantity={quantity}
      onIncrement={onIncrement}
      onDecrement={onDecrement}
    />
  );
};

export default MenuItem;
