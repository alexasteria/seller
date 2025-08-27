import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { ExpandedCardProvider } from "@/contexts/ExpandedCardContext";

const App: FC = () => {
  return (
    <CartProvider>
      <ExpandedCardProvider>
        <Outlet />
      </ExpandedCardProvider>
    </CartProvider>
  );
};

export default App;
