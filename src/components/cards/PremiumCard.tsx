import React, { FC } from 'react';
import { MenuItem as MenuItemType } from '../../types';

interface CardProps {
  item: MenuItemType;
  quantity: number;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
}

const PremiumCard: FC<CardProps> = ({ item, quantity, onIncrement, onDecrement }) => {
  return (
    <div className="card premium-card">
      <div className="premium-image-container">
        {item.img && (
          <div className="premium-image">
            <img 
              src={item.img} 
              alt={item.title}
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <div className="premium-overlay">
              {item.popular && (
                <div className="premium-badge popular">
                  <span className="badge-icon">👑</span>
                  <span className="badge-text">Популярная</span>
                </div>
              )}
              {item.discount && (
                <div className="premium-badge discount">
                  <span className="badge-text">-{item.discount}%</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="premium-content">
        <div className="premium-header">
          <div className="premium-title-section">
            <h3 className="premium-title">{item.title}</h3>
            <div className="premium-icons">
              {item.vegetarian && (
                <span className="premium-icon veg" title="Вегетарианская">🥬</span>
              )}
              {item.spicy && (
                <span className="premium-icon spicy" title="Острая">🌶️</span>
              )}
            </div>
          </div>
          <div className="premium-price-section">
                      <div className="premium-price">
            {item.discount ? (
              `$${(item.price * (1 - item.discount / 100)).toFixed(2)}`
            ) : (
              `$${item.price.toFixed(2)}`
            )}
          </div>
          {item.discount && (
            <div className="premium-original-price">
              ${item.price.toFixed(2)}
            </div>
          )}
          </div>
        </div>

        {item.description && (
          <p className="premium-description">{item.description}</p>
        )}

        {item.ingredients && (
          <div className="premium-ingredients">
            <div className="ingredients-title">Состав:</div>
            <div className="ingredients-list">
              {item.ingredients.map((ingredient, index) => (
                <span key={index} className="ingredient-item">{ingredient}</span>
              ))}
            </div>
          </div>
        )}

        <div className="premium-details">
          {item.weight && (
            <div className="premium-detail">
              <span className="detail-icon">📏</span>
              <span className="detail-text">{item.weight}</span>
            </div>
          )}
          {item.cookingTime && (
            <div className="premium-detail">
              <span className="detail-icon">⏱️</span>
              <span className="detail-text">{item.cookingTime}</span>
            </div>
          )}
        </div>

        <div className="premium-actions">
          {quantity > 0 ? (
            <div className="premium-counter">
              <button 
                className="premium-btn" 
                onClick={() => onDecrement(item.id)}
                aria-label="Уменьшить количество"
              >
                −
              </button>
              <span className="premium-qty">{quantity}</span>
              <button 
                className="premium-btn" 
                onClick={() => onIncrement(item.id)}
                aria-label="Увеличить количество"
              >
                +
              </button>
            </div>
          ) : (
            <button 
              className="premium-add-btn" 
              onClick={() => onIncrement(item.id)}
              aria-label={`Добавить ${item.title}`}
            >
              <span className="btn-text">Добавить в корзину</span>
              <span className="btn-icon">+</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PremiumCard;
