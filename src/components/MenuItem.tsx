import React, { FC } from "react";
import { MenuItem as MenuItemType, Product, VariantState } from "../types";
import ClassicCard from "./cards/ClassicCard";

interface MenuItemProps {
  item: MenuItemType;
  variantState?: VariantState;
  onIncrement: (product: Product, variantID: string) => void;
  onDecrement: (product: Product, variantID: string) => void;
}

const MenuItem: FC<MenuItemProps> = ({
  item,
  variantState,
  onIncrement,
  onDecrement,
}) => {
  return (
    <ClassicCard
      item={item}
      variantState={variantState}
      onIncrement={onIncrement}
      onDecrement={onDecrement}
    />
  );
};

export default MenuItem;
