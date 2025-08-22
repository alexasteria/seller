import React, { FC } from 'react';
import { MenuItem as MenuItemType } from '../../types';

interface CardProps {
  item: MenuItemType;
  quantity: number;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
}

const ClassicCard: FC<CardProps> = ({ item, quantity, onIncrement, onDecrement }) => {
  return (
    <div className="card classic-card">
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
      <div className="card-content">
        <h3 className="card-title">{item.title}</h3>
        <div className="card-price">${item.price.toFixed(2)}</div>
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
    </div>
  );
};

export default ClassicCard;
