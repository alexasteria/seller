import React, { FC } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MenuPage from "@/pages/MenuPage/MenuPage";
import DeliveryPage from "@/pages/DeliveryPage/DeliveryPage";
import { CartProvider } from "@/contexts/CartContext";
import { ExpandedCardProvider } from "@/contexts/ExpandedCardContext";

const App: FC = () => {
  return (
    <CartProvider>
      <ExpandedCardProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MenuPage />} />
            <Route path="/delivery" element={<DeliveryPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ExpandedCardProvider>
    </CartProvider>
  );
};

export default App;
