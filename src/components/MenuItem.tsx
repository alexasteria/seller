import React, { FC } from 'react';
import { MenuItem as MenuItemType } from '../types';
import ClassicCard from './cards/ClassicCard';
import ModernCard from './cards/ModernCard';
import MinimalCard from './cards/MinimalCard';
import PremiumCard from './cards/PremiumCard';
import CompactCard from './cards/CompactCard';

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
    case 'modern':
      return <ModernCard {...cardProps} />;
    case 'minimal':
      return <MinimalCard {...cardProps} />;
    case 'premium':
      return <PremiumCard {...cardProps} />;
    case 'compact':
      return <CompactCard {...cardProps} />;
    default:
      return <ClassicCard {...cardProps} />;
  }
};

export default MenuItem;
