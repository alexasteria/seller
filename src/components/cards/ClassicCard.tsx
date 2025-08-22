import React, { FC } from 'react';
import { MenuItem as MenuItemType } from '../../types';
import { useExpandedCard } from '../../contexts/ExpandedCardContext';

interface CardProps {
  item: MenuItemType;
  quantity: number;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
}

const ClassicCard: FC<CardProps> = ({ item, quantity, onIncrement, onDecrement }) => {
  const { expandedCardId, setExpandedCardId } = useExpandedCard();
  const isExpanded = expandedCardId === item.id;
  return (
    <div className={`card classic-card ${isExpanded ? 'expanded' : ''}`} onClick={() => setExpandedCardId(isExpanded ? null : item.id)}>
      {!isExpanded && (
        <div className="card-image-container">
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
        </div>
      )}

      {isExpanded && item.img && (
        <div className="card-expanded-image-container">
          <div className="card-expanded-image">
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <div className="card-expanded-overlay">
              {item.popular && (
                <div className="card-expanded-badge popular">
                  <span className="badge-icon">👑</span>
                  <span className="badge-text">Популярная</span>
                </div>
              )}
              {item.discount && (
                <div className="card-expanded-badge discount">
                  <span className="badge-text">-{item.discount}%</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="card-content">
        {!isExpanded && (
          <div className="card-header-row">
            <div className="card-info">
              <div className="card-title-row">
                <h3 className="card-title">{item.title}</h3>
                <div className="card-tags">
                  {item.popular && (
                    <span className="card-tag popular" title="Популярная">👑</span>
                  )}
                  {item.spicy && (
                    <span className="card-tag spicy" title="Острая">🌶️</span>
                  )}
                  {item.vegetarian && (
                    <span className="card-tag vegetarian" title="Вегетарианская">🥬</span>
                  )}
                </div>
              </div>
              {item.description && (
                <div className="card-description">{item.description}</div>
              )}
              <div className="card-price-row">
                <div className="card-price">
                  {item.discount ? (
                    <>
                      <span className="discounted-price">${(item.price * (1 - item.discount / 100)).toFixed(2)}</span>
                      <span className="original-price">${item.price.toFixed(2)}</span>
                    </>
                  ) : (
                    `$${item.price.toFixed(2)}`
                  )}
                </div>
                {item.discount && (
                  <div className="card-discount-badge">-{item.discount}%</div>
                )}
              </div>
            </div>
            <div className="card-actions" onClick={(e) => e.stopPropagation()}>
              {quantity > 0 && (
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
              )}
            </div>
          </div>
        )}

        {/* Расширенное содержимое как в PremiumCard */}
        {isExpanded && (
          <div className="card-expanded-content">
            <div className="card-expanded-header">
              <div className="card-expanded-title-section">
                <h3 className="card-expanded-title">{item.title}</h3>
                <div className="card-expanded-icons">
                  {item.vegetarian && (
                    <span className="card-expanded-icon veg" title="Вегетарианская">🥬</span>
                  )}
                  {item.spicy && (
                    <span className="card-expanded-icon spicy" title="Острая">🌶️</span>
                  )}
                </div>
              </div>
              <div className="card-expanded-price-section">
                <div className="card-expanded-price">
                  {item.discount ? (
                    `$${(item.price * (1 - item.discount / 100)).toFixed(2)}`
                  ) : (
                    `$${item.price.toFixed(2)}`
                  )}
                </div>
                {item.discount && (
                  <div className="card-expanded-original-price">
                    ${item.price.toFixed(2)}
                  </div>
                )}
              </div>
            </div>

            {item.description && (
              <p className="card-expanded-description">{item.description}</p>
            )}

            {item.ingredients && (
              <div className="card-expanded-ingredients">
                <div className="ingredients-title">Состав:</div>
                <div className="ingredients-list">
                  {item.ingredients.map((ingredient, index) => (
                    <span key={index} className="ingredient-item">{ingredient}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="card-expanded-details">
              {item.weight && (
                <div className="card-expanded-detail">
                  <span className="detail-icon">📏</span>
                  <span className="detail-text">{item.weight}</span>
                </div>
              )}
              {item.cookingTime && (
                <div className="card-expanded-detail">
                  <span className="detail-icon">⏱️</span>
                  <span className="detail-text">{item.cookingTime}</span>
                </div>
              )}
            </div>

            <div className="card-expanded-actions">
              {quantity > 0 ? (
                <div className="card-expanded-counter">
                  <button
                    className="card-expanded-btn"
                    onClick={() => onDecrement(item.id)}
                    aria-label="Уменьшить количество"
                  >
                    −
                  </button>
                  <span className="card-expanded-qty">{quantity}</span>
                  <button
                    className="card-expanded-btn"
                    onClick={() => onIncrement(item.id)}
                    aria-label="Увеличить количество"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  className="card-expanded-add-btn"
                  onClick={() => onIncrement(item.id)}
                  aria-label={`Добавить ${item.title}`}
                >
                  <span className="btn-text">Добавить в корзину</span>
                  <span className="btn-icon">+</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassicCard;
