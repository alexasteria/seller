import React, { FC } from "react";
import ExpandableCard from "@/pages/MenuPage/components/Card/ExpandableCard";
import { MENU } from "@/data/menu";
import { CartState, Product } from "@/types";
import styles from "@/pages/MenuPage/components/Menu/Menu.module.css";

interface MenuProps {
  cart: CartState;
  onIncrement: (product: Product, variantID: string) => void;
  onDecrement: (product: Product, variantID: string) => void;
}

const Menu: FC<MenuProps> = ({ cart, onIncrement, onDecrement }) => {
  return (
    <section className={styles.grid}>
      {MENU.map((item) => (
        <ExpandableCard
          key={item.id}
          item={item}
          variantState={cart[item.id]}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
        />
      ))}
    </section>
  );
};

export default Menu;
