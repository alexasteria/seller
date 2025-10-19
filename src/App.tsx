import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { ExpandedCardProvider } from "@/contexts/ExpandedCardContext";
import { ProductsProvider } from "@/contexts/ProductsContext";
import { UserProvider } from "@/contexts/UserContext";
import { useTelegramUi } from "@/hooks/useTelegram.ts";

const App: FC = () => {
  useTelegramUi();
  return (
    <UserProvider>
      <ProductsProvider>
        <CartProvider>
          <ExpandedCardProvider>
            <Outlet />
          </ExpandedCardProvider>
        </CartProvider>
      </ProductsProvider>
    </UserProvider>
  );
};

export default App;
