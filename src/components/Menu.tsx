import React, { FC } from "react";
import MenuItem from "./MenuItem";
import { MENU } from "../data/menu";
import { CartState, Product } from "../types";

interface MenuProps {
  cart: CartState;
  onIncrement: (product: Product, variantID: string) => void;
  onDecrement: (id: string) => void;
}

const Menu: FC<MenuProps> = ({ cart, onIncrement, onDecrement }) => {
  return (
    <section className="grid">
      {MENU.map((item) => (
        <MenuItem
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
