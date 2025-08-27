import React, { FC } from "react";
import Header from "@/components/common/Header";
import Menu from "@/pages/MenuPage/components/Menu/Menu";
import Footer from "@/components/common/Footer";
import { useCart } from "@/contexts/CartContext";
import { useTelegramUi, useTheme } from "@/hooks/useTelegram";
import { useThemeSync } from "@/hooks/useThemeSync";

const MenuPage: FC = () => {
  const { cart, total, hasItems, increment, decrement } = useCart();
  const theme = useTheme();

  useTelegramUi();
  useThemeSync(theme);

  return (
    <div className="container">
      <Header />
      <Menu cart={cart} onIncrement={increment} onDecrement={decrement} />
      <Footer total={total} />
    </div>
  );
};

export default MenuPage;
