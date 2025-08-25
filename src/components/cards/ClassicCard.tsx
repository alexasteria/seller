import React, { FC, useMemo, useState } from "react";
import { Product, VariantState } from "../../types";
import { useExpandedCard } from "../../contexts/ExpandedCardContext";
import ProductVariants from "../../components/cards/components/ProductVariants";

interface CardProps {
  item: Product;
  variantState?: VariantState;
  onIncrement: (product: Product, variantID: string) => void;
  onDecrement: (product: Product, variantID: string) => void;
}

const ClassicCard: FC<CardProps> = ({
  item,
  variantState,
  onIncrement,
  onDecrement,
}) => {
  const { expandedCardId, setExpandedCardId } = useExpandedCard();
  const isExpanded = expandedCardId === item.id;
  const [selectVariant, setSelectVariant] = useState(item.variants[0]);
  const price = useMemo(() => {
    return selectVariant?.cost ?? 99999;
  }, [selectVariant]);
  const discountPrice = useMemo(() => {
    if (!item.discount) return price;
    return price * (1 - item.discount / 100);
  }, [price]);
  const quantity = useMemo(() => {
    return variantState?.[selectVariant.id] || 0;
  }, [selectVariant, variantState]);
  return (
    <div className={`card classic-card ${isExpanded ? "expanded" : ""}`}>
      {!isExpanded && (
        <div
          className="card-image-container"
          onClick={() => setExpandedCardId(isExpanded ? null : item.id)}
        >
          {item.img && (
            <div className="card-image">
              <img
                src={item.img}
                alt={item.title}
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
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
                target.style.display = "none";
              }}
            />
            <div className="card-expanded-overlay">
              {/*{item.popular && (*/}
              {/*  <div className="card-expanded-badge popular">*/}
              {/*    <span className="badge-icon">👑</span>*/}
              {/*    <span className="badge-text">Популярная</span>*/}
              {/*  </div>*/}
              {/*)}*/}
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
                {/*//todo*/}
                {/*<div className="card-tags">*/}
                {/*  {item.popular && (*/}
                {/*    <span className="card-tag popular" title="Популярная">👑</span>*/}
                {/*  )}*/}
                {/*  {item.spicy && (*/}
                {/*    <span className="card-tag spicy" title="Острая">🌶️</span>*/}
                {/*  )}*/}
                {/*  {item.vegetarian && (*/}
                {/*    <span className="card-tag vegetarian" title="Вегетарианская">🥬</span>*/}
                {/*  )}*/}
                {/*</div>*/}
              </div>
              {item.description && (
                <div className="card-description">{item.description}</div>
              )}
              <div className="card-price-row">
                <div className="card-price">
                  {item.discount ? (
                    <>
                      <span className="discounted-price">
                        {item.variants?.length > 1 && "от "}₽
                        {discountPrice.toFixed(2)}
                      </span>
                      <span className="original-price">
                        ₽{price.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    `₽${price.toFixed(2)}`
                  )}
                </div>
                {item.discount && (
                  <div className="card-discount-badge">-{item.discount}%</div>
                )}
              </div>
            </div>
            {/*<div className="card-actions" onClick={(e) => e.stopPropagation()}>*/}
            {/*  {quantity > 0 && (*/}
            {/*    <div className="counter">*/}
            {/*      <button*/}
            {/*        className="btn"*/}
            {/*        onClick={() => onDecrement(item, selectVariant.id)}*/}
            {/*        aria-label="Уменьшить количество"*/}
            {/*      >*/}
            {/*        −*/}
            {/*      </button>*/}
            {/*      <span className="qty">{quantity}</span>*/}
            {/*      <button*/}
            {/*        className="btn"*/}
            {/*        onClick={() => onIncrement(item, selectVariant.id)}*/}
            {/*        aria-label="Увеличить количество"*/}
            {/*      >*/}
            {/*        +*/}
            {/*      </button>*/}
            {/*    </div>*/}
            {/*  )}*/}
            {/*</div>*/}
          </div>
        )}

        {/* Расширенное содержимое как в PremiumCard */}
        {isExpanded && (
          <div className="card-expanded-content">
            <div className="card-expanded-header">
              <div className="card-expanded-title-section">
                <h3 className="card-expanded-title">{item.title}</h3>
                {/*//todo*/}
                {/*<div className="card-expanded-icons">*/}
                {/*  {item.vegetarian && (*/}
                {/*    <span className="card-expanded-icon veg" title="Вегетарианская">🥬</span>*/}
                {/*  )}*/}
                {/*  {item.spicy && (*/}
                {/*    <span className="card-expanded-icon spicy" title="Острая">🌶️</span>*/}
                {/*  )}*/}
                {/*</div>*/}
              </div>
              <div className="card-expanded-price-section">
                <div className="card-expanded-price">
                  {item.discount
                    ? `₽${discountPrice.toFixed(2)}`
                    : `₽${price.toFixed(2)}`}
                </div>
                {item.discount && (
                  <div className="card-expanded-original-price">
                    ₽{price.toFixed(2)}
                  </div>
                )}
              </div>
            </div>

            {item.description && (
              <p className="card-expanded-description">{item.description}</p>
            )}

            {item.tags && (
              <div className="card-expanded-ingredients">
                <div className="ingredients-title">{item.tags.name}:</div>
                <div className="ingredients-list">
                  {item.tags.tags.map((value, index) => (
                    <span key={index} className="ingredient-item">
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/*<div className="card-expanded-details">*/}
            {/*  {item.weight && (*/}
            {/*    <div className="card-expanded-detail">*/}
            {/*      <span className="detail-icon">📏</span>*/}
            {/*      <span className="detail-text">{item.weight}</span>*/}
            {/*    </div>*/}
            {/*  )}*/}
            {/*  {item.cookingTime && (*/}
            {/*    <div className="card-expanded-detail">*/}
            {/*      <span className="detail-icon">⏱️</span>*/}
            {/*      <span className="detail-text">{item.cookingTime}</span>*/}
            {/*    </div>*/}
            {/*  )}*/}
            {/*</div>*/}

            {selectVariant && (
              <ProductVariants
                variants={item.variants}
                setSelectVariant={setSelectVariant}
                selected={selectVariant?.id}
              />
            )}

            <div className="card-expanded-actions">
              {quantity > 0 ? (
                <div className="card-expanded-counter">
                  <button
                    className="card-expanded-btn"
                    onClick={() => onDecrement(item, selectVariant.id)}
                    aria-label="Уменьшить количество"
                  >
                    −
                  </button>
                  <span className="card-expanded-qty">{quantity}</span>
                  <button
                    className="card-expanded-btn"
                    onClick={() => onIncrement(item, selectVariant.id)}
                    aria-label="Увеличить количество"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  className="card-expanded-add-btn"
                  onClick={() => onIncrement(item, selectVariant.id)}
                  aria-label={`Добавить ${item.title}`}
                >
                  <span className="btn-text">В корзину за</span>
                  <span className="btn-text">{discountPrice} ₽</span>
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
