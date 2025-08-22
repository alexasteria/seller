import React, { FC } from 'react';
import { MenuItem as MenuItemType } from '../../types';

interface CardProps {
  item: MenuItemType;
  quantity: number;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
}

const ModernCard: FC<CardProps> = ({ item, quantity, onIncrement, onDecrement }) => {
  return (
    <div className="card modern-card">
      <div className="card-content">
        {item.img && (
          <div className="card-image-wrapper">
            <img 
              src={item.img} 
              alt={item.title}
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <div className="image-overlay">
              {item.popular && (
                <div className="badge popular">🔥 Популярная</div>
              )}
              {item.spicy && (
                <div className="badge spicy">🌶️ Острая</div>
              )}
            </div>
          </div>
        )}
        <div className="card-info">
          <div className="card-header">
            <h3 className="card-title">{item.title}</h3>
            <div className="card-icons">
              {item.vegetarian && <span className="veg-icon" title="Вегетарианская">🥬</span>}
              {item.spicy && <span className="spicy-icon" title="Острая">🌶️</span>}
            </div>
          </div>
          {item.description && (
            <p className="card-description">{item.description}</p>
          )}
          {item.ingredients && (
            <div className="ingredients-tags">
              {item.ingredients.slice(0, 4).map((ingredient, index) => (
                <span key={index} className="ingredient-tag">{ingredient}</span>
              ))}
            </div>
          )}
          <div className="card-details">
            {item.weight && <span className="detail">{item.weight}</span>}
            {item.cookingTime && <span className="detail">⏱️ {item.cookingTime}</span>}
          </div>
        </div>
      </div>
      <div className="card-bottom">
        <div className="price-section">
          <div className="price">
            {item.discount ? (
              `$${(item.price * (1 - item.discount / 100)).toFixed(2)}`
            ) : (
              `$${item.price.toFixed(2)}`
            )}
          </div>
          {item.discount && (
            <div className="original-price">${item.price.toFixed(2)}</div>
          )}
        </div>
        <div className="action-section">
          {quantity > 0 ? (
            <div className="counter modern">
              <button 
                className="btn-counter" 
                onClick={() => onDecrement(item.id)}
                aria-label="Уменьшить количество"
              >
                −
              </button>
              <span className="qty">{quantity}</span>
              <button 
                className="btn-counter" 
                onClick={() => onIncrement(item.id)}
                aria-label="Увеличить количество"
              >
                +
              </button>
            </div>
          ) : (
            <button 
              className="btn-add" 
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

export default ModernCard;
