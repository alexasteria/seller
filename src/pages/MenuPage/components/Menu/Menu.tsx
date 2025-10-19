import React, { FC } from "react";
import ExpandableCard from "@/pages/MenuPage/components/Card/ExpandableCard";
import { CartState, Product } from "@/types";
import styles from "@/pages/MenuPage/components/Menu/Menu.module.css";
import { ModelsProduct } from "@/backendApi.ts";

interface MenuProps {
  cart: CartState;
  products: ModelsProduct[];
  onIncrement: (product: Product, variantID: string) => void;
  onDecrement: (product: Product, variantID: string) => void;
}

const Menu: FC<MenuProps> = ({ cart, products, onIncrement, onDecrement }) => {
  return (
    <section className={styles.grid}>
      {products.map((item) => (
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
