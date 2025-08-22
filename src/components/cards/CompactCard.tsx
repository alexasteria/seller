import React, { FC } from 'react';
import { MenuItem as MenuItemType } from '../../types';

interface CardProps {
  item: MenuItemType;
  quantity: number;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
}

const CompactCard: FC<CardProps> = ({ item, quantity, onIncrement, onDecrement }) => {
  return (
    <div className="card compact-card">
      <div className="compact-layout">
        {item.img && (
          <div className="compact-image">
            <img 
              src={item.img} 
              alt={item.title}
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            {item.popular && <div className="compact-badge">🔥</div>}
          </div>
        )}
        
        <div className="compact-info">
          <div className="compact-header">
            <h4 className="compact-title">{item.title}</h4>
            <div className="compact-price">
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
            <p className="compact-description">{item.description}</p>
          )}
          
          <div className="compact-meta">
            {item.vegetarian && <span className="compact-tag veg">🥬</span>}
            {item.spicy && <span className="compact-tag spicy">🌶️</span>}
            {item.weight && <span className="compact-tag size">{item.weight}</span>}
          </div>
        </div>
        
        <div className="compact-actions">
          {quantity > 0 ? (
            <div className="compact-counter">
              <button 
                className="compact-btn" 
                onClick={() => onDecrement(item.id)}
                aria-label="Уменьшить количество"
              >
                −
              </button>
              <span className="compact-qty">{quantity}</span>
              <button 
                className="compact-btn" 
                onClick={() => onIncrement(item.id)}
                aria-label="Увеличить количество"
              >
                +
              </button>
            </div>
          ) : (
            <button 
              className="compact-add" 
              onClick={() => onIncrement(item.id)}
              aria-label={`Добавить ${item.title}`}
            >
              +
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompactCard;
