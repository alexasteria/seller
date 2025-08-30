import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { ExpandedCardProvider } from "@/contexts/ExpandedCardContext";
import { ProductsProvider } from "@/contexts/ProductsContext";

const App: FC = () => {
  return (
    <ProductsProvider>
      <CartProvider>
        <ExpandedCardProvider>
          <Outlet />
        </ExpandedCardProvider>
      </CartProvider>
    </ProductsProvider>
  );
};

export default App;
