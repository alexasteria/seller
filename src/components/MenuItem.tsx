import React, { FC } from 'react';
import { MenuItem as MenuItemType } from '../types';
import ClassicCard from './cards/ClassicCard';
import PremiumCard from './cards/PremiumCard';

interface MenuItemProps {
  item: MenuItemType;
  quantity: number;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
}

const MenuItem: FC<MenuItemProps> = ({ item, quantity, onIncrement, onDecrement }) => {
  const cardStyle = item.cardStyle || 'classic';

  const cardProps = {
    item,
    quantity,
    onIncrement,
    onDecrement
  };

  switch (cardStyle) {
    case 'premium':
      return <PremiumCard {...cardProps} />;
    default:
      return <ClassicCard {...cardProps} />;
  }
};

export default MenuItem;
