import React, { FC } from 'react';
import { Product } from '@/types';
import styles from './CardHeader.module.css';

interface CardHeaderProps {
  item: Product;
  isExpanded: boolean;
  totalCount: number;
  discountPrice: number;
  price: number;
  toggleExpand: () => void;
}

const CardHeader: FC<CardHeaderProps> = ({
  item,
  isExpanded,
  totalCount,
  discountPrice,
  price,
  toggleExpand,
}) => {
  return (
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
  );
};

export default CardHeader;
