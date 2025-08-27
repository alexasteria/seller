import React, { FC, useMemo, useState } from "react";
import { Product, VariantState } from "@/types";
import styles from "@/components/cards/ExpandableCard.module.css";
import ProductVariants from "@/components/cards/components/ProductVariants";
import { useExpandedCard } from "@/contexts/ExpandedCardContext";

interface ExpandableCardProps {
  item: Product;
  variantState?: VariantState;
  onIncrement: (product: Product, variantID: string) => void;
  onDecrement: (product: Product, variantID: string) => void;
}

const ExpandableCard: FC<ExpandableCardProps> = ({
  item,
  variantState = {},
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

  const totalCount = useMemo(() => {
    return Object.entries(variantState).reduce((sum, [_, count]) => {
      return sum + count;
    }, 0);
  }, [variantState]);

  const toggleExpand = () => {
    setExpandedCardId(isExpanded ? null : item.id);
  };

  return (
    <div
      className={`${styles.expandableCard} ${isExpanded ? styles.expanded : ""}`}
    >
      {isExpanded && item.img && (
        <div className={styles.cardExpandedImageContainer}>
          <img src={item.img} alt={item.title} loading="lazy" />
        </div>
      )}

      <div className={styles.cardHeader} onClick={toggleExpand}>
        {!isExpanded && (
          <div className={styles.cardImageContainer}>
            {item.img && (
              <div className={styles.cardImage}>
                <img src={item.img} alt={item.title} loading="lazy" />
                {Boolean(totalCount) && (
                  <span className={styles.badge}>{totalCount}</span>
                )}
              </div>
            )}
          </div>
        )}
        <div className={styles.cardInfo}>
          <h3 className={styles.cardTitle}>{item.title}</h3>
          {!isExpanded && item.description && (
            <p className={styles.cardDescription}>{item.description}</p>
          )}
          <div className={styles.cardPriceRow}>
            <div className={styles.cardPrice}>
              {item.discount ? (
                <>
                  <span className={styles.discountedPrice}>
                    {item.variants?.length > 1 && "от "}₽
                    {discountPrice.toFixed(2)}
                  </span>
                  <span className={styles.originalPrice}>
                    ₽{price.toFixed(2)}
                  </span>
                </>
              ) : (
                `₽${price.toFixed(2)}`
              )}
            </div>
            {item.discount && (
              <div className={styles.cardDiscountBadge}>-{item.discount}%</div>
            )}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className={styles.cardExpandedContent}>
          {item.description && (
            <p className={styles.cardExpandedDescription}>{item.description}</p>
          )}

          {item.tags && (
            <div className={styles.cardExpandedIngredients}>
              <div className={styles.ingredientsTitle}>{item.tags.name}:</div>
              <div className={styles.ingredientsList}>
                {item.tags.tags.map((value, index) => (
                  <span key={index} className={styles.ingredientItem}>
                    {value}
                  </span>
                ))}
              </div>
            </div>
          )}

          {selectVariant && (
            <ProductVariants
              variants={item.variants}
              setSelectVariant={setSelectVariant}
              selected={selectVariant?.id}
              variantState={variantState}
            />
          )}

          <div className={styles.cardExpandedActions}>
            {quantity > 0 ? (
              <div className={styles.cardExpandedCounter}>
                <button
                  className={styles.cardExpandedBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDecrement(item, selectVariant.id);
                  }}
                  aria-label="Уменьшить количество"
                >
                  −
                </button>
                <span className={styles.cardExpandedQty}>{quantity}</span>
                <button
                  className={styles.cardExpandedBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    onIncrement(item, selectVariant.id);
                  }}
                  aria-label="Увеличить количество"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                className={styles.cardExpandedAddBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  onIncrement(item, selectVariant.id);
                }}
                aria-label={`Добавить ${item.title}`}
              >
                <span className={styles.btnText}>В корзину за</span>
                <span className={styles.btnText}>{discountPrice} ₽</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpandableCard;
