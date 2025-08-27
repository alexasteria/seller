import React, { FC } from 'react';
import { CartState, Product } from '@/types';
import styles from '@/pages/DeliveryPage/components/CartDisplay/CartDisplay.module.css';

interface CartDisplayProps {
  cart: CartState;
  cartMap: Map<string, Product>;
}

const CartDisplay: FC<CartDisplayProps> = ({ cart, cartMap }) => {
  return (
    <div className={styles.cartDisplayContainer}>
      {Object.entries(cart).map(([productID, variants]) => {
        const item = cartMap.get(productID)!;
        return (
          <div key={productID} className={styles.cartItem}>
            <img src={item.img} alt={item.title} className={styles.cartItemImage} />
            <div className={styles.cartItemDetails}>
              <div className={styles.cartItemTitle}>{item.title}</div>
              <div className={styles.cartItemVariants}>
                {Object.entries(variants).map(([variantID, count]) => {
                  const v = item.variants.find((v) => v.id === variantID);
                  if (!v) throw Error("wrong variants");
                  return (
                    <div key={variantID} className={styles.variantBadge}>
                      {v.value} x {count}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartDisplay;
