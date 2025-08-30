import React, { FC } from "react";
import Header from "@/components/common/Header";
import Menu from "@/pages/MenuPage/components/Menu/Menu";
import Footer from "@/components/common/Footer";
import { useCart } from "@/contexts/CartContext";
import { useProducts } from "@/contexts/ProductsContext";

const MenuPage: FC = () => {
  const { cart, total, increment, decrement } = useCart();
  const { products, isLoading } = useProducts();

  return (
    <div className="container">
      <Header />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Menu
          products={products}
          cart={cart}
          onIncrement={increment}
          onDecrement={decrement}
        />
      )}
      <Footer total={total} />
    </div>
  );
};

export default MenuPage;
