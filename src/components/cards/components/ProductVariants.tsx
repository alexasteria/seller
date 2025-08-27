import React, { FC } from "react";
import { ProductVariant, VariantState } from "@/types";
import styles from '@/components/cards/components/ProductVariants.module.css';

const ProductVariants: FC<{
  variants?: ProductVariant[];
  setSelectVariant: (v: ProductVariant) => void;
  selected?: string;
  variantState?: VariantState;
}> = ({ variants, setSelectVariant, selected, variantState = {} }) => {
  return (
    <div className={styles.variantsContainer}>
      {variants?.map((variant) => {
        const isSelected = selected === variant.id;
        return (
          <div
            className={`${styles.variantItem} ${isSelected ? styles.selected : ''}`}
            onClick={() => setSelectVariant(variant)}
            key={variant.id}
          >
            {variant.value}
            {Boolean(variantState[variant.id]) && (
              <span className={styles.count}>
                {variantState[variant.id]}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductVariants;