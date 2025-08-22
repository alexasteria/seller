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
          {item.popular && (
            <div className="badge popular">Популярная</div>
          )}
          {item.discount && (
            <div className="badge discount">-{item.discount}%</div>
          )}
        </div>
      )}
      <div className="card-body">
        <div className="card-header">
          <div className="card-title">{item.title}</div>
          {item.spicy && <span className="spicy-icon">🌶️</span>}
          {item.vegetarian && <span className="veg-icon">🥬</span>}
        </div>
        {item.description && (
          <div className="card-description">{item.description}</div>
        )}
        {item.ingredients && (
          <div className="ingredients">
            {item.ingredients.slice(0, 3).join(', ')}
            {item.ingredients.length > 3 && '...'}
          </div>
        )}
        <div className="card-footer">
          <div className="price">
            {item.discount ? (
              <>
                <span className="discounted-price">${(item.price * (1 - item.discount / 100)).toFixed(2)}</span>
                <span className="original-price">${item.price.toFixed(2)}</span>
              </>
            ) : (
              `$${item.price.toFixed(2)}`
            )}
          </div>
          {item.weight && <div className="weight">{item.weight}</div>}
        </div>
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

export default ClassicCard;
