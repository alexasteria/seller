import React, { FC } from 'react';
import { MenuItem as MenuItemType } from '../types';

interface MenuItemProps {
  item: MenuItemType;
  quantity: number;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
}

const MenuItem: FC<MenuItemProps> = ({ item, quantity, onIncrement, onDecrement }) => {
  return (
    <div className="card">
      {item.img && (
        <div className="card-image">
          <img 
            src={item.img} 
            alt={item.title}
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      )}
      <div className="card-body">
        <div className="card-title">{item.title}</div>
        {item.description && (
          <div className="card-description">{item.description}</div>
        )}
        <div className="price">${item.price.toFixed(2)}</div>
      </div>
      <div className="card-actions">
        {quantity > 0 ? (
          <div className="counter">
            <button 
              className="btn" 
              onClick={() => onDecrement(item.id)}
              aria-label="Уменьшить количество"
            >
              −
            </button>
            <span className="qty">{quantity}</span>
            <button 
              className="btn" 
              onClick={() => onIncrement(item.id)}
              aria-label="Увеличить количество"
            >
              +
            </button>
          </div>
        ) : (
          <button 
            className="btn primary" 
            onClick={() => onIncrement(item.id)}
            aria-label={`Добавить ${item.title}`}
          >
            Добавить
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuItem;
