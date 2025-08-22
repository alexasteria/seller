import React, { FC } from 'react';
import { MenuItem as MenuItemType } from '../../types';

interface CardProps {
  item: MenuItemType;
  quantity: number;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
}

const MinimalCard: FC<CardProps> = ({ item, quantity, onIncrement, onDecrement }) => {
  return (
    <div className="card minimal-card">
      <div className="minimal-content">
        <div className="minimal-info">
          <div className="minimal-header">
            <h3 className="minimal-title">{item.title}</h3>
            <div className="minimal-price">
              {item.discount ? (
                <>
                  <span className="discounted-price">${(item.price * (1 - item.discount / 100)).toFixed(2)}</span>
                  <span className="original-price">${item.price.toFixed(2)}</span>
                </>
              ) : (
                `$${item.price.toFixed(2)}`
              )}
            </div>
          </div>
          {item.description && (
            <p className="minimal-description">{item.description}</p>
          )}
          {item.ingredients && (
            <div className="minimal-ingredients">
              {item.ingredients.join(' • ')}
            </div>
          )}
          <div className="minimal-badges">
            {item.vegetarian && <span className="minimal-badge veg">🥬</span>}
            {item.spicy && <span className="minimal-badge spicy">🌶️</span>}
            {item.popular && <span className="minimal-badge popular">⭐</span>}
          </div>
        </div>
        {item.img && (
          <div className="minimal-image">
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
      </div>
      <div className="minimal-actions">
        {quantity > 0 ? (
          <div className="minimal-counter">
            <button 
              className="minimal-btn" 
              onClick={() => onDecrement(item.id)}
              aria-label="Уменьшить количество"
            >
              −
            </button>
            <span className="minimal-qty">{quantity}</span>
            <button 
              className="minimal-btn" 
              onClick={() => onIncrement(item.id)}
              aria-label="Увеличить количество"
            >
              +
            </button>
          </div>
        ) : (
          <button 
            className="minimal-add-btn" 
            onClick={() => onIncrement(item.id)}
            aria-label={`Добавить ${item.title}`}
          >
            +
          </button>
        )}
      </div>
    </div>
  );
};

export default MinimalCard;
