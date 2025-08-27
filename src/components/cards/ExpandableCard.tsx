import React, { FC, useMemo, useState } from "react";
import { Product, VariantState } from "@/types";
import styles from "@/components/cards/ExpandableCard.module.css";
import { useExpandedCard } from "@/contexts/ExpandedCardContext";
import CardHeader from "./CardHeader";
import CardExpandedContent from "./CardExpandedContent";

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

      <CardHeader
        item={item}
        isExpanded={isExpanded}
        totalCount={totalCount}
        discountPrice={discountPrice}
        price={price}
        toggleExpand={toggleExpand}
      />

      {isExpanded && (
        <CardExpandedContent
          item={item}
          variantState={variantState}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          selectVariant={selectVariant}
          setSelectVariant={setSelectVariant}
          quantity={quantity}
          discountPrice={discountPrice}
          isExpanded={isExpanded}
        />
      )}
    </div>
  );
};

export default ExpandableCard;
