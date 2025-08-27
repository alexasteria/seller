import React, { FC } from "react";
import { Product, ProductVariant, VariantState } from "@/types";
import ProductVariants from "@/pages/MenuPage/components/Card/components/ProductVariants";
import styles from "@/pages/MenuPage/components/Card/CardExpandedContent.module.css";

interface CardExpandedContentProps {
  item: Product;
  variantState: VariantState;
  onIncrement: (product: Product, variantID: string) => void;
  onDecrement: (product: Product, variantID: string) => void;
  selectVariant: ProductVariant;
  setSelectVariant: (v: ProductVariant) => void;
  quantity: number;
  discountPrice: number;
  isExpanded: boolean;
}

const CardExpandedContent: FC<CardExpandedContentProps> = ({
  item,
  variantState,
  onIncrement,
  onDecrement,
  selectVariant,
  setSelectVariant,
  quantity,
  discountPrice,
  isExpanded,
}) => {
  return (
    <div
      className={`${styles.cardExpandedContent}`}
      style={{ maxHeight: `${!isExpanded ? 0 : "max-content"}` }}
    >
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
  );
};

export default CardExpandedContent;
